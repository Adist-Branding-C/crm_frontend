import { useState, useCallback, useEffect, useRef } from 'react';
import { DEFAULT_ROWS_PER_PAGE } from '../constants';
export function useLeadPagination(onFetch, activeFiltersRef, searchQueryRef, total) {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
    const rowsPerPageRef = useRef(rowsPerPage);
    const currentPageRef = useRef(currentPage);
    useEffect(() => {
        rowsPerPageRef.current = rowsPerPage;
        currentPageRef.current = currentPage;
    });
    const startIndex = (currentPage - 1) * rowsPerPage;
    const totalItems = total;
    const handleSetCurrentPage = useCallback((page) => {
        const next = typeof page === 'function' ? page(currentPageRef.current) : page;
        setCurrentPage(next);
        onFetch(next, rowsPerPageRef.current, searchQueryRef.current, activeFiltersRef.current);
    }, [onFetch, activeFiltersRef, searchQueryRef]);
    const handleRowsPerPageChange = useCallback((e) => {
        const value = Number(e.target.value);
        setRowsPerPage(value);
        setCurrentPage(1);
        onFetch(1, value, searchQueryRef.current, activeFiltersRef.current);
    }, [onFetch, activeFiltersRef, searchQueryRef]);
    const resetPage = useCallback(() => setCurrentPage(1), []);
    return {
        currentPage,
        rowsPerPage,
        startIndex,
        totalItems,
        handleSetCurrentPage,
        handleRowsPerPageChange,
        resetPage,
    };
}
//# sourceMappingURL=useLeadPagination.js.map