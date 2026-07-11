import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
const sampleData = [
    { id: 1, endpoint: '/api/leads', method: 'GET', status: 200, responseTime: '245ms', calledAt: '2024-01-25 10:30 AM', user: 'John Doe' },
    { id: 2, endpoint: '/api/leads', method: 'POST', status: 201, responseTime: '120ms', calledAt: '2024-01-25 10:15 AM', user: 'Admin' },
    { id: 3, endpoint: '/api/leads/123', method: 'PUT', status: 200, responseTime: '180ms', calledAt: '2024-01-25 09:45 AM', user: 'Jane Smith' },
];
const LeadGLAPIHistory = () => {
    const [isFiltered, setIsFiltered] = useState(false);
    return (_jsxs("div", { className: "report-content-wrapper", children: [_jsx(PageHeader, { title: "GL API History", description: "Track all your past lead data API", breadcrumb: false }), isFiltered && (_jsx("div", { className: "report-table-section", children: _jsxs("table", { className: "report-data-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Endpoint" }), _jsx("th", { children: "Method" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "Response Time" }), _jsx("th", { children: "Called At" }), _jsx("th", { children: "User" })] }) }), _jsx("tbody", { children: sampleData.map(row => (_jsxs("tr", { children: [_jsx("td", { children: row.endpoint }), _jsx("td", { children: row.method }), _jsx("td", { children: row.status }), _jsx("td", { children: row.responseTime }), _jsx("td", { children: row.calledAt }), _jsx("td", { children: row.user })] }, row.id))) })] }) }))] }));
};
export default LeadGLAPIHistory;
//# sourceMappingURL=LeadGLAPIHistory.js.map