import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { glAPISampleData } from '../constants';
import { ACTION_FILTER, ACTION_CLEAR } from '../../../shared/constants/actionLabels';
const LeadGLAPIHistoryReport = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedRows, setSelectedRows] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({ purpose: '', status: '' });
    const filteredData = useMemo(() => {
        let data = [...glAPISampleData];
        if (searchQuery) {
            data = data.filter(item => item.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.mobile.includes(searchQuery) ||
                item.slNo.toString().includes(searchQuery));
        }
        if (filters.purpose) {
            data = data.filter(item => item.purpose === filters.purpose);
        }
        if (filters.status) {
            data = data.filter(item => item.status === filters.status);
        }
        return data;
    }, [searchQuery, filters]);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
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
    return (_jsxs("div", { className: "report-content-wrapper with-sidebar", children: [_jsx(PageHeader, { title: "GL API History", description: "Track all your past lead data api" }), _jsxs("div", { className: "toolbar-left", children: [_jsxs("div", { className: "search-box", children: [_jsx(Search, { size: 16, className: "search-icon" }), _jsx("input", { type: "text", placeholder: "Search...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "search-input" })] }), _jsxs("button", { className: `btn btn-secondary ${showFilters ? 'active' : ''}`, onClick: () => setShowFilters(!showFilters), children: [_jsx(Filter, { size: 16 }), "Filter", _jsx(ChevronDown, { size: 14, className: showFilters ? 'rotate' : '' })] })] }), showFilters && (_jsx("div", { className: "filters-panel", children: _jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Purpose" }), _jsxs("select", { value: filters.purpose, onChange: (e) => setFilters({ ...filters, purpose: e.target.value }), children: [_jsx("option", { value: "", children: "All" }), _jsx("option", { value: "DND", children: "DND" }), _jsx("option", { value: "Lost", children: "Lost" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Status" }), _jsxs("select", { value: filters.status, onChange: (e) => setFilters({ ...filters, status: e.target.value }), children: [_jsx("option", { value: "", children: "All" }), _jsx("option", { value: "Junk Lead _ Form not submitted", children: "Junk Lead _ Form not submitted" }), _jsx("option", { value: "Not Interested", children: "Not Interested" })] })] }), _jsxs("div", { className: "filter-actions", children: [_jsx("button", { className: "btn btn-primary", onClick: () => setShowFilters(false), children: ACTION_FILTER }), _jsx("button", { className: "btn btn-secondary", onClick: () => { setFilters({ purpose: '', status: '' }); setShowFilters(false); }, children: ACTION_CLEAR })] })] }) })), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "enquiries-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: _jsx("input", { type: "checkbox", checked: paginatedData.length > 0 && selectedRows.length === paginatedData.length, onChange: handleSelectAll }) }), _jsx("th", { children: "SL No" }), _jsx("th", { children: "VIA" }), _jsx("th", { children: "Lead Name" }), _jsx("th", { children: "Mobile" }), _jsx("th", { children: "Assigned To" }), _jsx("th", { children: "Purpose" }), _jsx("th", { children: "Source" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "count" }), _jsx("th", { children: "Date/Time" }), _jsx("th", { children: "Updated At" })] }) }), _jsx("tbody", { children: paginatedData.map(row => (_jsxs("tr", { children: [_jsx("td", { children: _jsx("input", { type: "checkbox", checked: selectedRows.includes(row.id), onChange: () => handleSelectRow(row.id) }) }), _jsx("td", { children: row.slNo }), _jsx("td", { children: row.via }), _jsx("td", { children: row.leadName }), _jsx("td", { children: row.mobile }), _jsx("td", { children: row.assignedTo }), _jsx("td", { children: row.purpose }), _jsx("td", { children: row.source }), _jsx("td", { children: row.status }), _jsx("td", { children: row.count }), _jsx("td", { children: row.dateTime }), _jsx("td", { children: row.updatedAt })] }, row.id))) })] }) }), _jsxs("div", { className: "pagination", style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }, children: [_jsxs("div", { className: "pagination-info", children: ["Showing ", filteredData.length > 0 ? startIndex + 1 : 0, " to ", Math.min(currentPage * rowsPerPage, filteredData.length), " of ", filteredData.length, " entries"] }), _jsxs("div", { className: "pagination-controls", children: [_jsx("button", { className: "btn btn-secondary", disabled: currentPage === 1, onClick: () => setCurrentPage(prev => prev - 1), children: "Previous" }), Array.from({ length: Math.min(5, totalPages) }, (_, i) => (_jsx("button", { className: `btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-secondary'}`, onClick: () => setCurrentPage(i + 1), children: i + 1 }, i))), _jsx("button", { className: "btn btn-secondary", disabled: currentPage === totalPages, onClick: () => setCurrentPage(prev => prev + 1), children: "Next" })] })] })] }));
};
export default LeadGLAPIHistoryReport;
//# sourceMappingURL=LeadGLAPIHistoryReport.js.map