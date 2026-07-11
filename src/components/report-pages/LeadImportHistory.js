import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { RefreshCw, Search, ChevronDown, ChevronLeft, ChevronRight, Eye, Plus, X, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../pages/Enquiries.css';
const importHistoryData = [
    { id: 1, dateTime: '2024-01-25 10:30 AM', fileName: 'contacts_import_25Jan', total: 500, duplicate: 12, invalid: 5, imported: 483, status: 'completed' },
    { id: 2, dateTime: '2024-01-25 09:15 AM', fileName: 'leads_import_24Jan', total: 250, duplicate: 8, invalid: 2, imported: 240, status: 'completed' },
    { id: 3, dateTime: '2024-01-24 04:45 PM', fileName: 'bulk_contacts', total: 1000, duplicate: 45, invalid: 20, imported: 935, status: 'completed' },
    { id: 4, dateTime: '2024-01-24 02:20 PM', fileName: 'jan24_import', total: 150, duplicate: 3, invalid: 1, imported: 146, status: 'failed' },
    { id: 5, dateTime: '2024-01-23 11:00 AM', fileName: 'contacts_jan23', total: 300, duplicate: 15, invalid: 8, imported: 277, status: 'completed' },
    { id: 6, dateTime: '2024-01-23 10:00 AM', fileName: 'new_leads_import', total: 75, duplicate: 2, invalid: 0, imported: 73, status: 'generating' },
    { id: 7, dateTime: '2024-01-22 05:30 PM', fileName: 'weekly_import', total: 450, duplicate: 20, invalid: 10, imported: 420, status: 'completed' },
    { id: 8, dateTime: '2024-01-22 03:15 PM', fileName: 'contacts_backup', total: 600, duplicate: 30, invalid: 15, imported: 555, status: 'completed' },
    { id: 9, dateTime: '2024-01-21 09:45 AM', fileName: 'jan21_import', total: 200, duplicate: 5, invalid: 3, imported: 192, status: 'failed' },
    { id: 10, dateTime: '2024-01-20 04:00 PM', fileName: 'contact_list', total: 350, duplicate: 18, invalid: 7, imported: 325, status: 'completed' },
];
const columns = [
    { key: 'checkbox', label: '' },
    { key: 'action', label: 'Action' },
    { key: ' SL No', label: '#', sortable: false },
    { key: 'dateTime', label: 'Date and Time', sortable: true },
    { key: 'fileName', label: 'File Name', sortable: true },
    { key: 'total', label: 'Total Records', sortable: true },
    { key: 'duplicate', label: 'Duplicate Records', sortable: true },
    { key: 'invalid', label: 'Invalid Records', sortable: true },
    { key: 'imported', label: 'Imported Records', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
];
const ImportModal = ({ isOpen, onClose }) => {
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "modal-overlay", onClick: onClose, children: _jsxs("div", { className: "modal-content", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "modal-header", children: [_jsx("h2", { children: "Upload Contacts" }), _jsx("button", { className: "modal-close", onClick: onClose, children: _jsx(X, { size: 20 }) })] }), _jsxs("div", { className: "modal-body", children: [_jsxs("div", { className: "upload-section", children: [_jsx("label", { children: "Upload File" }), _jsxs("div", { className: "file-input-wrapper", children: [_jsx("input", { type: "file", accept: ".csv,.xlsx,.xls" }), _jsx("button", { className: "btn-link", children: "Download Sample File" })] })] }), _jsxs("div", { className: "required-fields", children: [_jsx("p", { children: _jsx("strong", { children: "* Required Fields:" }) }), _jsx("p", { children: "Country Code, Mobile Number, Lead Source" }), _jsx("p", { children: "All other fields can be left empty if the information is not available." })] }), _jsxs("div", { className: "example-section", children: [_jsx("p", { children: "Example:" }), _jsx("pre", { className: "example-code", children: "Name,Country Code,Mobile Number,Lead Source,Email ABC,+1,1234567890,Website, ,+91,9876543210,Referral,,john@example.com" })] }), _jsxs("div", { className: "format-note", children: [_jsx("p", { children: "Please ensure the date is formatted as either yyyy-mm-dd or dd-mm-yyyy." }), _jsx("p", { children: "Examples: 2021-12-31 or 31-12-2021. Dates are used to track when the lead was generated or updated." }), _jsx("p", { children: "Note: Any duplicate phone number rows in the file will be skipped automatically." })] }), _jsxs("div", { className: "modal-actions", children: [_jsx("button", { className: "btn btn-primary", children: "Upload" }), _jsx("button", { className: "btn btn-secondary", onClick: onClose, children: "Cancel" })] })] })] }) }));
};
const LeadImportHistory = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: 'dateTime', direction: 'desc' });
    const [showModal, setShowModal] = useState(false);
    const filteredData = React.useMemo(() => {
        let data = [...importHistoryData];
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
    const handleView = (id) => {
        navigate(`/reports/lead/import-history/${id}`);
    };
    const handleImportClick = () => {
        setShowModal(true);
    };
    return (_jsxs("div", { className: "enquiries-page", children: [_jsx(ImportModal, { isOpen: showModal, onClose: () => setShowModal(false) }), _jsxs("div", { className: "enquiries-toolbar", children: [_jsxs("div", { className: "toolbar-left", children: [_jsxs("button", { className: "btn btn-primary", onClick: handleImportClick, children: [_jsx(Plus, { size: 16 }), "Import Contact"] }), _jsxs("button", { className: "btn btn-secondary", children: [_jsx(RefreshCw, { size: 16 }), "Refresh"] })] }), _jsx("div", { className: "toolbar-right", children: _jsxs("div", { className: "search-box", children: [_jsx(Search, { size: 16, className: "search-icon" }), _jsx("input", { type: "text", placeholder: "Search...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "search-input" })] }) })] }), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "enquiries-table", children: [_jsx("thead", { children: _jsx("tr", { children: columns.map(col => (_jsx("th", { className: col.sortable ? 'sortable' : '', onClick: col.sortable ? () => handleSort(col.key) : undefined, children: col.key === 'checkbox' ? (_jsx("input", { type: "checkbox", checked: paginatedData.length > 0 && selectedRows.length === paginatedData.length, onChange: handleSelectAll })) : (_jsxs(_Fragment, { children: [col.label, col.sortable && sortConfig.key === col.key && (sortConfig.direction === 'asc' ? _jsx(ChevronDown, { size: 14 }) : _jsx(ChevronDown, { size: 14, style: { transform: 'rotate(180deg)' } }))] })) }, col.key))) }) }), _jsx("tbody", { children: paginatedData.map((row, index) => (_jsxs("tr", { children: [_jsx("td", { children: _jsx("input", { type: "checkbox", checked: selectedRows.includes(row.id), onChange: () => handleSelectRow(row.id) }) }), _jsx("td", { className: "action-cell", children: _jsx("button", { className: "action-btn", onClick: () => handleView(row.id), title: "View Details", children: _jsx(Eye, { size: 16 }) }) }), _jsx("td", { children: startIndex + index + 1 }), _jsx("td", { children: row.dateTime }), _jsx("td", { className: "lead-name-cell", children: row.fileName }), _jsx("td", { children: row.total }), _jsx("td", { children: row.duplicate }), _jsx("td", { children: row.invalid }), _jsx("td", { children: _jsx("strong", { children: row.imported }) }), _jsx("td", { children: _jsx("span", { className: `badge ${getStatusBadge(row.status)}`, children: row.status }) })] }, row.id))) })] }) }), _jsxs("div", { className: "pagination-container", children: [_jsxs("div", { className: "pagination-left", children: [_jsx("span", { className: "rows-label", children: "Rows per page:" }), _jsxs("select", { value: rowsPerPage, onChange: handleRowsPerPageChange, className: "rows-select", children: [_jsx("option", { value: 10, children: "10" }), _jsx("option", { value: 25, children: "25" }), _jsx("option", { value: 50, children: "50" })] }), _jsxs("span", { className: "pagination-info", children: ["Showing ", startIndex + 1, "-", Math.min(startIndex + rowsPerPage, filteredData.length), " of ", filteredData.length] })] }), _jsxs("div", { className: "pagination-right", children: [_jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(1), children: "First" }), _jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(prev => prev - 1), children: _jsx(ChevronLeft, { size: 16 }) }), _jsxs("span", { className: "page-indicator", children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(prev => prev + 1), children: _jsx(ChevronRight, { size: 16 }) }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(totalPages), children: "Last" })] })] })] }));
};
export default LeadImportHistory;
//# sourceMappingURL=LeadImportHistory.js.map