export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const STAGES = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
};

export const STAGE_LABELS = {
  TODO: 'Todo',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
};

export const STAGE_ORDER = ['TODO', 'IN_PROGRESS', 'DONE'];

export const PRIORITIES = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
};

export const PRIORITY_LABELS = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  URGENT: 'Urgent',
};

export const PRIORITY_COLORS = {
  LOW: { bg: 'bg-slate-100', text: 'text-slate-600', dark_bg: 'dark:bg-slate-700', dark_text: 'dark:text-slate-300' },
  MEDIUM: { bg: 'bg-blue-50', text: 'text-blue-700', dark_bg: 'dark:bg-blue-900/30', dark_text: 'dark:text-blue-300' },
  HIGH: { bg: 'bg-amber-50', text: 'text-amber-700', dark_bg: 'dark:bg-amber-900/30', dark_text: 'dark:text-amber-300' },
  URGENT: { bg: 'bg-red-50', text: 'text-red-700', dark_bg: 'dark:bg-red-900/30', dark_text: 'dark:text-red-300' },
};
