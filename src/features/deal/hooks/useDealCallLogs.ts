import { useState, useEffect, useCallback, useRef } from 'react';
import { dealCallLogService } from '../services/dealCallLogService';
import type { DealCallLogItem } from '../types/response';

/**
 * Read-only call history for the "Call" tab in DealDetailContent. A Deal has
 * no calls of its own - calls are logged against the parent Lead - so this
 * fetches `/call-logs?leadId=<the deal's leadId>` rather than anything
 * deal-scoped.
 *
 * Used by:
 * - DealDetailContent
 */
export function useDealCallLogs(leadId: string | number | undefined, isOpen: boolean, activeTab: string) {
  const [callLogs, setCallLogs] = useState<DealCallLogItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!isOpen || !leadId || activeTab !== 'call') return;

    if (fetchedRef.current && page === 1) return;

    let cancelled = false;

    const fetch = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await dealCallLogService.getCallLogsByLead(String(leadId), page, 10);
        if (!cancelled) {
          const newItems = response?.data?.items ?? [];
          if (page === 1) {
            setCallLogs(newItems);
          } else {
            setCallLogs((prev) => {
              const existingIds = new Set(prev.map(c => c.id));
              const deduplicated = newItems.filter(c => !existingIds.has(c.id));
              return [...prev, ...deduplicated];
            });
          }
          const totalPages = response?.data?.pagination?.total_pages || response?.data?.pagination?.totalPages || 1;
          setHasMore(page < totalPages);
          fetchedRef.current = true;
        }
      } catch {
        if (!cancelled) setError('Failed to fetch call history');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetch();

    return () => {
      cancelled = true;
    };
  }, [leadId, isOpen, activeTab, page]);

  useEffect(() => {
    fetchedRef.current = false;
    setPage(1);
  }, [leadId]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage((p) => p + 1);
    }
  }, [isLoading, hasMore]);

  return { callLogs, isLoading, error, hasMore, loadMore };
}
