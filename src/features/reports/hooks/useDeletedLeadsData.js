import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { SortDirection } from '../../../shared/constants/enums/sortDirection';
import { useTablePagination } from '../../../shared/hooks/useTablePagination';
import { useTableSelection } from '../../../shared/hooks/useTableSelection';
import { useSearchFilter } from '../../../shared/hooks/useSearchFilter';
import { deletedLeadsSampleData } from '../constants';
const INITIAL_FILTERS = {
    type: '', dateRange: { start: '', end: '' }, filterByDate: '', enquirySource: '', enquiryPurpose: '',
    leadStatus: '', followupAdded: '', createdBy: '', assignedTo: '', leadType: '', location: '', deleteReason: ''
};
export function useDeletedLeadsData() {
    const [showFilters, setShowFilters] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: SortDirection.ASC });
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [showActionsDropdown, setShowActionsDropdown] = useState(false);
    const [sortDropdownClosing, setSortDropdownClosing] = useState(false);
    const [actionsDropdownClosing, setActionsDropdownClosing] = useState(false);
    const [actionMenuOpen, setActionMenuOpen] = useState(null);
    const [actionMenuButtonRect, setActionMenuButtonRect] = useState(null);
    const [selectedLead, setSelectedLead] = useState(null);
    const [filters, setFilters] = useState(INITIAL_FILTERS);
    const sortDropdownRef = useRef(null);
    const actionsDropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
                if (showSortDropdown) {
                    setSortDropdownClosing(true);
                    setTimeout(() => { setShowSortDropdown(false); setSortDropdownClosing(false); }, 150);
                }
            }
            if (actionsDropdownRef.current && !actionsDropdownRef.current.contains(event.target)) {
                if (showActionsDropdown) {
                    setActionsDropdownClosing(true);
                    setTimeout(() => { setShowActionsDropdown(false); setActionsDropdownClosing(false); }, 150);
                }
            }
        };
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                if (showSortDropdown) {
                    setSortDropdownClosing(true);
                    setTimeout(() => { setShowSortDropdown(false); setSortDropdownClosing(false); }, 150);
                }
                if (showActionsDropdown) {
                    setActionsDropdownClosing(true);
                    setTimeout(() => { setShowActionsDropdown(false); setActionsDropdownClosing(false); }, 150);
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => { document.removeEventListener('mousedown', handleClickOutside); document.removeEventListener('keydown', handleKeyDown); };
    }, [showSortDropdown, showActionsDropdown]);
    const { filteredData: searchedData, setQuery: setSearchQuery, query: searchQuery } = useSearchFilter(deletedLeadsSampleData, ['name', 'phone', 'assignedTo', 'location']);
    const filteredByFilters = useMemo(() => {
        let data = searchedData;
        if (filters.enquirySource)
            data = data.filter(item => item.source === filters.enquirySource);
        if (filters.enquiryPurpose)
            data = data.filter(item => item.purpose === filters.enquiryPurpose);
        if (filters.leadStatus)
            data = data.filter(item => item.status === filters.leadStatus);
        if (filters.assignedTo)
            data = data.filter(item => item.assignedTo === filters.assignedTo);
        if (filters.leadType)
            data = data.filter(item => item.type === filters.leadType);
        if (filters.location)
            data = data.filter(item => item.location && item.location.toLowerCase().includes(filters.location.toLowerCase()));
        if (filters.deleteReason)
            data = data.filter(item => item.deleteReason === filters.deleteReason);
        return data;
    }, [searchedData, filters]);
    const filteredData = useMemo(() => {
        let data = [...filteredByFilters];
        if (sortConfig.key) {
            data.sort((a, b) => {
                const aVal = String(a[sortConfig.key] ?? '');
                const bVal = String(b[sortConfig.key] ?? '');
                if (aVal < bVal)
                    return sortConfig.direction === SortDirection.ASC ? -1 : 1;
                if (aVal > bVal)
                    return sortConfig.direction === SortDirection.ASC ? 1 : -1;
                return 0;
            });
        }
        return data;
    }, [filteredByFilters, sortConfig]);
    const { currentPage, setCurrentPage, rowsPerPage, handleRowsPerPageChange, totalPages, startIndex, paginatedData } = useTablePagination(filteredData, 10);
    const { selectedIds, handleSelectAll, handleSelectRow } = useTableSelection();
    const handleSort = useCallback((key) => {
        setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC }));
    }, []);
    const handleSortDesc = useCallback((key) => setSortConfig({ key, direction: SortDirection.DESC }), []);
    const handleSortAsc = useCallback((key) => setSortConfig({ key, direction: SortDirection.ASC }), []);
    const closeSortDropdown = useCallback(() => {
        setSortDropdownClosing(true);
        setTimeout(() => { setShowSortDropdown(false); setSortDropdownClosing(false); }, 150);
    }, []);
    const closeActionsDropdown = useCallback(() => {
        setActionsDropdownClosing(true);
        setTimeout(() => { setShowActionsDropdown(false); setActionsDropdownClosing(false); }, 150);
    }, []);
    const handleRecoverLead = useCallback((id) => {
        if (confirm('Are you sure you want to recover this lead?')) {
            console.log('Recover lead:', id);
        }
    }, []);
    const handleRecoverAll = useCallback(() => {
        if (selectedIds.length === 0) {
            alert('Please select at least one lead to recover');
            return;
        }
        if (confirm(`Are you sure you want to recover ${selectedIds.length} selected lead(s)?`)) {
            console.log('Recover leads:', selectedIds);
        }
    }, [selectedIds]);
    const clearFilters = useCallback(() => {
        setFilters(INITIAL_FILTERS);
        setShowFilters(false);
    }, []);
    return {
        searchQuery, setSearchQuery,
        showFilters, setShowFilters,
        filters, setFilters, clearFilters,
        sortConfig, handleSort, handleSortDesc, handleSortAsc,
        currentPage, setCurrentPage,
        rowsPerPage, handleRowsPerPageChange, totalPages, startIndex,
        selectedIds, handleSelectAll, handleSelectRow,
        actionMenuOpen, setActionMenuOpen,
        actionMenuButtonRect, setActionMenuButtonRect,
        showSortDropdown, setShowSortDropdown,
        showActionsDropdown, setShowActionsDropdown,
        sortDropdownClosing, sortDropdownRef,
        actionsDropdownClosing, actionsDropdownRef,
        closeSortDropdown, closeActionsDropdown,
        selectedLead, setSelectedLead,
        handleRecoverLead, handleRecoverAll,
        paginatedData, filteredData,
    };
}
//# sourceMappingURL=useDeletedLeadsData.js.map