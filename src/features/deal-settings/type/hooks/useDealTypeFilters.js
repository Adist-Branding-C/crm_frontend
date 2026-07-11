import { useState, useMemo, useEffect, useCallback } from 'react';
export function useDealTypeFilters(dealTypeList, fetchDealTypes) {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [meta, setMeta] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
    useEffect(() => {
        fetchDealTypes(page, limit, searchQuery || undefined);
    }, [page, limit, searchQuery, fetchDealTypes]);
    const filteredData = useMemo(() => {
        if (!searchQuery)
            return dealTypeList;
        const q = searchQuery.toLowerCase();
        return dealTypeList.filter(item => (item.name || '').toLowerCase().includes(q) ||
            (item.status || '').toLowerCase().includes(q));
    }, [dealTypeList, searchQuery]);
    const handleSearchChange = useCallback((value) => {
        setSearchQuery(value);
        setPage(1);
    }, []);
    const handlePageChange = useCallback((newPage) => {
        setPage(newPage);
    }, []);
    const handleLimitChange = useCallback((e) => {
        setLimit(Number(e.target.value));
        setPage(1);
    }, []);
    const startIndex = (meta.page - 1) * meta.limit;
    const refetch = useCallback(() => {
        fetchDealTypes(page, limit, searchQuery || undefined);
    }, [page, limit, searchQuery, fetchDealTypes]);
    return { searchQuery, page, limit, meta, filteredData, handleSearchChange, handlePageChange, handleLimitChange, startIndex, refetch };
}
//# sourceMappingURL=useDealTypeFilters.js.map