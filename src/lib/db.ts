/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Kelas, Santri, MataPelajaran, Hissoh, Jadwal, Absensi, Semester, TahunAjaran, SupabaseConfig } from '../types';

// Storage Keys
const KEYS = {
  KELAS: 'absensi_fiqih_kelas',
  SANTRI: 'absensi_fiqih_santri',
  MAPEL: 'absensi_fiqih_mapel',
  HISSOH: 'absensi_fiqih_hissoh',
  JADWAL: 'absensi_fiqih_jadwal',
  ABSENSI: 'absensi_fiqih_absensi',
  SEMESTER: 'absensi_fiqih_semester',
  TAHUN_AJARAN: 'absensi_fiqih_tahun_ajaran',
  SUPABASE_CONFIG: 'absensi_fiqih_supabase_config',
  ACTIVE_PAGE_SAVE: 'absensi_fiqih_last_page',
};

// Seed Data
const seedKelas: Kelas[] = [
  { id: 'k1', nama: '2 MTs A', tingkat: 'MTs' },
  { id: 'k2', nama: '2 MTs B', tingkat: 'MTs' },
  { id: 'k3', nama: '2 MTs C', tingkat: 'MTs' },
  { id: 'k4', nama: '2 MTs D', tingkat: 'MTs' },
  { id: 'k5', nama: '2 MTs E', tingkat: 'MTs' },
  { id: 'k6', nama: '2 MTs F', tingkat: 'MTs' },
  { id: 'k7', nama: '2 MTs G', tingkat: 'MTs' },
];

const seedMapel: MataPelajaran[] = [
  { id: 'm1', nama: 'Fiqih', kode: 'FIQ' },
  { id: 'm2', nama: 'Ushul Fiqih', kode: 'USF' },
  { id: 'm3', nama: 'Aqidah Akhlak', kode: 'AA' },
  { id: 'm4', nama: 'Al-Qur\'an Hadits', kode: 'QH' },
];

const seedHissoh: Hissoh[] = [
  { id: 'h1', nomor: 1, jam_mulai: '07:00', jam_selesai: '07:45', jam_mulai_istiwa: '06:30', jam_selesai_istiwa: '07:15' },
  { id: 'h2', nomor: 2, jam_mulai: '07:45', jam_selesai: '08:30', jam_mulai_istiwa: '07:15', jam_selesai_istiwa: '08:00' },
  { id: 'h3', nomor: 3, jam_mulai: '08:30', jam_selesai: '09:15', jam_mulai_istiwa: '08:00', jam_selesai_istiwa: '08:45' },
  { id: 'h4', nomor: 4, jam_mulai: '09:30', jam_selesai: '10:15', jam_mulai_istiwa: '09:00', jam_selesai_istiwa: '09:45' },
  { id: 'h5', nomor: 5, jam_mulai: '10:15', jam_selesai: '11:00', jam_mulai_istiwa: '09:45', jam_selesai_istiwa: '10:30' },
  { id: 'h6', nomor: 6, jam_mulai: '11:00', jam_selesai: '11:45', jam_mulai_istiwa: '10:30', jam_selesai_istiwa: '11:15' },
];

const seedSemester: Semester[] = [
  { id: 's1', nama: 'Semester Ganjil (CAWU 1)', aktif: true },
  { id: 's2', nama: 'Semester Genap (CAWU 2)', aktif: false },
];

const seedTahunAjaran: TahunAjaran[] = [
  { id: 't1', nama: '2025/2026', aktif: false },
  { id: 't2', nama: '2026/2027', aktif: true },
];

