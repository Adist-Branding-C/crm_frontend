import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { DEFAULT_ROWS_PER_PAGE } from '../constants/pagination';

export type SortOrder = 'ASC' | 'DESC';

interface FetchParams {
  pageNumber: number;
  limit: number;
  search?: string;
  sortOrder?: SortOrder;
  [key: string]: unknown;
}

interface FetchResult<T> {
  items: T[];
  total: number;
}

interface UseTableDataOptions<T> {
  fetchFn: (params: FetchParams) => Promise<FetchResult<T>>;
  initialPage?: number;
  initialLimit?: number;
  initialSearch?: string;
  /** Opt-in: omit to leave sorting untouched (no sortOrder param is ever sent). */
  initialSortOrder?: SortOrder;
}

export function useTableData<T>({
  fetchFn,
  initialPage = 1,
  initialLimit = DEFAULT_ROWS_PER_PAGE,
  initialSearch = '',
  initialSortOrder,
}: UseTableDataOptions<T>) {
  const [list, setList] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [pageNumber, setPageNumber] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortOrder, setSortOrder] = useState<SortOrder | undefined>(initialSortOrder);
  const [totalCount, setTotalCount] = useState(0);
  const fetchRef = useRef(0);
  const fetchFnRef = useRef(fetchFn);
  fetchFnRef.current = fetchFn;
  const lastFetchedKey = useRef('');

  const fetchData = useCallback(async (page: number, limitVal: number, search: string, sort: SortOrder | undefined) => {
    const fetchId = ++fetchRef.current;
    setIsLoading(true);
    setError('');

    try {
      const params: FetchParams = { pageNumber: page, limit: limitVal };
      if (search) params.search = search;
      if (sort) params.sortOrder = sort;
      const result = await fetchFnRef.current(params);
      if (fetchId === fetchRef.current) {
        setList(result.items);
        setTotalCount(result.total);
      }
    } catch (err: unknown) {
      if (fetchId === fetchRef.current) {
        const msg = err && typeof err === 'object' && 'message' in err
          ? (err as { message: string }).message
          : 'Failed to fetch data';
        setError(msg);
      }
    } finally {
      if (fetchId === fetchRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const key = JSON.stringify([pageNumber, limit, searchQuery, sortOrder]);
    if (lastFetchedKey.current === key) return;
    lastFetchedKey.current = key;
    fetchData(pageNumber, limit, searchQuery, sortOrder);
  }, [pageNumber, limit, searchQuery, sortOrder]);

  const refresh = useCallback(() => {
    fetchData(pageNumber, limit, searchQuery, sortOrder);
  }, [fetchData, pageNumber, limit, searchQuery, sortOrder]);

  /**
   * For consumers with extra filters this hook doesn't know about (closed over inside their
   * own fetchFn): reset to page 1 and guarantee a refetch. setPageNumber(1) alone is a no-op,
   * and thus fetches nothing, when already on page 1 - refresh() covers that case explicitly
   * instead of leaving the caller to work out the same page===1 branch itself.
   */
  const resetToFirstPage = useCallback(() => {
    if (pageNumber === 1) {
      refresh();
    } else {
      setPageNumber(1);
    }
  }, [pageNumber, refresh]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setPageNumber(1);
  }, []);

  const handleRowsPerPageChange = useCallback((value: number) => {
    setLimit(value);
    setPageNumber(1);
  }, []);

  const toggleSortOrder = useCallback(() => {
    setSortOrder((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'));
    setPageNumber(1);
  }, []);

  const startIndex = (pageNumber - 1) * limit;
  const totalPages = useMemo(() => Math.ceil(totalCount / limit) || 1, [totalCount, limit]);

  return {
    list, isLoading, error,
    pageNumber, setPageNumber,
    limit,
    totalCount,
    startIndex, totalPages,
    searchQuery, setSearchQuery, handleSearchChange,
    handleRowsPerPageChange,
    sortOrder, toggleSortOrder,
    refresh, resetToFirstPage,
    setIsLoading, setError,
  };
}
