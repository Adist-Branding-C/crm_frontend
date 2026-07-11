import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Search, Filter, Download, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { deletedDealData } from '../constants';
import { ROWS_OPTIONS_5_10_25 } from '../../../shared/constants/pagination';
const DealDeletedReport = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [showExport, setShowExport] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedFields, setSelectedFields] = useState(['dealName', 'leadName', 'mobile', 'amount', 'status']);
    const [exportFileName, setExportFileName] = useState('');
    const fieldOptions = [
        { key: 'dealName', label: 'Deal Name' }, { key: 'deletedBy', label: 'Deleted By' }, { key: 'leadName', label: 'Lead' },
        { key: 'mobile', label: 'Mobile' }, { key: 'amount', label: 'Amount' }, { key: 'status', label: 'Status' },
        { key: 'type', label: 'Type' }, { key: 'startDate', label: 'Start Date' }, { key: 'endDate', label: 'End Date' },
        { key: 'agent', label: 'Agent' }, { key: 'createdBy', label: 'Created By' }, { key: 'createdAt', label: 'Created At' },
        { key: 'deletedAt', label: 'Deleted At' }, { key: 'lostReason', label: 'Lost Reason' },
    ];
    const filteredData = useMemo(() => {
        let data = [...deletedDealData];
        if (searchQuery) {
            data = data.filter(item => item.dealName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.mobile.includes(searchQuery));
        }
        return data;
    }, [searchQuery]);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
    const handleSelectAll = (e) => {
        if (e.target.checked)
            setSelectedRows(paginatedData.map(item => item.id));
        else
            setSelectedRows([]);
    };
    const handleSelectRow = (id) => {
        setSelectedRows(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };
    const handleRecover = () => {
        if (selectedRows.length === 0)
            return;
        if (confirm(`Are you sure you want to recover ${selectedRows.length} selected deal(s)?`)) {
            alert(`Recovered ${selectedRows.length} deals`);
            setSelectedRows([]);
        }
    };
    const handleExport = () => {
        const headers = selectedFields;
        const rows = filteredData.map(d => selectedFields.map(f => d[f] || ''));
        const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = exportFileName || 'deleted_deals_export.csv';
        link.click();
        setShowExport(false);
    };
    return (_jsxs("div", { className: "report-content-wrapper with-sidebar", children: [_jsx(PageHeader, { title: "Deleted Deals", description: "View and restore previously deleted deals" }), _jsxs("div", { className: "toolbar-left", children: [_jsxs("div", { className: "search-box", children: [_jsx(Search, { size: 16, className: "search-icon" }), _jsx("input", { type: "text", placeholder: "Search deals...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "search-input" })] }), _jsxs("button", { className: "btn btn-secondary", onClick: () => setShowFilters(!showFilters), children: [_jsx(Filter, { size: 16 }), " Filter"] }), _jsxs("button", { className: "btn btn-secondary", onClick: () => setShowExport(true), children: [_jsx(Download, { size: 16 }), " Export"] })] }), selectedRows.length > 0 && (_jsxs("div", { className: "bulk-action-bar", style: { display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-sm)', marginBottom: '1rem' }, children: [_jsxs("span", { children: [selectedRows.length, " deal(s) selected"] }), _jsxs("button", { className: "btn btn-primary", onClick: handleRecover, children: [_jsx(RotateCcw, { size: 16 }), " Recover Selected"] })] })), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "enquiries-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: _jsx("input", { type: "checkbox", checked: paginatedData.length > 0 && selectedRows.length === paginatedData.length, onChange: handleSelectAll }) }), _jsx("th", { children: "Deal Name" }), _jsx("th", { children: "Deleted By" }), _jsx("th", { children: "Lead" }), _jsx("th", { children: "Mobile" }), _jsx("th", { children: "Amount" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "Type" }), _jsx("th", { children: "Start Date" }), _jsx("th", { children: "End Date" }), _jsx("th", { children: "Agent" }), _jsx("th", { children: "Created By" }), _jsx("th", { children: "Created At" }), _jsx("th", { children: "Deleted At" }), _jsx("th", { children: "Lost Reason" })] }) }), _jsx("tbody", { children: paginatedData.map(row => (_jsxs("tr", { className: selectedRows.includes(row.id) ? 'selected' : '', children: [_jsx("td", { children: _jsx("input", { type: "checkbox", checked: selectedRows.includes(row.id), onChange: () => handleSelectRow(row.id) }) }), _jsx("td", { children: row.dealName }), _jsx("td", { children: row.deletedBy }), _jsx("td", { children: row.leadName }), _jsx("td", { children: row.mobile }), _jsxs("td", { children: ["$", row.amount.toLocaleString()] }), _jsx("td", { children: _jsx("span", { className: `badge badge-${row.status.toLowerCase().replace(' ', '-')}`, children: row.status }) }), _jsx("td", { children: row.type }), _jsx("td", { children: row.startDate }), _jsx("td", { children: row.endDate }), _jsx("td", { children: row.agent }), _jsx("td", { children: row.createdBy }), _jsx("td", { children: row.createdAt }), _jsx("td", { children: row.deletedAt }), _jsx("td", { children: row.lostReason })] }, row.id))) })] }) }), _jsxs("div", { className: "pagination-container", children: [_jsxs("div", { className: "pagination-left", children: [_jsx("span", { className: "rows-label", children: "Rows per page:" }), _jsx("select", { value: rowsPerPage, onChange: (e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }, className: "rows-select", children: ROWS_OPTIONS_5_10_25.map(n => _jsx("option", { value: n, children: n }, n)) }), _jsxs("span", { className: "pagination-info", children: ["Showing ", startIndex + 1, "-", Math.min(startIndex + rowsPerPage, filteredData.length), " of ", filteredData.length] })] }), _jsxs("div", { className: "pagination-right", children: [_jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(1), children: "First" }), _jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(prev => prev - 1), children: _jsx(ChevronLeft, { size: 16 }) }), _jsxs("span", { className: "page-indicator", children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(prev => prev + 1), children: _jsx(ChevronRight, { size: 16 }) }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(totalPages), children: "Last" })] })] }), showExport && (_jsx("div", { className: "modal-overlay", style: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }, onClick: () => setShowExport(false), children: _jsxs("div", { className: "export-form-card", style: { maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }, onClick: (e) => e.stopPropagation(), children: [_jsx("div", { style: { padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }, children: _jsx("h3", { style: { margin: 0 }, children: "Export Deleted Deals" }) }), _jsxs("div", { style: { padding: '1.5rem' }, children: [_jsxs("div", { className: "filter-group", style: { marginBottom: '1rem' }, children: [_jsx("label", { children: "File Name" }), _jsx("input", { type: "text", placeholder: "Enter file name", value: exportFileName, onChange: (e) => setExportFileName(e.target.value), style: { width: '100%' } })] }), _jsxs("div", { className: "fields-selection", children: [_jsx("div", { className: "field-checkbox", children: _jsxs("label", { children: [_jsx("input", { type: "checkbox", checked: selectedFields.length === fieldOptions.length, onChange: (e) => { if (e.target.checked)
                                                            setSelectedFields(fieldOptions.map(f => f.key));
                                                        else
                                                            setSelectedFields([]); } }), " Select All"] }) }), _jsx("div", { className: "fields-grid", children: fieldOptions.map(field => (_jsx("div", { className: "field-checkbox", children: _jsxs("label", { children: [_jsx("input", { type: "checkbox", checked: selectedFields.includes(field.key), onChange: () => { setSelectedFields(prev => prev.includes(field.key) ? prev.filter(f => f !== field.key) : [...prev, field.key]); } }), " ", field.label] }) }, field.key))) })] })] }), _jsxs("div", { className: "form-actions", style: { padding: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }, children: [_jsx("button", { className: "btn btn-secondary", onClick: () => setShowExport(false), children: "Cancel" }), _jsx("button", { className: "btn btn-primary", onClick: handleExport, children: "Export" })] })] }) }))] }));
};
export default DealDeletedReport;
//# sourceMappingURL=DealDeletedReport.js.map