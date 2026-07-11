import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useEffect, useRef } from 'react';
import { Download, RefreshCw, Filter, Search, ChevronDown, ChevronLeft, ChevronRight, Users, UserCheck, UserPlus, UserMinus, MoreHorizontal } from 'lucide-react';
import '../../pages/Enquiries.css';
const statusData = [
    { id: 1, agentName: 'John Doe', initials: 'JD', total: 156, new: 25, connected: 45, interested: 32, registered: 18, notInterested: 12, justEnquiry: 8, detailsShared: 22, webinarAttended: 5, lost: 8, dnd: 3, later: 4 },
    { id: 2, agentName: 'Jane Smith', initials: 'JS', total: 142, new: 18, connected: 38, interested: 28, registered: 15, notInterested: 10, justEnquiry: 6, detailsShared: 18, webinarAttended: 4, lost: 6, dnd: 2, later: 3 },
    { id: 3, agentName: 'Mike Johnson', initials: 'MJ', total: 198, new: 35, connected: 52, interested: 42, registered: 25, notInterested: 15, justEnquiry: 12, detailsShared: 28, webinarAttended: 8, lost: 12, dnd: 4, later: 5 },
    { id: 4, agentName: 'Sarah Williams', initials: 'SW', total: 124, new: 20, connected: 35, interested: 25, registered: 14, notInterested: 8, justEnquiry: 5, detailsShared: 15, webinarAttended: 3, lost: 5, dnd: 2, later: 2 },
    { id: 5, agentName: 'Rahul Sharma', initials: 'RS', total: 167, new: 28, connected: 48, interested: 35, registered: 20, notInterested: 14, justEnquiry: 9, detailsShared: 20, webinarAttended: 6, lost: 9, dnd: 3, later: 4 },
    { id: 6, agentName: 'Priya Patel', initials: 'PP', total: 145, new: 22, connected: 40, interested: 30, registered: 17, notInterested: 11, justEnquiry: 7, detailsShared: 19, webinarAttended: 4, lost: 7, dnd: 2, later: 3 },
    { id: 7, agentName: 'Amit Kumar', initials: 'AK', total: 189, new: 32, connected: 50, interested: 38, registered: 22, notInterested: 13, justEnquiry: 11, detailsShared: 25, webinarAttended: 7, lost: 11, dnd: 4, later: 4 },
    { id: 8, agentName: 'Sneha Reddy', initials: 'SR', total: 132, new: 19, connected: 36, interested: 26, registered: 15, notInterested: 9, justEnquiry: 6, detailsShared: 16, webinarAttended: 4, lost: 6, dnd: 2, later: 3 },
    { id: 9, agentName: 'Vikram Singh', initials: 'VS', total: 156, new: 24, connected: 42, interested: 31, registered: 18, notInterested: 12, justEnquiry: 8, detailsShared: 18, webinarAttended: 5, lost: 8, dnd: 3, later: 3 },
    { id: 10, agentName: 'Ananya Gupta', initials: 'AG', total: 178, new: 30, connected: 48, interested: 36, registered: 21, notInterested: 13, justEnquiry: 10, detailsShared: 23, webinarAttended: 6, lost: 10, dnd: 3, later: 4 },
];
const statsCards = [
    { key: 'total', label: 'Total Leads', value: 1587, icon: Users, color: '#3b82f6', change: '+12%' },
    { key: 'interested', label: 'Interested Leads', value: 323, icon: UserCheck, color: '#10b981', change: '+8%' },
    { key: 'registered', label: 'Registered Leads', value: 185, icon: UserPlus, color: '#8b5cf6', change: '+15%' },
    { key: 'notInterested', label: 'Not Interested', value: 117, icon: UserMinus, color: '#ef4444', change: '-5%' },
];
const columns = [
    { key: 'checkbox', label: '' },
    { key: 'action', label: 'Action' },
    { key: 'agentName', label: 'Agent Name', sortable: true },
    { key: 'total', label: 'Total', sortable: true },
    { key: 'new', label: 'New', sortable: true },
    { key: 'connected', label: 'Connected', sortable: true },
    { key: 'interested', label: 'Interested', sortable: true },
    { key: 'registered', label: 'Registered', sortable: true },
    { key: 'notInterested', label: 'Not Interested', sortable: true },
    { key: 'justEnquiry', label: 'Just Enquiry', sortable: true },
    { key: 'detailsShared', label: 'Details Shared', sortable: true },
    { key: 'webinarAttended', label: 'Webinar', sortable: true },
    { key: 'lost', label: 'Lost', sortable: true },
    { key: 'dnd', label: 'DND', sortable: true },
    { key: 'later', label: 'Later', sortable: true }
];
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
        source: ''
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
        if (filters.leadType) {
            data = data.filter(item => item.leadType === filters.leadType);
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
        setFilters({ dateRange: { start: '', end: '' }, sortBy: '', staff: '', leadType: '', purpose: '', source: '' });
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
    return (_jsxs("div", { className: "enquiries-page", children: [_jsx("div", { className: "stats-cards-grid", children: statsCards.map((stat) => (_jsxs("div", { className: "stats-card", children: [_jsx("div", { className: "stats-card-icon", style: { backgroundColor: `${stat.color}15`, color: stat.color }, children: _jsx(stat.icon, { size: 20 }) }), _jsxs("div", { className: "stats-card-content", children: [_jsx("span", { className: "stats-card-value", children: stat.value }), _jsx("span", { className: "stats-card-label", children: stat.label })] }), _jsx("span", { className: "stats-card-change", style: { color: stat.change.startsWith('+') ? '#10b981' : '#ef4444' }, children: stat.change })] }, stat.key))) }), _jsxs("div", { className: "enquiries-toolbar", children: [_jsxs("div", { className: "toolbar-left", children: [_jsxs("button", { className: "btn btn-secondary", onClick: handleExport, children: [_jsx(Download, { size: 16 }), "Export"] }), _jsxs("button", { className: `btn btn-secondary ${showFilters ? 'active' : ''}`, onClick: () => setShowFilters(!showFilters), children: [_jsx(Filter, { size: 16 }), "Filter", _jsx(ChevronDown, { size: 14, className: showFilters ? 'rotate' : '' })] })] }), _jsx("div", { className: "toolbar-right", children: _jsxs("div", { className: "search-box", children: [_jsx(Search, { size: 16, className: "search-icon" }), _jsx("input", { type: "text", placeholder: "Search reports...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "search-input" })] }) })] }), showFilters && (_jsxs("div", { className: "filters-panel", children: [_jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Date Range" }), _jsxs("div", { className: "date-range-input", children: [_jsx("input", { type: "date", value: filters.dateRange.start, onChange: (e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } }), placeholder: "Start" }), _jsx("span", { children: "to" }), _jsx("input", { type: "date", value: filters.dateRange.end, onChange: (e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } }), placeholder: "End" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Sort By" }), _jsxs("select", { value: filters.sortBy, onChange: (e) => setFilters({ ...filters, sortBy: e.target.value }), children: [_jsx("option", { value: "", children: "All" }), _jsx("option", { value: "assignedDate", children: "Assigned Date" }), _jsx("option", { value: "createdDate", children: "Created Date" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Status" }), _jsxs("select", { value: filters.status, onChange: (e) => setFilters({ ...filters, status: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), _jsx("option", { value: "new", children: "New" }), _jsx("option", { value: "connected", children: "Connected" }), _jsx("option", { value: "interested", children: "Interested" }), _jsx("option", { value: "registered", children: "Registered" }), _jsx("option", { value: "notInterested", children: "Not Interested" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Select Staff" }), _jsxs("select", { value: filters.staff, onChange: (e) => setFilters({ ...filters, staff: e.target.value }), children: [_jsx("option", { value: "", children: "All Staff" }), _jsx("option", { value: "john", children: "John Doe" }), _jsx("option", { value: "jane", children: "Jane Smith" }), _jsx("option", { value: "mike", children: "Mike Johnson" })] })] })] }), _jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Lead Type" }), _jsxs("select", { value: filters.leadType, onChange: (e) => setFilters({ ...filters, leadType: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), _jsx("option", { value: "hot", children: "Hot Lead" }), _jsx("option", { value: "warm", children: "Warm Lead" }), _jsx("option", { value: "cold", children: "Cold Lead" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Purpose" }), _jsxs("select", { value: filters.purpose, onChange: (e) => setFilters({ ...filters, purpose: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), _jsx("option", { value: "sales", children: "Sales" }), _jsx("option", { value: "support", children: "Support" }), _jsx("option", { value: "demo", children: "Demo" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Source" }), _jsxs("select", { value: filters.source, onChange: (e) => setFilters({ ...filters, source: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), _jsx("option", { value: "website", children: "Website" }), _jsx("option", { value: "referral", children: "Referral" }), _jsx("option", { value: "social", children: "Social Media" })] })] }), _jsxs("div", { className: "filter-actions", children: [_jsx("button", { className: "btn btn-primary", children: "Filter" }), _jsx("button", { className: "btn btn-secondary", onClick: clearFilters, children: "Clear" })] })] })] })), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "enquiries-table", children: [_jsx("thead", { children: _jsx("tr", { children: columns.map(col => (_jsx("th", { className: col.sortable ? 'sortable' : '', onClick: col.sortable ? () => handleSort(col.key) : undefined, children: col.key === 'checkbox' ? (_jsx("input", { type: "checkbox", checked: paginatedData.length > 0 && selectedRows.length === paginatedData.length, onChange: handleSelectAll })) : (_jsxs(_Fragment, { children: [col.label, col.sortable && sortConfig.key === col.key && (sortConfig.direction === 'asc' ? _jsx(ChevronDown, { size: 14 }) : _jsx(ChevronDown, { size: 14, style: { transform: 'rotate(180deg)' } }))] })) }, col.key))) }) }), _jsx("tbody", { children: paginatedData.map((row, index) => (_jsxs("tr", { children: [_jsx("td", { children: _jsx("input", { type: "checkbox", checked: selectedRows.includes(row.id), onChange: () => handleSelectRow(row.id) }) }), _jsx("td", { className: "action-cell", children: _jsxs("div", { className: "action-menu-container", children: [_jsx("button", { className: "action-btn", ref: (el) => (actionMenuRefs.current[row.id] = el), onClick: () => { if (actionMenuOpen === row.id) {
                                                        setActionMenuOpen(null);
                                                    }
                                                    else {
                                                        const pos = calculateDropdownPosition(actionMenuRefs.current[row.id]);
                                                        setActionMenuPosition(pos);
                                                        setActionMenuOpen(row.id);
                                                    } }, children: _jsx(MoreHorizontal, { size: 16 }) }), actionMenuOpen === row.id && (_jsx("div", { className: `action-dropdown ${actionMenuPosition.vertical === 'top' ? 'dropup' : ''} ${actionMenuPosition.horizontal === 'left' ? 'dropleft' : ''}`, children: _jsx("button", { onClick: () => { alert(`Viewing details for: ${row.agentName}`); setActionMenuOpen(null); }, children: "View Details" }) }))] }) }), _jsx("td", { children: _jsxs("div", { className: "agent-cell", children: [_jsx("div", { className: "agent-avatar", children: row.initials }), _jsx("span", { className: "agent-name", children: row.agentName })] }) }), _jsx("td", { children: _jsx("strong", { children: row.total }) }), _jsx("td", { children: row.new }), _jsx("td", { children: row.connected }), _jsx("td", { children: _jsx("span", { className: "badge badge-active", children: row.interested }) }), _jsx("td", { children: _jsx("span", { className: "badge badge-pending", children: row.registered }) }), _jsx("td", { children: _jsx("span", { className: "badge badge-inactive", children: row.notInterested }) }), _jsx("td", { children: row.justEnquiry }), _jsx("td", { children: row.detailsShared }), _jsx("td", { children: row.webinarAttended }), _jsx("td", { children: _jsx("span", { className: "badge badge-cold-lead", children: row.lost }) }), _jsx("td", { children: row.dnd }), _jsx("td", { children: row.later })] }, row.id))) })] }) }), _jsxs("div", { className: "pagination-container", children: [_jsxs("div", { className: "pagination-left", children: [_jsx("span", { className: "rows-label", children: "Rows per page:" }), _jsxs("select", { value: rowsPerPage, onChange: handleRowsPerPageChange, className: "rows-select", children: [_jsx("option", { value: 10, children: "10" }), _jsx("option", { value: 25, children: "25" }), _jsx("option", { value: 50, children: "50" })] }), _jsxs("span", { className: "pagination-info", children: ["Showing ", startIndex + 1, "-", Math.min(startIndex + rowsPerPage, filteredData.length), " of ", filteredData.length] })] }), _jsxs("div", { className: "pagination-right", children: [_jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(1), children: "First" }), _jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(prev => prev - 1), children: _jsx(ChevronLeft, { size: 16 }) }), _jsxs("span", { className: "page-indicator", children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(prev => prev + 1), children: _jsx(ChevronRight, { size: 16 }) }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(totalPages), children: "Last" })] })] })] }));
};
export default LeadStatusWise;
//# sourceMappingURL=LeadStatusWise.js.map