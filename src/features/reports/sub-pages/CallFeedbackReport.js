import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Search, Download } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { callFeedbackData } from '../constants';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../shared/constants/pagination';
const CallFeedbackReport = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const leadStatusData = [
        { status: 'New Lead', count: 32 }, { status: 'Interested', count: 18 },
        { status: 'Not Interested', count: 12 }, { status: 'Follow Up', count: 10 },
        { status: 'No Response', count: 8 }, { status: 'Converted', count: 4 },
        { status: 'Lost', count: 2 },
    ];
    const leadStatusColors = ['#3b82f6', '#10b981', '#ef4444', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899'];
    const filteredData = useMemo(() => {
        let data = [...callFeedbackData];
        if (searchQuery) {
            data = data.filter(item => item.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.agent.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        return data;
    }, [searchQuery]);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
    const totalLeadCount = leadStatusData.reduce((sum, item) => sum + item.count, 0);
    let gradientStops = [];
    let currentAngle = 0;
    leadStatusData.forEach((item, index) => {
        const angle = (item.count / totalLeadCount) * 360;
        gradientStops.push(`${leadStatusColors[index]} ${currentAngle}deg ${currentAngle + angle}deg`);
        currentAngle += angle;
    });
    const handleExport = () => {
        const headers = ['Lead Name', 'Number', 'Agent', 'Remark', 'Call Status', 'Call Time'];
        const csvContent = [headers.join(','), ...filteredData.map(d => `${d.leadName},${d.number},${d.agent},${d.remark},${d.callStatus},${d.callTime}`)].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'call_feedback_report.csv';
        link.click();
    };
    return (_jsxs("div", { className: "report-content-wrapper with-sidebar", children: [_jsx(PageHeader, { title: "Call Feedback Report", description: "Detailed Call Feedback" }), _jsxs("div", { className: "feedback-layout", children: [_jsxs("div", { className: "feedback-left", children: [_jsxs("div", { className: "feedback-card", children: [_jsx("h3", { className: "feedback-card-title", children: "Status Summary" }), _jsx("div", { className: "status-summary-table-container", children: _jsx("table", { className: "status-summary-table", children: _jsxs("tbody", { children: [_jsxs("tr", { children: [_jsx("td", { children: "Connected" }), _jsx("td", { className: "status-summary-count", children: "45" })] }), _jsxs("tr", { children: [_jsx("td", { children: "Not Connected" }), _jsx("td", { className: "status-summary-count", children: "23" })] }), _jsxs("tr", { children: [_jsx("td", { children: "Action Pending" }), _jsx("td", { className: "status-summary-count", children: "18" })] }), _jsxs("tr", { children: [_jsx("td", { children: "Total" }), _jsx("td", { className: "status-summary-count", children: "86" })] })] }) }) })] }), _jsxs("div", { className: "feedback-stats-row", children: [_jsxs("div", { className: "feedback-stat-card", children: [_jsx("span", { className: "feedback-stat-value", children: "18" }), _jsx("span", { className: "feedback-stat-label", children: "Pending" })] }), _jsxs("div", { className: "feedback-stat-card pending", children: [_jsx("span", { className: "feedback-stat-value", children: "5" }), _jsx("span", { className: "feedback-stat-label", children: "Overdue" })] })] }), _jsxs("div", { className: "feedback-card", children: [_jsx("h3", { className: "feedback-card-title", children: "Lead Status" }), _jsx("div", { className: "lead-status-table-container", children: _jsx("table", { className: "status-summary-table", children: _jsx("tbody", { children: leadStatusData.map((row, index) => (_jsxs("tr", { children: [_jsxs("td", { children: [_jsx("span", { className: "status-dot", style: { background: leadStatusColors[index] } }), row.status] }), _jsx("td", { className: "status-summary-count", children: row.count })] }, index))) }) }) })] }), _jsxs("div", { className: "feedback-card", children: [_jsx("h3", { className: "feedback-card-title", children: "Lead Status Donut" }), _jsxs("div", { className: "feedback-chart-container", children: [_jsx("div", { className: "donut-chart-lg", children: _jsx("div", { className: "donut-chart", style: { background: `conic-gradient(${gradientStops.join(', ')})` }, children: _jsxs("div", { className: "donut-center", children: [_jsx("span", { className: "donut-value", children: totalLeadCount }), _jsx("span", { className: "donut-label", children: "Total" })] }) }) }), _jsx("div", { className: "donut-legend", children: leadStatusData.map((item, index) => (_jsxs("span", { className: "legend-item", children: [_jsxs("span", { className: "legend-row", children: [_jsx("span", { className: "legend-dot", style: { background: leadStatusColors[index] } }), item.status] }), _jsx("span", { className: "legend-count", children: item.count })] }, index))) })] })] })] }), _jsxs("div", { className: "feedback-right", children: [_jsxs("div", { className: "feedback-table-header", children: [_jsxs("div", { className: "feedback-table-controls", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Show" }), _jsx("select", { className: "filter-select", value: rowsPerPage, onChange: (e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }, children: ROWS_OPTIONS_10_25_50_100.map(n => _jsx("option", { value: n, children: n }, n)) }), _jsx("label", { children: "entries" })] }), _jsxs("div", { className: "search-box", children: [_jsx(Search, { size: 16, className: "search-icon" }), _jsx("input", { type: "text", placeholder: "Search...", value: searchQuery, onChange: (e) => { setSearchQuery(e.target.value); setCurrentPage(1); }, className: "search-input" })] })] }), _jsxs("button", { className: "btn btn-secondary", onClick: handleExport, children: [_jsx(Download, { size: 16 }), " Export"] })] }), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "enquiries-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Lead Name" }), _jsx("th", { children: "Number" }), _jsx("th", { children: "Agent" }), _jsx("th", { children: "Remark" }), _jsx("th", { children: "Call Status" }), _jsx("th", { children: "Call Time" })] }) }), _jsx("tbody", { children: paginatedData.length > 0 ? paginatedData.map(row => (_jsxs("tr", { children: [_jsx("td", { children: row.leadName }), _jsx("td", { children: row.number }), _jsx("td", { children: row.agent }), _jsx("td", { children: row.remark }), _jsx("td", { children: _jsx("span", { className: `badge badge-${row.callStatus.toLowerCase().replace(' ', '-')}`, children: row.callStatus }) }), _jsx("td", { children: row.callTime })] }, row.id))) : (_jsx("tr", { children: _jsx("td", { colSpan: 6, style: { textAlign: 'center', padding: '2rem' }, children: "No data available" }) })) })] }) }), _jsxs("div", { className: "pagination-container", children: [_jsx("div", { className: "pagination-left", children: _jsxs("span", { className: "pagination-info", children: ["Showing ", filteredData.length > 0 ? startIndex + 1 : 0, " to ", Math.min(startIndex + rowsPerPage, filteredData.length), " of ", filteredData.length] }) }), _jsxs("div", { className: "pagination-right", children: [_jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(1), children: "First" }), _jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(prev => prev - 1), children: "Previous" }), _jsxs("span", { className: "page-indicator", children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(prev => prev + 1), children: "Next" }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(totalPages), children: "Last" })] })] })] })] })] }));
};
export default CallFeedbackReport;
//# sourceMappingURL=CallFeedbackReport.js.map