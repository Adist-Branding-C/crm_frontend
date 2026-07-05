import { useTableData } from '../../../../shared/hooks/useTableData';
import { checkoutNoteApiService } from '../services';
import type { CheckoutNoteItem } from '../types';

export function useFetchCheckoutNotes() {
  const pagination = useTableData<CheckoutNoteItem>({
    fetchFn: async (params) => {
      const response = await checkoutNoteApiService.fetchAll(params as unknown as Record<string, string | number | undefined>);
      if (response.status) {
        const data = response.data as { items: CheckoutNoteItem[]; total?: number } | undefined;
        const items = data?.items ?? (Array.isArray(response.data) ? response.data : []);
        return { items: Array.isArray(items) ? items : [], total: data?.total ?? (Array.isArray(items) ? items.length : 0) };
      }
      throw new Error(response.message || 'Failed to fetch checkout notes');
    },
  });

  return {
    checkoutNoteList: pagination.list,
    isLoading: pagination.isLoading,
    error: pagination.error,
    pageNumber: pagination.pageNumber,
    setPageNumber: pagination.setPageNumber,
    limit: pagination.limit,
    totalCount: pagination.totalCount,
    searchQuery: pagination.searchQuery,
    handleSearchChange: pagination.handleSearchChange,
    handleRowsPerPageChange: pagination.handleRowsPerPageChange,
    refresh: pagination.refresh,
    setError: pagination.setError,
    setIsLoading: pagination.setIsLoading,
    setSearchQuery: pagination.setSearchQuery,
  };
}
