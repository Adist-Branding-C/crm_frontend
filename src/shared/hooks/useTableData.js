import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { DEFAULT_ROWS_PER_PAGE } from '../constants/pagination';
export function useTableData({ fetchFn, initialPage = 1, initialLimit = DEFAULT_ROWS_PER_PAGE, initialSearch = '', initialSortOrder, }) {
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [pageNumber, setPageNumber] = useState(initialPage);
    const [limit, setLimit] = useState(initialLimit);
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [sortOrder, setSortOrder] = useState(initialSortOrder);
    const [totalCount, setTotalCount] = useState(0);
    const fetchRef = useRef(0);
    const fetchFnRef = useRef(fetchFn);
    fetchFnRef.current = fetchFn;
    const lastFetchedKey = useRef('');
    const fetchData = useCallback(async (page, limitVal, search, sort) => {
        const fetchId = ++fetchRef.current;
        setIsLoading(true);
        setError('');
        try {
            const params = { pageNumber: page, limit: limitVal };
            if (search)
                params.search = search;
            if (sort)
                params.sortOrder = sort;
            const result = await fetchFnRef.current(params);
            if (fetchId === fetchRef.current) {
                setList(result.items);
                setTotalCount(result.total);
            }
        }
        catch (err) {
            if (fetchId === fetchRef.current) {
                const msg = err && typeof err === 'object' && 'message' in err
                    ? err.message
                    : 'Failed to fetch data';
                setError(msg);
            }
        }
        finally {
            if (fetchId === fetchRef.current) {
                setIsLoading(false);
            }
        }
    }, []);
    useEffect(() => {
        const key = JSON.stringify([pageNumber, limit, searchQuery, sortOrder]);
        if (lastFetchedKey.current === key)
            return;
        lastFetchedKey.current = key;
        fetchData(pageNumber, limit, searchQuery, sortOrder);
    }, [pageNumber, limit, searchQuery, sortOrder]);
    const refresh = useCallback(() => {
        fetchData(pageNumber, limit, searchQuery, sortOrder);
    }, [fetchData, pageNumber, limit, searchQuery, sortOrder]);
    const handleSearchChange = useCallback((value) => {
        setSearchQuery(value);
        setPageNumber(1);
    }, []);
    const handleRowsPerPageChange = useCallback((value) => {
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
        refresh,
        setIsLoading, setError,
    };
}
//# sourceMappingURL=useTableData.js.map