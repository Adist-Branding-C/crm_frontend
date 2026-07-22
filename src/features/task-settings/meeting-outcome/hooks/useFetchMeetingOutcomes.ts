import { useTableData } from '../../../../shared/hooks/useTableData';
import { ResponseMapper } from '../../../../shared/mappers/response.mapper';
import { meetingOutcomeApiService } from '../services';
import type { MeetingOutcomeItem } from '../types/index';

/**
 * Fetches the meeting-outcome list with pagination/search state via the shared useTableData
 * hook, mapping the raw response through the shared ResponseMapper. All of the page's list
 * state (page number, search, row count) lives here rather than in the page component.
 */
export function useFetchMeetingOutcomes() {
  const pagination = useTableData<MeetingOutcomeItem>({
    fetchFn: async (params) => {
      const response = await meetingOutcomeApiService.fetchAll(params);
      if (response.status) {
        return ResponseMapper.toPagedList<MeetingOutcomeItem>(response.data);
      }
      throw new Error(response.message || 'Failed to fetch meeting outcomes');
    },
  });

  return {
    meetingOutcomeList: pagination.list,
    isLoading: pagination.isLoading,
    error: pagination.error,
    pageNumber: pagination.pageNumber,
    setPageNumber: pagination.setPageNumber,
    limit: pagination.limit,
    totalCount: pagination.totalCount,
    startIndex: pagination.startIndex,
    totalPages: pagination.totalPages,
    searchQuery: pagination.searchQuery,
    handleSearchChange: pagination.handleSearchChange,
    handleRowsPerPageChange: pagination.handleRowsPerPageChange,
    refresh: pagination.refresh,
    setError: pagination.setError,
    setIsLoading: pagination.setIsLoading,
    setSearchQuery: pagination.setSearchQuery,
  };
}
