import { useState, useMemo, useEffect, useCallback } from 'react';
export function useDealAdditionalFieldFilters(dealAdditionalFieldList, fetchDealAdditionalFields) {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [meta, setMeta] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
    useEffect(() => {
        fetchDealAdditionalFields(page, limit, searchQuery || undefined);
    }, [page, limit, searchQuery, fetchDealAdditionalFields]);
    const filteredData = useMemo(() => {
        if (!searchQuery)
            return dealAdditionalFieldList;
        return dealAdditionalFieldList.filter(item => item.field?.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [dealAdditionalFieldList, searchQuery]);
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
        fetchDealAdditionalFields(page, limit, searchQuery || undefined);
    }, [page, limit, searchQuery, fetchDealAdditionalFields]);
    return { searchQuery, page, limit, meta, filteredData, handleSearchChange, handlePageChange, handleLimitChange, startIndex, refetch };
}
//# sourceMappingURL=useDealAdditionalFieldFilters.js.map