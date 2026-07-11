import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, ChevronDown, ChevronLeft, ChevronRight, Plus, MoreHorizontal, Download, RefreshCw, ArrowUpDown, ArrowDown, ArrowUp, Edit2, Trash2, Eye, MessageCircle } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import '../../pages/Enquiries.css';
const sampleDailyData = [
    { id: 1, date: '2024-01-25', newLeads: 25, followups: 45, conversions: 8, calls: 120, revenue: 250000 },
    { id: 2, date: '2024-01-24', newLeads: 32, followups: 52, conversions: 12, calls: 145, revenue: 380000 },
    { id: 3, date: '2024-01-23', newLeads: 18, followups: 38, conversions: 5, calls: 98, revenue: 150000 },
    { id: 4, date: '2024-01-22', newLeads: 28, followups: 48, conversions: 10, calls: 132, revenue: 320000 },
    { id: 5, date: '2024-01-21', newLeads: 35, followups: 55, conversions: 15, calls: 158, revenue: 450000 },
    { id: 6, date: '2024-01-20', newLeads: 22, followups: 42, conversions: 7, calls: 110, revenue: 180000 },
    { id: 7, date: '2024-01-19', newLeads: 30, followups: 50, conversions: 11, calls: 140, revenue: 350000 },
    { id: 8, date: '2024-01-18', newLeads: 20, followups: 40, conversions: 6, calls: 100, revenue: 160000 },
    { id: 9, date: '2024-01-17', newLeads: 27, followups: 46, conversions: 9, calls: 125, revenue: 280000 },
    { id: 10, date: '2024-01-16', newLeads: 33, followups: 53, conversions: 13, calls: 150, revenue: 400000 },
    { id: 11, date: '2024-01-15', newLeads: 24, followups: 44, conversions: 8, calls: 118, revenue: 220000 },
    { id: 12, date: '2024-01-14', newLeads: 31, followups: 51, conversions: 12, calls: 142, revenue: 360000 },
];
const LeadDailyActivity = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [actionMenuOpen, setActionMenuOpen] = useState(null);
    const [actionMenuPosition, setActionMenuPosition] = useState({ vertical: 'bottom', horizontal: 'right' });
    const actionMenuRefs = useRef({});
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [showActionsDropdown, setShowActionsDropdown] = useState(false);
    const [sortDropdownClosing, setSortDropdownClosing] = useState(false);
    const [actionsDropdownClosing, setActionsDropdownClosing] = useState(false);
    const sortDropdownRef = useRef(null);
    const actionsDropdownRef = useRef(null);
    const [filters, setFilters] = useState({
        dateRange: { start: '', end: '' },
        assignedTo: '',
        status: ''
    });
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
                if (showSortDropdown) {
                    setSortDropdownClosing(true);
                    setTimeout(() => {
                        setShowSortDropdown(false);
                        setSortDropdownClosing(false);
                    }, 150);
                }
            }
            if (actionsDropdownRef.current && !actionsDropdownRef.current.contains(event.target)) {
                if (showActionsDropdown) {
                    setActionsDropdownClosing(true);
                    setTimeout(() => {
                        setShowActionsDropdown(false);
                        setActionsDropdownClosing(false);
                    }, 150);
                }
            }
        };
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                if (showSortDropdown) {
                    setSortDropdownClosing(true);
                    setTimeout(() => {
                        setShowSortDropdown(false);
                        setSortDropdownClosing(false);
                    }, 150);
                }
                if (showActionsDropdown) {
                    setActionsDropdownClosing(true);
                    setTimeout(() => {
                        setShowActionsDropdown(false);
                        setActionsDropdownClosing(false);
                    }, 150);
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [showSortDropdown, showActionsDropdown]);
    const calculateDropdownPosition = (buttonRef) => {
        if (!buttonRef)
            return { vertical: 'bottom', horizontal: 'right' };
        const button = buttonRef;
        const rect = button.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        const dropdownHeight = 220;
        const dropdownWidth = 160;
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;
        const spaceRight = viewportWidth - rect.right;
        const spaceLeft = rect.left;
        let vertical = 'bottom';
        let horizontal = 'right';
        if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
            vertical = 'top';
        }
        if (spaceRight < dropdownWidth && spaceLeft > spaceRight) {
            horizontal = 'left';
        }
        return { vertical, horizontal };
    };
    const columns = [
        { key: 'checkbox', label: '' },
        { key: 'action', label: 'Action' },
        { key: 'date', label: 'Date', sortable: true },
        { key: 'newLeads', label: 'New Leads', sortable: true },
        { key: 'followups', label: 'Followups', sortable: true },
        { key: 'conversions', label: 'Conversions', sortable: true },
        { key: 'calls', label: 'Calls', sortable: true },
        { key: 'revenue', label: 'Revenue', sortable: true }
    ];
    const filteredData = React.useMemo(() => {
        let data = [...sampleDailyData];
        if (searchQuery) {
            data = data.filter(item => item.date.includes(searchQuery) ||
                item.newLeads.toString().includes(searchQuery) ||
                item.followups.toString().includes(searchQuery));
        }
        if (filters.assignedTo) {
            data = data.filter(item => item.assignedTo === filters.assignedTo);
        }
        if (filters.status) {
            data = data.filter(item => item.status === filters.status);
        }
        if (sortConfig.key) {
            data.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key])
                    return sortConfig.direction === 'asc' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key])
                    return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return data;
    }, [searchQuery, filters, sortConfig]);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
    const closeSortDropdown = () => {
        setSortDropdownClosing(true);
        setTimeout(() => {
            setShowSortDropdown(false);
            setSortDropdownClosing(false);
        }, 150);
    };
    const closeActionsDropdown = () => {
        setActionsDropdownClosing(true);
        setTimeout(() => {
            setShowActionsDropdown(false);
            setActionsDropdownClosing(false);
        }, 150);
    };
    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };
    const handleSortDesc = (key) => {
        setSortConfig({ key, direction: 'desc' });
    };
    const handleSortAsc = (key) => {
        setSortConfig({ key, direction: 'asc' });
    };
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedRows(paginatedData.map(item => item.id));
        }
        else {
            setSelectedRows([]);
        }
    };
    const handleSelectRow = (id) => {
        setSelectedRows(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };
    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };
    const clearFilters = () => {
        setFilters({
            dateRange: { start: '', end: '' },
            assignedTo: '',
            status: ''
        });
        setShowFilters(false);
    };
    const handleExport = () => {
        const headers = ['Date', 'New Leads', 'Followups', 'Conversions', 'Calls', 'Revenue'];
        const csvContent = [headers.join(','), ...sampleDailyData.map(d => [d.date, d.newLeads, d.followups, d.conversions, d.calls, d.revenue].join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'daily_activity_report.csv';
        link.click();
    };
    return (_jsxs("div", { className: "enquiries-page", children: [_jsx(PageHeader, { title: "Daily Activity Report", description: "Track daily lead activities and conversions." }), _jsxs("div", { className: "enquiries-toolbar", children: [_jsxs("div", { className: "toolbar-left", children: [_jsxs("div", { className: "search-box", children: [_jsx(Search, { size: 16, className: "search-icon" }), _jsx("input", { type: "text", placeholder: "Search reports...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "search-input" })] }), _jsxs("button", { className: "btn btn-secondary", onClick: () => setShowFilters(!showFilters), children: [_jsx(Filter, { size: 16 }), "Filter", _jsx(ChevronDown, { size: 14, className: showFilters ? 'rotate' : '' })] }), _jsxs("div", { className: "dropdown-container", ref: sortDropdownRef, children: [_jsxs("button", { className: `btn btn-secondary ${showSortDropdown ? 'active' : ''}`, onClick: (e) => { e.stopPropagation(); if (showSortDropdown) {
                                            closeSortDropdown();
                                        }
                                        else {
                                            setShowSortDropdown(true);
                                            setShowActionsDropdown(false);
                                        } }, children: [_jsx(ArrowUpDown, { size: 16 }), "Sort By", _jsx(ChevronDown, { size: 14, className: showSortDropdown ? 'rotate' : '' })] }), showSortDropdown && (_jsxs("div", { className: `premium-dropdown sort-dropdown ${sortDropdownClosing ? 'closing' : ''}`, children: [_jsx("div", { className: "dropdown-header", children: "Sort By" }), _jsxs("button", { className: `dropdown-item ${sortConfig.key === 'date' && sortConfig.direction === 'desc' ? 'selected' : ''}`, onClick: () => { handleSortDesc('date'); closeSortDropdown(); }, children: [_jsx(ArrowDown, { size: 16 }), _jsx("span", { children: "Newest First" }), sortConfig.key === 'date' && sortConfig.direction === 'desc' && _jsx("span", { className: "check-icon", style: { color: 'var(--primary)' }, children: "\u2713" })] }), _jsxs("button", { className: `dropdown-item ${sortConfig.key === 'date' && sortConfig.direction === 'asc' ? 'selected' : ''}`, onClick: () => { handleSortAsc('date'); closeSortDropdown(); }, children: [_jsx(ArrowUp, { size: 16 }), _jsx("span", { children: "Oldest First" }), sortConfig.key === 'date' && sortConfig.direction === 'asc' && _jsx("span", { className: "check-icon", style: { color: 'var(--primary)' }, children: "\u2713" })] }), _jsxs("button", { className: `dropdown-item ${sortConfig.key === 'newLeads' && sortConfig.direction === 'desc' ? 'selected' : ''}`, onClick: () => { handleSortDesc('newLeads'); closeSortDropdown(); }, children: [_jsx(ArrowDown, { size: 16 }), _jsx("span", { children: "New Leads (High-Low)" }), sortConfig.key === 'newLeads' && sortConfig.direction === 'desc' && _jsx("span", { className: "check-icon", style: { color: 'var(--primary)' }, children: "\u2713" })] }), _jsxs("button", { className: `dropdown-item ${sortConfig.key === 'newLeads' && sortConfig.direction === 'asc' ? 'selected' : ''}`, onClick: () => { handleSortAsc('newLeads'); closeSortDropdown(); }, children: [_jsx(ArrowUp, { size: 16 }), _jsx("span", { children: "New Leads (Low-High)" }), sortConfig.key === 'newLeads' && sortConfig.direction === 'asc' && _jsx("span", { className: "check-icon", style: { color: 'var(--primary)' }, children: "\u2713" })] }), _jsxs("button", { className: `dropdown-item ${sortConfig.key === 'revenue' && sortConfig.direction === 'desc' ? 'selected' : ''}`, onClick: () => { handleSortDesc('revenue'); closeSortDropdown(); }, children: [_jsx(ArrowDown, { size: 16 }), _jsx("span", { children: "Revenue (High-Low)" }), sortConfig.key === 'revenue' && sortConfig.direction === 'desc' && _jsx("span", { className: "check-icon", style: { color: 'var(--primary)' }, children: "\u2713" })] }), _jsxs("button", { className: `dropdown-item ${sortConfig.key === 'revenue' && sortConfig.direction === 'asc' ? 'selected' : ''}`, onClick: () => { handleSortAsc('revenue'); closeSortDropdown(); }, children: [_jsx(ArrowUp, { size: 16 }), _jsx("span", { children: "Revenue (Low-High)" }), sortConfig.key === 'revenue' && sortConfig.direction === 'asc' && _jsx("span", { className: "check-icon", style: { color: 'var(--primary)' }, children: "\u2713" })] })] }))] }), _jsxs("div", { className: "dropdown-container", ref: actionsDropdownRef, children: [_jsxs("button", { className: `btn btn-secondary ${showActionsDropdown ? 'active' : ''}`, onClick: (e) => { e.stopPropagation(); if (showActionsDropdown) {
                                            closeActionsDropdown();
                                        }
                                        else {
                                            setShowActionsDropdown(true);
                                            setShowSortDropdown(false);
                                        } }, children: [_jsx(MoreHorizontal, { size: 16 }), "Actions", _jsx(ChevronDown, { size: 14, className: showActionsDropdown ? 'rotate' : '' })] }), showActionsDropdown && (_jsxs("div", { className: `premium-dropdown actions-dropdown ${actionsDropdownClosing ? 'closing' : ''}`, children: [_jsx("div", { className: "dropdown-header", children: "Actions" }), _jsxs("button", { className: "dropdown-item", onClick: () => { handleExport(); closeActionsDropdown(); }, children: [_jsx(Download, { size: 16 }), _jsx("span", { children: "Export Data" })] }), _jsxs("button", { className: "dropdown-item", onClick: () => { alert('Generating PDF...'); closeActionsDropdown(); }, children: [_jsx(Eye, { size: 16 }), _jsx("span", { children: "Generate PDF" })] }), _jsxs("button", { className: "dropdown-item", onClick: () => { alert('Sending report via email...'); closeActionsDropdown(); }, children: [_jsx(MessageCircle, { size: 16 }), _jsx("span", { children: "Email Report" })] })] }))] })] }), _jsx("div", { className: "toolbar-right", children: _jsxs("button", { className: "btn btn-primary", onClick: handleExport, children: [_jsx(Download, { size: 16 }), "Export"] }) })] }), showFilters && (_jsx("div", { className: "filters-panel", children: _jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Date Range" }), _jsxs("div", { className: "date-range-input", children: [_jsx("input", { type: "date", value: filters.dateRange.start, onChange: (e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } }), placeholder: "Start" }), _jsx("span", { children: "to" }), _jsx("input", { type: "date", value: filters.dateRange.end, onChange: (e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } }), placeholder: "End" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Assigned To" }), _jsxs("select", { value: filters.assignedTo, onChange: (e) => setFilters({ ...filters, assignedTo: e.target.value }), children: [_jsx("option", { value: "", children: "All" }), _jsx("option", { value: "john", children: "John Doe" }), _jsx("option", { value: "jane", children: "Jane Smith" }), _jsx("option", { value: "mike", children: "Mike Johnson" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Status" }), _jsxs("select", { value: filters.status, onChange: (e) => setFilters({ ...filters, status: e.target.value }), children: [_jsx("option", { value: "", children: "All" }), _jsx("option", { value: "active", children: "Active" }), _jsx("option", { value: "inactive", children: "Inactive" })] })] }), _jsxs("div", { className: "filter-actions", children: [_jsx("button", { className: "btn btn-primary", onClick: () => setShowFilters(false), children: "Filter" }), _jsx("button", { className: "btn btn-secondary", onClick: clearFilters, children: "Clear" })] })] }) })), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "enquiries-table", children: [_jsx("thead", { children: _jsx("tr", { children: columns.map(col => (_jsx("th", { className: col.sortable ? 'sortable' : '', onClick: col.sortable ? () => handleSort(col.key) : undefined, children: col.key === 'checkbox' ? (_jsx("input", { type: "checkbox", checked: paginatedData.length > 0 && selectedRows.length === paginatedData.length, onChange: handleSelectAll })) : (_jsxs(_Fragment, { children: [col.label, col.sortable && sortConfig.key === col.key && (sortConfig.direction === 'asc' ? _jsx(ChevronUp, { size: 14 }) : _jsx(ChevronDown, { size: 14 }))] })) }, col.key))) }) }), _jsx("tbody", { children: paginatedData.map(row => (_jsxs("tr", { className: selectedRows.includes(row.id) ? 'selected' : '', children: [_jsx("td", { children: _jsx("input", { type: "checkbox", checked: selectedRows.includes(row.id), onChange: () => handleSelectRow(row.id) }) }), _jsx("td", { className: "action-cell", children: _jsxs("div", { className: "action-menu-container", children: [_jsx("button", { className: "action-btn", ref: (el) => (actionMenuRefs.current[row.id] = el), onClick: () => {
                                                        if (actionMenuOpen === row.id) {
                                                            setActionMenuOpen(null);
                                                        }
                                                        else {
                                                            const pos = calculateDropdownPosition(actionMenuRefs.current[row.id]);
                                                            setActionMenuPosition(pos);
                                                            setActionMenuOpen(row.id);
                                                        }
                                                    }, children: _jsx(MoreHorizontal, { size: 16 }) }), actionMenuOpen === row.id && (_jsxs("div", { className: `action-dropdown ${actionMenuPosition.vertical === 'top' ? 'dropup' : ''} ${actionMenuPosition.horizontal === 'left' ? 'dropleft' : ''}`, children: [_jsxs("button", { onClick: () => { alert(`Viewing details for: ${row.date}`); setActionMenuOpen(null); }, children: [_jsx(Eye, { size: 14 }), " View Details"] }), _jsxs("button", { onClick: () => { alert(`Editing record: ${row.date}`); setActionMenuOpen(null); }, children: [_jsx(Edit2, { size: 14 }), " Edit"] })] }))] }) }), _jsx("td", { children: row.date }), _jsx("td", { children: row.newLeads }), _jsx("td", { children: row.followups }), _jsx("td", { children: _jsx("span", { className: `badge badge-${row.conversions >= 10 ? 'hot-lead' : row.conversions >= 5 ? 'warm-lead' : 'cold-lead'}`, children: row.conversions }) }), _jsx("td", { children: row.calls }), _jsxs("td", { children: ["\u20B9", row.revenue.toLocaleString()] })] }, row.id))) })] }) }), _jsxs("div", { className: "pagination-container", children: [_jsxs("div", { className: "pagination-left", children: [_jsx("span", { className: "rows-label", children: "Rows per page:" }), _jsxs("select", { value: rowsPerPage, onChange: handleRowsPerPageChange, className: "rows-select", children: [_jsx("option", { value: 5, children: "5" }), _jsx("option", { value: 10, children: "10" }), _jsx("option", { value: 25, children: "25" }), _jsx("option", { value: 50, children: "50" })] }), _jsxs("span", { className: "pagination-info", children: ["Showing ", startIndex + 1, "-", Math.min(startIndex + rowsPerPage, filteredData.length), " of ", filteredData.length] })] }), _jsxs("div", { className: "pagination-right", children: [_jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(1), children: "First" }), _jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(prev => prev - 1), children: _jsx(ChevronLeft, { size: 16 }) }), _jsxs("span", { className: "page-indicator", children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(prev => prev + 1), children: _jsx(ChevronRight, { size: 16 }) }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(totalPages), children: "Last" })] })] })] }));
};
export default LeadDailyActivity;
//# sourceMappingURL=LeadDailyActivity.js.map