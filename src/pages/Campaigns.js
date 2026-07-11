import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Plus, MoreHorizontal, Edit2, Trash2, Eye, Download, User, CheckCircle, Clock, AlertCircle, Megaphone } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import PageContainer from '../components/PageContainer';
import AddCampaignDrawer from '../components/AddCampaignDrawer';
import './Campaign.css';
import './Enquiries.css';
const sampleCampaigns = [
    { id: 1, slNo: 1, name: 'Q1 Promo Campaign', type: 'Email', totalTasks: 150, completedTasks: 120, completedPercent: 80, createdBy: 'Admin', createdAt: '2024-01-10' },
    { id: 2, slNo: 2, name: 'New Year Sale', type: 'SMS', totalTasks: 200, completedTasks: 180, completedPercent: 90, createdBy: 'Admin', createdAt: '2024-01-08' },
    { id: 3, slNo: 3, name: 'Product Launch', type: 'WhatsApp', totalTasks: 100, completedTasks: 45, completedPercent: 45, createdBy: 'John Doe', createdAt: '2024-01-05' },
    { id: 4, slNo: 4, name: 'Winter Sale', type: 'Email', totalTasks: 250, completedTasks: 250, completedPercent: 100, createdBy: 'Admin', createdAt: '2024-01-02' },
    { id: 5, slNo: 5, name: 'Referral Drive', type: 'Social', totalTasks: 80, completedTasks: 20, completedPercent: 25, createdBy: 'Jane Smith', createdAt: '2023-12-28' },
];
const CampaignsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [actionMenuOpen, setActionMenuOpen] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [campaigns, setCampaigns] = useState(sampleCampaigns);
    const [filters, setFilters] = useState({
        type: '',
        createdBy: '',
        dateRange: { start: '', end: '' },
    });
    const columns = [
        { key: 'checkbox', label: '' },
        { key: 'slNo', label: 'Sl No' },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'type', label: 'Type', sortable: true },
        { key: 'totalTasks', label: 'Total Tasks', sortable: true },
        { key: 'completedTasks', label: 'Completed Tasks', sortable: true },
        { key: 'completedPercent', label: 'Completed %', sortable: true },
        { key: 'createdBy', label: 'Created By', sortable: true },
        { key: 'createdAt', label: 'Created At', sortable: true },
        { key: 'action', label: 'Action', sortable: true }
    ];
    const filteredData = useMemo(() => {
        let data = [...campaigns];
        if (searchQuery)
            data = data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.type.toLowerCase().includes(searchQuery.toLowerCase()));
        if (filters.type)
            data = data.filter(item => item.type === filters.type);
        if (filters.createdBy)
            data = data.filter(item => item.createdBy === filters.createdBy);
        if (sortConfig.key)
            data.sort((a, b) => { if (a[sortConfig.key] < b[sortConfig.key])
                return sortConfig.direction === 'asc' ? -1 : 1; if (a[sortConfig.key] > b[sortConfig.key])
                return sortConfig.direction === 'asc' ? 1 : -1; return 0; });
        return data;
    }, [searchQuery, filters, sortConfig, campaigns]);
    const stats = useMemo(() => ({
        total: filteredData.length,
        active: filteredData.filter(c => c.completedPercent < 100).length,
        completed: filteredData.filter(c => c.completedPercent === 100).length,
    }), [filteredData]);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
    const handleSort = (key) => setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));
    const handleSelectAll = (e) => { if (e.target.checked)
        setSelectedRows(paginatedData.map(item => item.id));
    else
        setSelectedRows([]); };
    const handleSelectRow = (id) => setSelectedRows(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    const handleRowsPerPageChange = (e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); };
    const clearFilters = () => { setFilters({ type: '', createdBy: '', dateRange: { start: '', end: '' } }); setShowFilters(false); };
    const handleDeleteCampaign = (id) => { setCampaigns(prev => prev.filter(c => c.id !== id)); setActionMenuOpen(null); };
    const handleExportCSV = () => {
        const headers = ['Sl No', 'Name', 'Type', 'Total Tasks', 'Completed Tasks', 'Completed %', 'Created By', 'Created At'];
        const csvContent = [headers.join(','), ...filteredData.map(c => [c.slNo, `"${c.name}"`, c.type, c.totalTasks, c.completedTasks, c.completedPercent + '%', c.createdBy, c.createdAt].join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'campaigns.csv';
        link.click();
    };
    const getProgressBadge = (percent) => {
        if (percent === 100)
            return _jsx("span", { className: "badge badge-completed", children: "Completed" });
        if (percent >= 50)
            return _jsx("span", { className: "badge badge-progress", children: "In Progress" });
        return _jsx("span", { className: "badge badge-pending", children: "Not Started" });
    };
    const renderStatsCards = () => (_jsxs("div", { className: "task-stats-cards", children: [_jsxs("div", { className: "stats-card", children: [_jsx("div", { className: "stats-card-icon total", children: _jsx(Clock, { size: 20 }) }), _jsxs("div", { className: "stats-card-content", children: [_jsx("span", { className: "stats-card-value", children: stats.total }), _jsx("span", { className: "stats-card-label", children: "Total Campaigns" })] })] }), _jsxs("div", { className: "stats-card", children: [_jsx("div", { className: "stats-card-icon completed", children: _jsx(CheckCircle, { size: 20 }) }), _jsxs("div", { className: "stats-card-content", children: [_jsx("span", { className: "stats-card-value", children: stats.completed }), _jsx("span", { className: "stats-card-label", children: "Completed" })] })] }), _jsxs("div", { className: "stats-card", children: [_jsx("div", { className: "stats-card-icon pending", children: _jsx(Clock, { size: 20 }) }), _jsxs("div", { className: "stats-card-content", children: [_jsx("span", { className: "stats-card-value", children: stats.active }), _jsx("span", { className: "stats-card-label", children: "In Progress" })] })] })] }));
    return (_jsxs(PageContainer, { children: [_jsx(PageHeader, { title: "Campaigns", description: "Manage campaign tasks and activities." }), renderStatsCards(), _jsxs("div", { className: "enquiries-toolbar", children: [_jsxs("div", { className: "toolbar-left", children: [_jsxs("div", { className: "search-box", children: [_jsx(Search, { size: 16, className: "search-icon" }), _jsx("input", { type: "text", placeholder: "Search campaigns...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "search-input" })] }), _jsxs("button", { className: "btn btn-secondary", onClick: () => setShowFilters(!showFilters), children: [_jsx(Filter, { size: 16 }), "Filter", _jsx(ChevronDown, { size: 14, className: showFilters ? 'rotate' : '' })] }), _jsxs("div", { className: "dropdown-container", children: [_jsxs("button", { className: "btn btn-secondary", onClick: () => setShowSortDropdown(!showSortDropdown), children: ["Sort By", _jsx(ChevronDown, { size: 14 })] }), showSortDropdown && (_jsxs("div", { className: "sort-dropdown", children: [_jsxs("button", { onClick: () => { handleSort('createdAt'); setShowSortDropdown(false); }, children: ["Created Date ", sortConfig.key === 'createdAt' && (sortConfig.direction === 'asc' ? '↑' : '↓')] }), _jsxs("button", { onClick: () => { handleSort('name'); setShowSortDropdown(false); }, children: ["Name ", sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')] }), _jsxs("button", { onClick: () => { handleSort('completedPercent'); setShowSortDropdown(false); }, children: ["Progress ", sortConfig.key === 'completedPercent' && (sortConfig.direction === 'asc' ? '↑' : '↓')] })] }))] })] }), _jsxs("div", { className: "toolbar-right", children: [_jsxs("button", { className: "btn btn-secondary", onClick: handleExportCSV, children: [_jsx(Download, { size: 16 }), "Export"] }), _jsxs("button", { className: "btn btn-primary", onClick: () => setIsDrawerOpen(true), children: [_jsx(Plus, { size: 16 }), "Campaign"] })] })] }), showFilters && (_jsxs("div", { className: "filters-panel", children: [_jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Type" }), _jsxs("select", { value: filters.type, onChange: (e) => setFilters({ ...filters, type: e.target.value }), children: [_jsx("option", { value: "", children: "All" }), _jsx("option", { value: "Email", children: "Email" }), _jsx("option", { value: "SMS", children: "SMS" }), _jsx("option", { value: "WhatsApp", children: "WhatsApp" }), _jsx("option", { value: "Social", children: "Social" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Created By" }), _jsxs("select", { value: filters.createdBy, onChange: (e) => setFilters({ ...filters, createdBy: e.target.value }), children: [_jsx("option", { value: "", children: "All" }), _jsx("option", { value: "Admin", children: "Admin" }), _jsx("option", { value: "John Doe", children: "John Doe" }), _jsx("option", { value: "Jane Smith", children: "Jane Smith" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Date Range" }), _jsxs("div", { className: "date-range-input", children: [_jsx("input", { type: "date", value: filters.dateRange.start, onChange: (e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } }) }), _jsx("span", { children: "to" }), _jsx("input", { type: "date", value: filters.dateRange.end, onChange: (e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } }) })] })] })] }), _jsx("div", { className: "filter-row", children: _jsxs("div", { className: "filter-actions", children: [_jsx("button", { className: "btn btn-primary", onClick: () => setShowFilters(false), children: "Filter" }), _jsx("button", { className: "btn btn-secondary", onClick: clearFilters, children: "Clear" })] }) })] })), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "enquiries-table", children: [_jsx("thead", { children: _jsx("tr", { children: columns.map(col => (_jsx("th", { className: col.sortable ? 'sortable' : '', onClick: col.sortable ? () => handleSort(col.key) : undefined, children: col.key === 'checkbox' ? _jsx("input", { type: "checkbox", checked: paginatedData.length > 0 && selectedRows.length === paginatedData.length, onChange: handleSelectAll }) : _jsxs(_Fragment, { children: [col.label, col.sortable && sortConfig.key === col.key && (sortConfig.direction === 'asc' ? _jsx(ChevronUp, { size: 14 }) : _jsx(ChevronDown, { size: 14 }))] }) }, col.key))) }) }), _jsx("tbody", { children: paginatedData.map(row => (_jsxs("tr", { className: selectedRows.includes(row.id) ? 'selected' : '', children: [_jsx("td", { children: _jsx("input", { type: "checkbox", checked: selectedRows.includes(row.id), onChange: () => handleSelectRow(row.id) }) }), _jsx("td", { children: row.slNo }), _jsx("td", { className: "lead-name-cell", children: row.name }), _jsx("td", { children: _jsx("span", { className: `badge badge-${row.type.toLowerCase()}`, children: row.type }) }), _jsx("td", { children: row.totalTasks }), _jsx("td", { children: row.completedTasks }), _jsx("td", { children: _jsxs("div", { className: "progress-cell", children: [_jsxs("span", { children: [row.completedPercent, "%"] }), _jsx("div", { className: "progress-bar", children: _jsx("div", { className: "progress-fill", style: { width: row.completedPercent + '%' } }) })] }) }), _jsx("td", { children: row.createdBy }), _jsx("td", { children: row.createdAt }), _jsx("td", { className: "action-cell", children: _jsxs("div", { className: "action-menu-container", children: [_jsx("button", { className: "action-btn", onClick: () => setActionMenuOpen(actionMenuOpen === row.id ? null : row.id), children: _jsx(MoreHorizontal, { size: 16 }) }), actionMenuOpen === row.id && (_jsxs("div", { className: "action-dropdown", children: [_jsxs("button", { children: [_jsx(Eye, { size: 14 }), "View"] }), _jsxs("button", { children: [_jsx(Edit2, { size: 14 }), "Edit"] }), _jsxs("button", { children: [_jsx(User, { size: 14 }), "Assign"] }), _jsxs("button", { onClick: () => handleDeleteCampaign(row.id), className: "delete", children: [_jsx(Trash2, { size: 14 }), "Delete"] })] }))] }) })] }, row.id))) })] }) }), _jsxs("div", { className: "pagination-container", children: [_jsxs("div", { className: "pagination-left", children: [_jsx("span", { className: "rows-label", children: "Rows per page:" }), _jsxs("select", { value: rowsPerPage, onChange: handleRowsPerPageChange, className: "rows-select", children: [_jsx("option", { value: 10, children: "10" }), _jsx("option", { value: 25, children: "25" }), _jsx("option", { value: 50, children: "50" }), _jsx("option", { value: 100, children: "100" })] }), _jsxs("span", { className: "pagination-info", children: ["Showing ", startIndex + 1, "-", Math.min(startIndex + rowsPerPage, filteredData.length), " of ", filteredData.length] })] }), _jsxs("div", { className: "pagination-right", children: [_jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(1), children: "First" }), _jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(prev => prev - 1), children: _jsx(ChevronLeft, { size: 16 }) }), _jsxs("span", { className: "page-indicator", children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(prev => prev + 1), children: _jsx(ChevronRight, { size: 16 }) }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(totalPages), children: "Last" })] })] }), _jsx(AddCampaignDrawer, { isOpen: isDrawerOpen, onClose: () => setIsDrawerOpen(false), onSave: (data) => setCampaigns(prev => [...prev, { ...data, id: Date.now(), slNo: prev.length + 1 }]) })] }));
};
export default CampaignsPage;
//# sourceMappingURL=Campaigns.js.map