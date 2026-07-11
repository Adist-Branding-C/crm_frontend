import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useRef } from 'react';
import { Download, RefreshCw, Filter, Search, ChevronDown, ChevronLeft, ChevronRight, UserCheck, MoreHorizontal, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../pages/Enquiries.css';
const statusChangeData = [
    { id: 1, agentName: 'John Doe', total: 45 },
    { id: 2, agentName: 'Jane Smith', total: 38 },
    { id: 3, agentName: 'Mike Johnson', total: 52 },
    { id: 4, agentName: 'Sarah Williams', total: 28 },
    { id: 5, agentName: 'Rahul Sharma', total: 35 },
    { id: 6, agentName: 'Priya Patel', total: 22 },
    { id: 7, agentName: 'Amit Kumar', total: 41 },
    { id: 8, agentName: 'Sneha Reddy', total: 18 },
    { id: 9, agentName: 'Vikram Singh', total: 29 },
];
const statusOptions = [
    { value: '', label: 'Select' },
    { value: 'new', label: 'New' },
    { value: 'connected', label: 'Connected' },
    { value: 'interested', label: 'Interested' },
    { value: 'registered', label: 'Registered' },
    { value: 'notInterested', label: 'Not Interested' },
    { value: 'justEnquiry', label: 'Just Enquiry - try after few days' },
    { value: 'detailsShared', label: 'Details Shared' },
    { value: 'webinar', label: 'Webinar Attended' },
    { value: 'junkLead', label: 'Junk Lead' },
    { value: 'dnd', label: 'DND - NA/ Off/ Invalid' },
    { value: 'later', label: 'Later Admission' },
];
const staffOptions = [
    { value: '', label: 'Select Staff' },
    { value: 'all', label: 'All' },
    { value: '7774', label: 'Dr Expert Edulinks' },
    { value: '7775', label: 'Fida Fathima' },
    { value: '7776', label: 'Nandana K' },
    { value: '7777', label: 'Rameesa' },
    { value: '7778', label: 'Aysha' },
    { value: '7779', label: 'Nesri' },
    { value: '7789', label: 'Dilshana' },
    { value: '8473', label: 'Rahmath' },
    { value: '8640', label: 'Lana' },
];
const sourceOptions = [
    { value: '', label: 'Select Enquiry Source' },
    { value: 'empty', label: 'Empty Source' },
    { value: '21143', label: 'Incoming Call / whatsapp' },
    { value: '21144', label: 'Meta Campaign' },
    { value: '21153', label: 'From Doctor' },
    { value: '21714', label: 'Website' },
    { value: '21767', label: 'Meta' },
    { value: '24424', label: 'Uzbekistan | Common | Kerala' },
    { value: '24425', label: 'Uzbekistan | Common | GCC' },
];
const totalLeads = statusChangeData.reduce((sum, item) => sum + item.total, 0);
const columns = [
    { key: 'checkbox', label: '' },
    { key: 'action', label: 'Action' },
    { key: 'agentName', label: 'Agent Name', sortable: true },
    { key: 'total', label: 'Total', sortable: true },
];
const LeadStatusChange = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: 'agentName', direction: 'asc' });
    const [actionMenuOpen, setActionMenuOpen] = useState(null);
    const [actionMenuPosition, setActionMenuPosition] = useState({ vertical: 'bottom', horizontal: 'right' });
    const actionMenuRefs = useRef({});
    const [filters, setFiltersState] = useState({
        dateRange: { start: '', end: '' },
        status: [],
        agentId: '',
        leadSource: ''
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
        let data = [...statusChangeData];
        if (searchQuery) {
            data = data.filter(item => item.agentName.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        if (filters.agentId) {
            data = data.filter(item => item.agentName === filters.agentId);
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
        setFiltersState({ dateRange: { start: '', end: '' }, status: [], agentId: '', leadSource: '' });
        setShowFilters(false);
    };
    const handleExport = () => {
        const headers = ['Agent Name', 'Total'];
        const csvContent = [headers.join(','), ...statusChangeData.map(d => [d.agentName, d.total].join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'status_change_report.csv';
        link.click();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Report generated successfully!');
    };
    return (_jsxs("div", { className: "enquiries-page", children: [_jsxs("div", { className: "enquiries-toolbar", children: [_jsxs("div", { className: "toolbar-left", children: [_jsxs("button", { className: "btn btn-secondary", onClick: handleExport, children: [_jsx(Download, { size: 16 }), "Export"] }), _jsxs("button", { className: `btn btn-secondary ${showFilters ? 'active' : ''}`, onClick: () => setShowFilters(!showFilters), children: [_jsx(Filter, { size: 16 }), "Filter", _jsx(ChevronDown, { size: 14, className: showFilters ? 'rotate' : '' })] })] }), _jsx("div", { className: "toolbar-right", children: _jsxs("div", { className: "search-box", children: [_jsx(Search, { size: 16, className: "search-icon" }), _jsx("input", { type: "text", placeholder: "Search...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "search-input" })] }) })] }), showFilters && (_jsx("div", { className: "filters-panel", children: _jsxs("form", { id: "getReport", onSubmit: handleSubmit, children: [_jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Date" }), _jsxs("div", { className: "date-range-input", children: [_jsx("input", { type: "date", value: filters.dateRange.start, onChange: (e) => setFiltersState({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } }), placeholder: "Start" }), _jsx("span", { children: "to" }), _jsx("input", { type: "date", value: filters.dateRange.end, onChange: (e) => setFiltersState({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } }), placeholder: "End" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Status" }), _jsx("select", { value: filters.status, onChange: (e) => setFiltersState({ ...filters, status: e.target.value }), children: statusOptions.map(opt => (_jsx("option", { value: opt.value, children: opt.label }, opt.value))) })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Staff" }), _jsx("select", { value: filters.agentId, onChange: (e) => setFiltersState({ ...filters, agentId: e.target.value }), children: staffOptions.map(opt => (_jsx("option", { value: opt.value, children: opt.label }, opt.value))) })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Enquiry Source" }), _jsx("select", { value: filters.leadSource, onChange: (e) => setFiltersState({ ...filters, leadSource: e.target.value }), children: sourceOptions.map(opt => (_jsx("option", { value: opt.value, children: opt.label }, opt.value))) })] })] }), _jsx("div", { className: "filter-row", children: _jsxs("div", { className: "filter-actions", children: [_jsx("button", { type: "submit", className: "btn btn-primary", children: "Submit" }), _jsx("button", { type: "button", className: "btn btn-secondary", onClick: clearFilters, children: "Clear" })] }) })] }) })), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "enquiries-table", children: [_jsx("thead", { children: _jsx("tr", { children: columns.map(col => (_jsx("th", { className: col.sortable ? 'sortable' : '', onClick: col.sortable ? () => handleSort(col.key) : undefined, children: col.key === 'checkbox' ? (_jsx("input", { type: "checkbox", checked: paginatedData.length > 0 && selectedRows.length === paginatedData.length, onChange: handleSelectAll })) : (_jsxs(_Fragment, { children: [col.label, col.sortable && sortConfig.key === col.key && (sortConfig.direction === 'asc' ? _jsx(ChevronDown, { size: 14 }) : _jsx(ChevronDown, { size: 14, style: { transform: 'rotate(180deg)' } }))] })) }, col.key))) }) }), _jsx("tbody", { children: paginatedData.map((row, index) => (_jsxs("tr", { children: [_jsx("td", { children: _jsx("input", { type: "checkbox", checked: selectedRows.includes(row.id), onChange: () => handleSelectRow(row.id) }) }), _jsx("td", { className: "action-cell", children: _jsxs("div", { className: "action-menu-container", children: [_jsx("button", { className: "action-btn", ref: (el) => (actionMenuRefs.current[row.id] = el), onClick: () => { if (actionMenuOpen === row.id) {
                                                        setActionMenuOpen(null);
                                                    }
                                                    else {
                                                        const pos = calculateDropdownPosition(actionMenuRefs.current[row.id]);
                                                        setActionMenuPosition(pos);
                                                        setActionMenuOpen(row.id);
                                                    } }, children: _jsx(MoreHorizontal, { size: 16 }) }), actionMenuOpen === row.id && (_jsx("div", { className: `action-dropdown ${actionMenuPosition.vertical === 'top' ? 'dropup' : ''} ${actionMenuPosition.horizontal === 'left' ? 'dropleft' : ''}`, children: _jsx("button", { onClick: () => alert(`Viewing details for: ${row.agentName}`), children: "View Details" }) }))] }) }), _jsx("td", { className: "lead-name-cell", children: row.agentName }), _jsx("td", { children: _jsx("strong", { children: row.total }) })] }, row.id))) }), _jsx("tfoot", { children: _jsxs("tr", { children: [_jsx("td", { colSpan: 2 }), _jsx("td", { children: _jsx("strong", { children: "Total" }) }), _jsx("td", { children: _jsx("strong", { children: totalLeads }) })] }) })] }) }), _jsxs("div", { className: "pagination-container", children: [_jsxs("div", { className: "pagination-left", children: [_jsx("span", { className: "rows-label", children: "Rows per page:" }), _jsxs("select", { value: rowsPerPage, onChange: handleRowsPerPageChange, className: "rows-select", children: [_jsx("option", { value: 10, children: "10" }), _jsx("option", { value: 25, children: "25" }), _jsx("option", { value: 50, children: "50" })] }), _jsxs("span", { className: "pagination-info", children: ["Showing ", startIndex + 1, "-", Math.min(startIndex + rowsPerPage, filteredData.length), " of ", filteredData.length] })] }), _jsxs("div", { className: "pagination-right", children: [_jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(1), children: "First" }), _jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(prev => prev - 1), children: _jsx(ChevronLeft, { size: 16 }) }), _jsxs("span", { className: "page-indicator", children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(prev => prev + 1), children: _jsx(ChevronRight, { size: 16 }) }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(totalPages), children: "Last" })] })] })] }));
};
export default LeadStatusChange;
//# sourceMappingURL=LeadStatusChange.js.map