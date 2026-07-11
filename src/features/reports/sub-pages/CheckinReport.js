import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Search, Download } from 'lucide-react';
import { checkinData } from '../constants';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../shared/constants/pagination';
const CheckinReport = () => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const filteredData = useMemo(() => {
        let data = [...checkinData];
        if (search) {
            data = data.filter(item => item.shop.toLowerCase().includes(search.toLowerCase()) ||
                item.agent.toLowerCase().includes(search.toLowerCase()) ||
                item.note.toLowerCase().includes(search.toLowerCase()));
        }
        return data;
    }, [search]);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
    const handleExport = () => {
        const headers = ['Shop', 'Agent', 'Note', 'Type', 'Date', 'Location', 'Type', 'Date', 'Location'];
        const csvContent = [headers.join(','), ...filteredData.map(d => `${d.shop},${d.agent},${d.note},${d.typeIn},${d.dateIn},${d.locationIn},${d.typeOut},${d.dateOut},${d.locationOut}`)].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'checkin_report.csv';
        link.click();
    };
    return (_jsx("div", { className: "report-content-wrapper with-sidebar", children: _jsxs("div", { className: "checkin-table-section", children: [_jsxs("div", { className: "feedback-table-header", children: [_jsxs("div", { className: "feedback-table-controls", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Show" }), _jsx("select", { className: "filter-select", value: rowsPerPage, onChange: (e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }, children: ROWS_OPTIONS_10_25_50_100.map(n => _jsx("option", { value: n, children: n }, n)) }), _jsx("label", { children: "entries" })] }), _jsxs("div", { className: "search-box", children: [_jsx(Search, { size: 16, className: "search-icon" }), _jsx("input", { type: "text", placeholder: "Search...", value: search, onChange: (e) => { setSearch(e.target.value); setCurrentPage(1); }, className: "search-input" })] })] }), _jsxs("button", { className: "btn btn-secondary", onClick: handleExport, children: [_jsx(Download, { size: 16 }), " Export"] })] }), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "enquiries-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Shop" }), _jsx("th", { children: "Agent" }), _jsx("th", { children: "Note" }), _jsx("th", { children: "Type" }), _jsx("th", { children: "Date" }), _jsx("th", { children: "Location" }), _jsx("th", { children: "Type" }), _jsx("th", { children: "Date" }), _jsx("th", { children: "Location" })] }) }), _jsx("tbody", { children: paginatedData.length > 0 ? paginatedData.map(row => (_jsxs("tr", { children: [_jsx("td", { children: row.shop }), _jsx("td", { children: row.agent }), _jsx("td", { children: row.note }), _jsx("td", { children: _jsx("span", { className: "badge badge-incoming", children: row.typeIn }) }), _jsx("td", { children: row.dateIn }), _jsx("td", { children: row.locationIn }), _jsx("td", { children: _jsx("span", { className: "badge badge-outgoing", children: row.typeOut }) }), _jsx("td", { children: row.dateOut }), _jsx("td", { children: row.locationOut })] }, row.id))) : (_jsx("tr", { children: _jsx("td", { colSpan: 9, style: { textAlign: 'center', padding: '2rem' }, children: "No data available" }) })) })] }) }), _jsxs("div", { className: "pagination-container", children: [_jsx("div", { className: "pagination-left", children: _jsxs("span", { className: "pagination-info", children: ["Showing ", filteredData.length > 0 ? startIndex + 1 : 0, " to ", Math.min(startIndex + rowsPerPage, filteredData.length), " of ", filteredData.length] }) }), _jsxs("div", { className: "pagination-right", children: [_jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(1), children: "First" }), _jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(prev => prev - 1), children: "Previous" }), _jsxs("span", { className: "page-indicator", children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(prev => prev + 1), children: "Next" }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(totalPages), children: "Last" })] })] })] }) }));
};
export default CheckinReport;
//# sourceMappingURL=CheckinReport.js.map