const seedJadwal: Jadwal[] = [
  { id: 'j1', hari: 'Senin', kelas_id: 'k1', mapel_id: 'm1', hissoh_id: 'h1' }, // Senin Hissoh 1 Fiqih 2 MTs A
  { id: 'j2', hari: 'Senin', kelas_id: 'k2', mapel_id: 'm1', hissoh_id: 'h2' }, // Senin Hissoh 2 Fiqih 2 MTs B
  { id: 'j3', hari: 'Senin', kelas_id: 'k3', mapel_id: 'm2', hissoh_id: 'h3' }, // Senin Hissoh 3 Ushul Fiqih 2 MTs C
  { id: 'j4', hari: 'Selasa', kelas_id: 'k1', mapel_id: 'm3', hissoh_id: 'h1' }, // Selasa Hissoh 1 Aqidah Akhlak 2 MTs A
  { id: 'j5', hari: 'Selasa', kelas_id: 'k4', mapel_id: 'm1', hissoh_id: 'h2' }, // Selasa Hissoh 2 Fiqih 2 MTs D
  { id: 'j6', hari: 'Rabu', kelas_id: 'k5', mapel_id: 'm1', hissoh_id: 'h1' }, // Rabu Hissoh 1 Fiqih 2 MTs E
  { id: 'j7', hari: 'Rabu', kelas_id: 'k6', mapel_id: 'm4', hissoh_id: 'h2' }, // Rabu Hissoh 2 Qur'an Hadits 2 MTs F
  { id: 'j8', hari: 'Kamis', kelas_id: 'k7', mapel_id: 'm1', hissoh_id: 'h1' }, // Kamis Hissoh 1 Fiqih 2 MTs G
  { id: 'j9', hari: 'Kamis', kelas_id: 'k1', mapel_id: 'm2', hissoh_id: 'h2' }, // Kamis Hissoh 2 Ushul Fiqih 2 MTs A
  { id: 'j10', hari: 'Minggu', kelas_id: 'k2', mapel_id: 'm4', hissoh_id: 'h1' }, // Minggu Hissoh 1 Qur'an Hadits 2 MTs B
  { id: 'j11', hari: 'Sabtu', kelas_id: 'k3', mapel_id: 'm1', hissoh_id: 'h1' }, // Sabtu Hissoh 1 Fiqih 2 MTs C
  { id: 'j12', hari: 'Sabtu', kelas_id: 'k4', mapel_id: 'm3', hissoh_id: 'h2' }, // Sabtu Hissoh 2 Aqidah Akhlak 2 MTs D
];

const seedSantri: Santri[] = [
  { id: 's01', no: 1001, nama: 'Ahmad Subarjo', kelas_id: 'k1', jk: 'L', status: 'Aktif' },
  { id: 's02', no: 1002, nama: 'Ridho Firmansyah', kelas_id: 'k1', jk: 'L', status: 'Aktif' },
  { id: 's03', no: 1003, nama: 'Muhammad Al-Fatih', kelas_id: 'k1', jk: 'L', status: 'Aktif' },
  { id: 's04', no: 1004, nama: 'Fatimah Az-Zahra', kelas_id: 'k1', jk: 'P', status: 'Aktif' },
  { id: 's05', no: 1005, nama: 'Zainab Al-Kubro *keluar', kelas_id: 'k1', jk: 'P', status: 'Keluar' },
  
  { id: 's06', no: 1006, nama: 'Budi Santoso', kelas_id: 'k2', jk: 'L', status: 'Aktif' },
  { id: 's07', no: 1007, nama: 'Siti Aminah', kelas_id: 'k2', jk: 'P', status: 'Aktif' },
  { id: 's08', no: 1008, nama: 'Umar Bin Khattab', kelas_id: 'k2', jk: 'L', status: 'Aktif' },
  { id: 's09', no: 1009, nama: 'Aisyah Humaira', kelas_id: 'k2', jk: 'P', status: 'Aktif' },
  
  { id: 's10', no: 1010, nama: 'Lukman Hakim', kelas_id: 'k3', jk: 'L', status: 'Aktif' },
  { id: 's11', no: 1011, nama: 'Khofifah Indah', kelas_id: 'k3', jk: 'P', status: 'Aktif' },
  { id: 's12', no: 1012, nama: 'Ali Imron', kelas_id: 'k3', jk: 'L', status: 'Aktif' },
  
  { id: 's13', no: 1013, nama: 'Farhan Ma\'ruf', kelas_id: 'k4', jk: 'L', status: 'Aktif' },
  { id: 's14', no: 1014, nama: 'Dewi Sartika', kelas_id: 'k4', jk: 'P', status: 'Aktif' },
  { id: 's15', no: 1015, nama: 'Ririn Ekawati *keluar', kelas_id: 'k3', jk: 'P', status: 'Keluar' },

  { id: 's16', no: 1016, nama: 'Rahmat Hidayat', kelas_id: 'k5', jk: 'L', status: 'Aktif' },
  { id: 's17', no: 1017, nama: 'Mega Utami', kelas_id: 'k5', jk: 'P', status: 'Aktif' },
  
  { id: 's18', no: 1018, nama: 'Hasan Basri', kelas_id: 'k6', jk: 'L', status: 'Aktif' },
  { id: 's19', no: 1019, nama: 'Lailatul Qodriyah', kelas_id: 'k6', jk: 'P', status: 'Aktif' },
  
  { id: 's20', no: 1020, nama: 'Ibrahim Ahmad', kelas_id: 'k7', jk: 'L', status: 'Aktif' },
  { id: 's21', no: 1021, nama: 'Siti Rahmawati', kelas_id: 'k7', jk: 'P', status: 'Aktif' },
  { id: 's22', no: 1022, nama: 'Yusuf Mansur', kelas_id: 'k1', jk: 'L', status: 'Aktif' },
  { id: 's23', no: 1023, nama: 'Hamzah Fansuri', kelas_id: 'k2', jk: 'L', status: 'Aktif' },
  { id: 's24', no: 1024, nama: 'Abdurrahman Wahid', kelas_id: 'k4', jk: 'L', status: 'Aktif' },
  { id: 's25', no: 1025, nama: 'Ki Hajar Dewantara', kelas_id: 'k7', jk: 'L', status: 'Aktif' },
];

