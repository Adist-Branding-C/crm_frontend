import { useState, useCallback, useEffect, useRef } from 'react';
import { DEFAULT_ROWS_PER_PAGE } from '../../../../shared/constants/pagination';
export function useLeadSourcePagination(onFetch) {
    const [searchQuery, setSearchQuery] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPageRef = useRef(rowsPerPage);
    const onFetchRef = useRef(onFetch);
    useEffect(() => { rowsPerPageRef.current = rowsPerPage; }, [rowsPerPage]);
    useEffect(() => { onFetchRef.current = onFetch; }, [onFetch]);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const prevSearchQuery = useRef(searchQuery);
    useEffect(() => {
        if (searchQuery === prevSearchQuery.current)
            return;
        prevSearchQuery.current = searchQuery;
        const timer = setTimeout(() => {
            setCurrentPage(1);
            onFetchRef.current(1, rowsPerPageRef.current, searchQuery);
        }, 400);
        return () => clearTimeout(timer);
    }, [searchQuery]);
    const handleSetCurrentPage = useCallback((page) => {
        setCurrentPage(page);
        onFetch(page, rowsPerPage, searchQuery);
    }, [rowsPerPage, searchQuery, onFetch]);
    const handleRowsPerPageChange = useCallback((e) => {
        const val = Number(e.target.value);
        setRowsPerPage(val);
        setCurrentPage(1);
        onFetch(1, val, searchQuery);
    }, [searchQuery, onFetch]);
    const resetPage = useCallback(() => setCurrentPage(1), []);
    return {
        searchQuery,
        setSearchQuery,
        rowsPerPage,
        currentPage,
        startIndex,
        handleSetCurrentPage,
        handleRowsPerPageChange,
        resetPage,
    };
}
//# sourceMappingURL=useLeadSourcePagination.js.map