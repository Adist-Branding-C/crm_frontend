import { useState, useCallback, useEffect, useRef } from 'react';
import { leadExportService } from '../services/leadExportService';
import type { LeadExportHistoryItem } from '../types';

const POLL_INTERVAL_MS = 5000;

export function useLeadExportHistory() {
  const [items, setItems] = useState<LeadExportHistoryItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsRef = useRef<LeadExportHistoryItem[]>(items);
  itemsRef.current = items;

  const fetchHistory = useCallback(async (pageNumber = 1, limit = 10, search = '') => {
    try {
      setError(null);
      const response = await leadExportService.getHistory({ pageNumber, limit, ...(search ? { search } : {}) });
      setItems(response.data?.items ?? []);
      setTotal(response.data?.pagination?.total ?? 0);
    } catch {
      setError('Failed to load export history');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // One interval for the hook's lifetime — each tick checks the latest items
  // (via ref, so this doesn't need to restart when items changes) and only
  // actually refetches while something is still pending/processing.
  useEffect(() => {
    const interval = setInterval(() => {
      const hasActiveExport = itemsRef.current.some((item) => item.status === 'pending' || item.status === 'processing');
      if (hasActiveExport) fetchHistory();
    }, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchHistory]);

  return { items, total, isLoading, error, fetchHistory };
}
