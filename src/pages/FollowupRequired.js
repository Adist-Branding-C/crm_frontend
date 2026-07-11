import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Plus, MoreHorizontal, Edit2, Trash2, Eye, Download } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import PageContainer from '../components/PageContainer';
import LeadDetailDrawer from '../components/LeadDetailDrawer';
import './Enquiries.css';
const sampleData = [
    { id: 1, name: 'Rahul Sharma', phone: '9876543210', assignedTo: 'John Doe', purpose: 'Sales', type: 'Hot Lead', status: 'Active', source: 'Website', createdAt: '2024-01-15', updatedAt: '2024-01-20', nextFollowUp: '2024-01-25' },
    { id: 2, name: 'Priya Patel', phone: '9876543211', assignedTo: 'Jane Smith', purpose: 'Support', type: 'Cold Lead', status: 'Pending', source: 'Referral', createdAt: '2024-01-14', updatedAt: '2024-01-19', nextFollowUp: '2024-01-26' },
    { id: 3, name: 'Amit Kumar', phone: '9876543212', assignedTo: 'John Doe', purpose: 'Sales', type: 'Warm Lead', status: 'Active', source: 'Social Media', createdAt: '2024-01-13', updatedAt: '2024-01-18', nextFollowUp: '2024-01-24' },
    { id: 4, name: 'Sneha Reddy', phone: '9876543213', assignedTo: 'Mike Johnson', purpose: 'Demo', type: 'Hot Lead', status: 'Active', source: 'Website', createdAt: '2024-01-12', updatedAt: '2024-01-17', nextFollowUp: '2024-01-23' },
    { id: 5, name: 'Vikram Singh', phone: '9876543214', assignedTo: 'Jane Smith', purpose: 'Sales', type: 'Cold Lead', status: 'Active', source: 'Email Campaign', createdAt: '2024-01-11', updatedAt: '2024-01-16', nextFollowUp: '2024-01-22' },
    { id: 6, name: 'Ananya Gupta', phone: '9876543215', assignedTo: 'John Doe', purpose: 'Support', type: 'Warm Lead', status: 'Inactive', source: 'Referral', createdAt: '2024-01-10', updatedAt: '2024-01-15', nextFollowUp: '2024-01-21' },
    { id: 7, name: 'Rajesh Verma', phone: '9876543216', assignedTo: 'Mike Johnson', purpose: 'Sales', type: 'Hot Lead', status: 'Pending', source: 'Website', createdAt: '2024-01-09', updatedAt: '2024-01-14', nextFollowUp: '2024-01-20' },
    { id: 8, name: 'Kavitha Nair', phone: '9876543217', assignedTo: 'Jane Smith', purpose: 'Demo', type: 'Cold Lead', status: 'Active', source: 'Social Media', createdAt: '2024-01-08', updatedAt: '2024-01-13', nextFollowUp: '2024-01-19' },
    { id: 9, name: 'Arun Pillai', phone: '9876543218', assignedTo: 'John Doe', purpose: 'Sales', type: 'Warm Lead', status: 'Active', source: 'Referral', createdAt: '2024-01-07', updatedAt: '2024-01-12', nextFollowUp: '2024-01-18' },
    { id: 10, name: 'Lakshmi Menon', phone: '9876543219', assignedTo: 'Mike Johnson', purpose: 'Support', type: 'Hot Lead', status: 'Pending', source: 'Website', createdAt: '2024-01-06', updatedAt: '2024-01-11', nextFollowUp: '2024-01-17' },
    { id: 11, name: 'Suresh Iyer', phone: '9876543220', assignedTo: 'Jane Smith', purpose: 'Sales', type: 'Cold Lead', status: 'Active', source: 'Email Campaign', createdAt: '2024-01-05', updatedAt: '2024-01-10', nextFollowUp: '2024-01-16' },
    { id: 12, name: 'Meera Das', phone: '9876543221', assignedTo: 'John Doe', purpose: 'Demo', type: 'Warm Lead', status: 'Pending', source: 'Social Media', createdAt: '2024-01-04', updatedAt: '2024-01-09', nextFollowUp: '2024-01-15' },
];
const FollowupRequired = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [actionMenuOpen, setActionMenuOpen] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [showActionsDropdown, setShowActionsDropdown] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const [filters, setFilters] = useState({
        type: '',
        status: '',
        source: '',
        assignedTo: '',
        dateRange: { start: '', end: '' },
    });
    const columns = [
        { key: 'checkbox', label: '' },
        { key: 'action', label: 'Action' },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'phone', label: 'Phone', sortable: true },
        { key: 'assignedTo', label: 'Assigned To', sortable: true },
        { key: 'purpose', label: 'Purpose', sortable: true },
        { key: 'type', label: 'Type', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'source', label: 'Source', sortable: true },
        { key: 'createdAt', label: 'Created At', sortable: true },
        { key: 'updatedAt', label: 'Updated At', sortable: true },
        { key: 'nextFollowUp', label: 'Next Follow Up', sortable: true }
    ];
    const filteredData = useMemo(() => {
        let data = [...sampleData];
        if (searchQuery)
            data = data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.phone.includes(searchQuery) || item.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()));
        if (filters.type)
            data = data.filter(item => item.type === filters.type);
        if (filters.status)
            data = data.filter(item => item.status === filters.status);
        if (filters.source)
            data = data.filter(item => item.source === filters.source);
        if (filters.assignedTo)
            data = data.filter(item => item.assignedTo === filters.assignedTo);
        if (sortConfig.key)
            data.sort((a, b) => { if (a[sortConfig.key] < b[sortConfig.key])
                return sortConfig.direction === 'asc' ? -1 : 1; if (a[sortConfig.key] > b[sortConfig.key])
                return sortConfig.direction === 'asc' ? 1 : -1; return 0; });
        return data;
    }, [searchQuery, filters, sortConfig]);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
    const handleSort = (key) => setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));
    const handleSelectAll = (e) => { if (e.target.checked)
        setSelectedRows(paginatedData.map(item => item.id));
    else
        setSelectedRows([]); };
    const handleSelectRow = (id) => setSelectedRows(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    const handleRowsPerPageChange = (e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); };
    const clearFilters = () => { setFilters({ type: '', status: '', source: '', assignedTo: '', dateRange: { start: '', end: '' } }); setShowFilters(false); };
    return (_jsxs(PageContainer, { children: [_jsx(PageHeader, { title: "Followup Required", description: "Potential customers showing interest in a product or service." }), _jsx("div", { className: "enquiries-toolbar", children: _jsxs("div", { className: "toolbar-left", children: [_jsxs("div", { className: "search-box", children: [_jsx(Search, { size: 16, className: "search-icon" }), _jsx("input", { type: "text", placeholder: "Search...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "search-input" })] }), _jsxs("button", { className: "btn btn-secondary", onClick: () => setShowFilters(!showFilters), children: [_jsx(Filter, { size: 16 }), "Filter", _jsx(ChevronDown, { size: 14, className: showFilters ? 'rotate' : '' })] }), _jsxs("div", { className: "dropdown-container", children: [_jsxs("button", { className: "btn btn-secondary", onClick: () => setShowSortDropdown(!showSortDropdown), children: ["Sort By", _jsx(ChevronDown, { size: 14 })] }), showSortDropdown && (_jsxs("div", { className: "sort-dropdown", children: [_jsxs("button", { onClick: () => { handleSort('createdAt'); setShowSortDropdown(false); }, children: ["Created Date ", sortConfig.key === 'createdAt' && (sortConfig.direction === 'asc' ? '↑' : '↓')] }), _jsxs("button", { onClick: () => { handleSort('nextFollowUp'); setShowSortDropdown(false); }, children: ["Next Follow Up ", sortConfig.key === 'nextFollowUp' && (sortConfig.direction === 'asc' ? '↑' : '↓')] }), _jsxs("button", { onClick: () => { handleSort('name'); setShowSortDropdown(false); }, children: ["Name ", sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')] })] }))] }), _jsxs("div", { className: "dropdown-container", children: [_jsxs("button", { className: "btn btn-secondary", onClick: () => setShowActionsDropdown(!showActionsDropdown), children: ["Actions", _jsx(ChevronDown, { size: 14 })] }), showActionsDropdown && (_jsxs("div", { className: "actions-dropdown", children: [_jsx("button", { onClick: () => setShowActionsDropdown(false), children: "Bulk Update" }), _jsx("button", { onClick: () => setShowActionsDropdown(false), children: "Update Status" }), _jsx("button", { onClick: () => setShowActionsDropdown(false), children: "Assign Agent" }), _jsx("button", { onClick: () => setShowActionsDropdown(false), children: "Delete" })] }))] })] }) }), showFilters && (_jsxs("div", { className: "filters-panel", children: [_jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Type" }), _jsxs("select", { value: filters.type, onChange: (e) => setFilters({ ...filters, type: e.target.value }), children: [_jsx("option", { value: "", children: "All" }), _jsx("option", { value: "Hot Lead", children: "Hot Lead" }), _jsx("option", { value: "Cold Lead", children: "Cold Lead" }), _jsx("option", { value: "Warm Lead", children: "Warm Lead" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Status" }), _jsxs("select", { value: filters.status, onChange: (e) => setFilters({ ...filters, status: e.target.value }), children: [_jsx("option", { value: "", children: "All" }), _jsx("option", { value: "Active", children: "Active" }), _jsx("option", { value: "Inactive", children: "Inactive" }), _jsx("option", { value: "Pending", children: "Pending" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Source" }), _jsxs("select", { value: filters.source, onChange: (e) => setFilters({ ...filters, source: e.target.value }), children: [_jsx("option", { value: "", children: "All" }), _jsx("option", { value: "Website", children: "Website" }), _jsx("option", { value: "Referral", children: "Referral" }), _jsx("option", { value: "Social Media", children: "Social Media" }), _jsx("option", { value: "Email Campaign", children: "Email Campaign" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Assigned To" }), _jsxs("select", { value: filters.assignedTo, onChange: (e) => setFilters({ ...filters, assignedTo: e.target.value }), children: [_jsx("option", { value: "", children: "All" }), _jsx("option", { value: "John Doe", children: "John Doe" }), _jsx("option", { value: "Jane Smith", children: "Jane Smith" }), _jsx("option", { value: "Mike Johnson", children: "Mike Johnson" })] })] })] }), _jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Date Range" }), _jsxs("div", { className: "date-range-input", children: [_jsx("input", { type: "date", value: filters.dateRange.start, onChange: (e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } }) }), _jsx("span", { children: "to" }), _jsx("input", { type: "date", value: filters.dateRange.end, onChange: (e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } }) })] })] }), _jsxs("div", { className: "filter-actions", children: [_jsx("button", { className: "btn btn-primary", onClick: () => setShowFilters(false), children: "Filter" }), _jsx("button", { className: "btn btn-secondary", onClick: clearFilters, children: "Clear" })] })] })] })), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "enquiries-table", children: [_jsx("thead", { children: _jsx("tr", { children: columns.map(col => (_jsx("th", { className: col.sortable ? 'sortable' : '', onClick: col.sortable ? () => handleSort(col.key) : undefined, children: col.key === 'checkbox' ? _jsx("input", { type: "checkbox", checked: paginatedData.length > 0 && selectedRows.length === paginatedData.length, onChange: handleSelectAll }) : _jsxs(_Fragment, { children: [col.label, col.sortable && sortConfig.key === col.key && (sortConfig.direction === 'asc' ? _jsx(ChevronUp, { size: 14 }) : _jsx(ChevronDown, { size: 14 }))] }) }, col.key))) }) }), _jsx("tbody", { children: paginatedData.map(row => (_jsxs("tr", { className: selectedRows.includes(row.id) ? 'selected' : '', children: [_jsx("td", { children: _jsx("input", { type: "checkbox", checked: selectedRows.includes(row.id), onChange: () => handleSelectRow(row.id) }) }), _jsx("td", { className: "action-cell", children: _jsxs("div", { className: "action-menu-container", children: [_jsx("button", { className: "action-btn", onClick: () => setActionMenuOpen(actionMenuOpen === row.id ? null : row.id), children: _jsx(MoreHorizontal, { size: 16 }) }), actionMenuOpen === row.id && (_jsxs("div", { className: "action-dropdown", children: [_jsxs("button", { onClick: () => { setSelectedLead(row); setIsDrawerOpen(true); setActionMenuOpen(null); }, children: [_jsx(Eye, { size: 14 }), "View"] }), _jsxs("button", { children: [_jsx(Edit2, { size: 14 }), "Edit"] }), _jsxs("button", { className: "delete", children: [_jsx(Trash2, { size: 14 }), "Delete"] })] }))] }) }), _jsx("td", { className: "lead-name-cell", onClick: () => { setSelectedLead(row); setIsDrawerOpen(true); }, children: row.name }), _jsx("td", { children: row.phone }), _jsx("td", { children: row.assignedTo }), _jsx("td", { children: row.purpose }), _jsx("td", { children: _jsx("span", { className: `badge badge-${row.type.toLowerCase().replace(' ', '-')}`, children: row.type }) }), _jsx("td", { children: _jsx("span", { className: `badge badge-${row.status.toLowerCase()}`, children: row.status }) }), _jsx("td", { children: row.source }), _jsx("td", { children: row.createdAt }), _jsx("td", { children: row.updatedAt }), _jsx("td", { children: row.nextFollowUp })] }, row.id))) })] }) }), _jsxs("div", { className: "pagination-container", children: [_jsxs("div", { className: "pagination-left", children: [_jsx("span", { className: "rows-label", children: "Rows per page:" }), _jsxs("select", { value: rowsPerPage, onChange: handleRowsPerPageChange, className: "rows-select", children: [_jsx("option", { value: 10, children: "10" }), _jsx("option", { value: 25, children: "25" }), _jsx("option", { value: 50, children: "50" }), _jsx("option", { value: 100, children: "100" })] }), _jsxs("span", { className: "pagination-info", children: ["Showing ", startIndex + 1, "-", Math.min(startIndex + rowsPerPage, filteredData.length), " of ", filteredData.length] })] }), _jsxs("div", { className: "pagination-right", children: [_jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(1), children: "First" }), _jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(prev => prev - 1), children: _jsx(ChevronLeft, { size: 16 }) }), _jsxs("span", { className: "page-indicator", children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(prev => prev + 1), children: _jsx(ChevronRight, { size: 16 }) }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(totalPages), children: "Last" })] })] }), _jsx(LeadDetailDrawer, { lead: selectedLead, isOpen: !!selectedLead && isDrawerOpen, onClose: () => { setIsDrawerOpen(false); setSelectedLead(null); } })] }));
};
export default FollowupRequired;
//# sourceMappingURL=FollowupRequired.js.map