import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useRef } from 'react';
import { Download, Filter, Search, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import './ReportsSubPages.css';
import { statusWiseData as statusData, statusWiseStatsCards as statsCards, statusWiseColumns as columns } from '../constants/matrixReports.data';
import { ROWS_OPTIONS_10_25_50 } from '../../../shared/constants/pagination';
import { ACTION_FILTER, ACTION_CLEAR } from '../../../shared/constants/actionLabels';
import { LEAD_STATUS_OPTIONS } from '../../../shared/constants/leadStatuses';
import { REPT_LEAD_TYPE_OPTIONS, REPT_PURPOSE_OPTIONS, REPT_SOURCE_OPTIONS } from '../constants';
import { MOCK_STAFF_SHORT } from '../../../shared/constants/mockStaff';
const LeadStatusWise = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: 'total', direction: 'desc' });
    const [actionMenuOpen, setActionMenuOpen] = useState(null);
    const [actionMenuPosition, setActionMenuPosition] = useState({ vertical: 'bottom', horizontal: 'right' });
    const actionMenuRefs = useRef({});
    const [filters, setFilters] = useState({
        dateRange: { start: '', end: '' },
        sortBy: '',
        staff: '',
        leadType: '',
        purpose: '',
        source: '',
        status: ''
    });
    const calculateDropdownPosition = (buttonRef) => {
        if (!buttonRef)
            return { vertical: 'bottom', horizontal: 'right' };
        const rect = buttonRef.getBoundingClientRect();
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
    const filteredData = React.useMemo(() => {
        let data = [...statusData];
        if (searchQuery) {
            data = data.filter(item => item.agentName.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        if (filters.staff) {
            data = data.filter(item => item.agentName === filters.staff);
        }
        if (sortConfig.key) {
            data.sort((a, b) => {
                const aVal = a[sortConfig.key];
                const bVal = b[sortConfig.key];
                if (aVal < bVal)
                    return sortConfig.direction === 'asc' ? -1 : 1;
                if (aVal > bVal)
                    return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return data;
    }, [searchQuery, filters, sortConfig]);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
    const handleSort = (key) => {
        setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));
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
        setFilters({ dateRange: { start: '', end: '' }, sortBy: '', staff: '', leadType: '', purpose: '', source: '', status: '' });
        setShowFilters(false);
    };
    const handleExport = () => {
        const headers = ['Agent Name', 'Total', 'New', 'Connected', 'Interested', 'Registered', 'Not Interested', 'Just Enquiry', 'Details Shared', 'Webinar Attended', 'Lost', 'DND', 'Later'];
        const csvContent = [headers.join(','), ...statusData.map(d => [d.agentName, d.total, d.new, d.connected, d.interested, d.registered, d.notInterested, d.justEnquiry, d.detailsShared, d.webinarAttended, d.lost, d.dnd, d.later].join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'lead_status_report.csv';
        link.click();
    };
    return (_jsxs("div", { className: "enquiries-page", children: [_jsx("div", { className: "stats-cards-grid", children: statsCards.map((stat) => (_jsxs("div", { className: "stats-card", children: [_jsx("div", { className: "stats-card-icon", style: { backgroundColor: `${stat.color}15`, color: stat.color }, children: _jsx(stat.icon, { size: 20 }) }), _jsxs("div", { className: "stats-card-content", children: [_jsx("span", { className: "stats-card-value", children: stat.value }), _jsx("span", { className: "stats-card-label", children: stat.label })] }), _jsx("span", { className: "stats-card-change", style: { color: stat.change.startsWith('+') ? '#10b981' : '#ef4444' }, children: stat.change })] }, stat.key))) }), _jsxs("div", { className: "enquiries-toolbar", children: [_jsxs("div", { className: "toolbar-left", children: [_jsxs("button", { className: "btn btn-secondary", onClick: handleExport, children: [_jsx(Download, { size: 16 }), "Export"] }), _jsxs("button", { className: `btn btn-secondary ${showFilters ? 'active' : ''}`, onClick: () => setShowFilters(!showFilters), children: [_jsx(Filter, { size: 16 }), "Filter", _jsx(ChevronDown, { size: 14, className: showFilters ? 'rotate' : '' })] })] }), _jsx("div", { className: "toolbar-right", children: _jsxs("div", { className: "search-box", children: [_jsx(Search, { size: 16, className: "search-icon" }), _jsx("input", { type: "text", placeholder: "Search reports...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "search-input" })] }) })] }), showFilters && (_jsxs("div", { className: "filters-panel", children: [_jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Date Range" }), _jsxs("div", { className: "date-range-input", children: [_jsx("input", { type: "date", value: filters.dateRange.start, onChange: (e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } }), placeholder: "Start" }), _jsx("span", { children: "to" }), _jsx("input", { type: "date", value: filters.dateRange.end, onChange: (e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } }), placeholder: "End" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Sort By" }), _jsxs("select", { value: filters.sortBy, onChange: (e) => setFilters({ ...filters, sortBy: e.target.value }), children: [_jsx("option", { value: "", children: "All" }), _jsx("option", { value: "assignedDate", children: "Assigned Date" }), _jsx("option", { value: "createdDate", children: "Created Date" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Status" }), _jsxs("select", { value: filters.status, onChange: (e) => setFilters({ ...filters, status: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), LEAD_STATUS_OPTIONS.map(o => _jsx("option", { value: o.value, children: o.label }, o.value))] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Select Staff" }), _jsxs("select", { value: filters.staff, onChange: (e) => setFilters({ ...filters, staff: e.target.value }), children: [_jsx("option", { value: "", children: "All Staff" }), MOCK_STAFF_SHORT.map(o => _jsx("option", { value: o.value, children: o.label }, o.value))] })] })] }), _jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Lead Type" }), _jsxs("select", { value: filters.leadType, onChange: (e) => setFilters({ ...filters, leadType: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), REPT_LEAD_TYPE_OPTIONS.map(o => _jsx("option", { value: o.value, children: o.label }, o.value))] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Purpose" }), _jsxs("select", { value: filters.purpose, onChange: (e) => setFilters({ ...filters, purpose: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), REPT_PURPOSE_OPTIONS.map(o => _jsx("option", { value: o.value, children: o.label }, o.value))] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Source" }), _jsxs("select", { value: filters.source, onChange: (e) => setFilters({ ...filters, source: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), REPT_SOURCE_OPTIONS.map(o => _jsx("option", { value: o.value, children: o.label }, o.value))] })] }), _jsxs("div", { className: "filter-actions", children: [_jsx("button", { className: "btn btn-primary", children: ACTION_FILTER }), _jsx("button", { className: "btn btn-secondary", onClick: clearFilters, children: ACTION_CLEAR })] })] })] })), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "enquiries-table", children: [_jsx("thead", { children: _jsx("tr", { children: columns.map(col => (_jsx("th", { className: col.sortable ? 'sortable' : '', onClick: col.sortable ? () => handleSort(col.key) : undefined, children: col.key === 'checkbox' ? (_jsx("input", { type: "checkbox", checked: paginatedData.length > 0 && selectedRows.length === paginatedData.length, onChange: handleSelectAll })) : (_jsxs(_Fragment, { children: [col.label, col.sortable && sortConfig.key === col.key && (sortConfig.direction === 'asc' ? _jsx(ChevronDown, { size: 14 }) : _jsx(ChevronDown, { size: 14, style: { transform: 'rotate(180deg)' } }))] })) }, col.key))) }) }), _jsx("tbody", { children: paginatedData.map((row, index) => (_jsxs("tr", { children: [_jsx("td", { children: _jsx("input", { type: "checkbox", checked: selectedRows.includes(row.id), onChange: () => handleSelectRow(row.id) }) }), _jsx("td", { className: "action-cell", children: _jsxs("div", { className: "action-menu-container", children: [_jsx("button", { className: "action-btn", ref: (el) => { actionMenuRefs.current[row.id] = el; }, onClick: () => { if (actionMenuOpen === row.id) {
                                                        setActionMenuOpen(null);
                                                    }
                                                    else {
                                                        const pos = calculateDropdownPosition(actionMenuRefs.current[row.id]);
                                                        setActionMenuPosition(pos);
                                                        setActionMenuOpen(row.id);
                                                    } }, children: _jsx(MoreHorizontal, { size: 16 }) }), actionMenuOpen === row.id && (_jsx("div", { className: `action-dropdown ${actionMenuPosition.vertical === 'top' ? 'dropup' : ''} ${actionMenuPosition.horizontal === 'left' ? 'dropleft' : ''}`, children: _jsx("button", { onClick: () => { alert(`Viewing details for: ${row.agentName}`); setActionMenuOpen(null); }, children: "View Details" }) }))] }) }), _jsx("td", { children: _jsxs("div", { className: "agent-cell", children: [_jsx("div", { className: "agent-avatar", children: row.initials }), _jsx("span", { className: "agent-name", children: row.agentName })] }) }), _jsx("td", { children: _jsx("strong", { children: row.total }) }), _jsx("td", { children: row.new }), _jsx("td", { children: row.connected }), _jsx("td", { children: _jsx("span", { className: "badge badge-active", children: row.interested }) }), _jsx("td", { children: _jsx("span", { className: "badge badge-pending", children: row.registered }) }), _jsx("td", { children: _jsx("span", { className: "badge badge-inactive", children: row.notInterested }) }), _jsx("td", { children: row.justEnquiry }), _jsx("td", { children: row.detailsShared }), _jsx("td", { children: row.webinarAttended }), _jsx("td", { children: _jsx("span", { className: "badge badge-cold-lead", children: row.lost }) }), _jsx("td", { children: row.dnd }), _jsx("td", { children: row.later })] }, row.id))) })] }) }), _jsxs("div", { className: "pagination-container", children: [_jsxs("div", { className: "pagination-left", children: [_jsx("span", { className: "rows-label", children: "Rows per page:" }), _jsx("select", { value: rowsPerPage, onChange: handleRowsPerPageChange, className: "rows-select", children: ROWS_OPTIONS_10_25_50.map(n => _jsx("option", { value: n, children: n }, n)) }), _jsxs("span", { className: "pagination-info", children: ["Showing ", startIndex + 1, "-", Math.min(startIndex + rowsPerPage, filteredData.length), " of ", filteredData.length] })] }), _jsxs("div", { className: "pagination-right", children: [_jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(1), children: "First" }), _jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(prev => prev - 1), children: _jsx(ChevronLeft, { size: 16 }) }), _jsxs("span", { className: "page-indicator", children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(prev => prev + 1), children: _jsx(ChevronRight, { size: 16 }) }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(totalPages), children: "Last" })] })] })] }));
};
export default LeadStatusWise;
//# sourceMappingURL=LeadStatusWise.js.map