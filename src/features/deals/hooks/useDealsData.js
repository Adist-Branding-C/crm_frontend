import { useState, useMemo, useCallback } from 'react';
import { useTableSorting } from '../../../shared/hooks/useTableSorting';
import { useTablePagination } from '../../../shared/hooks/useTablePagination';
import { useTableSelection } from '../../../shared/hooks/useTableSelection';
import { useSearchFilter } from '../../../shared/hooks/useSearchFilter';
import { sampleDeals, initialDealFilters } from '../constants';
export function useDealsData() {
    const [deals, setDeals] = useState(sampleDeals);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState(initialDealFilters);
    const [actionMenuOpen, setActionMenuOpen] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingDeal, setEditingDeal] = useState(null);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const { filteredData: searchedData, setQuery: setSearchQuery, query: searchQuery } = useSearchFilter(deals, ['dealName', 'lead', 'mobile', 'dealId']);
    const filteredByStatus = useMemo(() => {
        let data = searchedData;
        if (filters.status)
            data = data.filter(item => item.status === filters.status);
        if (filters.type)
            data = data.filter(item => item.type === filters.type);
        if (filters.assignedTo)
            data = data.filter(item => item.agent === filters.assignedTo);
        return data;
    }, [searchedData, filters]);
    const { sortedData, sortConfig, handleSort, handleSortDirection } = useTableSorting(filteredByStatus);
    const filteredData = sortedData;
    const totalDealAmount = useMemo(() => filteredData.reduce((sum, deal) => sum + (Number(deal.amount) || 0), 0), [filteredData]);
    const totalDealsCount = filteredData.length;
    const { currentPage, setCurrentPage, rowsPerPage, handleRowsPerPageChange, totalPages, startIndex, paginatedData } = useTablePagination(filteredData);
    const paginatedIds = useMemo(() => paginatedData.map(item => item.id), [paginatedData]);
    const { selectedIds, handleSelectAll, handleSelectRow } = useTableSelection();
    const clearFilters = useCallback(() => {
        setFilters(initialDealFilters);
        setShowFilters(false);
    }, []);
    const handleAddDeal = useCallback(() => {
        setEditingDeal(null);
        setIsDrawerOpen(true);
    }, []);
    const handleEditDeal = useCallback((deal) => {
        setEditingDeal(deal);
        setIsDrawerOpen(true);
        setActionMenuOpen(null);
    }, []);
    const handleSaveDeal = useCallback((data) => {
        if (editingDeal) {
            setDeals(prev => prev.map(deal => deal.id === editingDeal.id
                ? { ...deal, dealName: data.dealName, lead: data.lead, mobile: data.mobile, amount: Number(data.amount), status: data.status, type: data.type, startDate: data.startDate, endDate: data.endDate, agent: data.assignAgent }
                : deal));
        }
        else {
            const newDeal = {
                id: Date.now(),
                dealId: `DL00${deals.length + 1}`,
                dealName: data.dealName,
                lead: data.lead,
                mobile: data.mobile,
                amount: Number(data.amount),
                status: data.status,
                type: data.type,
                startDate: data.startDate,
                endDate: data.endDate,
                agent: data.assignAgent,
                createdBy: 'Admin',
                createdAt: new Date().toISOString().split('T')[0] ?? '',
            };
            setDeals(prev => [...prev, newDeal]);
        }
        setCurrentPage(1);
    }, [editingDeal, deals.length, setCurrentPage]);
    const handleDeleteDeal = useCallback((id) => {
        setDeals(prev => prev.filter(deal => deal.id !== id));
        setActionMenuOpen(null);
    }, []);
    const handleExportCSV = useCallback(() => {
        const headers = ['Deal Id', 'Deal Name', 'Lead', 'Mobile', 'Amount', 'Status', 'Type', 'Start Date', 'End Date', 'Agent', 'Created By', 'Created At'];
        const csvContent = [
            headers.join(','),
            ...filteredData.map(deal => [
                deal.dealId,
                `"${deal.dealName}"`,
                `"${deal.lead}"`,
                deal.mobile,
                deal.amount,
                deal.status,
                deal.type,
                deal.startDate,
                deal.endDate,
                deal.agent,
                deal.createdBy,
                deal.createdAt
            ].join(','))
        ].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'deals.csv';
        link.click();
    }, [filteredData]);
    return {
        deals, setDeals,
        paginatedData, paginatedIds, filteredData,
        totalDealAmount, totalDealsCount,
        searchQuery, setSearchQuery,
        showFilters, setShowFilters,
        filters, setFilters, clearFilters,
        sortConfig: sortConfig,
        handleSort, handleSortDirection,
        currentPage, setCurrentPage,
        rowsPerPage, handleRowsPerPageChange, totalPages, startIndex,
        selectedIds, handleSelectAll, handleSelectRow,
        actionMenuOpen, setActionMenuOpen,
        isDrawerOpen, setIsDrawerOpen,
        editingDeal, setEditingDeal,
        showSortDropdown, setShowSortDropdown,
        handleAddDeal, handleEditDeal, handleSaveDeal, handleDeleteDeal, handleExportCSV,
    };
}
//# sourceMappingURL=useDealsData.js.map