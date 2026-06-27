import { useState, useCallback, useEffect, useRef } from 'react';
import { DEFAULT_ROWS_PER_PAGE } from '../constants/pagination';

interface FetchParams {
  pageNumber: number;
  limit: number;
  search?: string;
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
}

export function useTableData<T>({ fetchFn, initialPage = 1, initialLimit = DEFAULT_ROWS_PER_PAGE, initialSearch = '' }: UseTableDataOptions<T>) {
  const [list, setList] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [pageNumber, setPageNumber] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [totalCount, setTotalCount] = useState(0);
  const fetchRef = useRef(0);
  const fetchFnRef = useRef(fetchFn);
  fetchFnRef.current = fetchFn;
  const lastFetchedKey = useRef('');

  const fetchData = useCallback(async (page: number, limitVal: number, search: string) => {
    const fetchId = ++fetchRef.current;
    setIsLoading(true);
    setError('');

    try {
      const params: FetchParams = { pageNumber: page, limit: limitVal };
      if (search) params.search = search;
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
    const key = JSON.stringify([pageNumber, limit, searchQuery]);
    if (lastFetchedKey.current === key) return;
    lastFetchedKey.current = key;
    fetchData(pageNumber, limit, searchQuery);
  }, [pageNumber, limit, searchQuery]);

  const refresh = useCallback(() => {
    fetchData(pageNumber, limit, searchQuery);
  }, [fetchData, pageNumber, limit, searchQuery]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setPageNumber(1);
  }, []);

  const handleRowsPerPageChange = useCallback((value: number) => {
    setLimit(value);
    setPageNumber(1);
  }, []);

  return {
    list, isLoading, error,
    pageNumber, setPageNumber,
    limit,
    totalCount,
    searchQuery, setSearchQuery, handleSearchChange,
    handleRowsPerPageChange,
    refresh,
    setIsLoading, setError,
  };
}
