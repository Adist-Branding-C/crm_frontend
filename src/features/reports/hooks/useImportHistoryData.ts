import { useState, useCallback, useRef } from 'react';
import { importHistoryService } from '../services/importHistoryService';
import type { ImportHistoryApiItem } from '../types';

function extractErrorMessage(err: unknown, fallback: string): string {
  if (err && typeof err === 'object' && 'response' in err) {
    const axiosErr = err as { response?: { data?: { message?: string } } };
    return axiosErr.response?.data?.message || fallback;
  }
  return fallback;
}

/**
 * Data source for the Lead Import History report - mirrors useDeletedLeadListData but
 * reads from /leads/import-history and also owns the upload + sample-download actions
 * the ImportModal triggers.
 */
export function useImportHistoryData(onShowToast: (message: string, type: 'success' | 'error') => void) {
  const [imports, setImports] = useState<ImportHistoryApiItem[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const requestSeqRef = useRef(0);
  const currentFetchParams = useRef({ page: 1, limit: 10, search: '' });

  const fetchImports = useCallback(async (page: number, limit: number, search: string) => {
    const requestSeq = ++requestSeqRef.current;
    currentFetchParams.current = { page, limit, search };
    setIsLoading(true);
    try {
      const response = await importHistoryService.getImportHistory({
        pageNumber: page,
        limit,
        search: search || undefined,
      });
      if (requestSeq !== requestSeqRef.current) return;
      if (response.status && response.data) {
        setImports(response.data.items);
        setTotal(response.data.pagination?.total ?? 0);
        setTotalPages(response.data.pagination?.total_pages ?? 1);
      } else {
        setImports([]);
        setTotal(0);
        setTotalPages(1);
      }
    } catch {
      if (requestSeq !== requestSeqRef.current) return;
      setImports([]);
      setTotal(0);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshCurrentPage = useCallback(() => {
    const { page, limit, search } = currentFetchParams.current;
    fetchImports(page, limit, search);
  }, [fetchImports]);

  const uploadFile = useCallback(async (file: File): Promise<{ success: boolean; error?: string }> => {
    try {
      await importHistoryService.uploadFile(file);
      onShowToast('File uploaded — import started', 'success');
      refreshCurrentPage();
      return { success: true };
    } catch (error) {
      const message = extractErrorMessage(error, 'Failed to upload file');
      onShowToast(message, 'error');
      return { success: false, error: message };
    }
  }, [onShowToast, refreshCurrentPage]);

  const downloadSample = useCallback(async () => {
    try {
      await importHistoryService.downloadSampleFile();
    } catch {
      onShowToast('Failed to download sample file', 'error');
    }
  }, [onShowToast]);

  return {
    imports,
    total,
    totalPages,
    isLoading,
    fetchImports,
    refreshCurrentPage,
    uploadFile,
    downloadSample,
  };
}
