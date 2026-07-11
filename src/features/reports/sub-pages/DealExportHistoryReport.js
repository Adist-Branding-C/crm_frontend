import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Search, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { ROWS_OPTIONS_5_10_25 } from '../../../shared/constants/pagination';
const DealExportHistoryReport = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const exportHistoryData = [
        { id: 1, fileName: 'deal_export_2024-01-25.csv', dateTime: '25 Jan 2024 10:30 AM', status: 'Completed' },
        { id: 2, fileName: 'deal_export_2024-01-24.csv', dateTime: '24 Jan 2024 02:15 PM', status: 'Completed' },
        { id: 3, fileName: 'deal_export_2024-01-23.csv', dateTime: '23 Jan 2024 09:45 AM', status: 'Failed' },
        { id: 4, fileName: 'deal_export_2024-01-22.csv', dateTime: '22 Jan 2024 04:20 PM', status: 'Completed' },
        { id: 5, fileName: 'deal_export_2024-01-21.csv', dateTime: '21 Jan 2024 11:00 AM', status: 'Completed' },
        { id: 6, fileName: 'deal_export_2024-01-20.csv', dateTime: '20 Jan 2024 03:30 PM', status: 'Completed' },
        { id: 7, fileName: 'deal_export_2024-01-19.csv', dateTime: '19 Jan 2024 08:15 AM', status: 'Failed' },
        { id: 8, fileName: 'deal_export_2024-01-18.csv', dateTime: '18 Jan 2024 05:45 PM', status: 'Completed' },
    ];
    const filteredData = useMemo(() => {
        let data = [...exportHistoryData];
        if (searchQuery)
            data = data.filter(item => item.fileName.toLowerCase().includes(searchQuery.toLowerCase()));
        return data;
    }, [searchQuery]);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
    return (_jsxs("div", { className: "report-content-wrapper with-sidebar", children: [_jsx(PageHeader, { title: "Deal Export History", description: "Track all your past deal data exports" }), _jsx("div", { className: "toolbar-left", children: _jsxs("div", { className: "search-box", children: [_jsx(Search, { size: 16, className: "search-icon" }), _jsx("input", { type: "text", placeholder: "Search exports...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "search-input" })] }) }), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "enquiries-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Date & Time" }), _jsx("th", { children: "File Name" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "Action" })] }) }), _jsx("tbody", { children: paginatedData.map(row => (_jsxs("tr", { children: [_jsx("td", { children: row.dateTime }), _jsx("td", { children: row.fileName }), _jsx("td", { children: _jsx("span", { className: `badge badge-${row.status.toLowerCase()}`, children: row.status }) }), _jsx("td", { children: _jsx("button", { className: "action-btn", title: "Download", onClick: () => alert(`Downloading ${row.fileName}...`), children: _jsx(Download, { size: 14 }) }) })] }, row.id))) })] }) }), _jsxs("div", { className: "pagination-container", children: [_jsxs("div", { className: "pagination-left", children: [_jsx("span", { className: "rows-label", children: "Rows per page:" }), _jsx("select", { value: rowsPerPage, onChange: (e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }, className: "rows-select", children: ROWS_OPTIONS_5_10_25.map(n => _jsx("option", { value: n, children: n }, n)) }), _jsxs("span", { className: "pagination-info", children: ["Showing ", startIndex + 1, "-", Math.min(startIndex + rowsPerPage, filteredData.length), " of ", filteredData.length] })] }), _jsxs("div", { className: "pagination-right", children: [_jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(1), children: "First" }), _jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(prev => prev - 1), children: _jsx(ChevronLeft, { size: 16 }) }), _jsxs("span", { className: "page-indicator", children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(prev => prev + 1), children: _jsx(ChevronRight, { size: 16 }) }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(totalPages), children: "Last" })] })] })] }));
};
export default DealExportHistoryReport;
//# sourceMappingURL=DealExportHistoryReport.js.map