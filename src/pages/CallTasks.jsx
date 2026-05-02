import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Plus, MoreHorizontal, Edit2, Trash2, Eye, Download, User, CheckCircle, Clock, AlertCircle, Phone } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './Enquiries.css';
import './Deals.css';
import './DealTasks.css';

const sampleData = [
  { id: 1, slNo: 1, title: 'Follow up call with Rahul', category: 'Follow Up', deal: 'Website Development', dealId: 'DL001', amount: 150000, description: 'Discuss project requirements', scheduledDate: '2024-01-20', scheduledTime: '10:00', assignedBy: 'Admin', assignedTo: 'John Doe', priority: 'high', status: 'pending' },
  { id: 2, slNo: 2, title: 'Demo call - CRM Demo', category: 'Demo', deal: 'CRM Implementation', dealId: 'DL002', amount: 200000, description: 'Schedule demo call', scheduledDate: '2024-01-18', scheduledTime: '14:00', assignedBy: 'Admin', assignedTo: 'Jane Smith', priority: 'medium', status: 'completed' },
  { id: 3, slNo: 3, title: 'Payment follow up call', category: 'Payment Reminder', deal: 'Annual Maintenance', dealId: 'DL003', amount: 50000, description: 'Payment discussion', scheduledDate: '2024-01-15', scheduledTime: '11:00', assignedBy: 'Admin', assignedTo: 'Mike Johnson', priority: 'low', status: 'overdue' },
  { id: 4, slNo: 4, title: 'Closing call', category: 'Closing', deal: 'Website Development', dealId: 'DL001', amount: 150000, description: 'Final discussion', scheduledDate: '2024-01-25', scheduledTime: '15:00', assignedBy: 'Admin', assignedTo: 'John Doe', priority: 'high', status: 'pending' },
];

