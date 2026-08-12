import { useState, useEffect, useCallback, useRef } from 'react';
import { remarkService } from '../services/remarkService';
import type { Remark } from '../types';
import { ERROR_MESSAGES } from '../constants/messages';

export function useLeadRemarks(leadId: number | undefined, isOpen: boolean, activeTab: string) {
  const [remarks, setRemarks] = useState<Remark[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!isOpen || !leadId || activeTab !== 'note') return;

    if (fetchedRef.current && page === 1) return;

    let cancelled = false;

    const fetch = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await remarkService.getRemarks({
          referenceId: String(leadId),
          entityType: 'LEAD',
          page,
          limit: 10,
        });
        if (!cancelled) {
          const newItems = response?.data?.items ?? [];
          if (page === 1) {
            setRemarks(newItems);
          } else {
            setRemarks((prev) => {
              const existingIds = new Set(prev.map(r => r.id));
              const deduplicated = newItems.filter(r => !existingIds.has(r.id));
              return [...prev, ...deduplicated];
            });
          }
          const totalPages = response?.data?.pagination?.total_pages || 1;
          setHasMore(page < totalPages);
          fetchedRef.current = true;
        }
      } catch {
        if (!cancelled) setError(ERROR_MESSAGES.FETCH_REMARKS);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetch();

    return () => {
      cancelled = true;
    };
  }, [leadId, isOpen, activeTab, refreshKey, page]);

  useEffect(() => {
    fetchedRef.current = false;
    setPage(1);
  }, [leadId]);

  const refreshRemarks = useCallback(() => {
    fetchedRef.current = false;
    setPage(1);
    setRefreshKey((k) => k + 1);
  }, []);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage((p) => p + 1);
    }
  }, [isLoading, hasMore]);

  const addRemark = useCallback(
    async (remarkText: string) => {
      setIsAdding(true);
      try {
        await remarkService.createRemark({
          referenceId: String(leadId),
          entityType: 'LEAD',
          remark: remarkText,
        });
        refreshRemarks();
      } finally {
        setIsAdding(false);
      }
    },
    [leadId, refreshRemarks],
  );

  const updateRemark = useCallback(
    async (id: string, remarkText: string) => {
      setIsUpdating(true);
      try {
        await remarkService.updateRemark(id, { remark: remarkText });
        refreshRemarks();
      } finally {
        setIsUpdating(false);
      }
    },
    [refreshRemarks],
  );

  const deleteRemark = useCallback(
    async (id: string) => {
      setIsDeleting(true);
      try {
        await remarkService.deleteRemark(id);
        refreshRemarks();
      } finally {
        setIsDeleting(false);
      }
    },
    [refreshRemarks],
  );

  return {
    remarks,
    isLoading,
    error,
    isAdding,
    isUpdating,
    isDeleting,
    addRemark,
    updateRemark,
    deleteRemark,
    refreshRemarks,
    hasMore,
    loadMore,
  };
}
