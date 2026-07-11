import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Plus, MoreHorizontal, Edit2, Trash2, Eye, Download, User, CheckCircle, Clock, AlertCircle, ListChecks, Phone, Megaphone, CheckSquare } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import AddDealTaskDrawer from '../components/AddDealTaskDrawer';
import './Account.css';
import './Enquiries.css';
import './Deals.css';
import './DealTasks.css';
const taskSubMenuItems = [
    { id: 'task', title: 'Task', link: '/user/tasks', icon: ListChecks },
    { id: 'call-tasks', title: 'Call Tasks', link: '/user/tasks/call', icon: Phone },
    { id: 'campaign-tasks', title: 'Campaign Tasks', link: '/user/tasks/campaign', icon: Megaphone },
    { id: 'deal-tasks', title: 'Deal Tasks', link: '/user/tasks/deal', icon: CheckSquare },
];
const sampleData = [
    { id: 1, slNo: 1, title: 'Follow up for Website Demo', category: 'Demo', deal: 'Website Development', dealId: 'DL001', amount: 150000, description: 'Schedule follow up call', scheduledDate: '2024-01-20', scheduledTime: '10:00', assignedBy: 'Admin', assignedTo: 'John Doe', priority: 'high', status: 'pending' },
    { id: 2, slNo: 2, title: 'Payment Reminder - CRM', category: 'Payment Reminder', deal: 'CRM Implementation', dealId: 'DL002', amount: 200000, description: 'Send payment reminder', scheduledDate: '2024-01-18', scheduledTime: '14:00', assignedBy: 'Admin', assignedTo: 'Jane Smith', priority: 'medium', status: 'completed' },
    { id: 3, slNo: 3, title: 'Documentation Review', category: 'Documentation', deal: 'Annual Maintenance', dealId: 'DL003', amount: 50000, description: 'Review all documents', scheduledDate: '2024-01-15', scheduledTime: '11:00', assignedBy: 'Admin', assignedTo: 'Mike Johnson', priority: 'low', status: 'overdue' },
    { id: 4, slNo: 4, title: 'Closing Meeting', category: 'Closing', deal: 'Website Development', dealId: 'DL001', amount: 150000, description: 'Final closing discussion', scheduledDate: '2024-01-25', scheduledTime: '15:00', assignedBy: 'Admin', assignedTo: 'John Doe', priority: 'high', status: 'pending' },
];
const TasksPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const getCurrentTab = () => {
        const path = location.pathname;
        if (path.includes('/call'))
            return 'call-tasks';
        if (path.includes('/campaign'))
            return 'campaign-tasks';
        if (path.includes('/deal'))
            return 'deal-tasks';
        return 'task';
    };
    const [activeTab, setActiveTab] = useState(getCurrentTab());
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [actionMenuOpen, setActionMenuOpen] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [tasks, setTasks] = useState(sampleData);
    const [filters, setFilters] = useState({
        deal: '',
        status: '',
        assignedBy: '',
        assignedTo: '',
        category: '',
        dateRange: { start: '', end: '' },
    });
    const columns = [
        { key: 'checkbox', label: '' },
        { key: 'slNo', label: 'Sl No' },
        { key: 'title', label: 'Title', sortable: true },
        { key: 'category', label: 'Category', sortable: true },
        { key: 'deal', label: 'Deal', sortable: true },
        { key: 'amount', label: 'Amount', sortable: true },
        { key: 'description', label: 'Description' },
        { key: 'scheduledDate', label: 'Scheduled Date', sortable: true },
        { key: 'assignedBy', label: 'Assigned By', sortable: true },
        { key: 'assignedTo', label: 'Assigned To', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'action', label: 'Action', sortable: true }
    ];
    const filteredData = useMemo(() => {
        let data = [...tasks];
        if (searchQuery)
            data = data.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.deal.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase()));
        if (filters.deal)
            data = data.filter(item => item.deal === filters.deal);
        if (filters.status)
            data = data.filter(item => item.status === filters.status);
        if (filters.assignedTo)
            data = data.filter(item => item.assignedTo === filters.assignedTo);
        if (filters.category)
            data = data.filter(item => item.category === filters.category);
        if (sortConfig.key)
            data.sort((a, b) => { if (a[sortConfig.key] < b[sortConfig.key])
                return sortConfig.direction === 'asc' ? -1 : 1; if (a[sortConfig.key] > b[sortConfig.key])
                return sortConfig.direction === 'asc' ? 1 : -1; return 0; });
        return data;
    }, [searchQuery, filters, sortConfig, tasks]);
    const stats = useMemo(() => ({ total: filteredData.length, completed: filteredData.filter(t => t.status === 'completed').length, pending: filteredData.filter(t => t.status === 'pending').length, overdue: filteredData.filter(t => t.status === 'overdue').length }), [filteredData]);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
    const handleTabClick = (item) => {
        setActiveTab(item.id);
        navigate(item.link);
        setCurrentPage(1);
    };
    const handleSort = (key) => setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));
    const handleSelectAll = (e) => { if (e.target.checked)
        setSelectedRows(paginatedData.map(item => item.id));
    else
        setSelectedRows([]); };
    const handleSelectRow = (id) => setSelectedRows(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    const handleRowsPerPageChange = (e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); };
    const clearFilters = () => { setFilters({ deal: '', status: '', assignedBy: '', assignedTo: '', category: '', dateRange: { start: '', end: '' } }); setShowFilters(false); };
    const handleDeleteTask = (id) => { setTasks(prev => prev.filter(task => task.id !== id)); setActionMenuOpen(null); };
    const handleMarkCompleted = (id) => { setTasks(prev => prev.map(task => task.id === id ? { ...task, status: 'completed' } : task)); setActionMenuOpen(null); };
    const handleExportCSV = () => {
        const headers = ['Sl No', 'Title', 'Category', 'Deal', 'Amount', 'Description', 'Scheduled Date', 'Assigned By', 'Assigned To', 'Status'];
        const csvContent = [headers.join(','), ...filteredData.map(task => [task.slNo, `"${task.title}"`, task.category, `"${task.deal}"`, task.amount, `"${task.description}"`, task.scheduledDate, task.assignedBy, task.assignedTo, task.status].join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'tasks.csv';
        link.click();
    };
    const getStatusBadge = (status) => { const statusMap = { 'completed': 'status-completed', 'pending': 'status-pending', 'overdue': 'status-overdue' }; const labelMap = { 'completed': 'Completed', 'pending': 'Pending', 'overdue': 'OverDue' }; return _jsx("span", { className: `badge badge-${statusMap[status]}`, children: labelMap[status] }); };
    const getPageTitle = () => {
        const currentItem = taskSubMenuItems.find(item => item.id === activeTab);
        return currentItem ? currentItem.title : 'Tasks';
    };
    const renderStatsCards = () => (_jsxs("div", { className: "task-stats-cards", children: [_jsxs("div", { className: "stats-card", children: [_jsx("div", { className: "stats-card-icon total", children: _jsx(Clock, { size: 20 }) }), _jsxs("div", { className: "stats-card-content", children: [_jsx("span", { className: "stats-card-value", children: stats.total }), _jsx("span", { className: "stats-card-label", children: "Total Tasks" })] })] }), _jsxs("div", { className: "stats-card", children: [_jsx("div", { className: "stats-card-icon completed", children: _jsx(CheckCircle, { size: 20 }) }), _jsxs("div", { className: "stats-card-content", children: [_jsx("span", { className: "stats-card-value", children: stats.completed }), _jsx("span", { className: "stats-card-label", children: "Completed" })] })] }), _jsxs("div", { className: "stats-card", children: [_jsx("div", { className: "stats-card-icon pending", children: _jsx(Clock, { size: 20 }) }), _jsxs("div", { className: "stats-card-content", children: [_jsx("span", { className: "stats-card-value", children: stats.pending }), _jsx("span", { className: "stats-card-label", children: "Pending" })] })] }), _jsxs("div", { className: "stats-card", children: [_jsx("div", { className: "stats-card-icon overdue", children: _jsx(AlertCircle, { size: 20 }) }), _jsxs("div", { className: "stats-card-content", children: [_jsx("span", { className: "stats-card-value", children: stats.overdue }), _jsx("span", { className: "stats-card-label", children: "OverDue" })] })] })] }));
    return (_jsx("div", { className: "account-page", children: _jsxs("div", { className: "account-content", style: { width: '100%', maxWidth: '100%' }, children: [_jsx(PageHeader, { title: getPageTitle(), description: "Manage tasks and activities.", breadcrumb: false }), _jsx("div", { className: "task-tabs", children: taskSubMenuItems.map((item) => {
                        const Icon = item.icon;
                        return (_jsxs("button", { className: `task-tab ${activeTab === item.id ? 'active' : ''}`, onClick: () => handleTabClick(item), children: [_jsx(Icon, { size: 16 }), " ", item.title] }, item.id));
                    }) }), renderStatsCards(), _jsxs("div", { className: "task-actions-row", children: [_jsxs("div", { className: "task-actions-left", children: [_jsxs("button", { className: "btn btn-assign", children: [_jsx(User, { size: 16 }), "Assign To"] }), _jsxs("button", { className: "btn btn-secondary", onClick: () => setShowFilters(!showFilters), children: [_jsx(Filter, { size: 16 }), "Filter"] })] }), _jsxs("div", { className: "task-actions-right", children: [_jsxs("button", { className: "btn btn-secondary", onClick: handleExportCSV, children: [_jsx(Download, { size: 16 }), "Export"] }), _jsxs("button", { className: "btn btn-primary", onClick: () => setIsDrawerOpen(true), children: [_jsx(Plus, { size: 16 }), "Task"] })] })] }), showFilters && (_jsxs("div", { className: "filter-actions-panel", children: [_jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Deal" }), _jsxs("select", { value: filters.deal, onChange: (e) => setFilters({ ...filters, deal: e.target.value }), children: [_jsx("option", { value: "", children: "All" }), _jsx("option", { value: "Website Development", children: "Website Development" }), _jsx("option", { value: "CRM Implementation", children: "CRM Implementation" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Status" }), _jsxs("select", { value: filters.status, onChange: (e) => setFilters({ ...filters, status: e.target.value }), children: [_jsx("option", { value: "", children: "All" }), _jsx("option", { value: "completed", children: "Completed" }), _jsx("option", { value: "pending", children: "Pending" }), _jsx("option", { value: "overdue", children: "OverDue" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Assigned To" }), _jsxs("select", { value: filters.assignedTo, onChange: (e) => setFilters({ ...filters, assignedTo: e.target.value }), children: [_jsx("option", { value: "", children: "All" }), _jsx("option", { value: "John Doe", children: "John Doe" }), _jsx("option", { value: "Jane Smith", children: "Jane Smith" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Category" }), _jsxs("select", { value: filters.category, onChange: (e) => setFilters({ ...filters, category: e.target.value }), children: [_jsx("option", { value: "", children: "All" }), _jsx("option", { value: "Follow Up", children: "Follow Up" }), _jsx("option", { value: "Demo", children: "Demo" }), _jsx("option", { value: "Payment Reminder", children: "Payment Reminder" })] })] })] }), _jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Date Range" }), _jsxs("div", { className: "date-range-input", children: [_jsx("input", { type: "date", value: filters.dateRange.start, onChange: (e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } }) }), _jsx("span", { children: "to" }), _jsx("input", { type: "date", value: filters.dateRange.end, onChange: (e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } }) })] })] }), _jsxs("div", { className: "filter-actions-btns", children: [_jsx("button", { className: "btn btn-primary", onClick: () => setShowFilters(false), children: "Apply Filter" }), _jsx("button", { className: "btn btn-secondary", onClick: clearFilters, children: "Reset" })] })] })] })), _jsxs("div", { className: "enquiries-toolbar", children: [_jsxs("div", { className: "toolbar-left", children: [_jsxs("div", { className: "search-box", children: [_jsx(Search, { size: 16, className: "search-icon" }), _jsx("input", { type: "text", placeholder: "Search tasks...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "search-input" })] }), _jsxs("div", { className: "dropdown-container", children: [_jsxs("button", { className: "btn btn-secondary", onClick: () => setShowSortDropdown(!showSortDropdown), children: ["Sort By", _jsx(ChevronDown, { size: 14 })] }), showSortDropdown && (_jsxs("div", { className: "sort-dropdown", children: [_jsxs("button", { onClick: () => { handleSort('scheduledDate'); setShowSortDropdown(false); }, children: ["Scheduled Date ", sortConfig.key === 'scheduledDate' && (sortConfig.direction === 'asc' ? '↑' : '↓')] }), _jsxs("button", { onClick: () => { handleSort('title'); setShowSortDropdown(false); }, children: ["Title ", sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? '↑' : '↓')] }), _jsxs("button", { onClick: () => { handleSort('status'); setShowSortDropdown(false); }, children: ["Status ", sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')] })] }))] })] }), _jsxs("div", { className: "toolbar-right", children: [_jsx("span", { className: "rows-label", children: "Show entries:" }), _jsxs("select", { value: rowsPerPage, onChange: handleRowsPerPageChange, className: "rows-select", children: [_jsx("option", { value: 10, children: "10" }), _jsx("option", { value: 25, children: "25" }), _jsx("option", { value: 50, children: "50" }), _jsx("option", { value: 100, children: "100" })] })] })] }), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "enquiries-table", children: [_jsx("thead", { children: _jsx("tr", { children: columns.map(col => (_jsx("th", { className: col.sortable ? 'sortable' : '', onClick: col.sortable ? () => handleSort(col.key) : undefined, children: col.key === 'checkbox' ? _jsx("input", { type: "checkbox", checked: paginatedData.length > 0 && selectedRows.length === paginatedData.length, onChange: handleSelectAll }) : _jsxs(_Fragment, { children: [col.label, col.sortable && sortConfig.key === col.key && (sortConfig.direction === 'asc' ? _jsx(ChevronUp, { size: 14 }) : _jsx(ChevronDown, { size: 14 }))] }) }, col.key))) }) }), _jsx("tbody", { children: paginatedData.map(row => (_jsxs("tr", { className: selectedRows.includes(row.id) ? 'selected' : '', children: [_jsx("td", { children: _jsx("input", { type: "checkbox", checked: selectedRows.includes(row.id), onChange: () => handleSelectRow(row.id) }) }), _jsx("td", { children: row.slNo }), _jsx("td", { className: "lead-name-cell", children: row.title }), _jsx("td", { children: row.category }), _jsx("td", { children: row.deal }), _jsxs("td", { children: ["\u20B9", Number(row.amount).toLocaleString()] }), _jsx("td", { className: "description-cell", children: row.description }), _jsx("td", { children: row.scheduledDate }), _jsx("td", { children: row.assignedBy }), _jsx("td", { children: row.assignedTo }), _jsx("td", { children: getStatusBadge(row.status) }), _jsx("td", { className: "action-cell", children: _jsxs("div", { className: "action-menu-container", children: [_jsx("button", { className: "action-btn", onClick: () => setActionMenuOpen(actionMenuOpen === row.id ? null : row.id), children: _jsx(MoreHorizontal, { size: 16 }) }), actionMenuOpen === row.id && (_jsxs("div", { className: "action-dropdown", children: [_jsxs("button", { children: [_jsx(Eye, { size: 14 }), "View Task"] }), _jsxs("button", { children: [_jsx(Edit2, { size: 14 }), "Edit Task"] }), _jsxs("button", { onClick: () => handleMarkCompleted(row.id), children: [_jsx(CheckCircle, { size: 14 }), "Mark Completed"] }), _jsxs("button", { children: [_jsx(User, { size: 14 }), "Reassign"] }), _jsxs("button", { onClick: () => handleDeleteTask(row.id), className: "delete", children: [_jsx(Trash2, { size: 14 }), "Delete"] })] }))] }) })] }, row.id))) })] }) }), _jsxs("div", { className: "pagination-container", children: [_jsx("div", { className: "pagination-left", children: _jsxs("span", { className: "pagination-info", children: ["Showing ", startIndex + 1, "-", Math.min(startIndex + rowsPerPage, filteredData.length), " of ", filteredData.length, " entries"] }) }), _jsxs("div", { className: "pagination-right", children: [_jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(1), children: "First" }), _jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(prev => prev - 1), children: _jsx(ChevronLeft, { size: 16 }) }), _jsxs("span", { className: "page-indicator", children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(prev => prev + 1), children: _jsx(ChevronRight, { size: 16 }) }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(totalPages), children: "Last" })] })] }), _jsx(AddDealTaskDrawer, { isOpen: isDrawerOpen, onClose: () => { setIsDrawerOpen(false); setEditingTask(null); }, task: editingTask, onSave: () => { } })] }) }));
};
export default TasksPage;
//# sourceMappingURL=Tasks.js.map