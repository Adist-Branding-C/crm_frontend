import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, X, Calendar, ChevronLeft, ExternalLink, Eye, ChevronLeft as LeftArrow, ChevronRight, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './FacebookViewLeads.css';
const workflowsList = [
    { id: 1, name: 'All Workflows' },
    { id: 2, name: 'MBBS new common' },
    { id: 3, name: 'Demo Workflow' },
    { id: 4, name: 'Admission Leads' },
    { id: 5, name: 'Enquiry Flow' },
];
const sampleLeads = [
    { id: 794307, workflowName: 'MBBS new common', name: 'Shan Nizar Pathummal Bevi', phone: '919446705481', additionalData: { city: 'Kochi', course: 'MBBS', email: 'shan@test.com', campaign: 'MBBS 2026' }, status: 'success', leadStatus: 'New', createdAt: '2026-04-25 02:27:03', failureReason: '-' },
    { id: 794306, workflowName: 'Demo Workflow', name: 'Rahul Sharma', phone: '919876543210', additionalData: { city: 'Delhi', course: 'Demo', email: 'rahul@test.com', campaign: 'Demo' }, status: 'success', leadStatus: 'Existing', createdAt: '2026-04-25 02:25:11', failureReason: '-' },
    { id: 794305, workflowName: 'Admission Leads', name: 'Priya Patel', phone: '919812345678', additionalData: { city: 'Mumbai', course: 'Engineering', email: 'priya@test.com', campaign: 'Admission' }, status: 'failed', leadStatus: 'New', createdAt: '2026-04-25 02:20:45', failureReason: 'Duplicate phone number' },
    { id: 794304, workflowName: 'MBBS new common', name: 'Amit Kumar', phone: '919798765432', additionalData: { city: 'Bangalore', course: 'MBBS', email: 'amit@test.com', campaign: 'MBBS 2026' }, status: 'pending', leadStatus: 'Duplicate', createdAt: '2026-04-25 02:18:33', failureReason: '-' },
    { id: 794303, workflowName: 'Enquiry Flow', name: 'Sneha Reddy', phone: '919745678901', additionalData: { city: 'Chennai', course: 'Nursing', email: 'sneha@test.com', campaign: 'Enquiry' }, status: 'success', leadStatus: 'New', createdAt: '2026-04-25 02:15:22', failureReason: '-' },
    { id: 794302, workflowName: 'Demo Workflow', name: 'John Doe', phone: '919623456789', additionalData: { city: 'Hyderabad', course: 'Demo', email: 'john@test.com', campaign: 'Demo' }, status: 'failed', leadStatus: 'New', createdAt: '2026-04-25 02:10:08', failureReason: 'Invalid phone format' },
    { id: 794301, workflowName: 'Admission Leads', name: 'Jane Smith', phone: '919556778899', additionalData: { city: 'Pune', course: 'Engineering', email: 'jane@test.com', campaign: 'Admission' }, status: 'success', leadStatus: 'Existing', createdAt: '2026-04-25 02:05:55', failureReason: '-' },
    { id: 794300, workflowName: 'MBBS new common', name: 'Mike Johnson', phone: '919445566778', additionalData: { city: 'Kolkata', course: 'MBBS', email: 'mike@test.com', campaign: 'MBBS 2026' }, status: 'pending', leadStatus: 'New', createdAt: '2026-04-25 02:00:12', failureReason: '-' },
    { id: 794299, workflowName: 'Enquiry Flow', name: 'Sarah Lee', phone: '919334455667', additionalData: { city: 'Ahmedabad', course: 'Nursing', email: 'sarah@test.com', campaign: 'Enquiry' }, status: 'success', leadStatus: 'Duplicate', createdAt: '2026-04-25 01:55:44', failureReason: '-' },
    { id: 794298, workflowName: 'Demo Workflow', name: 'Tom Harris', phone: '919223344556', additionalData: { city: 'Jaipur', course: 'Demo', email: 'tom@test.com', campaign: 'Demo' }, status: 'failed', leadStatus: 'New', createdAt: '2026-04-25 01:50:33', failureReason: 'Missing required field' },
];
const FacebookViewLeadsPage = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        dateFrom: '2026-04-25',
        dateTo: '2026-04-25',
        workflow: '',
        search: ''
    });
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const handleFilterChange = (field, value) => {
        setFilters({ ...filters, [field]: value });
        setCurrentPage(1);
    };
    const handleClear = () => {
        setFilters({
            dateFrom: '2026-04-25',
            dateTo: '2026-04-25',
            workflow: '',
            search: ''
        });
        setCurrentPage(1);
        setShowClearConfirm(false);
    };
    const handleViewDetails = (lead) => {
        setSelectedLead(lead);
        setShowDetailsModal(true);
    };
    const filteredLeads = useMemo(() => {
        let filtered = [...sampleLeads];
        if (filters.workflow) {
            filtered = filtered.filter(l => l.workflowName === filters.workflow);
        }
        if (filters.search && filters.search.length >= 3) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(l => l.name.toLowerCase().includes(searchLower) ||
                l.phone.includes(searchLower));
        }
        return filtered;
    }, [filters]);
    const stats = useMemo(() => ({
        total: filteredLeads.length,
        success: filteredLeads.filter(l => l.status === 'success').length,
        failed: filteredLeads.filter(l => l.status === 'failed').length,
        new: filteredLeads.filter(l => l.leadStatus === 'New').length,
        duplicate: filteredLeads.filter(l => l.leadStatus === 'Duplicate').length,
        pending: filteredLeads.filter(l => l.status === 'pending').length,
    }), [filteredLeads]);
    const paginatedLeads = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return filteredLeads.slice(start, start + rowsPerPage);
    }, [filteredLeads, currentPage, rowsPerPage]);
    const totalPages = Math.ceil(filteredLeads.length / rowsPerPage);
    const getStatusBadge = (status, type) => {
        if (type === 'lead') {
            const badges = { 'New': 'new', 'Existing': 'existing', 'Duplicate': 'duplicate' };
            return _jsx("span", { className: `lead-status-badge ${badges[status] || ''}`, children: status });
        }
        const badges = { 'success': 'success', 'failed': 'failed', 'pending': 'pending' };
        return _jsx("span", { className: `status-badge ${badges[status] || ''}`, children: status });
    };
    return (_jsxs("div", { className: "facebook-view-leads-page", children: [_jsx(PageHeader, { title: "Facebook Lead Requests", description: "View and manage Facebook lead form submissions", breadcrumb: [
                    { label: 'GL Connect', link: '/user/gl-connect' },
                    { label: 'Facebook Integration', link: '/facebook/workflows' },
                    { label: 'View Leads' }
                ] }), _jsxs("div", { className: "filter-card", children: [_jsx("h3", { className: "filter-card-title", children: "Filter Options" }), _jsxs("div", { className: "filter-grid", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Date Range" }), _jsxs("div", { className: "date-range-input", children: [_jsx("input", { type: "date", value: filters.dateFrom, onChange: (e) => handleFilterChange('dateFrom', e.target.value) }), _jsx("span", { className: "date-separator", children: "-" }), _jsx("input", { type: "date", value: filters.dateTo, onChange: (e) => handleFilterChange('dateTo', e.target.value) }), _jsx("button", { className: "calendar-btn", children: _jsx(Calendar, { size: 14 }) })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Workflow" }), _jsx("select", { value: filters.workflow, onChange: (e) => handleFilterChange('workflow', e.target.value), children: workflowsList.map(w => (_jsx("option", { value: w.id === 1 ? '' : w.name, children: w.name }, w.id))) })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Search by Name or Phone" }), _jsxs("div", { className: "search-input-wrapper", children: [_jsx("input", { type: "text", placeholder: "Enter at least 3 characters...", value: filters.search, onChange: (e) => handleFilterChange('search', e.target.value) }), _jsx("button", { className: "search-btn", children: _jsx(Search, { size: 14 }) })] })] }), _jsxs("div", { className: "filter-actions", children: [_jsxs("button", { className: "btn btn-primary", onClick: () => { }, children: [_jsx(Filter, { size: 14 }), " Filter"] }), _jsxs("button", { className: "btn btn-secondary", onClick: () => setShowClearConfirm(true), children: [_jsx(X, { size: 14 }), " Clear"] })] })] })] }), _jsxs("div", { className: "summary-cards", children: [_jsx("div", { className: "summary-card blue", children: _jsxs("div", { className: "summary-content", children: [_jsx("span", { className: "summary-title", children: "Total Records" }), _jsx("span", { className: "summary-value", children: stats.total })] }) }), _jsx("div", { className: "summary-card green", children: _jsxs("div", { className: "summary-content", children: [_jsx("span", { className: "summary-title", children: "Success Records" }), _jsx("span", { className: "summary-value", children: stats.success })] }) }), _jsx("div", { className: "summary-card red", children: _jsxs("div", { className: "summary-content", children: [_jsx("span", { className: "summary-title", children: "Failed Records" }), _jsx("span", { className: "summary-value", children: stats.failed })] }) }), _jsx("div", { className: "summary-card green", children: _jsxs("div", { className: "summary-content", children: [_jsx("span", { className: "summary-title", children: "New Records" }), _jsx("span", { className: "summary-value", children: stats.new })] }) }), _jsx("div", { className: "summary-card teal", children: _jsxs("div", { className: "summary-content", children: [_jsx("span", { className: "summary-title", children: "Duplicate Records" }), _jsx("span", { className: "summary-value", children: stats.duplicate })] }) }), _jsx("div", { className: "summary-card yellow", children: _jsxs("div", { className: "summary-content", children: [_jsx("span", { className: "summary-title", children: "Pending Records" }), _jsx("span", { className: "summary-value", children: stats.pending })] }) })] }), _jsxs("div", { className: "table-controls", children: [_jsxs("div", { className: "table-controls-left", children: [_jsx("span", { className: "show-entries", children: "Show entries" }), _jsxs("select", { value: rowsPerPage, onChange: (e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }, children: [_jsx("option", { value: 10, children: "10" }), _jsx("option", { value: 25, children: "25" }), _jsx("option", { value: 50, children: "50" }), _jsx("option", { value: 100, children: "100" })] })] }), _jsx("div", { className: "table-controls-right", children: _jsx("div", { className: "live-search", children: _jsx("input", { type: "text", placeholder: "Search...", onChange: (e) => handleFilterChange('search', e.target.value) }) }) })] }), filteredLeads.length === 0 ? (_jsxs("div", { className: "empty-state", children: [_jsx("div", { className: "empty-icon", children: _jsx(AlertCircle, { size: 48 }) }), _jsx("p", { children: "No Facebook leads found" })] })) : (_jsx("div", { className: "leads-table-wrapper", children: _jsxs("table", { className: "leads-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "ID" }), _jsx("th", { children: "Workflow Name" }), _jsx("th", { children: "Name" }), _jsx("th", { children: "Phone Number" }), _jsx("th", { children: "Additional Data" }), _jsx("th", { children: "Status" }), _jsx("th", { children: "Lead Status" }), _jsx("th", { children: "Created At" }), _jsx("th", { children: "Failure Reason" })] }) }), _jsx("tbody", { children: paginatedLeads.map(lead => (_jsxs("tr", { children: [_jsx("td", { children: lead.id }), _jsx("td", { children: lead.workflowName }), _jsx("td", { children: lead.name }), _jsx("td", { children: lead.phone }), _jsx("td", { children: _jsx("button", { className: "view-data-btn", onClick: () => handleViewDetails(lead), children: _jsx(Eye, { size: 14 }) }) }), _jsx("td", { children: getStatusBadge(lead.status, 'status') }), _jsx("td", { children: getStatusBadge(lead.leadStatus, 'lead') }), _jsx("td", { children: lead.createdAt }), _jsx("td", { children: lead.failureReason })] }, lead.id))) })] }) })), filteredLeads.length > 0 && (_jsxs("div", { className: "pagination-bar", children: [_jsxs("span", { className: "showing-text", children: ["Showing ", (currentPage - 1) * rowsPerPage + 1, " to ", Math.min(currentPage * rowsPerPage, filteredLeads.length), " of ", filteredLeads.length, " entries"] }), _jsxs("div", { className: "pagination-controls", children: [_jsxs("button", { className: "pagination-btn", onClick: () => setCurrentPage(Math.max(1, currentPage - 1)), disabled: currentPage === 1, children: [_jsx(ChevronLeft, { size: 14 }), " Previous"] }), Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (_jsx("button", { className: `pagination-number ${currentPage === page ? 'active' : ''}`, onClick: () => setCurrentPage(page), children: page }, page))), _jsxs("button", { className: "pagination-btn", onClick: () => setCurrentPage(Math.min(totalPages, currentPage + 1)), disabled: currentPage === totalPages, children: ["Next ", _jsx(ChevronRight, { size: 14 })] })] })] })), showDetailsModal && selectedLead && (_jsx("div", { className: "modal-overlay", onClick: () => setShowDetailsModal(false), children: _jsxs("div", { className: "modal-content details-modal", onClick: e => e.stopPropagation(), children: [_jsxs("div", { className: "modal-header", children: [_jsx("h3", { children: "Lead Details" }), _jsx("button", { className: "modal-close", onClick: () => setShowDetailsModal(false), children: _jsx(X, { size: 20 }) })] }), _jsxs("div", { className: "modal-body", children: [_jsxs("div", { className: "detail-row", children: [_jsx("span", { className: "detail-label", children: "Full Name" }), _jsx("span", { className: "detail-value", children: selectedLead.name })] }), _jsxs("div", { className: "detail-row", children: [_jsx("span", { className: "detail-label", children: "Phone" }), _jsx("span", { className: "detail-value", children: selectedLead.phone })] }), _jsxs("div", { className: "detail-row", children: [_jsx("span", { className: "detail-label", children: "Email" }), _jsx("span", { className: "detail-value", children: selectedLead.additionalData.email || '-' })] }), _jsxs("div", { className: "detail-row", children: [_jsx("span", { className: "detail-label", children: "City" }), _jsx("span", { className: "detail-value", children: selectedLead.additionalData.city || '-' })] }), _jsxs("div", { className: "detail-row", children: [_jsx("span", { className: "detail-label", children: "Course" }), _jsx("span", { className: "detail-value", children: selectedLead.additionalData.course || '-' })] }), _jsxs("div", { className: "detail-row", children: [_jsx("span", { className: "detail-label", children: "Campaign" }), _jsx("span", { className: "detail-value", children: selectedLead.additionalData.campaign || '-' })] }), _jsxs("div", { className: "detail-row", children: [_jsx("span", { className: "detail-label", children: "UTM Source" }), _jsx("span", { className: "detail-value", children: "-" })] }), _jsxs("div", { className: "detail-row", children: [_jsx("span", { className: "detail-label", children: "Raw JSON" }), _jsx("pre", { className: "detail-json", children: JSON.stringify(selectedLead.additionalData, null, 2) })] })] }), _jsx("div", { className: "modal-footer", children: _jsx("button", { className: "btn btn-secondary", onClick: () => setShowDetailsModal(false), children: "Close" }) })] }) })), showClearConfirm && (_jsx("div", { className: "modal-overlay", onClick: () => setShowClearConfirm(false), children: _jsx("div", { className: "modal-content confirm-modal", onClick: e => e.stopPropagation(), children: _jsxs("div", { className: "modal-body", children: [_jsx("p", { children: "Are you sure you want to clear all filters?" }), _jsxs("div", { className: "modal-actions", children: [_jsx("button", { className: "btn btn-secondary", onClick: () => setShowClearConfirm(false), children: "Cancel" }), _jsx("button", { className: "btn btn-primary", onClick: handleClear, children: "Clear" })] })] }) }) }))] }));
};
export default FacebookViewLeadsPage;
//# sourceMappingURL=FacebookViewLeads.js.map