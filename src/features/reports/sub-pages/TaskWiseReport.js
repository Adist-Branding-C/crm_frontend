import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Search, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { taskWiseData } from '../constants';
import { ROWS_OPTIONS_5_10_25 } from '../../../shared/constants/pagination';
const TaskWiseReport = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const filteredData = useMemo(() => {
        let data = [...taskWiseData];
        if (searchQuery)
            data = data.filter(item => item.agentName.toLowerCase().includes(searchQuery.toLowerCase()));
        return data;
    }, [searchQuery]);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
    const handleExport = () => {
        const headers = ['Agent Name', 'Total', 'Completed', 'Pending', 'OverDue'];
        const csvContent = [headers.join(','), ...filteredData.map(d => `${d.agentName},${d.total},${d.completed},${d.pending},${d.overDue}`)].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'task_wise_report.csv';
        link.click();
    };
    return (_jsxs("div", { className: "report-content-wrapper with-sidebar", children: [_jsx(PageHeader, { title: "Task Wise Report", description: "Comprehensive breakdown of tasks by category and status" }), _jsxs("div", { className: "toolbar-left", children: [_jsxs("div", { className: "search-box", children: [_jsx(Search, { size: 16, className: "search-icon" }), _jsx("input", { type: "text", placeholder: "Search...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "search-input" })] }), _jsxs("button", { className: "btn btn-secondary", onClick: handleExport, children: [_jsx(Download, { size: 16 }), " Export"] })] }), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "enquiries-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Agent Name" }), _jsx("th", { children: "Total" }), _jsx("th", { children: "Completed" }), _jsx("th", { children: "Pending" }), _jsx("th", { children: "OverDue" })] }) }), _jsx("tbody", { children: paginatedData.map(row => (_jsxs("tr", { children: [_jsx("td", { children: row.agentName }), _jsx("td", { children: row.total }), _jsx("td", { children: row.completed }), _jsx("td", { children: row.pending }), _jsx("td", { children: row.overDue })] }, row.id))) })] }) }), _jsxs("div", { className: "pagination-container", children: [_jsxs("div", { className: "pagination-left", children: [_jsx("span", { className: "rows-label", children: "Rows per page:" }), _jsx("select", { value: rowsPerPage, onChange: (e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }, className: "rows-select", children: ROWS_OPTIONS_5_10_25.map(n => _jsx("option", { value: n, children: n }, n)) }), _jsxs("span", { className: "pagination-info", children: ["Showing ", startIndex + 1, "-", Math.min(startIndex + rowsPerPage, filteredData.length), " of ", filteredData.length] })] }), _jsxs("div", { className: "pagination-right", children: [_jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(1), children: "First" }), _jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(prev => prev - 1), children: _jsx(ChevronLeft, { size: 16 }) }), _jsxs("span", { className: "page-indicator", children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(prev => prev + 1), children: _jsx(ChevronRight, { size: 16 }) }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(totalPages), children: "Last" })] })] })] }));
};
export default TaskWiseReport;
//# sourceMappingURL=TaskWiseReport.js.map