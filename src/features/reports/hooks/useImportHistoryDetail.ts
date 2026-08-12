import { useState, useCallback, useRef } from 'react';
import { importHistoryService } from '../services/importHistoryService';
import type { ImportHistoryApiItem, ImportEntryApiItem, ImportEntryStatus } from '../types';

/**
 * Data source for the Import History detail page - one import_history row (header/stats)
 * plus its lead_entries, paginated per active tab (imported/failed).
 */
export function useImportHistoryDetail() {
  const [importHistory, setImportHistory] = useState<ImportHistoryApiItem | null>(null);
  const [entries, setEntries] = useState<ImportEntryApiItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const requestSeqRef = useRef(0);

  const fetchDetail = useCallback(async (importId: string) => {
    try {
      const response = await importHistoryService.getImportHistoryDetail(importId);
      if (response.status && response.data) {
        setImportHistory(response.data);
      }
    } catch {
      setImportHistory(null);
    }
  }, []);

  const fetchEntries = useCallback(async (
    importId: string,
    status: ImportEntryStatus | undefined,
    page: number,
    limit: number,
  ) => {
    const requestSeq = ++requestSeqRef.current;
    setIsLoading(true);
    try {
      const response = await importHistoryService.getImportEntries(importId, {
        pageNumber: page,
        limit,
        status,
      });
      if (requestSeq !== requestSeqRef.current) return;
      if (response.status && response.data) {
        setEntries(response.data.items);
        setTotal(response.data.pagination?.total ?? 0);
        setTotalPages(response.data.pagination?.total_pages ?? 1);
      } else {
        setEntries([]);
        setTotal(0);
        setTotalPages(1);
      }
    } catch {
      if (requestSeq !== requestSeqRef.current) return;
      setEntries([]);
      setTotal(0);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    importHistory,
    entries,
    total,
    totalPages,
    isLoading,
    fetchDetail,
    fetchEntries,
  };
}
