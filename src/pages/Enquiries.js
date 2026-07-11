import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Plus, MoreHorizontal, Edit2, Trash2, Eye, Download, UserPlus, RefreshCw, ArrowUpDown, ArrowDown, ArrowUp, Copy, Mail, Clock, History, Check, ArrowDownNarrowWide, ArrowUpNarrowWide, SortAsc, SortDesc, Users, Send, RotateCcw, MessageSquare, Phone, FileText, MessageCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import PageContainer from '../components/PageContainer';
import AddLeadDrawer from '../components/AddLeadDrawer';
import LeadDetailDrawer from '../components/LeadDetailDrawer';
import ActionDropdownPortal from '../components/ActionDropdownPortal';
import { useLoading } from '../layouts/DashboardLayout';
import './Enquiries.css';
const sampleData = [
    { id: 1, name: 'Rahul Sharma', phone: '9876543210', email: 'rahul@email.com', location: 'Kochi, Kerala', assignedTo: 'John Doe', purpose: 'Sales', type: 'Hot Lead', status: 'Active', source: 'Website', createdAt: '2024-01-15', updatedAt: '2024-01-20', nextFollowUp: '2024-01-25' },
    { id: 2, name: 'Priya Patel', phone: '9876543211', email: 'priya@email.com', location: 'Trivandrum, Kerala', assignedTo: 'Jane Smith', purpose: 'Support', type: 'Cold Lead', status: 'Inactive', source: 'Referral', createdAt: '2024-01-14', updatedAt: '2024-01-19', nextFollowUp: '2024-01-26' },
    { id: 3, name: 'Amit Kumar', phone: '9876543212', email: 'amit@email.com', location: 'Bangalore, Karnataka', assignedTo: 'John Doe', purpose: 'Sales', type: 'Warm Lead', status: 'Active', source: 'Social Media', createdAt: '2024-01-13', updatedAt: '2024-01-18', nextFollowUp: '2024-01-24' },
    { id: 4, name: 'Sneha Reddy', phone: '9876543213', email: 'sneha@email.com', location: 'Hyderabad, Telangana', assignedTo: 'Mike Johnson', purpose: 'Demo', type: 'Hot Lead', status: 'Pending', source: 'Website', createdAt: '2024-01-12', updatedAt: '2024-01-17', nextFollowUp: '2024-01-23' },
    { id: 5, name: 'Vikram Singh', phone: '9876543214', email: 'vikram@email.com', location: 'Chennai, Tamil Nadu', assignedTo: 'Jane Smith', purpose: 'Sales', type: 'Cold Lead', status: 'Active', source: 'Email Campaign', createdAt: '2024-01-11', updatedAt: '2024-01-16', nextFollowUp: '2024-01-22' },
    { id: 6, name: 'Ananya Gupta', phone: '9876543215', email: 'ananya@email.com', location: 'Mumbai, Maharashtra', assignedTo: 'John Doe', purpose: 'Support', type: 'Warm Lead', status: 'Inactive', source: 'Referral', createdAt: '2024-01-10', updatedAt: '2024-01-15', nextFollowUp: '2024-01-21' },
    { id: 7, name: 'Rajesh Verma', phone: '9876543216', email: 'rajesh@email.com', location: 'Delhi, NCR', assignedTo: 'Mike Johnson', purpose: 'Sales', type: 'Hot Lead', status: 'Active', source: 'Website', createdAt: '2024-01-09', updatedAt: '2024-01-14', nextFollowUp: '2024-01-20' },
    { id: 8, name: 'Kavitha Nair', phone: '9876543217', email: 'kavitha@email.com', location: 'Kolkata, West Bengal', assignedTo: 'Jane Smith', purpose: 'Demo', type: 'Cold Lead', status: 'Pending', source: 'Social Media', createdAt: '2024-01-08', updatedAt: '2024-01-13', nextFollowUp: '2024-01-19' },
    { id: 9, name: 'Arun Pillai', phone: '9876543218', email: 'arun@email.com', location: 'Pune, Maharashtra', assignedTo: 'John Doe', purpose: 'Sales', type: 'Warm Lead', status: 'Active', source: 'Referral', createdAt: '2024-01-07', updatedAt: '2024-01-12', nextFollowUp: '2024-01-18' },
    { id: 10, name: 'Lakshmi Menon', phone: '9876543219', email: 'lakshmi@email.com', location: 'Ahmedabad, Gujarat', assignedTo: 'Mike Johnson', purpose: 'Support', type: 'Hot Lead', status: 'Inactive', source: 'Website', createdAt: '2024-01-06', updatedAt: '2024-01-11', nextFollowUp: '2024-01-17' },
    { id: 11, name: 'Suresh Iyer', phone: '9876543220', email: 'suresh@email.com', location: 'Jaipur, Rajasthan', assignedTo: 'Jane Smith', purpose: 'Sales', type: 'Cold Lead', status: 'Active', source: 'Email Campaign', createdAt: '2024-01-05', updatedAt: '2024-01-10', nextFollowUp: '2024-01-16' },
    { id: 12, name: 'Meera Das', phone: '9876543221', email: 'meera@email.com', location: 'Lucknow, UP', assignedTo: 'John Doe', purpose: 'Demo', type: 'Warm Lead', status: 'Pending', source: 'Social Media', createdAt: '2024-01-04', updatedAt: '2024-01-09', nextFollowUp: '2024-01-15' },
];
const Enquiries = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [actionMenuOpen, setActionMenuOpen] = useState(null);
    const [actionMenuButtonRect, setActionMenuButtonRect] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [showActionsDropdown, setShowActionsDropdown] = useState(false);
    const [sortDropdownClosing, setSortDropdownClosing] = useState(false);
    const [actionsDropdownClosing, setActionsDropdownClosing] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const sortDropdownRef = useRef(null);
    const actionsDropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
                if (showSortDropdown) {
                    setSortDropdownClosing(true);
                    setTimeout(() => {
                        setShowSortDropdown(false);
                        setSortDropdownClosing(false);
                    }, 150);
                }
            }
            if (actionsDropdownRef.current && !actionsDropdownRef.current.contains(event.target)) {
                if (showActionsDropdown) {
                    setActionsDropdownClosing(true);
                    setTimeout(() => {
                        setShowActionsDropdown(false);
                        setActionsDropdownClosing(false);
                    }, 150);
                }
            }
        };
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                if (showSortDropdown) {
                    setSortDropdownClosing(true);
                    setTimeout(() => {
                        setShowSortDropdown(false);
                        setSortDropdownClosing(false);
                    }, 150);
                }
                if (showActionsDropdown) {
                    setActionsDropdownClosing(true);
                    setTimeout(() => {
                        setShowActionsDropdown(false);
                        setActionsDropdownClosing(false);
                    }, 150);
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [showSortDropdown, showActionsDropdown]);
    const [filters, setFilters] = useState({
        type: '',
        dateRange: { start: '', end: '' },
        filterByDate: '',
        enquirySource: '',
        enquiryPurpose: '',
        leadStatus: '',
        followupAdded: '',
        createdBy: '',
        assignedTo: '',
        leadType: '',
        location: '',
        remarks: '',
        date: ''
    });
    const columns = [
        { key: 'checkbox', label: '' },
        { key: 'action', label: 'Action' },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'phone', label: 'Phone', sortable: true },
        { key: 'location', label: 'Location', sortable: true },
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
        if (searchQuery) {
            data = data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.phone.includes(searchQuery) ||
                item.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        if (filters.enquirySource) {
            data = data.filter(item => item.source === filters.enquirySource);
        }
        if (filters.enquiryPurpose) {
            data = data.filter(item => item.purpose === filters.enquiryPurpose);
        }
        if (filters.leadStatus) {
            data = data.filter(item => item.status === filters.leadStatus);
        }
        if (filters.assignedTo) {
            data = data.filter(item => item.assignedTo === filters.assignedTo);
        }
        if (filters.leadType) {
            data = data.filter(item => item.type === filters.leadType);
        }
        if (sortConfig.key) {
            data.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key])
                    return sortConfig.direction === 'asc' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key])
                    return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return data;
    }, [searchQuery, filters, sortConfig]);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
    const closeSortDropdown = () => {
        setSortDropdownClosing(true);
        setTimeout(() => {
            setShowSortDropdown(false);
            setSortDropdownClosing(false);
        }, 150);
    };
    const closeActionsDropdown = () => {
        setActionsDropdownClosing(true);
        setTimeout(() => {
            setShowActionsDropdown(false);
            setActionsDropdownClosing(false);
        }, 150);
    };
    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };
    const handleSortDesc = (key) => {
        setSortConfig({ key, direction: 'desc' });
    };
    const handleSortAsc = (key) => {
        setSortConfig({ key, direction: 'asc' });
    };
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedRows(paginatedData.map(item => item.id));
        }
        else {
            setSelectedRows([]);
        }
    };
    const handleSelectRow = (id) => {
        setSelectedRows(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };
    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };
    const clearFilters = () => {
        setFilters({
            type: '',
            dateRange: { start: '', end: '' },
            filterByDate: '',
            enquirySource: '',
            enquiryPurpose: '',
            leadStatus: '',
            followupAdded: '',
            createdBy: '',
            assignedTo: '',
            leadType: '',
            location: '',
            remarks: '',
            date: ''
        });
        setShowFilters(false);
    };
    return (_jsxs(PageContainer, { children: [_jsx(PageHeader, { title: "Leads", description: "Potential customers showing interest in a product or service." }), _jsxs("div", { className: "enquiries-toolbar", children: [_jsxs("div", { className: "toolbar-left", children: [_jsxs("div", { className: "search-box", children: [_jsx(Search, { size: 16, className: "search-icon" }), _jsx("input", { type: "text", placeholder: "Search enquiries...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "search-input" })] }), _jsxs("button", { className: "btn btn-secondary", onClick: () => setShowFilters(!showFilters), children: [_jsx(Filter, { size: 16 }), "Filter", _jsx(ChevronDown, { size: 14, className: showFilters ? 'rotate' : '' })] }), _jsxs("div", { className: "dropdown-container", ref: sortDropdownRef, children: [_jsxs("button", { className: `btn btn-secondary ${showSortDropdown ? 'active' : ''}`, onClick: (e) => { e.stopPropagation(); if (showSortDropdown) {
                                            closeSortDropdown();
                                        }
                                        else {
                                            setShowSortDropdown(true);
                                            setShowActionsDropdown(false);
                                        } }, children: [_jsx(SortAsc, { size: 16 }), "Sort By", _jsx(ChevronDown, { size: 14, className: showSortDropdown ? 'rotate' : '' })] }), showSortDropdown && (_jsxs("div", { className: `premium-dropdown sort-dropdown ${sortDropdownClosing ? 'closing' : ''}`, children: [_jsx("div", { className: "dropdown-header", children: "Sort By" }), _jsxs("button", { className: `dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === 'desc' ? 'selected' : ''}`, onClick: () => { handleSortDesc('createdAt'); closeSortDropdown(); }, children: [_jsx(SortDesc, { size: 16 }), _jsx("span", { children: "Newest First" }), sortConfig.key === 'createdAt' && sortConfig.direction === 'desc' && _jsx(Check, { size: 14, className: "check-icon" })] }), _jsxs("button", { className: `dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === 'asc' ? 'selected' : ''}`, onClick: () => { handleSortAsc('createdAt'); closeSortDropdown(); }, children: [_jsx(SortAsc, { size: 16 }), _jsx("span", { children: "Oldest First" }), sortConfig.key === 'createdAt' && sortConfig.direction === 'asc' && _jsx(Check, { size: 14, className: "check-icon" })] }), _jsxs("button", { className: `dropdown-item ${sortConfig.key === 'updatedAt' && sortConfig.direction === 'desc' ? 'selected' : ''}`, onClick: () => { handleSortDesc('updatedAt'); closeSortDropdown(); }, children: [_jsx(RefreshCw, { size: 16 }), _jsx("span", { children: "Updated Date" }), sortConfig.key === 'updatedAt' && sortConfig.direction === 'desc' && _jsx(Check, { size: 14, className: "check-icon" })] }), _jsxs("button", { className: `dropdown-item ${sortConfig.key === 'updatedAt' && sortConfig.direction === 'asc' ? 'selected' : ''}`, onClick: () => { handleSortAsc('updatedAt'); closeSortDropdown(); }, children: [_jsx(SortAsc, { size: 16 }), _jsx("span", { children: "Updated (Oldest)" }), sortConfig.key === 'updatedAt' && sortConfig.direction === 'asc' && _jsx(Check, { size: 14, className: "check-icon" })] }), _jsxs("button", { className: `dropdown-item ${sortConfig.key === 'name' && sortConfig.direction === 'asc' ? 'selected' : ''}`, onClick: () => { handleSortAsc('name'); closeSortDropdown(); }, children: [_jsx(ArrowDownNarrowWide, { size: 16 }), _jsx("span", { children: "Name (A-Z)" }), sortConfig.key === 'name' && sortConfig.direction === 'asc' && _jsx(Check, { size: 14, className: "check-icon" })] }), _jsxs("button", { className: `dropdown-item ${sortConfig.key === 'name' && sortConfig.direction === 'desc' ? 'selected' : ''}`, onClick: () => { handleSortDesc('name'); closeSortDropdown(); }, children: [_jsx(ArrowUpNarrowWide, { size: 16 }), _jsx("span", { children: "Name (Z-A)" }), sortConfig.key === 'name' && sortConfig.direction === 'desc' && _jsx(Check, { size: 14, className: "check-icon" })] })] }))] }), _jsxs("div", { className: "dropdown-container", ref: actionsDropdownRef, children: [_jsxs("button", { className: `btn btn-secondary ${showActionsDropdown ? 'active' : ''}`, onClick: (e) => { e.stopPropagation(); if (showActionsDropdown) {
                                            closeActionsDropdown();
                                        }
                                        else {
                                            setShowActionsDropdown(true);
                                            setShowSortDropdown(false);
                                        } }, children: [_jsx(MoreHorizontal, { size: 16 }), "Actions", _jsx(ChevronDown, { size: 14, className: showActionsDropdown ? 'rotate' : '' })] }), showActionsDropdown && (_jsxs("div", { className: `premium-dropdown actions-dropdown ${actionsDropdownClosing ? 'closing' : ''}`, children: [_jsx("div", { className: "dropdown-header", children: "Actions" }), _jsxs("button", { className: "dropdown-item", onClick: () => { alert('Exporting selected leads...'); closeActionsDropdown(); }, children: [_jsx(Download, { size: 16 }), _jsx("span", { children: "Export Selected" })] }), _jsxs("button", { className: "dropdown-item", onClick: () => { alert('Changing status...'); closeActionsDropdown(); }, children: [_jsx(RotateCcw, { size: 16 }), _jsx("span", { children: "Change Status" })] }), _jsxs("button", { className: "dropdown-item", onClick: () => { alert('Assigning staff...'); closeActionsDropdown(); }, children: [_jsx(Users, { size: 16 }), _jsx("span", { children: "Assign Staff" })] }), _jsxs("button", { className: "dropdown-item", onClick: () => { alert('Sending follow up...'); closeActionsDropdown(); }, children: [_jsx(Send, { size: 16 }), _jsx("span", { children: "Send Follow Up" })] }), _jsxs("button", { className: "dropdown-item", onClick: () => { alert('Duplicating lead...'); closeActionsDropdown(); }, children: [_jsx(Copy, { size: 16 }), _jsx("span", { children: "Duplicate Lead" })] }), _jsx("div", { className: "dropdown-divider" }), _jsxs("button", { className: "dropdown-item danger", onClick: () => { alert('Deleting selected leads...'); closeActionsDropdown(); }, children: [_jsx(Trash2, { size: 16 }), _jsx("span", { children: "Delete Selected" })] })] }))] })] }), _jsx("div", { className: "toolbar-right", children: _jsxs("button", { className: "btn btn-primary", onClick: () => setIsDrawerOpen(true), children: [_jsx(Plus, { size: 16 }), "Add Lead"] }) })] }), showFilters && (_jsxs("div", { className: "filters-panel", children: [_jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Type" }), _jsxs("select", { value: filters.type, onChange: (e) => setFilters({ ...filters, type: e.target.value }), children: [_jsx("option", { value: "", children: "All" }), _jsx("option", { value: "Hot Lead", children: "Hot Lead" }), _jsx("option", { value: "Cold Lead", children: "Cold Lead" }), _jsx("option", { value: "Warm Lead", children: "Warm Lead" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Date Range" }), _jsxs("div", { className: "date-range-input", children: [_jsx("input", { type: "date", value: filters.dateRange.start, onChange: (e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } }), placeholder: "Start" }), _jsx("span", { children: "to" }), _jsx("input", { type: "date", value: filters.dateRange.end, onChange: (e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } }), placeholder: "End" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Filter by Date" }), _jsxs("select", { value: filters.filterByDate, onChange: (e) => setFilters({ ...filters, filterByDate: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), _jsx("option", { value: "created", children: "Created Date" }), _jsx("option", { value: "updated", children: "Updated Date" }), _jsx("option", { value: "followup", children: "Next Follow Up" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Enquiry Source" }), _jsxs("select", { value: filters.enquirySource, onChange: (e) => setFilters({ ...filters, enquirySource: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), _jsx("option", { value: "Website", children: "Website" }), _jsx("option", { value: "Referral", children: "Referral" }), _jsx("option", { value: "Social Media", children: "Social Media" }), _jsx("option", { value: "Email Campaign", children: "Email Campaign" })] })] })] }), _jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Enquiry Purpose" }), _jsxs("select", { value: filters.enquiryPurpose, onChange: (e) => setFilters({ ...filters, enquiryPurpose: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), _jsx("option", { value: "Sales", children: "Sales" }), _jsx("option", { value: "Support", children: "Support" }), _jsx("option", { value: "Demo", children: "Demo" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Lead Status" }), _jsxs("select", { value: filters.leadStatus, onChange: (e) => setFilters({ ...filters, leadStatus: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), _jsx("option", { value: "Active", children: "Active" }), _jsx("option", { value: "Inactive", children: "Inactive" }), _jsx("option", { value: "Pending", children: "Pending" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Followup Added" }), _jsxs("select", { value: filters.followupAdded, onChange: (e) => setFilters({ ...filters, followupAdded: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), _jsx("option", { value: "yes", children: "Yes" }), _jsx("option", { value: "no", children: "No" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Created By" }), _jsxs("select", { value: filters.createdBy, onChange: (e) => setFilters({ ...filters, createdBy: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), _jsx("option", { value: "John Doe", children: "John Doe" }), _jsx("option", { value: "Jane Smith", children: "Jane Smith" }), _jsx("option", { value: "Mike Johnson", children: "Mike Johnson" })] })] })] }), _jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Assigned To" }), _jsxs("select", { value: filters.assignedTo, onChange: (e) => setFilters({ ...filters, assignedTo: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), _jsx("option", { value: "John Doe", children: "John Doe" }), _jsx("option", { value: "Jane Smith", children: "Jane Smith" }), _jsx("option", { value: "Mike Johnson", children: "Mike Johnson" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Lead Type" }), _jsxs("select", { value: filters.leadType, onChange: (e) => setFilters({ ...filters, leadType: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), _jsx("option", { value: "Hot Lead", children: "Hot Lead" }), _jsx("option", { value: "Warm Lead", children: "Warm Lead" }), _jsx("option", { value: "Cold Lead", children: "Cold Lead" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Location" }), _jsx("input", { type: "text", placeholder: "Enter location", value: filters.location, onChange: (e) => setFilters({ ...filters, location: e.target.value }) })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Date" }), _jsx("input", { type: "date", value: filters.date, onChange: (e) => setFilters({ ...filters, date: e.target.value }) })] })] }), _jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Remarks" }), _jsx("input", { type: "text", placeholder: "Enter remarks", value: filters.remarks, onChange: (e) => setFilters({ ...filters, remarks: e.target.value }) })] }), _jsxs("div", { className: "filter-actions", children: [_jsx("button", { className: "btn btn-primary", onClick: () => setShowFilters(false), children: "Filter" }), _jsx("button", { className: "btn btn-secondary", onClick: clearFilters, children: "Clear" })] })] })] })), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "enquiries-table", children: [_jsx("thead", { children: _jsx("tr", { children: columns.map(col => (_jsx("th", { className: col.sortable ? 'sortable' : '', onClick: col.sortable ? () => handleSort(col.key) : undefined, children: col.key === 'checkbox' ? (_jsx("input", { type: "checkbox", checked: paginatedData.length > 0 && selectedRows.length === paginatedData.length, onChange: handleSelectAll })) : (_jsxs(_Fragment, { children: [col.label, col.sortable && sortConfig.key === col.key && (sortConfig.direction === 'asc' ? _jsx(ChevronUp, { size: 14 }) : _jsx(ChevronDown, { size: 14 }))] })) }, col.key))) }) }), _jsx("tbody", { children: paginatedData.map(row => (_jsxs("tr", { className: selectedRows.includes(row.id) ? 'selected' : '', children: [_jsx("td", { children: _jsx("input", { type: "checkbox", checked: selectedRows.includes(row.id), onChange: () => handleSelectRow(row.id) }) }), _jsx("td", { className: "action-cell", children: _jsxs("div", { className: "action-menu-container", children: [_jsx("button", { className: "action-btn", onClick: (e) => {
                                                        const rect = e.currentTarget.getBoundingClientRect();
                                                        if (actionMenuOpen === row.id) {
                                                            setActionMenuOpen(null);
                                                        }
                                                        else {
                                                            setActionMenuOpen(row.id);
                                                            setActionMenuButtonRect(rect);
                                                        }
                                                    }, children: _jsx(MoreHorizontal, { size: 16 }) }), actionMenuOpen === row.id && actionMenuButtonRect && (_jsxs(ActionDropdownPortal, { isOpen: actionMenuOpen === row.id, buttonRect: actionMenuButtonRect, onClose: () => { setActionMenuOpen(null); setActionMenuButtonRect(null); }, children: [_jsxs("button", { onClick: () => { alert(`Editing lead: ${row.name}`); setActionMenuOpen(null); setActionMenuButtonRect(null); }, children: [_jsx(Edit2, { size: 14 }), " Edit"] }), _jsxs("button", { onClick: () => { alert(`Deleting lead: ${row.name}`); setActionMenuOpen(null); setActionMenuButtonRect(null); }, className: "delete", children: [_jsx(Trash2, { size: 14 }), " Delete"] }), _jsxs("button", { onClick: () => { alert(`Opening WhatsApp for: ${row.phone}`); setActionMenuOpen(null); setActionMenuButtonRect(null); }, className: "whatsapp", children: [_jsx(MessageCircle, { size: 14 }), " WhatsApp"] }), _jsxs("button", { onClick: () => { alert(`Sending message to: ${row.name}`); setActionMenuOpen(null); setActionMenuButtonRect(null); }, className: "message", children: [_jsx(MessageSquare, { size: 14 }), " Message"] })] }))] }) }), _jsx("td", { className: "lead-name-cell", onClick: () => setSelectedLead(row), children: row.name }), _jsx("td", { children: row.phone }), _jsx("td", { children: row.location }), _jsx("td", { children: row.assignedTo }), _jsx("td", { children: row.purpose }), _jsx("td", { children: _jsx("span", { className: `badge badge-${row.type.toLowerCase().replace(' ', '-')}`, children: row.type }) }), _jsx("td", { children: _jsx("span", { className: `badge badge-${row.status.toLowerCase()}`, children: row.status }) }), _jsx("td", { children: row.source }), _jsx("td", { children: row.createdAt }), _jsx("td", { children: row.updatedAt }), _jsx("td", { children: row.nextFollowUp })] }, row.id))) })] }) }), _jsxs("div", { className: "pagination-container", children: [_jsxs("div", { className: "pagination-left", children: [_jsx("span", { className: "rows-label", children: "Rows per page:" }), _jsxs("select", { value: rowsPerPage, onChange: handleRowsPerPageChange, className: "rows-select", children: [_jsx("option", { value: 5, children: "5" }), _jsx("option", { value: 10, children: "10" }), _jsx("option", { value: 25, children: "25" }), _jsx("option", { value: 50, children: "50" })] }), _jsxs("span", { className: "pagination-info", children: ["Showing ", startIndex + 1, "-", Math.min(startIndex + rowsPerPage, filteredData.length), " of ", filteredData.length] })] }), _jsxs("div", { className: "pagination-right", children: [_jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(1), children: "First" }), _jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(prev => prev - 1), children: _jsx(ChevronLeft, { size: 16 }) }), _jsxs("span", { className: "page-indicator", children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(prev => prev + 1), children: _jsx(ChevronRight, { size: 16 }) }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(totalPages), children: "Last" })] })] }), _jsx(AddLeadDrawer, { isOpen: isDrawerOpen, onClose: () => setIsDrawerOpen(false) }), _jsx(LeadDetailDrawer, { lead: selectedLead, isOpen: !!selectedLead, onClose: () => setSelectedLead(null) })] }));
};
export default Enquiries;
//# sourceMappingURL=Enquiries.js.map