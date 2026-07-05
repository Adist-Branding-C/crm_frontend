import { useTableData } from '../../../../shared/hooks/useTableData';
import { emailTemplateApiService } from '../services';
import type { EmailTemplateItem } from '../types';

export function useFetchEmailTemplates() {
  const pagination = useTableData<EmailTemplateItem>({
    fetchFn: async (params) => {
      const response = await emailTemplateApiService.fetchAll(params as unknown as Record<string, string | number | undefined>);
      if (response.status) {
        const data = response.data as { items: EmailTemplateItem[]; total?: number } | undefined;
        const items = data?.items ?? (Array.isArray(response.data) ? response.data : []);
        return { items: Array.isArray(items) ? items : [], total: data?.total ?? (Array.isArray(items) ? items.length : 0) };
      }
      throw new Error(response.message || 'Failed to fetch email templates');
    },
  });

  return {
    emailTemplateList: pagination.list,
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
