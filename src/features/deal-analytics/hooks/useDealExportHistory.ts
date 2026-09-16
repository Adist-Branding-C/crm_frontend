import { useState, useCallback, useEffect, useRef } from 'react';
import { dealAnalyticsService } from '../services/dealAnalyticsService';
import { getErrorMessage } from '../../../shared/utils/error';
import type { DealExportHistoryItem } from '../types';

const POLL_INTERVAL_MS = 5000;


export function useDealExportHistory() {
  const [items, setItems] = useState<DealExportHistoryItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsRef = useRef<DealExportHistoryItem[]>(items);
  itemsRef.current = items;

  const fetchHistory = useCallback(async (pageNumber = 1, limit = 10, search = '') => {
    try {
      setError(null);
      const response = await dealAnalyticsService.getDealExportHistory({
        pageNumber,
        limit,
        ...(search ? { search } : {}),
      });
      if (!response.status || !response.data) {
        setError(response.message?.trim() || 'Failed to load export history');
        return;
      }
      setItems(response.data.items ?? []);
      setTotal(response.data.pagination?.total ?? 0);
    } catch (err) {
      console.error('useDealExportHistory: failed to load export history', err);
      setError(getErrorMessage(err, 'Failed to load export history'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);


  useEffect(() => {
    const interval = setInterval(() => {
      const hasActiveExport = itemsRef.current.some((item) => item.status === 'pending' || item.status === 'processing');
      if (hasActiveExport) fetchHistory();
    }, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchHistory]);

  return { items, total, isLoading, error, fetchHistory };
}
