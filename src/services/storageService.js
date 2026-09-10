/**
 * LocalStorage Service for CareLink Healthcare Platform
 */

const STORAGE_KEYS = {
  USER_PROFILE: 'carelink_user_profile',
  PERIOD_LOGS: 'carelink_period_logs',
  LAST_SCREENING: 'carelink_last_screening',
};

// Default Asha Demo User Data
const DEFAULT_DEMO_USER = {
  fullName: "Asha Patil (आशा पाटील)",
  age: 21,
  mobile: "9876543210",
  village: "Khed, Satara (खेड, सातारा)",
  language: "mr",
  isLoggedIn: true,
};

// Default Cycles for Instant Charts & Insights Demo
const DEFAULT_DEMO_CYCLES = [
  {
    id: 'cycle-1',
    startDate: '2026-06-10',
    endDate: '2026-06-15',
    cycleLength: 29,
    bleedingLevel: 'Normal',
    painLevel: 3,
    symptoms: ['Abdominal cramps', 'Back pain'],
  },
  {
    id: 'cycle-2',
    startDate: '2026-07-12',
    endDate: '2026-07-18',
    cycleLength: 32,
    bleedingLevel: 'Heavy',
    painLevel: 5,
    symptoms: ['Abdominal cramps', 'Fatigue'],
  },
  {
    id: 'cycle-3',
    startDate: '2026-08-18',
    endDate: '2026-08-26',
    cycleLength: 38,
    bleedingLevel: 'Very Heavy',
    painLevel: 8,
    symptoms: ['Abdominal cramps', 'Back pain', 'Fatigue', 'Dizziness'],
  },
];

export const storageService = {
  getUserProfile: () => {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(DEFAULT_DEMO_USER));
      return DEFAULT_DEMO_USER;
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      return DEFAULT_DEMO_USER;
    }
  },

  setUserProfile: (profile) => {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  },

  getPeriodLogs: () => {
    const data = localStorage.getItem(STORAGE_KEYS.PERIOD_LOGS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.PERIOD_LOGS, JSON.stringify(DEFAULT_DEMO_CYCLES));
      return DEFAULT_DEMO_CYCLES;
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      return DEFAULT_DEMO_CYCLES;
    }
  },

  addPeriodLog: (log) => {
    const existing = storageService.getPeriodLogs();
    const newLog = {
      ...log,
      id: `cycle-${Date.now()}`,
    };
    const updated = [newLog, ...existing];
    localStorage.setItem(STORAGE_KEYS.PERIOD_LOGS, JSON.stringify(updated));
    return updated;
  },

  saveLastScreening: (result) => {
    localStorage.setItem(STORAGE_KEYS.LAST_SCREENING, JSON.stringify(result));
  },

  getLastScreening: () => {
    const data = localStorage.getItem(STORAGE_KEYS.LAST_SCREENING);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch (e) {
      return null;
    }
  },

  resetDemoData: () => {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(DEFAULT_DEMO_USER));
    localStorage.setItem(STORAGE_KEYS.PERIOD_LOGS, JSON.stringify(DEFAULT_DEMO_CYCLES));
    localStorage.removeItem(STORAGE_KEYS.LAST_SCREENING);
  }
};
