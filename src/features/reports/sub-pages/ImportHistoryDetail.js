import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { RefreshCw, Search, ChevronDown, ChevronLeft, ChevronRight, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import './ReportsSubPages.css';
import { importedData, duplicateData, failedData, statsData, importDetailColumns as columns } from '../constants/historyReports.data';
import { ROWS_OPTIONS_10_25_50 } from '../../../shared/constants/pagination';
const ImportHistoryDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('imported');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const getTableData = () => {
        switch (activeTab) {
            case 'imported': return importedData;
            case 'duplicates': return duplicateData;
            case 'failed': return failedData;
            default: return importedData;
        }
    };
    const filteredData = React.useMemo(() => {
        let data = getTableData();
        if (searchQuery) {
            data = data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item.email ?? '').toLowerCase().includes(searchQuery.toLowerCase()));
        }
        if (sortConfig.key) {
            data.sort((a, b) => {
                const aVal = a[sortConfig.key] || '';
                const bVal = b[sortConfig.key] || '';
                if (aVal < bVal)
                    return sortConfig.direction === 'asc' ? -1 : 1;
                if (aVal > bVal)
                    return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return data;
    }, [activeTab, searchQuery, sortConfig]);
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
    return (_jsxs("div", { className: "enquiries-page", children: [_jsx("div", { className: "report-page-header-simple", children: _jsx("h1", { className: "header-title-simple", children: "contacts_import_25Jan.csv" }) }), _jsxs("div", { className: "stats-card-row", children: [_jsxs("div", { className: "stat-card", children: [_jsx("span", { className: "stat-number", children: statsData.total }), _jsx("span", { className: "stat-label", children: "Total Records" })] }), _jsxs("div", { className: "stat-card stat-card-success", children: [_jsx(CheckCircle, { size: 24, className: "stat-icon" }), _jsx("span", { className: "stat-number", children: statsData.imported }), _jsx("span", { className: "stat-label", children: "Imported" })] }), _jsxs("div", { className: "stat-card stat-card-warning", children: [_jsx(AlertCircle, { size: 24, className: "stat-icon" }), _jsx("span", { className: "stat-number", children: statsData.duplicates }), _jsx("span", { className: "stat-label", children: "Duplicates" })] }), _jsxs("div", { className: "stat-card stat-card-danger", children: [_jsx(XCircle, { size: 24, className: "stat-icon" }), _jsx("span", { className: "stat-number", children: statsData.failed }), _jsx("span", { className: "stat-label", children: "Failed" })] })] }), _jsxs("div", { className: "tabs-container", children: [_jsxs("button", { className: `tab-btn ${activeTab === 'imported' ? 'active' : ''}`, onClick: () => setActiveTab('imported'), children: ["Imported (", statsData.imported, ")"] }), _jsxs("button", { className: `tab-btn ${activeTab === 'duplicates' ? 'active' : ''}`, onClick: () => setActiveTab('duplicates'), children: ["Duplicates (", statsData.duplicates, ")"] }), _jsxs("button", { className: `tab-btn ${activeTab === 'failed' ? 'active' : ''}`, onClick: () => setActiveTab('failed'), children: ["Failed (", statsData.failed, ")"] })] }), _jsxs("div", { className: "enquiries-toolbar", children: [_jsx("div", { className: "toolbar-left", children: _jsxs("button", { className: "btn btn-secondary", children: [_jsx(RefreshCw, { size: 16 }), "Refresh"] }) }), _jsx("div", { className: "toolbar-right", children: _jsxs("div", { className: "search-box", children: [_jsx(Search, { size: 16, className: "search-icon" }), _jsx("input", { type: "text", placeholder: "Search...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "search-input" })] }) })] }), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "enquiries-table", children: [_jsx("thead", { children: _jsx("tr", { children: columns.map(col => (_jsx("th", { className: col.sortable ? 'sortable' : '', onClick: col.sortable ? () => handleSort(col.key) : undefined, children: col.key === 'checkbox' ? (_jsx("input", { type: "checkbox", checked: paginatedData.length > 0 && selectedRows.length === paginatedData.length, onChange: handleSelectAll })) : (_jsxs(_Fragment, { children: [col.label, col.sortable && sortConfig.key === col.key && (sortConfig.direction === 'asc' ? _jsx(ChevronDown, { size: 14 }) : _jsx(ChevronDown, { size: 14, style: { transform: 'rotate(180deg)' } }))] })) }, col.key))) }) }), _jsx("tbody", { children: paginatedData.map((row, index) => (_jsxs("tr", { children: [_jsx("td", { children: _jsx("input", { type: "checkbox", checked: selectedRows.includes(row.id), onChange: () => handleSelectRow(row.id) }) }), _jsx("td", { children: startIndex + index + 1 }), _jsx("td", { className: "lead-name-cell", children: row.name }), _jsx("td", { children: row.phone }), _jsx("td", { children: row.email || '-' }), _jsx("td", { children: row.reason || '-' }), _jsx("td", { children: row.createdAt }), _jsx("td", { className: "meta-cell", children: row.meta })] }, row.id))) })] }) }), _jsxs("div", { className: "pagination-container", children: [_jsxs("div", { className: "pagination-left", children: [_jsx("span", { className: "rows-label", children: "Rows per page:" }), _jsx("select", { value: rowsPerPage, onChange: handleRowsPerPageChange, className: "rows-select", children: ROWS_OPTIONS_10_25_50.map(n => _jsx("option", { value: n, children: n }, n)) }), _jsxs("span", { className: "pagination-info", children: ["Showing ", startIndex + 1, "-", Math.min(startIndex + rowsPerPage, filteredData.length), " of ", filteredData.length] })] }), _jsxs("div", { className: "pagination-right", children: [_jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(1), children: "First" }), _jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(prev => prev - 1), children: _jsx(ChevronLeft, { size: 16 }) }), _jsxs("span", { className: "page-indicator", children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(prev => prev + 1), children: _jsx(ChevronRight, { size: 16 }) }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(totalPages), children: "Last" })] })] })] }));
};
export default ImportHistoryDetail;
//# sourceMappingURL=ImportHistoryDetail.js.map