const seedSupabase: SupabaseConfig = {
  url: '',
  anonKey: '',
  connected: false,
  latency: 0,
  lastSync: '-',
  mode: 'offline',
};

// Local storage helpers
function getLocal<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error('Error reading localStorage', e);
    return defaultValue;
  }
}

function setLocal<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error writing localStorage', e);
  }
}

// Ensure database is initialized with seed data
export function initDB() {
  if (!localStorage.getItem(KEYS.KELAS)) setLocal(KEYS.KELAS, seedKelas);
  if (!localStorage.getItem(KEYS.SANTRI)) setLocal(KEYS.SANTRI, seedSantri);
  if (!localStorage.getItem(KEYS.MAPEL)) setLocal(KEYS.MAPEL, seedMapel);
  if (!localStorage.getItem(KEYS.HISSOH)) setLocal(KEYS.HISSOH, seedHissoh);
  if (!localStorage.getItem(KEYS.JADWAL)) setLocal(KEYS.JADWAL, seedJadwal);
  if (!localStorage.getItem(KEYS.ABSENSI)) setLocal(KEYS.ABSENSI, [] as Absensi[]);
  if (!localStorage.getItem(KEYS.SEMESTER)) setLocal(KEYS.SEMESTER, seedSemester);
  if (!localStorage.getItem(KEYS.TAHUN_AJARAN)) setLocal(KEYS.TAHUN_AJARAN, seedTahunAjaran);
  if (!localStorage.getItem(KEYS.SUPABASE_CONFIG)) setLocal(KEYS.SUPABASE_CONFIG, seedSupabase);
}

// Initialize on import
initDB();

// Helper functions for real-time background sync
function triggerSync(tableName: string, data: any[]) {
  const config = db.getSupabaseConfig();
  if (config.url && config.anonKey && config.mode === 'online') {
    db.syncTableToSupabase(tableName, data).then(success => {
      if (success) {
        db.updateSupabaseSyncTime();
      }
    });
  }
}

function triggerDelete(tableName: string, queryString: string) {
  const config = db.getSupabaseConfig();
  if (config.url && config.anonKey && config.mode === 'online') {
    db.deleteFromSupabase(tableName, queryString).then(success => {
      if (success) {
        db.updateSupabaseSyncTime();
      }
    });
  }
}

