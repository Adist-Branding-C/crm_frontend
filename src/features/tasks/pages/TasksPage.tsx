import { Search, Filter, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Plus, MoreHorizontal, Edit2, Trash2, Eye, Download, User, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import AddDealTaskDrawer from '../../../shared/components/drawers/AddDealTaskDrawer';
import { TASK_SUB_MENU_ITEMS, COLUMNS, TASK_DEAL_OPTIONS, TASK_STATUS_OPTIONS, TASK_ASSIGNED_TO_OPTIONS, TASK_CATEGORY_OPTIONS } from '../constants';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../shared/constants/pagination';
import { ACTION_VIEW, ACTION_EDIT, ACTION_DELETE, ACTION_FILTER, ACTION_SEARCH } from '../../../shared/constants/actionLabels';
import { LABEL_SHOW_ENTRIES, LABEL_SHOWING, LABEL_OF, LABEL_ENTRIES, LABEL_FIRST, LABEL_PAGE, LABEL_LAST } from '../../../shared/constants/labels';
import { TaskStatus } from '../../../shared/constants/enums/taskStatus';
import { useTasksData } from '../hooks/useTasksData';
import './TasksPage.css';

const TasksPage = () => {
  const {
    activeTab,
    searchQuery,
    setSearchQuery,
    showFilters,
    setShowFilters,
    selectedRows,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    sortConfig,
    actionMenuOpen,
    setActionMenuOpen,
    isDrawerOpen,
    editingTask,
    showSortDropdown,
    setShowSortDropdown,
    filters,
    setFilters,
    stats,
    totalPages,
    startIndex,
    paginatedData,
    filteredData,
    handleTabClick,
    handleSort,
    handleSelectAll,
    handleSelectRow,
    handleRowsPerPageChange,
    clearFilters,
    handleDeleteTask,
    handleMarkCompleted,
    handleExportCSV,
    handleDrawerOpen,
    handleDrawerClose,
    getPageTitle,
  } = useTasksData();

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, string> = { [TaskStatus.COMPLETED]: 'status-completed', [TaskStatus.PENDING]: 'status-pending', [TaskStatus.OVERDUE]: 'status-overdue' };
    const labelMap: Record<string, string> = { [TaskStatus.COMPLETED]: 'Completed', [TaskStatus.PENDING]: 'Pending', [TaskStatus.OVERDUE]: 'OverDue' };
    return <span className={`badge badge-${statusMap[status] || ''}`}>{labelMap[status] || status}</span>;
  };

  return (
    <div className="account-page">
      <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
        <PageHeader title={getPageTitle()} description="Manage tasks and activities." breadcrumb={false} />

        <div className="task-tabs">
          {TASK_SUB_MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} className={`task-tab ${activeTab === item.id ? 'active' : ''}`} onClick={() => handleTabClick(item)}>
                <Icon size={16} /> {item.title}
              </button>
            );
          })}
        </div>

        <div className="task-stats-cards">
          <div className="stats-card"><div className="stats-card-icon total"><Clock size={20} /></div><div className="stats-card-content"><span className="stats-card-value">{stats.total}</span><span className="stats-card-label">Total Tasks</span></div></div>
          <div className="stats-card"><div className="stats-card-icon completed"><CheckCircle size={20} /></div><div className="stats-card-content"><span className="stats-card-value">{stats.completed}</span><span className="stats-card-label">Completed</span></div></div>
          <div className="stats-card"><div className="stats-card-icon pending"><Clock size={20} /></div><div className="stats-card-content"><span className="stats-card-value">{stats.pending}</span><span className="stats-card-label">Pending</span></div></div>
          <div className="stats-card"><div className="stats-card-icon overdue"><AlertCircle size={20} /></div><div className="stats-card-content"><span className="stats-card-value">{stats.overdue}</span><span className="stats-card-label">OverDue</span></div></div>
        </div>

        <div className="task-actions-row">
          <div className="task-actions-left">
            <button className="btn btn-assign"><User size={16} />Assign To</button>
            <button className="btn btn-secondary" onClick={() => setShowFilters(!showFilters)}><Filter size={16} />{ACTION_FILTER}</button>
          </div>
          <div className="task-actions-right">
            <button className="btn btn-secondary" onClick={handleExportCSV}><Download size={16} />Export</button>
            <button className="btn btn-primary" onClick={handleDrawerOpen}><Plus size={16} />Task</button>
          </div>
        </div>

        {showFilters && (
          <div className="filter-actions-panel">
            <div className="filter-row">
              <div className="filter-group"><label>Deal</label><select value={filters.deal} onChange={(e) => setFilters({ ...filters, deal: e.target.value })}><option value="">All</option>{TASK_DEAL_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
              <div className="filter-group"><label>Status</label><select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}><option value="">All</option>{TASK_STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
              <div className="filter-group"><label>Assigned To</label><select value={filters.assignedTo} onChange={(e) => setFilters({ ...filters, assignedTo: e.target.value })}><option value="">All</option>{TASK_ASSIGNED_TO_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
              <div className="filter-group"><label>Category</label><select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}><option value="">All</option>{TASK_CATEGORY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
            </div>
            <div className="filter-row">
              <div className="filter-group"><label>Date Range</label><div className="date-range-input"><input type="date" value={filters.dateRange.start} onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } })} /><span>to</span><input type="date" value={filters.dateRange.end} onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } })} /></div></div>
              <div className="filter-actions-btns"><button className="btn btn-primary" onClick={() => setShowFilters(false)}>Apply Filter</button><button className="btn btn-secondary" onClick={clearFilters}>Reset</button></div>
            </div>
          </div>
        )}

        <div className="enquiries-toolbar">
          <div className="toolbar-left">
            <div className="search-box"><Search size={16} className="search-icon" /><input type="text" placeholder={ACTION_SEARCH} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" /></div>
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
          <div className="toolbar-right">
            <span className="rows-label">{LABEL_SHOW_ENTRIES}</span>
            <select value={rowsPerPage} onChange={handleRowsPerPageChange} className="rows-select">
              {ROWS_OPTIONS_10_25_50_100.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="enquiries-table">
            <thead>
              <tr>
                {COLUMNS.map(col => (
                  <th key={col.key} className={col.sortable ? 'sortable' : ''} onClick={col.sortable ? () => handleSort(col.key) : undefined}>
                    {col.key === 'checkbox' ? <input type="checkbox" checked={paginatedData.length > 0 && selectedRows.length === paginatedData.length} onChange={handleSelectAll} /> : <>{col.label}{col.sortable && sortConfig.key === col.key && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map(row => (
                <tr key={row.id} className={selectedRows.includes(row.id) ? 'selected' : ''}>
                  <td><input type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => handleSelectRow(row.id)} /></td>
                  <td>{row.slNo}</td>
                  <td className="lead-name-cell">{row.title}</td>
                  <td>{row.category}</td>
                  <td>{row.deal}</td>
                  <td>${Number(row.amount).toLocaleString()}</td>
                  <td className="description-cell">{row.description}</td>
                  <td>{row.scheduledDate}</td>
                  <td>{row.assignedBy}</td>
                  <td>{row.assignedTo}</td>
                  <td>{getStatusBadge(row.status)}</td>
                  <td className="action-cell">
                    <div className="action-menu-container">
                      <button className="action-btn" onClick={() => setActionMenuOpen(actionMenuOpen === row.id ? null : row.id)}><MoreHorizontal size={16} /></button>
                      {actionMenuOpen === row.id && (
                        <div className="action-dropdown">
                          <button><Eye size={14} />{ACTION_VIEW} Task</button>
                          <button><Edit2 size={14} />{ACTION_EDIT} Task</button>
                          <button onClick={() => handleMarkCompleted(row.id)}><CheckCircle size={14} />Mark Completed</button>
                          <button><User size={14} />Reassign</button>
                          <button onClick={() => handleDeleteTask(row.id)} className="delete"><Trash2 size={14} />{ACTION_DELETE}</button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination-container">
          <div className="pagination-left">
            <span className="pagination-info">{LABEL_SHOWING} {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredData.length)} {LABEL_OF} {filteredData.length} {LABEL_ENTRIES}</span>
          </div>
          <div className="pagination-right">
            <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>{LABEL_FIRST}</button>
            <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}><ChevronLeft size={16} /></button>
            <span className="page-indicator">{LABEL_PAGE} {currentPage} {LABEL_OF} {totalPages}</span>
            <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}><ChevronRight size={16} /></button>
            <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>{LABEL_LAST}</button>
          </div>
        </div>

        <AddDealTaskDrawer isOpen={isDrawerOpen} onClose={handleDrawerClose} task={editingTask as any} onSave={() => { }} />
      </div>
    </div>
  );
};

export default TasksPage;
