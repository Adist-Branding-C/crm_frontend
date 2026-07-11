import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Search, Download, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { dealStageData, dealAgentData } from '../constants';
import { ROWS_OPTIONS_5_10_25 } from '../../../shared/constants/pagination';
const DealStageReport = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const filteredData = useMemo(() => {
        let data = [...dealAgentData];
        if (searchQuery) {
            data = data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        return data;
    }, [searchQuery]);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
    const handleExport = () => {
        const headers = ['Agent Name', 'Total Deals', 'Open Deals', 'Win Deals', 'Close Deals'];
        const csvContent = [headers.join(','), ...filteredData.map(d => [d.name, d.totalDeals, d.openDeals, d.winDeals, d.closeDeals].join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'deal_stage_report.csv';
        link.click();
    };
    return (_jsxs("div", { className: "report-content-wrapper with-sidebar", children: [_jsx(PageHeader, { title: "Deals by Stage", description: "Overview of deals segmented by current stage in pipeline" }), _jsx("div", { className: "deal-stage-stats", children: dealStageData.map((item, index) => (_jsxs("div", { className: "deal-stage-card", children: [_jsx("div", { className: "deal-stage-icon", style: { background: item.color + '20' }, children: _jsx(DollarSign, { size: 20, color: item.color }) }), _jsxs("div", { className: "deal-stage-info", children: [_jsx("span", { className: "deal-stage-value", children: item.count }), _jsxs("span", { className: "deal-stage-label", children: [item.stage, " Deals"] })] }), _jsxs("div", { className: "deal-stage-amount", children: ["$", item.amount.toLocaleString()] })] }, index))) }), _jsxs("div", { className: "toolbar-left", children: [_jsxs("div", { className: "search-box", children: [_jsx(Search, { size: 16, className: "search-icon" }), _jsx("input", { type: "text", placeholder: "Search agents...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "search-input" })] }), _jsx("div", { className: "toolbar-right", children: _jsxs("button", { className: "btn btn-primary", onClick: handleExport, children: [_jsx(Download, { size: 16 }), " Export"] }) })] }), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "enquiries-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Agent Name" }), _jsx("th", { children: "Total Deals" }), _jsx("th", { children: "Open Deals" }), _jsx("th", { children: "Win Deals" }), _jsx("th", { children: "Close Deals" })] }) }), _jsx("tbody", { children: paginatedData.map(row => (_jsxs("tr", { children: [_jsx("td", { children: row.name }), _jsx("td", { children: row.totalDeals }), _jsx("td", { children: row.openDeals }), _jsx("td", { children: row.winDeals }), _jsx("td", { children: row.closeDeals })] }, row.id))) })] }) }), _jsxs("div", { className: "pagination-container", children: [_jsxs("div", { className: "pagination-left", children: [_jsx("span", { className: "rows-label", children: "Rows per page:" }), _jsx("select", { value: rowsPerPage, onChange: (e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }, className: "rows-select", children: ROWS_OPTIONS_5_10_25.map(n => _jsx("option", { value: n, children: n }, n)) }), _jsxs("span", { className: "pagination-info", children: ["Showing ", startIndex + 1, "-", Math.min(startIndex + rowsPerPage, filteredData.length), " of ", filteredData.length] })] }), _jsxs("div", { className: "pagination-right", children: [_jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(1), children: "First" }), _jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(prev => prev - 1), children: _jsx(ChevronLeft, { size: 16 }) }), _jsxs("span", { className: "page-indicator", children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(prev => prev + 1), children: _jsx(ChevronRight, { size: 16 }) }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(totalPages), children: "Last" })] })] })] }));
};
export default DealStageReport;
//# sourceMappingURL=DealStageReport.js.map