const CallTasks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
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
    { key: 'status', label: 'Status', sortable: true }
  ];

  const filteredData = useMemo(() => {
    let data = [...tasks];

    if (searchQuery) {
      data = data.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.deal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.deal) {
      data = data.filter(item => item.deal === filters.deal);
    }
    if (filters.status) {
      data = data.filter(item => item.status === filters.status);
    }
    if (filters.assignedTo) {
      data = data.filter(item => item.assignedTo === filters.assignedTo);
    }
    if (filters.category) {
      data = data.filter(item => item.category === filters.category);
    }

    if (sortConfig.key) {
      data.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return data;
  }, [searchQuery, filters, sortConfig, tasks]);

  const stats = useMemo(() => ({
    total: filteredData.length,
    completed: filteredData.filter(t => t.status === 'completed').length,
    pending: filteredData.filter(t => t.status === 'pending').length,
    overdue: filteredData.filter(t => t.status === 'overdue').length,
  }), [filteredData]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleSort = (key) => {
    setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(paginatedData.map(item => item.id));
    } else {
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
    setFilters({ deal: '', status: '', assignedBy: '', assignedTo: '', category: '', dateRange: { start: '', end: '' } });
    setShowFilters(false);
  };

  const handleDeleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    setActionMenuOpen(null);
  };

  const handleMarkCompleted = (id) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, status: 'completed' } : task));
    setActionMenuOpen(null);
  };

  const handleExportCSV = () => {
    const headers = ['Sl No', 'Title', 'Category', 'Deal', 'Amount', 'Description', 'Scheduled Date', 'Assigned By', 'Assigned To', 'Status'];
    const csvContent = [headers.join(','), ...filteredData.map(task => [task.slNo, `"${task.title}"`, task.category, `"${task.deal}"`, task.amount, `"${task.description}"`, task.scheduledDate, task.assignedBy, task.assignedTo, task.status].join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'call-tasks.csv';
    link.click();
  };

  const getStatusBadge = (status) => {
    const statusMap = { 'completed': 'status-completed', 'pending': 'status-pending', 'overdue': 'status-overdue' };
    const labelMap = { 'completed': 'Completed', 'pending': 'Pending', 'overdue': 'OverDue' };
    return <span className={`badge badge-${statusMap[status]}`}>{labelMap[status]}</span>;
  };

  const renderStatsCards = () => (
    <div className="task-stats-cards">
      <div className="stats-card"><div className="stats-card-icon total"><Clock size={20} /></div><div className="stats-card-content"><span className="stats-card-value">{stats.total}</span><span className="stats-card-label">Total Tasks</span></div></div>
      <div className="stats-card"><div className="stats-card-icon completed"><CheckCircle size={20} /></div><div className="stats-card-content"><span className="stats-card-value">{stats.completed}</span><span className="stats-card-label">Completed</span></div></div>
      <div className="stats-card"><div className="stats-card-icon pending"><Clock size={20} /></div><div className="stats-card-content"><span className="stats-card-value">{stats.pending}</span><span className="stats-card-label">Pending</span></div></div>
      <div className="stats-card"><div className="stats-card-icon overdue"><AlertCircle size={20} /></div><div className="stats-card-content"><span className="stats-card-value">{stats.overdue}</span><span className="stats-card-label">OverDue</span></div></div>
    </div>
  );

  return (
    <div className="enquiries-page">
      <PageHeader title="Call Tasks" description="Manage call-related tasks and follow-ups." />
      {renderStatsCards()}
      <div className="task-actions-row">
        <div className="task-actions-left">
          <button className="btn btn-assign"><User size={16} />Assign To</button>
          <button className="btn btn-secondary" onClick={() => setShowFilters(!showFilters)}><Filter size={16} />Filter</button>
        </div>
        <div className="task-actions-right">
          <button className="btn btn-secondary" onClick={handleExportCSV}><Download size={16} />Export</button>
          <button className="btn btn-primary"><Plus size={16} />Call Task</button>
        </div>
      </div>
      {showFilters && (
        <div className="filter-actions-panel">
          <div className="filter-row">
            <div className="filter-group"><label>Deal</label><select value={filters.deal} onChange={(e) => setFilters({ ...filters, deal: e.target.value })}><option value="">All</option><option value="Website Development">Website Development</option><option value="CRM Implementation">CRM Implementation</option><option value="Annual Maintenance">Annual Maintenance</option></select></div>
            <div className="filter-group"><label>Status</label><select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}><option value="">All</option><option value="completed">Completed</option><option value="pending">Pending</option><option value="overdue">OverDue</option></select></div>
            <div className="filter-group"><label>Assigned To</label><select value={filters.assignedTo} onChange={(e) => setFilters({ ...filters, assignedTo: e.target.value })}><option value="">All</option><option value="John Doe">John Doe</option><option value="Jane Smith">Jane Smith</option><option value="Mike Johnson">Mike Johnson</option></select></div>
            <div className="filter-group"><label>Category</label><select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}><option value="">All</option><option value="Follow Up">Follow Up</option><option value="Demo">Demo</option><option value="Payment Reminder">Payment Reminder</option><option value="Closing">Closing</option></select></div>
          </div>
          <div className="filter-row">
            <div className="filter-group"><label>Date Range</label><div className="date-range-input"><input type="date" value={filters.dateRange.start} onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } })} /><span>to</span><input type="date" value={filters.dateRange.end} onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } })} /></div></div>
            <div className="filter-actions-btns"><button className="btn btn-primary" onClick={() => setShowFilters(false)}>Apply Filter</button><button className="btn btn-secondary" onClick={clearFilters}>Reset</button></div>
          </div>
        </div>
      )}
      <div className="enquiries-toolbar">
        <div className="toolbar-left">
          <div className="search-box"><Search size={16} className="search-icon" /><input type="text" placeholder="Search tasks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" /></div>
          <div className="dropdown-container">
            <button className="btn btn-secondary" onClick={() => setShowSortDropdown(!showSortDropdown)}>Sort By<ChevronDown size={14} /></button>
            {showSortDropdown && (
              <div className="sort-dropdown">
                <button onClick={() => { handleSort('scheduledDate'); setShowSortDropdown(false); }}>Scheduled Date {sortConfig.key === 'scheduledDate' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</button>
                <button onClick={() => { handleSort('title'); setShowSortDropdown(false); }}>Title {sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</button>
                <button onClick={() => { handleSort('status'); setShowSortDropdown(false); }}>Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</button>
              </div>
            )}
          </div>
        </div>
        <div className="toolbar-right"><span className="rows-label">Show entries:</span><select value={rowsPerPage} onChange={handleRowsPerPageChange} className="rows-select"><option value={10}>10</option><option value={25}>25</option><option value={50}>50</option><option value={100}>100</option></select></div>
      </div>
      <div className="table-container">
        <table className="enquiries-table">
          <thead><tr>{columns.map(col => (<th key={col.key} className={col.sortable ? 'sortable' : ''} onClick={col.sortable ? () => handleSort(col.key) : undefined}>{col.key === 'checkbox' ? <input type="checkbox" checked={paginatedData.length > 0 && selectedRows.length === paginatedData.length} onChange={handleSelectAll} /> : <>{col.label}{col.sortable && sortConfig.key === col.key && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</>}</th>))}</tr></thead>
          <tbody>{paginatedData.map(row => (<tr key={row.id} className={selectedRows.includes(row.id) ? 'selected' : ''}><td><input type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => handleSelectRow(row.id)} /></td><td>{row.slNo}</td><td className="lead-name-cell">{row.title}</td><td>{row.category}</td><td>{row.deal}</td><td>₹{Number(row.amount).toLocaleString()}</td><td className="description-cell">{row.description}</td><td>{row.scheduledDate}</td><td>{row.assignedBy}</td><td>{row.assignedTo}</td><td>{getStatusBadge(row.status)}</td><td className="action-cell"><div className="action-menu-container"><button className="action-btn" onClick={() => setActionMenuOpen(actionMenuOpen === row.id ? null : row.id)}><MoreHorizontal size={16} /></button>{actionMenuOpen === row.id && (<div className="action-dropdown"><button><Eye size={14} />View Task</button><button><Edit2 size={14} />Edit Task</button><button onClick={() => handleMarkCompleted(row.id)}><CheckCircle size={14} />Mark Completed</button><button><User size={14} />Reassign</button><button onClick={() => handleDeleteTask(row.id)} className="delete"><Trash2 size={14} />Delete</button></div>)}</div></td></tr>))}</tbody>
        </table>
      </div>
      <div className="pagination-container">
        <div className="pagination-left"><span className="pagination-info">Showing {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length} entries</span></div>
        <div className="pagination-right">
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>First</button>
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}><ChevronLeft size={16} /></button>
          <span className="page-indicator">Page {currentPage} of {totalPages}</span>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}><ChevronRight size={16} /></button>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>Last</button>
        </div>
      </div>
    </div>
  );
};

export default CallTasks;