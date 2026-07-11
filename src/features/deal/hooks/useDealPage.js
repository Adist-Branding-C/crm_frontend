import { useState, useCallback, useMemo } from 'react';
import { useDeal, useDealDrawer, useDealDropdown, useDealActions } from './index';
export function useDealPage() {
    const deal = useDeal();
    const drawer = useDealDrawer();
    const dropdown = useDealDropdown();
    const actions = useDealActions({ deal, drawer });
    const searchQuery = deal.searchQuery;
    const setSearchQuery = deal.handleSearchChange;
    const pageNumber = deal.pageNumber;
    const setPageNumber = deal.setPageNumber;
    const [showFilters, setShowFilters] = useState(false);
    const [dealFilters, setDealFilters] = useState({ status: '', type: '', assignedTo: '' });
    const [actionMenuOpen, setActionMenuOpen] = useState(null);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const filteredData = useMemo(() => {
        let data = deal.dealList;
        if (dealFilters.status)
            data = data.filter(item => item.status === dealFilters.status);
        if (dealFilters.type)
            data = data.filter(item => item.type === dealFilters.type);
        if (dealFilters.assignedTo)
            data = data.filter(item => item.agent === dealFilters.assignedTo);
        return data;
    }, [deal.dealList, dealFilters]);
    const limit = deal.limit;
    const setLimit = deal.setLimit;
    const totalCount = deal.totalCount;
    const totalDealAmount = useMemo(() => filteredData.reduce((sum, d) => sum + (Number(d.amount) || 0), 0), [filteredData]);
    const totalDealsCount = totalCount;
    const totalPages = deal.totalPages;
    const startIndex = (pageNumber - 1) * limit;
    const paginatedData = filteredData;
    const handleRowsPerPageChange = useCallback((e) => {
        setPageNumber(1);
        setLimit(Number(e.target.value));
    }, [setPageNumber, setLimit]);
    const paginatedIds = useMemo(() => paginatedData.map(item => item.id), [paginatedData]);
    const clearFilters = useCallback(() => {
        setDealFilters({ status: '', type: '', assignedTo: '' });
        setShowFilters(false);
    }, []);
    const handleAddDeal = useCallback(() => {
        setShowFilters(false);
        drawer.openAddDrawer();
    }, [drawer]);
    const handleEditDeal = useCallback((item) => {
        drawer.openEditDrawer(item);
        setActionMenuOpen(null);
    }, [drawer]);
    const handleDeleteDeal = useCallback((id) => {
        const item = deal.dealList.find(d => d.id === id);
        if (item) {
            actions.handleDeleteClick(item);
        }
        setActionMenuOpen(null);
    }, [deal.dealList, actions]);
    const handleDrawerSave = useCallback((data) => {
        const helpers = { setSubmitting: () => { }, resetForm: () => { } };
        if (drawer.editingItem) {
            actions.handleEditSubmit({ ...data, assignedTo: data.assignAgent }, helpers);
        }
        else {
            actions.handleSubmit({ ...data, assignedTo: data.assignAgent }, helpers);
        }
    }, [drawer.editingItem, actions.handleEditSubmit, actions.handleSubmit]);
    const handleExportCSV = useCallback(() => {
        const headers = ['Deal Id', 'Deal Name', 'Lead', 'Amount', 'Status', 'Type', 'Start Date', 'End Date', 'Agent', 'Created By', 'Created At'];
        const csvContent = [
            headers.join(','),
            ...filteredData.map(d => [
                d.dealId,
                `"${d.dealName}"`,
                `"${d.lead}"`,
                d.amount,
                d.status,
                d.type,
                d.startDate,
                d.endDate,
                d.agent,
                d.createdBy,
                d.createdAt,
            ].join(',')),
        ].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'deals.csv';
        link.click();
    }, [filteredData]);
    const handleEditClick = useCallback((item) => {
        drawer.openEditDrawer(item);
        dropdown.closeDropdown();
    }, [drawer.openEditDrawer, dropdown.closeDropdown]);
    const handleDeleteClick = useCallback((item) => {
        actions.handleDeleteClick(item);
        dropdown.closeDropdown();
    }, [actions.handleDeleteClick, dropdown.closeDropdown]);
    return {
        deal,
        searchQuery,
        setSearchQuery,
        rowsPerPage: limit,
        setRowsPerPage: setLimit,
        showDrawer: drawer.showDrawer,
        dropdownOpen: dropdown.dropdownOpen,
        onToggleDropdown: dropdown.toggleDropdown,
        editingItem: drawer.editingItem,
        deletingItem: actions.deletingItem,
        filteredData,
        totalCount,
        drawerInitialValues: drawer.drawerInitialValues,
        handleAddClick: drawer.openAddDrawer,
        handleCloseDrawer: drawer.closeDrawer,
        handleEditClick,
        handleDeleteClick,
        handleConfirmDelete: actions.handleConfirmDelete,
        handleCloseDeleteModal: actions.closeDeleteModal,
        handleSubmit: actions.handleSubmit,
        handleEditSubmit: actions.handleEditSubmit,
        totalDealAmount,
        totalDealsCount,
        showFilters,
        setShowFilters,
        dealFilters,
        setDealFilters,
        clearFilters,
        sortBy: deal.sortBy,
        sortOrder: deal.sortOrder,
        handleSortChange: deal.handleSortChange,
        showSortDropdown,
        setShowSortDropdown,
        actionMenuOpen,
        setActionMenuOpen,
        paginatedData,
        currentPage: pageNumber,
        setCurrentPage: setPageNumber,
        handleRowsPerPageChange,
        totalPages,
        hasNext: deal.hasNext,
        hasPrevious: deal.hasPrevious,
        startIndex,
        handleAddDeal,
        handleEditDeal,
        handleDeleteDeal,
        handleExportCSV,
        handleDrawerSave,
    };
}
//# sourceMappingURL=useDealPage.js.map