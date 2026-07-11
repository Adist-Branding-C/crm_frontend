import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Plus, MoreHorizontal, Edit2, Trash2, Eye, Download, MessageSquare, Phone, ArrowUp, ArrowDown, SortAsc, SortDesc, Check } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import PageContainer from '../components/PageContainer';
import AddDealDrawer from '../components/AddDealDrawer';
import './Enquiries.css';
import './Deals.css';
import './DealTasks.css';
const sampleData = [
    { id: 1, dealId: 'DL001', dealName: 'Website Development', lead: 'Rahul Sharma', mobile: '9876543210', amount: 150000, status: 'win', type: 'sales', startDate: '2024-01-15', endDate: '2024-02-15', agent: 'John Doe', createdBy: 'Admin', createdAt: '2024-01-10' },
    { id: 2, dealId: 'DL002', dealName: 'CRM Implementation', lead: 'Priya Patel', mobile: '9876543211', amount: 200000, status: 'pending', type: 'sales', startDate: '2024-01-20', endDate: '2024-03-20', agent: 'Jane Smith', createdBy: 'Admin', createdAt: '2024-01-12' },
    { id: 3, dealId: 'DL003', dealName: 'Annual Maintenance', lead: 'Amit Kumar', mobile: '9876543212', amount: 50000, status: 'invoice', type: 'renewal', startDate: '2024-02-01', endDate: '2024-02-28', agent: 'Mike Johnson', createdBy: 'Admin', createdAt: '2024-01-14' },
];
const Deals = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [actionMenuOpen, setActionMenuOpen] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingDeal, setEditingDeal] = useState(null);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [showActionsDropdown, setShowActionsDropdown] = useState(false);
    const [deals, setDeals] = useState(sampleData);
    const [filters, setFilters] = useState({
        status: '',
        type: '',
        dateRange: { start: '', end: '' },
        assignedTo: '',
    });
    const columns = [
        { key: 'checkbox', label: '' },
        { key: 'action', label: 'Action' },
        { key: 'dealId', label: 'Deal Id', sortable: true },
        { key: 'dealName', label: 'Deal Name', sortable: true },
        { key: 'lead', label: 'Lead', sortable: true },
        { key: 'mobile', label: 'Mobile', sortable: true },
        { key: 'amount', label: 'Amount', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'type', label: 'Type', sortable: true },
        { key: 'startDate', label: 'Start Date', sortable: true },
        { key: 'endDate', label: 'End Date', sortable: true },
        { key: 'agent', label: 'Agent', sortable: true },
        { key: 'createdBy', label: 'Created By', sortable: true },
        { key: 'createdAt', label: 'Created At', sortable: true }
    ];
    const filteredData = useMemo(() => {
        let data = [...deals];
        if (searchQuery) {
            data = data.filter(item => item.dealName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.lead.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.mobile.includes(searchQuery) ||
                item.dealId.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        if (filters.status) {
            data = data.filter(item => item.status === filters.status);
        }
        if (filters.type) {
            data = data.filter(item => item.type === filters.type);
        }
        if (filters.assignedTo) {
            data = data.filter(item => item.agent === filters.assignedTo);
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
    }, [searchQuery, filters, sortConfig, deals]);
    const totalDealAmount = useMemo(() => {
        return filteredData.reduce((sum, deal) => sum + (Number(deal.amount) || 0), 0);
    }, [filteredData]);
    const totalDealsCount = filteredData.length;
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };
    const handleSortDirection = (key, direction) => {
        setSortConfig({ key, direction });
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
            status: '',
            type: '',
            dateRange: { start: '', end: '' },
            assignedTo: '',
        });
        setShowFilters(false);
    };
    const handleAddDeal = () => {
        setEditingDeal(null);
        setIsDrawerOpen(true);
    };
    const handleEditDeal = (deal) => {
        setEditingDeal(deal);
        setIsDrawerOpen(true);
        setActionMenuOpen(null);
    };
    const handleSaveDeal = (formData) => {
        if (editingDeal) {
            setDeals(prev => prev.map(deal => deal.id === editingDeal.id
                ? { ...deal, ...formData, dealId: deal.dealId }
                : deal));
        }
        else {
            const newDeal = {
                ...formData,
                id: Date.now(),
                dealId: `DL00${deals.length + 1}`,
                createdBy: 'Admin',
                createdAt: new Date().toISOString().split('T')[0]
            };
            setDeals(prev => [...prev, newDeal]);
        }
        setCurrentPage(1);
    };
    const handleDeleteDeal = (id) => {
        setDeals(prev => prev.filter(deal => deal.id !== id));
        setActionMenuOpen(null);
    };
    const handleExportCSV = () => {
        const headers = ['Deal Id', 'Deal Name', 'Lead', 'Mobile', 'Amount', 'Status', 'Type', 'Start Date', 'End Date', 'Agent', 'Created By', 'Created At'];
        const csvContent = [
            headers.join(','),
            ...filteredData.map(deal => [
                deal.dealId,
                `"${deal.dealName}"`,
                `"${deal.lead}"`,
                deal.mobile,
                deal.amount,
                deal.status,
                deal.type,
                deal.startDate,
                deal.endDate,
                deal.agent,
                deal.createdBy,
                deal.createdAt
            ].join(','))
        ].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'deals.csv';
        link.click();
    };
    const getStatusBadge = (status) => {
        const statusMap = {
            'win': 'deal-win',
            'lost': 'deal-lost',
            'invoice': 'deal-invoice',
            'pending': 'deal-pending'
        };
        const labelMap = {
            'win': 'Deal Win',
            'lost': 'Deal Lost',
            'invoice': 'Invoice',
            'pending': 'Pending'
        };
        return _jsx("span", { className: `badge badge-${statusMap[status]}`, children: labelMap[status] });
    };
    const getTypeBadge = (type) => {
        const typeMap = {
            'sales': 'type-sales',
            'registration': 'type-registration',
            'renewal': 'type-renewal',
            'upsell': 'type-upsell'
        };
        const labelMap = {
            'sales': 'Sales',
            'registration': 'Registration',
            'renewal': 'Renewal',
            'upsell': 'Upsell'
        };
        return _jsx("span", { className: `badge badge-${typeMap[type]}`, children: labelMap[type] });
    };
    const renderStatsRow = () => (_jsxs("div", { className: "deals-stats-row", children: [_jsxs("div", { className: "stat-item", children: [_jsx("span", { className: "stat-label", children: "Total Deal Amount:" }), _jsxs("span", { className: "stat-value", children: ["\u20B9", totalDealAmount.toLocaleString()] })] }), _jsxs("div", { className: "stat-item", children: [_jsx("span", { className: "stat-label", children: "Total Deals Count:" }), _jsx("span", { className: "stat-value", children: totalDealsCount })] })] }));
    return (_jsxs(PageContainer, { children: [_jsx(PageHeader, { title: "Deals", description: "Track sales opportunities, aiding management and conversion of potential customers." }), renderStatsRow(), _jsxs("div", { className: "enquiries-toolbar", children: [_jsxs("div", { className: "toolbar-left", children: [_jsxs("div", { className: "search-box", children: [_jsx(Search, { size: 16, className: "search-icon" }), _jsx("input", { type: "text", placeholder: "Search deals...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "search-input" })] }), _jsxs("button", { className: "btn btn-secondary", onClick: () => setShowFilters(!showFilters), children: [_jsx(Filter, { size: 16 }), "Filter", _jsx(ChevronDown, { size: 14, className: showFilters ? 'rotate' : '' })] }), _jsxs("div", { className: "dropdown-container", children: [_jsxs("button", { className: "btn btn-secondary", onClick: () => setShowSortDropdown(!showSortDropdown), children: [_jsx(ArrowUp, { size: 16 }), "Sort By", _jsx(ChevronDown, { size: 14, className: showSortDropdown ? 'rotate' : '' })] }), showSortDropdown && (_jsxs("div", { className: "premium-dropdown sort-dropdown dropup", children: [_jsx("div", { className: "dropdown-header", children: "Sort By" }), _jsxs("button", { className: `dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === 'desc' ? 'selected' : ''}`, onClick: () => { handleSort('createdAt'); handleSortDirection('createdAt', 'desc'); setShowSortDropdown(false); }, children: [_jsx(ArrowUp, { size: 16 }), _jsx("span", { children: "Newest First" })] }), _jsxs("button", { className: `dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === 'asc' ? 'selected' : ''}`, onClick: () => { handleSort('createdAt'); handleSortDirection('createdAt', 'asc'); setShowSortDropdown(false); }, children: [_jsx(ArrowDown, { size: 16 }), _jsx("span", { children: "Oldest First" })] }), _jsxs("button", { className: `dropdown-item ${sortConfig.key === 'amount' && sortConfig.direction === 'desc' ? 'selected' : ''}`, onClick: () => { handleSort('amount'); handleSortDirection('amount', 'desc'); setShowSortDropdown(false); }, children: [_jsx(ArrowUp, { size: 16 }), _jsx("span", { children: "Highest Amount" })] }), _jsxs("button", { className: `dropdown-item ${sortConfig.key === 'amount' && sortConfig.direction === 'asc' ? 'selected' : ''}`, onClick: () => { handleSort('amount'); handleSortDirection('amount', 'asc'); setShowSortDropdown(false); }, children: [_jsx(ArrowDown, { size: 16 }), _jsx("span", { children: "Lowest Amount" })] }), _jsxs("button", { className: `dropdown-item ${sortConfig.key === 'startDate' && sortConfig.direction === 'desc' ? 'selected' : ''}`, onClick: () => { handleSort('startDate'); handleSortDirection('startDate', 'desc'); setShowSortDropdown(false); }, children: [_jsx(ArrowUp, { size: 16 }), _jsx("span", { children: "Start Date (Newest)" })] }), _jsxs("button", { className: `dropdown-item ${sortConfig.key === 'startDate' && sortConfig.direction === 'asc' ? 'selected' : ''}`, onClick: () => { handleSort('startDate'); handleSortDirection('startDate', 'asc'); setShowSortDropdown(false); }, children: [_jsx(ArrowDown, { size: 16 }), _jsx("span", { children: "Start Date (Oldest)" })] }), _jsxs("button", { className: `dropdown-item ${sortConfig.key === 'dealName' && sortConfig.direction === 'asc' ? 'selected' : ''}`, onClick: () => { handleSort('dealName'); handleSortDirection('dealName', 'asc'); setShowSortDropdown(false); }, children: [_jsx(ArrowDown, { size: 16 }), _jsx("span", { children: "Name (A-Z)" })] }), _jsxs("button", { className: `dropdown-item ${sortConfig.key === 'dealName' && sortConfig.direction === 'desc' ? 'selected' : ''}`, onClick: () => { handleSort('dealName'); handleSortDirection('dealName', 'desc'); setShowSortDropdown(false); }, children: [_jsx(ArrowUp, { size: 16 }), _jsx("span", { children: "Name (Z-A)" })] })] }))] })] }), _jsxs("div", { className: "toolbar-right", children: [_jsxs("button", { className: "btn btn-secondary", onClick: handleExportCSV, children: [_jsx(Download, { size: 16 }), "Export"] }), _jsxs("button", { className: "btn btn-primary", onClick: handleAddDeal, children: [_jsx(Plus, { size: 16 }), "Deals"] })] })] }), showFilters && (_jsxs("div", { className: "filters-panel", children: [_jsxs("div", { className: "filter-row", children: [_jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Status" }), _jsxs("select", { value: filters.status, onChange: (e) => setFilters({ ...filters, status: e.target.value }), children: [_jsx("option", { value: "", children: "All" }), _jsx("option", { value: "win", children: "Deal Win" }), _jsx("option", { value: "lost", children: "Deal Lost" }), _jsx("option", { value: "invoice", children: "Invoice" }), _jsx("option", { value: "pending", children: "Pending" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Type" }), _jsxs("select", { value: filters.type, onChange: (e) => setFilters({ ...filters, type: e.target.value }), children: [_jsx("option", { value: "", children: "All" }), _jsx("option", { value: "sales", children: "Sales" }), _jsx("option", { value: "registration", children: "Registration" }), _jsx("option", { value: "renewal", children: "Renewal" }), _jsx("option", { value: "upsell", children: "Upsell" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Date Range" }), _jsxs("div", { className: "date-range-input", children: [_jsx("input", { type: "date", value: filters.dateRange.start, onChange: (e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } }), placeholder: "Start" }), _jsx("span", { children: "to" }), _jsx("input", { type: "date", value: filters.dateRange.end, onChange: (e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } }), placeholder: "End" })] })] }), _jsxs("div", { className: "filter-group", children: [_jsx("label", { children: "Assigned To" }), _jsxs("select", { value: filters.assignedTo, onChange: (e) => setFilters({ ...filters, assignedTo: e.target.value }), children: [_jsx("option", { value: "", children: "Select" }), _jsx("option", { value: "John Doe", children: "John Doe" }), _jsx("option", { value: "Jane Smith", children: "Jane Smith" }), _jsx("option", { value: "Mike Johnson", children: "Mike Johnson" })] })] })] }), _jsx("div", { className: "filter-row", children: _jsxs("div", { className: "filter-actions", children: [_jsx("button", { className: "btn btn-primary", onClick: () => setShowFilters(false), children: "Filter" }), _jsx("button", { className: "btn btn-secondary", onClick: clearFilters, children: "Clear" })] }) })] })), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "enquiries-table", children: [_jsx("thead", { children: _jsx("tr", { children: columns.map(col => (_jsx("th", { className: col.sortable ? 'sortable' : '', onClick: col.sortable ? () => handleSort(col.key) : undefined, children: col.key === 'checkbox' ? (_jsx("input", { type: "checkbox", checked: paginatedData.length > 0 && selectedRows.length === paginatedData.length, onChange: handleSelectAll })) : (_jsxs(_Fragment, { children: [col.label, col.sortable && sortConfig.key === col.key && (sortConfig.direction === 'asc' ? _jsx(ChevronUp, { size: 14 }) : _jsx(ChevronDown, { size: 14 }))] })) }, col.key))) }) }), _jsx("tbody", { children: paginatedData.map(row => (_jsxs("tr", { className: selectedRows.includes(row.id) ? 'selected' : '', children: [_jsx("td", { children: _jsx("input", { type: "checkbox", checked: selectedRows.includes(row.id), onChange: () => handleSelectRow(row.id) }) }), _jsx("td", { className: "action-cell", children: _jsxs("div", { className: "action-menu-container", children: [_jsx("button", { className: "action-btn", onClick: () => setActionMenuOpen(actionMenuOpen === row.id ? null : row.id), children: _jsx(MoreHorizontal, { size: 16 }) }), actionMenuOpen === row.id && (_jsxs("div", { className: "action-dropdown", children: [_jsxs("button", { children: [_jsx(Eye, { size: 14 }), " View Deal"] }), _jsxs("button", { onClick: () => handleEditDeal(row), children: [_jsx(Edit2, { size: 14 }), " Edit Deal"] }), _jsxs("button", { children: [_jsx(Phone, { size: 14 }), " WhatsApp"] }), _jsxs("button", { children: [_jsx(MessageSquare, { size: 14 }), " Message"] }), _jsxs("button", { onClick: () => handleDeleteDeal(row.id), className: "delete", children: [_jsx(Trash2, { size: 14 }), " Delete"] })] }))] }) }), _jsx("td", { children: row.dealId }), _jsx("td", { className: "lead-name-cell", children: row.dealName }), _jsx("td", { children: row.lead }), _jsx("td", { children: row.mobile }), _jsxs("td", { children: ["\u20B9", Number(row.amount).toLocaleString()] }), _jsx("td", { children: getStatusBadge(row.status) }), _jsx("td", { children: getTypeBadge(row.type) }), _jsx("td", { children: row.startDate }), _jsx("td", { children: row.endDate }), _jsx("td", { children: row.agent }), _jsx("td", { children: row.createdBy }), _jsx("td", { children: row.createdAt })] }, row.id))) })] }) }), _jsxs("div", { className: "pagination-container", children: [_jsxs("div", { className: "pagination-left", children: [_jsx("span", { className: "rows-label", children: "Show entries:" }), _jsxs("select", { value: rowsPerPage, onChange: handleRowsPerPageChange, className: "rows-select", children: [_jsx("option", { value: 10, children: "10" }), _jsx("option", { value: 25, children: "25" }), _jsx("option", { value: 50, children: "50" }), _jsx("option", { value: 100, children: "100" })] }), _jsxs("span", { className: "pagination-info", children: ["Showing ", startIndex + 1, "-", Math.min(startIndex + rowsPerPage, filteredData.length), " of ", filteredData.length] })] }), _jsxs("div", { className: "pagination-right", children: [_jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(1), children: "First" }), _jsx("button", { className: "pagination-btn", disabled: currentPage === 1, onClick: () => setCurrentPage(prev => prev - 1), children: _jsx(ChevronLeft, { size: 16 }) }), _jsxs("span", { className: "page-indicator", children: ["Page ", currentPage, " of ", totalPages] }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(prev => prev + 1), children: _jsx(ChevronRight, { size: 16 }) }), _jsx("button", { className: "pagination-btn", disabled: currentPage === totalPages, onClick: () => setCurrentPage(totalPages), children: "Last" })] })] }), _jsx(AddDealDrawer, { isOpen: isDrawerOpen, onClose: () => {
                    setIsDrawerOpen(false);
                    setEditingDeal(null);
                }, deal: editingDeal, onSave: handleSaveDeal })] }));
};
export default Deals;
//# sourceMappingURL=Deals.js.map