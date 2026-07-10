import { useTableData } from '../../../../shared/hooks/useTableData';
import { ResponseMapper } from '../../../../shared/mappers/response.mapper';
import { TaskCategoryMapper } from '../mappers/taskCategory.mapper';
import { taskCategoryApiService } from '../services';
import type { TaskCategoryItem } from '../types/index';
import type { TaskCategoryRawItem } from '../types/response';

export function useFetchTaskCategories() {
  const pagination = useTableData<TaskCategoryItem>({
    fetchFn: async (params) => {
      const response = await taskCategoryApiService.fetchAll(params);
      if (response.status) {
        const { items, total } = ResponseMapper.toPagedList<TaskCategoryRawItem>(response.data);
        return { items: items.map(TaskCategoryMapper.toEntity), total };
      }
      throw new Error(response.message || 'Failed to fetch task categories');
    },
  });

  return {
    taskCategoryList: pagination.list,
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
