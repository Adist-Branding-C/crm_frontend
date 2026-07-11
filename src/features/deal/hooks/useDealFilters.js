import { useState, useMemo } from 'react';
export function useDealFilters(dealList) {
    const [searchQuery, setSearchQuery] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const filteredData = useMemo(() => dealList.filter(item => (item.dealName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.lead || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.mobile || '').includes(searchQuery) ||
        (item.status || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.type || '').toLowerCase().includes(searchQuery.toLowerCase())), [dealList, searchQuery]);
    return {
        searchQuery,
        setSearchQuery,
        rowsPerPage,
        setRowsPerPage,
        filteredData,
        totalRecords: filteredData.length,
    };
}
//# sourceMappingURL=useDealFilters.js.map