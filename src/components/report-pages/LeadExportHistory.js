import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useRef } from 'react';
import { Download, RefreshCw, Filter, Search, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import '../../pages/Enquiries.css';
const exportHistoryData = [
    { id: 1, dateTime: '2024-01-25 10:30 AM', fileName: 'leads_export_25Jan2024', status: 'completed' },
    { id: 2, dateTime: '2024-01-25 09:15 AM', fileName: 'leads_export_24Jan2024', status: 'completed' },
    { id: 3, dateTime: '2024-01-24 04:45 PM', fileName: 'export_jan24', status: 'completed' },
    { id: 4, dateTime: '2024-01-24 02:20 PM', fileName: 'leads_backup', status: 'failed' },
    { id: 5, dateTime: '2024-01-23 11:00 AM', fileName: 'jan23_export', status: 'completed' },
    { id: 6, dateTime: '2024-01-23 10:00 AM', fileName: 'leads_23jan', status: 'generating' },
    { id: 7, dateTime: '2024-01-22 05:30 PM', fileName: 'weekly_export', status: 'completed' },
    { id: 8, dateTime: '2024-01-22 03:15 PM', fileName: 'leads_jan22', status: 'completed' },
    { id: 9, dateTime: '2024-01-21 09:45 AM', fileName: 'export_file', status: 'failed' },
    { id: 10, dateTime: '2024-01-20 04:00 PM', fileName: 'backup_jan20', status: 'completed' },
];
const columns = [
    { key: 'checkbox', label: '' },
    { key: 'action', label: 'Action' },
    { key: ' SL No', label: '#', sortable: false },
    { key: 'dateTime', label: 'Date and Time', sortable: true },
    { key: 'fileName', label: 'File Name', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'download', label: 'Download', sortable: false },
];
const LeadExportHistory = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: 'dateTime', direction: 'desc' });
    const [actionMenuOpen, setActionMenuOpen] = useState(null);
    const [actionMenuPosition, setActionMenuPosition] = useState({ vertical: 'bottom', horizontal: 'right' });
    const actionMenuRefs = useRef({});
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
        let data = [...exportHistoryData];
        if (searchQuery) {
            data = data.filter(item => item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.status.toLowerCase().includes(searchQuery.toLowerCase()));
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
    }, [searchQuery, sortConfig]);
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
    const getStatusBadge = (status) => {
        const statusClasses = {
            completed: 'badge-active',
            generating: 'badge-pending',
            failed: 'badge-inactive'
        };
        return statusClasses[status] || 'badge-inactive';
    };
    const handleDownload = (fileName) => {
        alert(`Downloading: ${fileName}`);
    };
    return (_jsxs("div", { className: "enquiries-page", children: [_jsxs("div", { className: "enquiries-toolbar", children: [_jsxs("div", { className: "toolbar-left", children: [_jsxs("button", { className: "btn btn-secondary", children: [_jsx(Download, { size: 16 }), "Export"] }), _jsxs("button", { className: "btn btn-secondary", children: [_jsx(RefreshCw, { size: 16 }), "Refresh"] })] }), _jsx("div", { className: "toolbar-right", children: _jsxs("div", { className: "search-box", children: [_jsx(Search, { size: 16, className: "search-icon" }), _jsx("input", { type: "text", placeholder: "Search...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "search-input" })] }) })] }), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "enquiries-table", children: [_jsx("thead", { children: _jsx("tr", { children: columns.map(col => (_jsx("th", { className: col.sortable ? 'sortable' : '', onClick: col.sortable ? () => handleSort(col.key) : undefined, children: col.key === 'checkbox' ? (_jsx("input", { type: "checkbox", checked: paginatedData.length > 0 && selectedRows.length === paginatedData.length, onChange: handleSelectAll })) : (_jsxs(_Fragment, { children: [col.label, col.sortable && sortConfig.key === col.key && (sortConfig.direction === 'asc' ? _jsx(ChevronDown, { size: 14 }) : _jsx(ChevronDown, { size: 14, style: { transform: 'rotate(180deg)' } }))] })) }, col.key))) }) }), _jsx("tbody", { children: paginatedData.map((row, index) => (_jsxs("tr", { children: [_jsx("td", { children: _jsx("input", { type: "checkbox", checked: selectedRows.includes(row.id), onChange: () => handleSelectRow(row.id) }) }), _jsx("td", { className: "action-cell", children: _jsxs("div", { className: "action-menu-container", children: [_jsx("button", { className: "action-btn", ref: (el) => (actionMenuRefs.current[row.id] = el), onClick: () => { if (actionMenuOpen === row.id) {
                                                        setActionMenuOpen(null);
                                                    }
                                                    else {
                                                        const pos = calculateDropdownPosition(actionMenuRefs.current[row.id]);
                                                        setActionMenuPosition(pos);
                                                        setActionMenuOpen(row.id);
                                                    } }, children: _jsx(MoreHorizontal, { size: 16 }) }), actionMenuOpen === row.id && (_jsxs("div", { className: `action-dropdown ${actionMenuPosition.vertical === 'top' ? 'dropup' : ''} ${actionMenuPosition.horizontal === 'left' ? 'dropleft' : ''}`, children: [_jsx("button", { onClick: () => alert(`Viewing details for: ${row.fileName}`), children: "View Details" }), _jsx("button", { onClick: () => alert(`Deleting: ${row.fileName}`), className: "delete", children: "Delete" })] }))] }) }), _jsx("td", { children: startIndex + index + 1 }), _jsx("td", { children: row.dateTime }), _jsx("td", { className: "lead-name-cell", children: row.fileName }), _jsx("td", { children: _jsx("span", { className: `badge ${getStatusBadge(row.status)}`, children: row.status }) }), _jsx("td", { children: _jsxs("button", { className: "btn btn-primary", onClick: () => handleDownload(row.fileName), disabled: row.status === 'generating', style: { padding: '0.375rem 0.75rem', height: 'auto', fontSize: '0.75rem' }, children: [_jsx(Download, { size: 14 }), "Download"] }) })] }, row.id))) })] }) }), _jsxs("div", { className: "pagination-container", children: [_jsxs("div", { className: "pagination-left", children: [_jsx("span", { className: "rows-label", children: "Rows per page:" }), _jsxs("select", { value: rowsPerPage, onChange: handleRowsPerPageChange, className: "rows-select", children: [_jsx("option", { value: 10, children: "10" }), _jsx("option", { value: 25, children: "25" }), _jsx("option", { value: 50, children: "50" })] }), _jsxs("span", { className: "pagination-info", children: ["Showing ", startIndex + 1, "-", Math.min(startIndex + rowsPerPage, filteredData.length), " of ", filteredData.length] })] }), _jsxs("div", { className: "pagination-right", children: [_jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(1), children: "First" }), _jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(prev => prev - 1), children: _jsx(ChevronLeft, { size: 16 }) }), _jsxs("span", { className: "page-indicator", children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(prev => prev + 1), children: _jsx(ChevronRight, { size: 16 }) }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(totalPages), children: "Last" })] })] })] }));
};
export default LeadExportHistory;
//# sourceMappingURL=LeadExportHistory.js.map