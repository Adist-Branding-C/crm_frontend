import { useState, useMemo, useCallback } from 'react';
import { SortDirection } from '../constants/enums/sortDirection';
export function useTableSorting(data) {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: SortDirection.ASC });
    const sortedData = useMemo(() => {
        if (!sortConfig.key)
            return data;
        return [...data].sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];
            if (aVal < bVal)
                return sortConfig.direction === SortDirection.ASC ? -1 : 1;
            if (aVal > bVal)
                return sortConfig.direction === SortDirection.ASC ? 1 : -1;
            return 0;
        });
    }, [data, sortConfig]);
    const handleSort = useCallback((key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC
        }));
    }, []);
    const handleSortDirection = useCallback((key, direction) => {
        setSortConfig({ key, direction });
    }, []);
    return { sortedData, sortConfig, handleSort, handleSortDirection, setSortConfig };
}
//# sourceMappingURL=useTableSorting.js.map