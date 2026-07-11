import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useRef } from 'react';
import { Download, Filter, Search, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import '../../pages/Enquiries.css';
const sourceWiseData = [
    { select: '', id: 1, source: 'Website', fromDate: '2024-01-01', toDate: '2024-01-31', none: 5, new: 25, connected: 45, interested: 32, registered: 18, notInterested: 12, justEnquiry: 8, plusOne: 6, detailsShared: 22, plusTwoCall: 4, neetAfter: 3, seminarInt: 5, nursingPg: 2, fridayWeb: 3, plusTwo2027: 4, mbbs: 5, webinarGform: 6, webinarAtt: 8, junkForm: 4, junkHindi: 2, webinarFollow: 3, webinarLost: 2, dnd: 3, later: 4, empty: 5, total: 208 },
    // { id: 2, source: 'Meta Campaign', fromDate: '2024-01-01', toDate: '2024-01-31', none: 3, new: 18, connected: 38, interested: 28, registered: 15, notInterested: 10, justEnquiry: 6, plusOne: 4, detailsShared: 18, plusTwoCall: 3, neetAfter: 2, seminarInt: 4, nursingPg: 1, fridayWeb: 2, plusTwo2027: 3, mbbs: 4, webinarGform: 5, webinarAtt: 6, junkForm: 3, junkHindi: 1, webinarFollow: 2, webinarLost: 1, dnd: 2, later: 3, empty: 4, total: 172 },
    // { id: 3, source: 'Referral', fromDate: '2024-01-01', toDate: '2024-01-31', none: 2, new: 12, connected: 25, interested: 20, registered: 12, notInterested: 8, justEnquiry: 5, plusOne: 3, detailsShared: 12, plusTwoCall: 2, neetAfter: 1, seminarInt: 3, nursingPg: 1, fridayWeb: 2, plusTwo2027: 2, mbbs: 3, webinarGform: 3, webinarAtt: 4, junkForm: 2, junkHindi: 1, webinarFollow: 1, webinarLost: 1, dnd: 2, later: 2, empty: 3, total: 119 },
    // { id: 4, source: 'Incoming Call / WhatsApp', fromDate: '2024-01-01', toDate: '2024-01-31', none: 4, new: 20, connected: 35, interested: 25, registered: 14, notInterested: 9, justEnquiry: 7, plusOne: 5, detailsShared: 15, plusTwoCall: 3, neetAfter: 2, seminarInt: 4, nursingPg: 2, fridayWeb: 2, plusTwo2027: 3, mbbs: 4, webinarGform: 4, webinarAtt: 5, junkForm: 3, junkHindi: 2, webinarFollow: 2, webinarLost: 2, dnd: 2, later: 3, empty: 4, total: 167 },
    // { id: 5, source: 'Facebook', fromDate: '2024-01-01', toDate: '2024-01-31', none: 2, new: 15, connected: 28, interested: 22, registered: 12, notInterested: 7, justEnquiry: 4, plusOne: 3, detailsShared: 12, plusTwoCall: 2, neetAfter: 2, seminarInt: 3, nursingPg: 1, fridayWeb: 2, plusTwo2027: 2, mbbs: 3, webinarGform: 3, webinarAtt: 4, junkForm: 2, junkHindi: 1, webinarFollow: 1, webinarLost: 1, dnd: 2, later: 2, empty: 3, total: 130 },
    // { id: 6, source: 'Google Ads', fromDate: '2024-01-01', toDate: '2024-01-31', none: 3, new: 22, connected: 40, interested: 30, registered: 16, notInterested: 11, justEnquiry: 6, plusOne: 4, detailsShared: 18, plusTwoCall: 3, neetAfter: 2, seminarInt: 4, nursingPg: 2, fridayWeb: 3, plusTwo2027: 3, mbbs: 4, webinarGform: 5, webinarAtt: 6, junkForm: 3, junkHindi: 2, webinarFollow: 2, webinarLost: 2, dnd: 2, later: 3, empty: 4, total: 189 },
    // { id: 7, source: 'Email Campaign', fromDate: '2024-01-01', toDate: '2024-01-31', none: 2, new: 10, connected: 20, interested: 15, registered: 10, notInterested: 6, justEnquiry: 4, plusOne: 2, detailsShared: 10, plusTwoCall: 2, neetAfter: 1, seminarInt: 2, nursingPg: 1, fridayWeb: 1, plusTwo2027: 2, mbbs: 2, webinarGform: 2, webinarAtt: 3, junkForm: 2, junkHindi: 1, webinarFollow: 1, webinarLost: 1, dnd: 1, later: 2, empty: 2, total: 98 },
    // { id: 8, source: 'Seminar', fromDate: '2024-01-01', toDate: '2024-01-31', none: 1, new: 8, connected: 15, interested: 12, registered: 8, notInterested: 5, justEnquiry: 3, plusOne: 2, detailsShared: 8, plusTwoCall: 1, neetAfter: 1, seminarInt: 2, nursingPg: 1, fridayWeb: 1, plusTwo2027: 1, mbbs: 2, webinarGform: 2, webinarAtt: 3, junkForm: 1, junkHindi: 1, webinarFollow: 1, webinarLost: 1, dnd: 1, later: 1, empty: 2, total: 76 },
];
const sortOptions = [
    { value: '', label: 'All' },
    { value: 'assignedDate', label: 'Assigned Date' },
    { value: 'createdDate', label: 'Created Date' },
];
const agentOptions = [
    { value: '', label: 'Select Agent' },
    { value: 'all', label: 'All Agents' },
    { value: 'john', label: 'John Doe' },
    { value: 'jane', label: 'Jane Smith' },
    { value: 'mike', label: 'Mike Johnson' },
];
const sourceOptions = [
    { value: '', label: 'Select Source' },
    { value: 'all', label: 'All Sources' },
    { value: 'website', label: 'Website' },
    { value: 'meta', label: 'Meta Campaign' },
    { value: 'referral', label: 'Referral' },
    { value: 'whatsapp', label: 'Incoming Call / WhatsApp' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'google', label: 'Google Ads' },
    { value: 'email', label: 'Email Campaign' },
    { value: 'seminar', label: 'Seminar' },
];
const columns = [
    { key: 'select', label: 'Select' },
    { key: 'action', label: 'Action' },
    { key: 'slNo', label: 'SL No' },
    { key: 'source', label: 'Source', sortable: true },
    { key: 'fromDate', label: 'From Date', sortable: true },
    { key: 'toDate', label: 'To Date', sortable: true },
    { key: 'none', label: 'None', sortable: true },
    { key: 'new', label: 'New', sortable: true },
    { key: 'connected', label: 'Connected', sortable: true },
    { key: 'interested', label: 'Interested', sortable: true },
    { key: 'registered', label: 'Registered', sortable: true },
    { key: 'notInterested', label: 'Not Interested', sortable: true },
    { key: 'justEnquiry', label: 'Just Enquiry', sortable: true },
    { key: 'plusOne', label: 'Plus One', sortable: true },
    { key: 'detailsShared', label: 'Details Shared', sortable: true },
    { key: 'plusTwoCall', label: 'Plus Two Call', sortable: true },
    { key: 'neetAfter', label: 'NEET After', sortable: true },
    { key: 'seminarInt', label: 'Seminar Int', sortable: true },
    { key: 'nursingPg', label: 'Nursing PG', sortable: true },
    { key: 'fridayWeb', label: 'Friday Web', sortable: true },
    { key: 'plusTwo2027', label: 'Plus Two 2027', sortable: true },
    { key: 'mbbs', label: 'MBBS Doing', sortable: true },
    { key: 'webinarGform', label: 'Web GForm', sortable: true },
    { key: 'webinarAtt', label: 'Web Attended', sortable: true },
    { key: 'junkForm', label: 'Junk Form', sortable: true },
    { key: 'junkHindi', label: 'Junk Hindi', sortable: true },
    { key: 'webinarFollow', label: 'Web Follow', sortable: true },
    { key: 'webinarLost', label: 'Web Lost', sortable: true },
    { key: 'dnd', label: 'DND', sortable: true },
    { key: 'later', label: 'Later', sortable: true },
    { key: 'empty', label: 'Empty Status', sortable: true },
    { key: 'total', label: 'Total Leads', sortable: true },
];
const LeadSourceWise = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: 'source', direction: 'asc' });
    const [actionMenuOpen, setActionMenuOpen] = useState(null);
    const [actionMenuPosition, setActionMenuPosition] = useState({ vertical: 'bottom', horizontal: 'right' });
    const actionMenuRefs = useRef({});
    const [filters, setFiltersState] = useState({
        dateRange: { start: '', end: '' },
        sortBy: '',
        agentId: '',
        selectSource: ''
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
        let data = [...sourceWiseData];
        if (searchQuery) {
            data = data.filter(item => item.source.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        if (filters.agentId) {
            data = data.filter(item => item.agentId === filters.agentId);
        }
        if (filters.selectSource) {
            data = data.filter(item => item.source === filters.selectSource);
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
        setFiltersState({ dateRange: { start: '', end: '' }, sortBy: '', agentId: '', selectSource: '' });
        setShowFilters(false);
    };
    const handleExport = () => {
        const headers = columns.map(c => c.label);
        const csvContent = [headers.join(','), ...sourceWiseData.map((d, idx) => [
                idx + 1, d.source, d.fromDate, d.toDate, d.none, d.new, d.connected, d.interested, d.registered, d.notInterested, d.justEnquiry, d.plusOne, d.detailsShared, d.plusTwoCall, d.neetAfter, d.seminarInt, d.nursingPg, d.fridayWeb, d.plusTwo2027, d.mbbs, d.webinarGform, d.webinarAtt, d.junkForm, d.junkHindi, d.webinarFollow, d.webinarLost, d.dnd, d.later, d.empty, d.total
            ].join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'source_wise_report.csv';
        link.click();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Report generated successfully!');
    };
    const grandTotal = sourceWiseData.reduce((sum, item) => sum + item.total, 0);
    return (_jsxs("div", { className: "enquiries-page", children: [_jsxs("div", { className: "enquiries-toolbar", children: [_jsxs("div", { className: "toolbar-left", children: [_jsxs("button", { className: "btn btn-secondary", onClick: handleExport, children: [_jsx(Download, { size: 16 }), "Export"] }), _jsxs("button", { className: `btn btn-secondary ${showFilters ? 'active' : ''}`, onClick: () => setShowFilters(!showFilters), children: [_jsx(Filter, { size: 16 }), "Filter", _jsx(ChevronDown, { size: 14, className: showFilters ? 'rotate' : '' })] })] }), _jsx("div", { className: "toolbar-right", children: _jsxs("div", { className: "search-box", children: [_jsx(Search, { size: 16, className: "search-icon" }), _jsx("input", { type: "text", placeholder: "Search...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "search-input" })] }) })] }), showFilters && (_jsx("div", { className: "filters-panel", children: _jsxs("form", { id: "getReport", onSubmit: handleSubmit, children: [_jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Date Range" }), _jsxs("div", { className: "date-range-input", children: [_jsx("input", { type: "date", value: filters.dateRange.start, onChange: (e) => setFiltersState({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } }), placeholder: "Start" }), _jsx("span", { children: "to" }), _jsx("input", { type: "date", value: filters.dateRange.end, onChange: (e) => setFiltersState({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } }), placeholder: "End" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Sort By" }), _jsx("select", { value: filters.sortBy, onChange: (e) => setFiltersState({ ...filters, sortBy: e.target.value }), children: sortOptions.map(opt => (_jsx("option", { value: opt.value, children: opt.label }, opt.value))) })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Agent" }), _jsx("select", { value: filters.agentId, onChange: (e) => setFiltersState({ ...filters, agentId: e.target.value }), children: agentOptions.map(opt => (_jsx("option", { value: opt.value, children: opt.label }, opt.value))) })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Select Source" }), _jsx("select", { value: filters.selectSource, onChange: (e) => setFiltersState({ ...filters, selectSource: e.target.value }), children: sourceOptions.map(opt => (_jsx("option", { value: opt.value, children: opt.label }, opt.value))) })] })] }), _jsx("div", { className: "filter-row", children: _jsxs("div", { className: "filter-actions", children: [_jsx("button", { type: "submit", className: "btn btn-primary", children: "Submit" }), _jsx("button", { type: "button", className: "btn btn-secondary", onClick: clearFilters, children: "Clear" })] }) })] }) })), _jsx("div", { className: "table-container", children: _jsx("div", { className: "table-scroll-container", children: _jsxs("table", { className: "enquiries-table", children: [_jsx("thead", { children: _jsx("tr", { children: columns.map(col => (_jsx("th", { className: col.sortable ? 'sortable' : '', onClick: col.sortable ? () => handleSort(col.key) : undefined, children: col.key === 'checkbox' ? (_jsx("input", { type: "checkbox", checked: paginatedData.length > 0 && selectedRows.length === paginatedData.length, onChange: handleSelectAll })) : (_jsxs(_Fragment, { children: [col.label, col.sortable && sortConfig.key === col.key && (sortConfig.direction === 'asc' ? _jsx(ChevronDown, { size: 14 }) : _jsx(ChevronDown, { size: 14, style: { transform: 'rotate(180deg)' } }))] })) }, col.key))) }) }), _jsx("tbody", { children: paginatedData.map((row, index) => (_jsxs("tr", { children: [_jsx("td", { children: _jsx("input", { type: "checkbox", checked: selectedRows.includes(row.id), onChange: () => handleSelectRow(row.id) }) }), _jsx("td", { className: "action-cell", children: _jsxs("div", { className: "action-menu-container", children: [_jsx("button", { className: "action-btn", ref: (el) => (actionMenuRefs.current[row.id] = el), onClick: () => { if (actionMenuOpen === row.id) {
                                                            setActionMenuOpen(null);
                                                        }
                                                        else {
                                                            const pos = calculateDropdownPosition(actionMenuRefs.current[row.id]);
                                                            setActionMenuPosition(pos);
                                                            setActionMenuOpen(row.id);
                                                        } }, children: _jsx(MoreHorizontal, { size: 16 }) }), actionMenuOpen === row.id && (_jsx("div", { className: `action-dropdown ${actionMenuPosition.vertical === 'top' ? 'dropup' : ''} ${actionMenuPosition.horizontal === 'left' ? 'dropleft' : ''}`, children: _jsx("button", { onClick: () => alert(`Viewing details for: ${row.source}`), children: "View Details" }) }))] }) }), _jsx("td", { children: index + 1 }), _jsx("td", { className: "lead-name-cell", children: row.source }), _jsx("td", { children: row.fromDate }), _jsx("td", { children: row.toDate }), _jsx("td", { children: row.none }), _jsx("td", { children: row.new }), _jsx("td", { children: row.connected }), _jsx("td", { children: _jsx("span", { className: "badge badge-active", children: row.interested }) }), _jsx("td", { children: _jsx("span", { className: "badge badge-pending", children: row.registered }) }), _jsx("td", { children: _jsx("span", { className: "badge badge-inactive", children: row.notInterested }) }), _jsx("td", { children: row.justEnquiry }), _jsx("td", { children: row.plusOne }), _jsx("td", { children: row.detailsShared }), _jsx("td", { children: row.plusTwoCall }), _jsx("td", { children: row.neetAfter }), _jsx("td", { children: row.seminarInt }), _jsx("td", { children: row.nursingPg }), _jsx("td", { children: row.fridayWeb }), _jsx("td", { children: row.plusTwo2027 }), _jsx("td", { children: row.mbbs }), _jsx("td", { children: row.webinarGform }), _jsx("td", { children: row.webinarAtt }), _jsx("td", { children: row.junkForm }), _jsx("td", { children: row.junkHindi }), _jsx("td", { children: row.webinarFollow }), _jsx("td", { children: row.webinarLost }), _jsx("td", { children: row.dnd }), _jsx("td", { children: row.later }), _jsx("td", { children: row.empty }), _jsx("td", { children: _jsx("strong", { children: row.total }) })] }, row.id))) }), _jsx("tfoot", { children: _jsxs("tr", { children: [_jsx("td", { colSpan: 4 }), _jsx("td", { colSpan: 24, children: _jsx("strong", { children: "Total Leads" }) }), _jsx("td", { children: _jsx("strong", { children: grandTotal }) })] }) })] }) }) }), _jsxs("div", { className: "pagination-container", children: [_jsxs("div", { className: "pagination-left", children: [_jsx("span", { className: "rows-label", children: "Rows per page:" }), _jsxs("select", { value: rowsPerPage, onChange: handleRowsPerPageChange, className: "rows-select", children: [_jsx("option", { value: 10, children: "10" }), _jsx("option", { value: 25, children: "25" }), _jsx("option", { value: 50, children: "50" })] }), _jsxs("span", { className: "pagination-info", children: ["Showing ", startIndex + 1, "-", Math.min(startIndex + rowsPerPage, filteredData.length), " of ", filteredData.length] })] }), _jsxs("div", { className: "pagination-right", children: [_jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(1), children: "First" }), _jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(prev => prev - 1), children: _jsx(ChevronLeft, { size: 16 }) }), _jsxs("span", { className: "page-indicator", children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(prev => prev + 1), children: _jsx(ChevronRight, { size: 16 }) }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(totalPages), children: "Last" })] })] })] }));
};
export default LeadSourceWise;
//# sourceMappingURL=LeadSourceWise.js.map