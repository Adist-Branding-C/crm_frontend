import { useCallback, useState } from 'react';
import { DEFAULT_ROWS_PER_PAGE } from '../../../../shared/constants/pagination';
import { getErrorMessage } from '../../../../shared/utils/error';
import { useGetTasksQuery } from '../services/taskApi';

interface UseTaskListParams {
  taskType: string;
  /** True while the table is hidden (kanban/drafts view), so no request is made. */
  skip: boolean;
}

/**
 * Data for the Tasks table (GET /tasks), with page, rows-per-page and search.
 *
 * Used by:
 * - TaskPage (table view)
 *
 * Notes:
 * - Changing the page, rows, search or type filter fetches automatically, because
 *   they are the query's arguments.
 * - After any task is created/updated/deleted the list refetches by itself
 *   (see taskApi), so there is no refresh() to call.
 * - refetchOnMountOrArgChange: the list is reloaded every time the table opens,
 *   because the calendar and lead drawer still change tasks outside this cache.
 */
export function useTaskList({ taskType, skip }: UseTaskListParams) {
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(DEFAULT_ROWS_PER_PAGE);
  const [search, setSearch] = useState('');

  const { data, isFetching, error } = useGetTasksQuery(
    { pageNumber, limit, taskType, search },
    { skip, refetchOnMountOrArgChange: true },
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPageNumber(1);
  }, []);

  const handleRowsPerPageChange = useCallback((value: number) => {
    setLimit(value);
    setPageNumber(1);
  }, []);

  const totalCount = data?.total ?? 0;

  return {
    list: data?.items ?? [],
    isLoading: isFetching,
    error: error ? getErrorMessage(error, 'Failed to fetch data') : '',
    pageNumber,
    setPageNumber,
    limit,
    handleRowsPerPageChange,
    search,
    handleSearchChange,
    totalCount,
    startIndex: (pageNumber - 1) * limit,
    totalPages: Math.ceil(totalCount / limit) || 1,
  };
}
