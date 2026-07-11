import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useRef } from 'react';
import { Download, Filter, Search, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import '../../pages/Enquiries.css';
const checkoutData = [
    { id: 1, shop: 'Shop A', agent: 'John Doe', note: 'Checkout completed', date: '2024-01-25' },
    { id: 2, shop: 'Shop B', agent: 'Jane Smith', note: 'All tasks finished', date: '2024-01-25' },
    { id: 3, shop: 'Shop A', agent: 'Mike Johnson', note: 'Pending work tomorrow', date: '2024-01-24' },
    { id: 4, shop: 'Shop C', agent: 'Sarah Williams', note: 'Early checkout', date: '2024-01-24' },
    { id: 5, shop: 'Shop B', agent: 'John Doe', note: 'Completed', date: '2024-01-23' },
    { id: 6, shop: 'Shop A', agent: 'Priya Patel', note: 'Done', date: '2024-01-23' },
    { id: 7, shop: 'Shop C', agent: 'Amit Kumar', note: 'Work in progress', date: '2024-01-22' },
    { id: 8, shop: 'Shop B', agent: 'Sneha Reddy', note: 'Finished', date: '2024-01-22' },
    { id: 9, shop: 'Shop A', agent: 'Vikram Singh', note: 'All done', date: '2024-01-21' },
    { id: 10, shop: 'Shop C', agent: 'Ananya Gupta', note: 'Checkout', date: '2024-01-21' },
];
const staffOptions = [
    { value: '', label: 'Select Staff' },
    { value: 'all', label: 'All Staff' },
    { value: 'john', label: 'John Doe' },
    { value: 'jane', label: 'Jane Smith' },
    { value: 'mike', label: 'Mike Johnson' },
    { value: 'sarah', label: 'Sarah Williams' },
];
const columns = [
    { key: 'checkbox', label: '' },
    { key: 'action', label: 'Action' },
    { key: 'shop', label: 'Shop', sortable: true },
    { key: 'agent', label: 'Agent', sortable: true },
    { key: 'note', label: 'Note', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
];
const LeadCheckoutSummary = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
    const [actionMenuOpen, setActionMenuOpen] = useState(null);
    const [actionMenuPosition, setActionMenuPosition] = useState({ vertical: 'bottom', horizontal: 'right' });
    const actionMenuRefs = useRef({});
    const [filters, setFiltersState] = useState({
        fromDate: '',
        toDate: '',
        staffId: ''
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
        let data = [...checkoutData];
        if (searchQuery) {
            data = data.filter(item => item.shop.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.agent.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.note.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        if (filters.staffId) {
            data = data.filter(item => item.agent === filters.staffId);
        }
        if (filters.fromDate) {
            data = data.filter(item => item.date >= filters.fromDate);
        }
        if (filters.toDate) {
            data = data.filter(item => item.date <= filters.toDate);
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
        setFiltersState({ fromDate: '', toDate: '', staffId: '' });
        setShowFilters(false);
    };
    const handleExport = () => {
        const headers = ['Shop', 'Agent', 'Note', 'Date'];
        const csvContent = [headers.join(','), ...checkoutData.map(d => [d.shop, d.agent, d.note, d.date].join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'checkout_summary.csv';
        link.click();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Report generated successfully!');
    };
    return (_jsxs("div", { className: "enquiries-page", children: [_jsxs("div", { className: "enquiries-toolbar", children: [_jsxs("div", { className: "toolbar-left", children: [_jsxs("button", { className: "btn btn-secondary", onClick: handleExport, children: [_jsx(Download, { size: 16 }), "Export"] }), _jsxs("button", { className: `btn btn-secondary ${showFilters ? 'active' : ''}`, onClick: () => setShowFilters(!showFilters), children: [_jsx(Filter, { size: 16 }), "Filter", _jsx(ChevronDown, { size: 14, className: showFilters ? 'rotate' : '' })] })] }), _jsx("div", { className: "toolbar-right", children: _jsxs("div", { className: "search-box", children: [_jsx(Search, { size: 16, className: "search-icon" }), _jsx("input", { type: "text", placeholder: "Search...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "search-input" })] }) })] }), showFilters && (_jsx("div", { className: "filters-panel", children: _jsxs("form", { id: "getReport", onSubmit: handleSubmit, children: [_jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "From Date" }), _jsx("input", { type: "date", value: filters.fromDate, onChange: (e) => setFiltersState({ ...filters, fromDate: e.target.value }) })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "To Date" }), _jsx("input", { type: "date", value: filters.toDate, onChange: (e) => setFiltersState({ ...filters, toDate: e.target.value }) })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Select Staff" }), _jsx("select", { value: filters.staffId, onChange: (e) => setFiltersState({ ...filters, staffId: e.target.value }), children: staffOptions.map(opt => (_jsx("option", { value: opt.value, children: opt.label }, opt.value))) })] })] }), _jsx("div", { className: "filter-row", children: _jsxs("div", { className: "filter-actions", children: [_jsx("button", { type: "submit", className: "btn btn-primary", children: "Submit" }), _jsx("button", { type: "button", className: "btn btn-secondary", onClick: clearFilters, children: "Clear" })] }) })] }) })), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "enquiries-table", children: [_jsx("thead", { children: _jsx("tr", { children: columns.map(col => (_jsx("th", { className: col.sortable ? 'sortable' : '', onClick: col.sortable ? () => handleSort(col.key) : undefined, children: col.key === 'checkbox' ? (_jsx("input", { type: "checkbox", checked: paginatedData.length > 0 && selectedRows.length === paginatedData.length, onChange: handleSelectAll })) : (_jsxs(_Fragment, { children: [col.label, col.sortable && sortConfig.key === col.key && (sortConfig.direction === 'asc' ? _jsx(ChevronDown, { size: 14 }) : _jsx(ChevronDown, { size: 14, style: { transform: 'rotate(180deg)' } }))] })) }, col.key))) }) }), _jsx("tbody", { children: paginatedData.map((row, index) => (_jsxs("tr", { children: [_jsx("td", { children: _jsx("input", { type: "checkbox", checked: selectedRows.includes(row.id), onChange: () => handleSelectRow(row.id) }) }), _jsx("td", { className: "action-cell", children: _jsxs("div", { className: "action-menu-container", children: [_jsx("button", { className: "action-btn", ref: (el) => (actionMenuRefs.current[row.id] = el), onClick: () => { if (actionMenuOpen === row.id) {
                                                        setActionMenuOpen(null);
                                                    }
                                                    else {
                                                        const pos = calculateDropdownPosition(actionMenuRefs.current[row.id]);
                                                        setActionMenuPosition(pos);
                                                        setActionMenuOpen(row.id);
                                                    } }, children: _jsx(MoreHorizontal, { size: 16 }) }), actionMenuOpen === row.id && (_jsx("div", { className: `action-dropdown ${actionMenuPosition.vertical === 'top' ? 'dropup' : ''} ${actionMenuPosition.horizontal === 'left' ? 'dropleft' : ''}`, children: _jsx("button", { onClick: () => alert(`Viewing details for: ${row.agent}`), children: "View Details" }) }))] }) }), _jsx("td", { className: "lead-name-cell", children: row.shop }), _jsx("td", { children: row.agent }), _jsx("td", { children: row.note }), _jsx("td", { children: row.date })] }, row.id))) })] }) }), _jsxs("div", { className: "pagination-container", children: [_jsxs("div", { className: "pagination-left", children: [_jsx("span", { className: "rows-label", children: "Rows per page:" }), _jsxs("select", { value: rowsPerPage, onChange: handleRowsPerPageChange, className: "rows-select", children: [_jsx("option", { value: 10, children: "10" }), _jsx("option", { value: 25, children: "25" }), _jsx("option", { value: 50, children: "50" })] }), _jsxs("span", { className: "pagination-info", children: ["Showing ", startIndex + 1, "-", Math.min(startIndex + rowsPerPage, filteredData.length), " of ", filteredData.length] })] }), _jsxs("div", { className: "pagination-right", children: [_jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(1), children: "First" }), _jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(prev => prev - 1), children: _jsx(ChevronLeft, { size: 16 }) }), _jsxs("span", { className: "page-indicator", children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(prev => prev + 1), children: _jsx(ChevronRight, { size: 16 }) }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(totalPages), children: "Last" })] })] })] }));
};
export default LeadCheckoutSummary;
//# sourceMappingURL=LeadCheckoutSummary.js.map