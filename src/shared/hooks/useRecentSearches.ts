import { useCallback, useState } from 'react';

const STORAGE_KEY = 'crm_recent_lead_searches';
const MAX_ENTRIES = 5;

export interface RecentSearchEntry {
  id: string;
  name: string;
  phone: string;
}

function loadRecent(): RecentSearchEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Client-side convenience only - a browser-local memory of recently-selected
// search results, never sent to or stored on the backend.
export function useRecentSearches() {
  const [recent, setRecent] = useState<RecentSearchEntry[]>(loadRecent);

  const addRecent = useCallback((entry: RecentSearchEntry) => {
    setRecent((prev) => {
      const next = [entry, ...prev.filter((item) => item.id !== entry.id)].slice(0, MAX_ENTRIES);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // localStorage unavailable (private mode / quota) - recent search memory is best-effort only
      }
      return next;
    });
  }, []);

  return { recent, addRecent };
}
