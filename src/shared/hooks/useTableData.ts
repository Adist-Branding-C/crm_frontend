import { useState, useCallback, useEffect, useRef } from 'react';

interface FetchParams {
  pageNumber: number;
  limit: number;
  search?: string;
}

interface FetchResult<T> {
  items: T[];
  total: number;
}

interface UseTableDataOptions<T> {
  fetchFn: (params: FetchParams) => Promise<FetchResult<T>>;
  defaultLimit?: number;
}

interface UseTableDataResult<T> {
  list: T[];
  setList: React.Dispatch<React.SetStateAction<T[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  totalCount: number;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearchChange: (value: string) => void;
  handleRowsPerPageChange: (newLimit: number) => void;
  refresh: () => void;
}

export function useTableData<T>({ fetchFn, defaultLimit = 10 }: UseTableDataOptions<T>): UseTableDataResult<T> {
  const [list, setList] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(defaultLimit);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshCounter, setRefreshCounter] = useState(0);

  const stateRef = useRef({ pageNumber, limit, searchQuery });
  stateRef.current = { pageNumber, limit, searchQuery };

  const fetchFnRef = useRef(fetchFn);
  fetchFnRef.current = fetchFn;

  const doFetch = useCallback(async () => {
    const { pageNumber: pn, limit: l, searchQuery: sq } = stateRef.current;
    setIsLoading(true);
    setError('');
    try {
      const result = await fetchFnRef.current({ pageNumber: pn, limit: l, ...(sq ? { search: sq } : {}) });
      setList(result.items);
      setTotalCount(result.total);
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to fetch data');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    doFetch();
  }, [pageNumber, limit, searchQuery, refreshCounter]);

  const refresh = useCallback(() => {
    setRefreshCounter(c => c + 1);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setPageNumber(1);
  }, []);

  const handleRowsPerPageChange = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPageNumber(1);
  }, []);

  return {
    list,
    setList,
    isLoading,
    setIsLoading,
    error,
    setError,
    pageNumber,
    setPageNumber,
    limit,
    totalCount,
    searchQuery,
    setSearchQuery,
    handleSearchChange,
    handleRowsPerPageChange,
    refresh,
  };
}
