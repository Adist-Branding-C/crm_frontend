import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Download, Trash2 } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
const sampleData = [
    { id: 1, name: 'Rahul Sharma', phone: '9876543210', deletedBy: 'Admin', deletedAt: '2024-01-25', reason: 'Duplicate' },
    { id: 2, name: 'Priya Patel', phone: '9876543211', deletedBy: 'John Doe', deletedAt: '2024-01-24', reason: 'Not Interested' },
];
const LeadDeletedLeads = () => {
    const [isFiltered, setIsFiltered] = useState(false);
    return (_jsxs("div", { className: "report-content-wrapper", children: [_jsx(PageHeader, { title: "Deleted Leads", description: "Track all deleted leads", breadcrumb: false }), _jsx("div", { className: "report-filter-section", children: _jsx("div", { className: "report-filter-actions", children: _jsx("button", { className: "btn btn-secondary", onClick: () => setIsFiltered(true), children: "Filter" }) }) }), isFiltered && (_jsx("div", { className: "report-table-section", children: _jsxs("table", { className: "report-data-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Name" }), _jsx("th", { children: "Phone" }), _jsx("th", { children: "Deleted By" }), _jsx("th", { children: "Deleted At" }), _jsx("th", { children: "Reason" })] }) }), _jsx("tbody", { children: sampleData.map(row => (_jsxs("tr", { children: [_jsx("td", { children: row.name }), _jsx("td", { children: row.phone }), _jsx("td", { children: row.deletedBy }), _jsx("td", { children: row.deletedAt }), _jsx("td", { children: row.reason })] }, row.id))) })] }) }))] }));
};
export default LeadDeletedLeads;
//# sourceMappingURL=LeadDeletedLeads.js.map