// API operations
export const db = {
  // Kelas
  getKelas: (): Kelas[] => getLocal<Kelas[]>(KEYS.KELAS, []),
  saveKelas: (data: Kelas[]) => {
    const oldList = db.getKelas();
    const newIds = new Set(data.map(x => x.id));
    const deleted = oldList.filter(x => !newIds.has(x.id));
    setLocal(KEYS.KELAS, data);
    triggerSync('kelas', data);
    deleted.forEach(x => triggerDelete('kelas', 'id=eq.' + x.id));
  },
  addKelas: (item: Omit<Kelas, 'id'>): Kelas => {
    const list = db.getKelas();
    const newItem = { ...item, id: 'k_' + Date.now() };
    list.push(newItem);
    db.saveKelas(list);
    return newItem;
  },
  updateKelas: (item: Kelas) => {
    const list = db.getKelas();
    const index = list.findIndex(x => x.id === item.id);
    if (index !== -1) {
      list[index] = item;
      db.saveKelas(list);
    }
  },
  deleteKelas: (id: string) => {
    const list = db.getKelas();
    db.saveKelas(list.filter(x => x.id !== id));
  },

  // Santri
  getSantri: (): Santri[] => getLocal<Santri[]>(KEYS.SANTRI, []),
  saveSantri: (data: Santri[]) => {
    const oldList = db.getSantri();
    const newIds = new Set(data.map(x => x.id));
    const deleted = oldList.filter(x => !newIds.has(x.id));
    setLocal(KEYS.SANTRI, data);
    triggerSync('santri', data);
    deleted.forEach(x => triggerDelete('santri', 'id=eq.' + x.id));
  },
  addSantri: (item: Omit<Santri, 'id'>): Santri => {
    const list = db.getSantri();
    const newItem = { ...item, id: 's_' + Date.now() };
    list.push(newItem);
    db.saveSantri(list);
    return newItem;
  },
  updateSantri: (item: Santri) => {
    const list = db.getSantri();
    const index = list.findIndex(x => x.id === item.id);
    if (index !== -1) {
      list[index] = item;
      db.saveSantri(list);
    }
  },
  deleteSantri: (id: string) => {
    const list = db.getSantri();
    db.saveSantri(list.filter(x => x.id !== id));
  },

  // Mata Pelajaran
  getMapel: (): MataPelajaran[] => getLocal<MataPelajaran[]>(KEYS.MAPEL, []),
  saveMapel: (data: MataPelajaran[]) => {
    const oldList = db.getMapel();
    const newIds = new Set(data.map(x => x.id));
    const deleted = oldList.filter(x => !newIds.has(x.id));
    setLocal(KEYS.MAPEL, data);
    triggerSync('mata_pelajaran', data);
    deleted.forEach(x => triggerDelete('mata_pelajaran', 'id=eq.' + x.id));
  },
  addMapel: (item: Omit<MataPelajaran, 'id'>): MataPelajaran => {
    const list = db.getMapel();
    const newItem = { ...item, id: 'm_' + Date.now() };
    list.push(newItem);
    db.saveMapel(list);
    return newItem;
  },
  updateMapel: (item: MataPelajaran) => {
    const list = db.getMapel();
    const index = list.findIndex(x => x.id === item.id);
    if (index !== -1) {
      list[index] = item;
      db.saveMapel(list);
    }
  },
  deleteMapel: (id: string) => {
    const list = db.getMapel();
    db.saveMapel(list.filter(x => x.id !== id));
  },

  // Hissoh
  getHissoh: (): Hissoh[] => getLocal<Hissoh[]>(KEYS.HISSOH, []),
  saveHissoh: (data: Hissoh[]) => {
    const oldList = db.getHissoh();
    const newIds = new Set(data.map(x => x.id));
    const deleted = oldList.filter(x => !newIds.has(x.id));
    setLocal(KEYS.HISSOH, data);
    triggerSync('hissoh', data);
    deleted.forEach(x => triggerDelete('hissoh', 'id=eq.' + x.id));
  },
  addHissoh: (item: Omit<Hissoh, 'id'>): Hissoh => {
    const list = db.getHissoh();
    const newItem = { ...item, id: 'h_' + Date.now() };
    list.push(newItem);
    db.saveHissoh(list);
    return newItem;
  },
  updateHissoh: (item: Hissoh) => {
    const list = db.getHissoh();
    const index = list.findIndex(x => x.id === item.id);
    if (index !== -1) {
      list[index] = item;
      db.saveHissoh(list);
    }
  },
  deleteHissoh: (id: string) => {
    const list = db.getHissoh();
    db.saveHissoh(list.filter(x => x.id !== id));
  },

  // Jadwal
  getJadwal: (): Jadwal[] => getLocal<Jadwal[]>(KEYS.JADWAL, []),
  saveJadwal: (data: Jadwal[]) => {
    const oldList = db.getJadwal();
    const newIds = new Set(data.map(x => x.id));
    const deleted = oldList.filter(x => !newIds.has(x.id));
    setLocal(KEYS.JADWAL, data);
    triggerSync('jadwal', data);
    deleted.forEach(x => triggerDelete('jadwal', 'id=eq.' + x.id));
  },
  addJadwal: (item: Omit<Jadwal, 'id'>): Jadwal => {
    const list = db.getJadwal();
    const newItem = { ...item, id: 'j_' + Date.now() };
    list.push(newItem);
    db.saveJadwal(list);
    return newItem;
  },
  updateJadwal: (item: Jadwal) => {
    const list = db.getJadwal();
    const index = list.findIndex(x => x.id === item.id);
    if (index !== -1) {
      list[index] = item;
      db.saveJadwal(list);
    }
  },
  deleteJadwal: (id: string) => {
    const list = db.getJadwal();
    db.saveJadwal(list.filter(x => x.id !== id));
  },

  // Absensi
  getAbsensi: (): Absensi[] => getLocal<Absensi[]>(KEYS.ABSENSI, []),
  saveAbsensi: (data: Absensi[]) => {
    const oldList = db.getAbsensi();
    const newIds = new Set(data.map(x => x.id));
    const deleted = oldList.filter(x => !newIds.has(x.id));
    setLocal(KEYS.ABSENSI, data);
    triggerSync('absensi', data);
    deleted.forEach(x => triggerDelete('absensi', 'id=eq.' + x.id));
  },
  saveBatchAbsensi: (batch: Absensi[]) => {
    const list = db.getAbsensi();
    // Overwrite existing absensi with same (tanggal, kelas_id, mapel_id, hissoh_id, santri_id)
    batch.forEach(newItem => {
      const idx = list.findIndex(
        x =>
          x.tanggal === newItem.tanggal &&
          x.kelas_id === newItem.kelas_id &&
          x.mapel_id === newItem.mapel_id &&
          x.hissoh_id === newItem.hissoh_id &&
          x.santri_id === newItem.santri_id
      );
      if (idx !== -1) {
        list[idx] = newItem;
      } else {
        list.push(newItem);
      }
    });
    db.saveAbsensi(list);
  },
  deleteAbsensiForSession: (tanggal: string, kelas_id: string, mapel_id: string, hissoh_id: string) => {
    const list = db.getAbsensi();
    const filtered = list.filter(
      x => !(x.tanggal === tanggal && x.kelas_id === kelas_id && x.mapel_id === mapel_id && x.hissoh_id === hissoh_id)
    );
    db.saveAbsensi(filtered);
    // Keep direct session delete for batch deletion efficiency
    triggerDelete('absensi', `tanggal=eq.${tanggal}&kelas_id=eq.${kelas_id}&mapel_id=eq.${mapel_id}&hissoh_id=eq.${hissoh_id}`);
  },

  // Semester
  getSemester: (): Semester[] => getLocal<Semester[]>(KEYS.SEMESTER, []),
  saveSemester: (data: Semester[]) => {
    const oldList = db.getSemester();
    const newIds = new Set(data.map(x => x.id));
    const deleted = oldList.filter(x => !newIds.has(x.id));
    setLocal(KEYS.SEMESTER, data);
    triggerSync('semester', data);
    deleted.forEach(x => triggerDelete('semester', 'id=eq.' + x.id));
  },
  setSemesterAktif: (id: string) => {
    const list = db.getSemester();
    const updated = list.map(x => ({ ...x, aktif: x.id === id }));
    db.saveSemester(updated);
  },

  // Tahun Ajaran
  getTahunAjaran: (): TahunAjaran[] => getLocal<TahunAjaran[]>(KEYS.TAHUN_AJARAN, []),
  saveTahunAjaran: (data: TahunAjaran[]) => {
    const oldList = db.getTahunAjaran();
    const newIds = new Set(data.map(x => x.id));
    const deleted = oldList.filter(x => !newIds.has(x.id));
    setLocal(KEYS.TAHUN_AJARAN, data);
    triggerSync('tahun_ajaran', data);
    deleted.forEach(x => triggerDelete('tahun_ajaran', 'id=eq.' + x.id));
  },
  setTahunAjaranAktif: (id: string) => {
    const list = db.getTahunAjaran();
    const updated = list.map(x => ({ ...x, aktif: x.id === id }));
    db.saveTahunAjaran(updated);
  },

  // Supabase Config
  getSupabaseConfig: (): SupabaseConfig => {
    const localConfig = getLocal<SupabaseConfig>(KEYS.SUPABASE_CONFIG, seedSupabase);
    // Prioritize values from Environment Variables (Vite client-side prefix with VITE_)
    const envUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim().replace(/^"|"$/g, '').trim();
    const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim().replace(/^"|"$/g, '').trim();
    
    return {
      ...localConfig,
      url: envUrl || localConfig.url,
      anonKey: envKey || localConfig.anonKey,
    };
  },
  saveSupabaseConfig: (config: SupabaseConfig) => {
    const envUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim().replace(/^"|"$/g, '').trim();
    const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim().replace(/^"|"$/g, '').trim();
    
    const configToSave = {
      ...config,
      url: envUrl ? '' : config.url,
      anonKey: envKey ? '' : config.anonKey,
    };
    setLocal(KEYS.SUPABASE_CONFIG, configToSave);
  },
  updateSupabaseSyncTime: () => {
    const config = db.getSupabaseConfig();
    config.lastSync = new Date().toLocaleString('id-ID', { hour12: false });
    db.saveSupabaseConfig(config);
  },

  // Last Saved Page State
  getLastSavedPage: (): string => localStorage.getItem(KEYS.ACTIVE_PAGE_SAVE) || 'dashboard',
  saveLastPage: (page: string) => localStorage.setItem(KEYS.ACTIVE_PAGE_SAVE, page),

  // REST endpoints for Supabase Integration
  // This simulates and integrates with a real Supabase DB using fetch
  testSupabase: async (url: string, anonKey: string): Promise<{ success: boolean; latency: number; error?: string }> => {
    try {
      const response = await fetch('/api/supabase-test', {
        headers: {
          'x-supabase-url': url,
          'x-supabase-key': anonKey,
        },
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return { 
          success: false, 
          latency: 0, 
          error: errorData.error || `Server HTTP Error ${response.status}` 
        };
      }
      const result = await response.json();
      return result;
    } catch (e: any) {
      return { 
        success: false, 
        latency: 0, 
        error: e.message || 'Gagal terhubung ke proxy server internal' 
      };
    }
  },

  syncTableToSupabase: async (tableName: string, localData: any[]): Promise<boolean> => {
    if (!localData || localData.length === 0) {
      return true;
    }
    
    try {
      const config = db.getSupabaseConfig();
      const response = await fetch(`/api/supabase/sync-to/${tableName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-supabase-url': config.url || '',
          'x-supabase-key': config.anonKey || '',
        },
        body: JSON.stringify(localData),
      });

      if (response.status >= 200 && response.status < 300) {
        const resJson = await response.json();
        return resJson.success;
      }
      console.warn(`Supabase Sync warning for ${tableName}:`, response.status, response.statusText);
      return false;
    } catch (e) {
      console.error(`Supabase sync failed for ${tableName}:`, e);
      return false;
    }
  },

  deleteFromSupabase: async (tableName: string, queryString: string): Promise<boolean> => {
    try {
      const config = db.getSupabaseConfig();
      const response = await fetch(`/api/supabase/delete-from/${tableName}?${queryString}`, {
        method: 'DELETE',
        headers: {
          'x-supabase-url': config.url || '',
          'x-supabase-key': config.anonKey || '',
        },
      });
      if (response.status >= 200 && response.status < 300) {
        const resJson = await response.json();
        return resJson.success;
      }
      return false;
    } catch (e) {
      console.error(`Supabase delete failed for ${tableName}:`, e);
      return false;
    }
  },

  syncTableFromSupabase: async (tableName: string): Promise<any[] | null> => {
    try {
      const config = db.getSupabaseConfig();
      const response = await fetch(`/api/supabase/sync-from/${tableName}`, {
        headers: {
          'x-supabase-url': config.url || '',
          'x-supabase-key': config.anonKey || '',
        },
      });
      if (response.status >= 200 && response.status < 300) {
        const result = await response.json();
        if (result.success) {
          return result.data;
        }
      }
      return null;
    } catch (e) {
      console.error(`Fetch from Supabase failed for ${tableName}:`, e);
      return null;
    }
  },

  // Perform a full database pull from Supabase
  syncAllFromSupabase: async (): Promise<{ success: boolean; message: string }> => {
    const config = db.getSupabaseConfig();
    if (!config.url || !config.anonKey) return { success: false, message: 'Supabase URL atau Anon Key kosong' };

    try {
      const tables = ['kelas', 'santri', 'mata_pelajaran', 'hissoh', 'jadwal', 'absensi', 'semester', 'tahun_ajaran'];
      const results: { [key: string]: any[] | null } = {};

      for (const table of tables) {
        // Map local table name to remote if necessary (Remote can be direct equivalents)
        const remoteTable = table === 'mata_pelajaran' ? 'mata_pelajaran' : table;
        const data = await db.syncTableFromSupabase(remoteTable);
        if (data !== null) {
          results[table] = data;
        }
      }

      // If we got at least one table back, consider it partially successful, but we prefer all
      if (Object.keys(results).length === 0) {
        return { success: false, message: 'Gagal mengambil data dari tabel Supabase. Pastikan tabel sudah dibuat.' };
      }

      // Save retrieved tables to local storage
      if (results['kelas']) db.saveKelas(results['kelas']);
      if (results['santri']) db.saveSantri(results['santri']);
      if (results['mata_pelajaran']) db.saveMapel(results['mata_pelajaran']);
      if (results['hissoh']) db.saveHissoh(results['hissoh']);
      if (results['jadwal']) db.saveJadwal(results['jadwal']);
      if (results['absensi']) db.saveAbsensi(results['absensi']);
      if (results['semester']) db.saveSemester(results['semester']);
      if (results['tahun_ajaran']) db.saveTahunAjaran(results['tahun_ajaran']);

      db.updateSupabaseSyncTime();
      return { success: true, message: `Sukses sinkronisasi ${Object.keys(results).length} tabel.` };
    } catch (e: any) {
      return { success: false, message: e.message || 'Terjadi kesalahan sinkronisasi' };
    }
  },

  // Push all local data to Supabase
  syncAllToSupabase: async (): Promise<{ success: boolean; message: string }> => {
    const config = db.getSupabaseConfig();
    if (!config.url || !config.anonKey) return { success: false, message: 'Supabase URL atau Anon Key kosong' };

    try {
      const syncList = [
        { name: 'kelas', data: db.getKelas() },
        { name: 'santri', data: db.getSantri() },
        { name: 'mata_pelajaran', data: db.getMapel() },
        { name: 'hissoh', data: db.getHissoh() },
        { name: 'jadwal', data: db.getJadwal() },
        { name: 'absensi', data: db.getAbsensi() },
        { name: 'semester', data: db.getSemester() },
        { name: 'tahun_ajaran', data: db.getTahunAjaran() },
      ];

      let successCount = 0;
      for (const item of syncList) {
        const success = await db.syncTableToSupabase(item.name, item.data);
        if (success) {
          successCount++;
        }
      }

      if (successCount > 0) {
        db.updateSupabaseSyncTime();
        return { 
          success: true, 
          message: `Sukses mengunggah ${successCount} dari ${syncList.length} tabel ke Supabase.` 
        };
      }
      return { success: false, message: 'Gagal mengunggah data. Pastikan RLS / skema tabel di Supabase sudah sesuai.' };
    } catch (e: any) {
      return { success: false, message: e.message || 'Terjadi kesalahan sinkronisasi' };
    }
  }
};
