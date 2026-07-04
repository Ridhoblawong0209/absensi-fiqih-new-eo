import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

// Load environment variables with override enabled to ensure updated .env values are respected
dotenv.config({ override: true });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Helper to get credentials safely
  const getSupabaseCredentials = (req?: express.Request) => {
    let url = (process.env.VITE_SUPABASE_URL || '').trim().replace(/^"|"$/g, '').trim();
    let anonKey = (process.env.VITE_SUPABASE_ANON_KEY || '').trim().replace(/^"|"$/g, '').trim();

    // Fallback to custom headers forwarded from client
    if (req) {
      const headerUrl = req.headers['x-supabase-url'];
      const headerKey = req.headers['x-supabase-key'];
      if (headerUrl && typeof headerUrl === 'string' && headerUrl.trim()) {
        url = headerUrl.trim().replace(/^"|"$/g, '').trim();
      }
      if (headerKey && typeof headerKey === 'string' && headerKey.trim()) {
        anonKey = headerKey.trim().replace(/^"|"$/g, '').trim();
      }
    }
    return { url, anonKey };
  };

  // API 1: Test connection to Supabase
  app.get("/api/supabase-test", async (req, res) => {
    const { url, anonKey } = getSupabaseCredentials(req);

    if (!url || !anonKey) {
      return res.status(400).json({ 
        success: false, 
        error: "Kredensial Supabase belum dikonfigurasi di file .env server maupun di header request." 
      });
    }

    const sanitizedUrl = url.replace(/\/$/, '');
    const startTime = Date.now();

    try {
      // Querying a small subset of 'kelas' table is the most reliable way to verify both URL and Anon Key authentication
      const response = await fetch(`${sanitizedUrl}/rest/v1/kelas?select=id&limit=1`, {
        method: 'GET',
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
        },
      });

      const latency = Date.now() - startTime;

      if (response.status >= 200 && response.status < 300) {
        return res.json({ success: true, latency });
      }

      if (response.status === 401) {
        return res.json({ success: false, latency, error: 'Anon Public Key tidak valid atau salah (HTTP 401: Unauthorized).' });
      }

      if (response.status === 404) {
        return res.json({ success: false, latency, error: 'Tabel "kelas" tidak ditemukan di Supabase. Silakan eksekusi file SUPABASE_SCHEMA.sql terlebih dahulu di SQL Editor Supabase Anda.' });
      }

      return res.json({ success: false, latency, error: `HTTP ${response.status}: ${response.statusText}` });
    } catch (e: any) {
      const latency = Date.now() - startTime;
      console.error("DEBUG FETCH ERROR:", e, "CAUSE:", e?.cause);
      return res.json({ 
        success: false, 
        latency, 
        error: e.message || "Gagal melakukan fetch ke server Supabase (Masalah Jaringan/DNS).",
        details: e?.cause?.message || String(e?.cause || '')
      });
    }
  });

  // API 2: Proxy to sync table data
  app.post("/api/supabase/sync-to/:tableName", async (req, res) => {
    const { tableName } = req.params;
    const { url, anonKey } = getSupabaseCredentials(req);

    if (!url || !anonKey) {
      return res.status(500).json({ error: "Supabase credentials not configured on server" });
    }

    const sanitizedUrl = url.replace(/\/$/, '');
    const targetUrl = `${sanitizedUrl}/rest/v1/${tableName}`;

    try {
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
          Prefer: 'resolution=merge-duplicates',
        },
        body: JSON.stringify(req.body),
      });

      const responseText = await response.text();

      if (response.status >= 200 && response.status < 300) {
        return res.json({ success: true, data: responseText });
      }

      console.error(`Supabase Sync warning for ${tableName}:`, response.status, responseText);
      return res.status(response.status).json({ success: false, error: responseText });
    } catch (error: any) {
      console.error(`Proxy sync to ${tableName} failed:`, error);
      return res.status(500).json({ success: false, error: error.message });
    }
  });

  // API 3: Proxy to delete table data
  app.delete("/api/supabase/delete-from/:tableName", async (req, res) => {
    const { tableName } = req.params;
    const { url, anonKey } = getSupabaseCredentials(req);

    if (!url || !anonKey) {
      return res.status(500).json({ error: "Supabase credentials not configured on server" });
    }

    // Capture the query string robustly using req.originalUrl or req.url fallback
    const originalUrl = req.originalUrl || req.url || '';
    const queryStr = originalUrl.includes('?') ? '?' + originalUrl.split('?')[1] : '';
    const sanitizedUrl = url.replace(/\/$/, '');
    const targetUrl = `${sanitizedUrl}/rest/v1/${tableName}${queryStr}`;

    try {
      const response = await fetch(targetUrl, {
        method: 'DELETE',
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        return res.json({ success: true });
      }

      const responseText = await response.text();
      console.error(`Supabase delete warning for ${tableName}:`, response.status, responseText);
      return res.status(response.status).json({ success: false, error: responseText });
    } catch (error: any) {
      console.error(`Proxy delete from ${tableName} failed:`, error);
      return res.status(500).json({ success: false, error: error.message });
    }
  });

  // API 4: Proxy to fetch table data
  app.get("/api/supabase/sync-from/:tableName", async (req, res) => {
    const { tableName } = req.params;
    const { url, anonKey } = getSupabaseCredentials(req);

    if (!url || !anonKey) {
      return res.status(500).json({ error: "Supabase credentials not configured on server" });
    }

    const sanitizedUrl = url.replace(/\/$/, '');
    const targetUrl = `${sanitizedUrl}/rest/v1/${tableName}?select=*`;

    try {
      const response = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        const data = await response.json();
        return res.json({ success: true, data });
      }

      const responseText = await response.text();
      console.error(`Supabase fetch warning for ${tableName}:`, response.status, responseText);
      return res.status(response.status).json({ success: false, error: responseText });
    } catch (error: any) {
      console.error(`Proxy sync from ${tableName} failed:`, error);
      return res.status(500).json({ success: false, error: error.message });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
