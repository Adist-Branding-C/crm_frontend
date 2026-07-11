import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Search, Filter, Download, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { dealConversionData } from '../constants';
import { ROWS_OPTIONS_5_10_25 } from '../../../shared/constants/pagination';
const LeadConversionReport = () => {
    const [filters, setFilters] = useState({ dateFrom: '2024-01-01', dateTo: '2024-01-31', agent: 0, search: '' });
    const [showFilters, setShowFilters] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const agents = [
        { id: 0, name: 'All Agents' }, { id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Mike Johnson' }, { id: 4, name: 'Sarah Williams' }, { id: 5, name: 'David Brown' },
    ];
    const leadSummary = { totalLeads: 245, totalDeals: 89, open: 45, win: 28, lose: 16 };
    const filteredDealData = useMemo(() => {
        let data = [...dealConversionData];
        if (filters.search) {
            data = data.filter(item => item.leadName.toLowerCase().includes(filters.search.toLowerCase()) ||
                item.dealCode.toLowerCase().includes(filters.search.toLowerCase()) ||
                item.mobile.includes(filters.search));
        }
        return data;
    }, [filters, submit]);
    const totalPages = Math.ceil(filteredDealData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredDealData.slice(startIndex, startIndex + rowsPerPage);
    const handleExport = (type) => {
        const headers = type === 'lead'
            ? ['Total Leads', 'Total Deals', 'Open', 'Win', 'Lose']
            : ['SL No', 'Deal Code', 'Deal Name', 'Lead Name', 'Mobile Number', 'Deal Amount', 'Deal Status', 'Lead Source', 'Lost Reason', 'Start Date', 'End Date', 'Staff Name', 'Created By', 'Updated At'];
        const rows = type === 'lead'
            ? [[leadSummary.totalLeads, leadSummary.totalDeals, leadSummary.open, leadSummary.win, leadSummary.lose]]
            : filteredDealData.map(d => [d.id, d.dealCode, d.dealName, d.leadName, d.mobile, d.dealAmount, d.dealStatus, d.leadSource, d.lostReason, d.startDate, d.endDate, d.staffName, d.createdBy, d.updatedAt]);
        const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = type === 'lead' ? 'lead_summary.csv' : 'deal_summary.csv';
        link.click();
    };
    return (_jsxs("div", { className: "report-content-wrapper with-sidebar", children: [_jsx(PageHeader, { title: "Lead Conversion Report", description: "Track conversion rates from lead to deal" }), _jsxs("div", { className: "toolbar-left", children: [_jsxs("div", { className: "search-box", children: [_jsx(Search, { size: 16, className: "search-icon" }), _jsx("input", { type: "text", placeholder: "Search...", value: filters.search, onChange: (e) => setFilters({ ...filters, search: e.target.value }), className: "search-input" })] }), _jsxs("button", { className: "btn btn-secondary", onClick: () => setShowFilters(!showFilters), children: [_jsx(Filter, { size: 16 }), " Filter ", _jsx(ChevronDown, { size: 14, className: showFilters ? 'rotate' : '' })] })] }), showFilters && (_jsx("div", { className: "filters-panel", children: _jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Date From" }), _jsx("input", { type: "date", value: filters.dateFrom, onChange: (e) => setFilters({ ...filters, dateFrom: e.target.value }) })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Date To" }), _jsx("input", { type: "date", value: filters.dateTo, onChange: (e) => setFilters({ ...filters, dateTo: e.target.value }) })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Agent" }), _jsx("select", { value: filters.agent, onChange: (e) => setFilters({ ...filters, agent: Number(e.target.value) }), children: agents.map(a => _jsx("option", { value: a.id, children: a.name }, a.id)) })] }), _jsx("div", { className: "filter-actions", children: _jsx("button", { className: "btn btn-primary", onClick: () => setSubmit(true), children: "Submit" }) })] }) })), _jsxs("div", { className: "report-section", children: [_jsxs("div", { className: "section-header", children: [_jsx("h3", { children: "Lead Summary" }), _jsxs("button", { className: "btn btn-primary", onClick: () => handleExport('lead'), children: [_jsx(Download, { size: 16 }), " Export"] })] }), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "enquiries-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Total Leads" }), _jsx("th", { children: "Total Deals" }), _jsx("th", { children: "Open" }), _jsx("th", { children: "Win" }), _jsx("th", { children: "Lose" })] }) }), _jsx("tbody", { children: _jsxs("tr", { children: [_jsx("td", { children: leadSummary.totalLeads }), _jsx("td", { children: leadSummary.totalDeals }), _jsx("td", { children: leadSummary.open }), _jsx("td", { children: leadSummary.win }), _jsx("td", { children: leadSummary.lose })] }) })] }) })] }), _jsxs("div", { className: "report-section", children: [_jsxs("div", { className: "section-header", children: [_jsx("h3", { children: "Deal Summary" }), _jsxs("button", { className: "btn btn-primary", onClick: () => handleExport('deal'), children: [_jsx(Download, { size: 16 }), " Export"] })] }), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "enquiries-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "SL No" }), _jsx("th", { children: "Deal Code" }), _jsx("th", { children: "Deal Name" }), _jsx("th", { children: "Lead Name" }), _jsx("th", { children: "Mobile Number" }), _jsx("th", { children: "Deal Amount" }), _jsx("th", { children: "Deal Status" }), _jsx("th", { children: "Lead Source" }), _jsx("th", { children: "Lost Reason" }), _jsx("th", { children: "Start Date" }), _jsx("th", { children: "End Date" }), _jsx("th", { children: "Staff Name" }), _jsx("th", { children: "Created By" }), _jsx("th", { children: "Updated At" })] }) }), _jsx("tbody", { children: paginatedData.map(row => (_jsxs("tr", { children: [_jsx("td", { children: row.id }), _jsx("td", { children: row.dealCode }), _jsx("td", { children: row.dealName }), _jsx("td", { children: row.leadName }), _jsx("td", { children: row.mobile }), _jsxs("td", { children: ["$", row.dealAmount.toLocaleString()] }), _jsx("td", { children: _jsx("span", { className: `badge badge-${row.dealStatus.toLowerCase()}`, children: row.dealStatus }) }), _jsx("td", { children: row.leadSource }), _jsx("td", { children: row.lostReason }), _jsx("td", { children: row.startDate }), _jsx("td", { children: row.endDate }), _jsx("td", { children: row.staffName }), _jsx("td", { children: row.createdBy }), _jsx("td", { children: row.updatedAt })] }, row.id))) })] }) })] }), _jsxs("div", { className: "pagination-container", children: [_jsxs("div", { className: "pagination-left", children: [_jsx("span", { className: "rows-label", children: "Rows per page:" }), _jsx("select", { value: rowsPerPage, onChange: (e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }, className: "rows-select", children: ROWS_OPTIONS_5_10_25.map(n => _jsx("option", { value: n, children: n }, n)) }), _jsxs("span", { className: "pagination-info", children: ["Showing ", startIndex + 1, "-", Math.min(startIndex + rowsPerPage, filteredDealData.length), " of ", filteredDealData.length] })] }), _jsxs("div", { className: "pagination-right", children: [_jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(1), children: "First" }), _jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(prev => prev - 1), children: _jsx(ChevronLeft, { size: 16 }) }), _jsxs("span", { className: "page-indicator", children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(prev => prev + 1), children: _jsx(ChevronRight, { size: 16 }) }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(totalPages), children: "Last" })] })] })] }));
};
export default LeadConversionReport;
//# sourceMappingURL=LeadConversionReport.js.map