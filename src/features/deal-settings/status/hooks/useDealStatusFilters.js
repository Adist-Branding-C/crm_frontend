import { useState, useMemo, useEffect, useCallback } from 'react';
export function useDealStatusFilters(dealStatusList, fetchDealStatuses) {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [meta, setMeta] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
    useEffect(() => {
        fetchDealStatuses(page, limit, searchQuery || undefined);
    }, [page, limit, searchQuery, fetchDealStatuses]);
    const filteredData = useMemo(() => {
        if (!searchQuery)
            return dealStatusList;
        const q = searchQuery.toLowerCase();
        return dealStatusList.filter(item => (item.name || '').toLowerCase().includes(q) ||
            (item.status || '').toLowerCase().includes(q));
    }, [dealStatusList, searchQuery]);
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
        fetchDealStatuses(page, limit, searchQuery || undefined);
    }, [page, limit, searchQuery, fetchDealStatuses]);
    return { searchQuery, page, limit, meta, filteredData, handleSearchChange, handlePageChange, handleLimitChange, startIndex, refetch };
}
//# sourceMappingURL=useDealStatusFilters.js.map