import { useState, useMemo } from 'react';
import { SAMPLE_LEADS, INITIAL_FILTERS } from '../constants';
import { SortDirection } from '../../../shared/constants/enums/sortDirection';
export const useFollowupData = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: SortDirection.ASC });
    const [actionMenuOpen, setActionMenuOpen] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [showActionsDropdown, setShowActionsDropdown] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const [filters, setFilters] = useState(INITIAL_FILTERS);
    const filteredData = useMemo(() => {
        let data = [...SAMPLE_LEADS];
        if (searchQuery) {
            data = data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.phone.includes(searchQuery) ||
                item.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        if (filters.type)
            data = data.filter(item => item.type === filters.type);
        if (filters.status)
            data = data.filter(item => item.status === filters.status);
        if (filters.source)
            data = data.filter(item => item.source === filters.source);
        if (filters.assignedTo)
            data = data.filter(item => item.assignedTo === filters.assignedTo);
        if (sortConfig.key) {
            data.sort((a, b) => {
                const aVal = a[sortConfig.key];
                const bVal = b[sortConfig.key];
                if (aVal < bVal)
                    return sortConfig.direction === SortDirection.ASC ? -1 : 1;
                if (aVal > bVal)
                    return sortConfig.direction === SortDirection.ASC ? 1 : -1;
                return 0;
            });
        }
        return data;
    }, [searchQuery, filters, sortConfig]);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC,
        }));
    };
    const handleSelectAll = (e) => {
        if (e.target.checked)
            setSelectedRows(paginatedData.map(item => item.id));
        else
            setSelectedRows([]);
    };
    const handleSelectRow = (id) => {
        setSelectedRows(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };
    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };
    const clearFilters = () => {
        setFilters(INITIAL_FILTERS);
        setShowFilters(false);
    };
    const handleViewLead = (row) => {
        setSelectedLead(row);
        setIsDrawerOpen(true);
        setActionMenuOpen(null);
    };
    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        setSelectedLead(null);
    };
    return {
        searchQuery,
        setSearchQuery,
        showFilters,
        setShowFilters,
        selectedRows,
        currentPage,
        setCurrentPage,
        rowsPerPage,
        sortConfig,
        actionMenuOpen,
        setActionMenuOpen,
        isDrawerOpen,
        showSortDropdown,
        setShowSortDropdown,
        showActionsDropdown,
        setShowActionsDropdown,
        selectedLead,
        setSelectedLead,
        filters,
        setFilters,
        filteredData,
        totalPages,
        startIndex,
        paginatedData,
        handleSort,
        handleSelectAll,
        handleSelectRow,
        handleRowsPerPageChange,
        clearFilters,
        handleViewLead,
        handleCloseDrawer,
    };
};
//# sourceMappingURL=useFollowupData.js.map