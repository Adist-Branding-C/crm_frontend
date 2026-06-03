import { Search, Filter, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Plus, MoreHorizontal, Edit2, Trash2, Eye, Download, User, CheckCircle, Clock } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import AddCampaignDrawer from '../../../shared/components/drawers/AddCampaignDrawer';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../shared/constants/pagination';
import { ACTION_VIEW, ACTION_EDIT, ACTION_DELETE, ACTION_FILTER, ACTION_CLEAR, ACTION_SEARCH } from '../../../shared/constants/actionLabels';
import { LABEL_ROWS_PER_PAGE, LABEL_SHOWING, LABEL_OF, LABEL_FIRST, LABEL_PAGE, LABEL_LAST } from '../../../shared/constants/labels';
import { COLUMNS, CAMPAIGN_TYPE_OPTIONS, CAMPAIGN_CREATED_BY_OPTIONS } from '../constants';
import { useCampaignsData } from '../hooks/useCampaignsData';
import './CampaignsPage.css';

const CampaignsPage = () => {
  const {
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
    showSortDropdown,
    setShowSortDropdown,
    handleSort,
    handleSelectAll,
    handleSelectRow,
    handleRowsPerPageChange,
    clearFilters,
    handleDeleteCampaign,
    handleExportCSV,
    handleDrawerSave,
    handleDrawerClose,
    handleDrawerOpen,
    filters,
    setFilters,
    stats,
    totalPages,
    startIndex,
    paginatedData,
    filteredData,
  } = useCampaignsData();

  return (
    <PageContainer>
      <PageHeader title="Campaigns" description="Manage campaign tasks and activities." />
      <div className="task-stats-cards">
        <div className="stats-card"><div className="stats-card-icon total"><Clock size={20} /></div><div className="stats-card-content"><span className="stats-card-value">{stats.total}</span><span className="stats-card-label">Total Campaigns</span></div></div>
        <div className="stats-card"><div className="stats-card-icon completed"><CheckCircle size={20} /></div><div className="stats-card-content"><span className="stats-card-value">{stats.completed}</span><span className="stats-card-label">Completed</span></div></div>
        <div className="stats-card"><div className="stats-card-icon pending"><Clock size={20} /></div><div className="stats-card-content"><span className="stats-card-value">{stats.active}</span><span className="stats-card-label">In Progress</span></div></div>
      </div>
      <div className="enquiries-toolbar">
        <div className="toolbar-left">
          <div className="search-box"><Search size={16} className="search-icon" /><input type="text" placeholder={ACTION_SEARCH} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" /></div>
          <button className="btn btn-secondary" onClick={() => setShowFilters(!showFilters)}><Filter size={16} />{ACTION_FILTER}<ChevronDown size={14} className={showFilters ? 'rotate' : ''} /></button>
          <div className="dropdown-container">
            <button className="btn btn-secondary" onClick={() => setShowSortDropdown(!showSortDropdown)}>Sort By<ChevronDown size={14} /></button>
            {showSortDropdown && (
              <div className="sort-dropdown">
                <button onClick={() => { handleSort('createdAt'); setShowSortDropdown(false); }}>Created Date {sortConfig.key === 'createdAt' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</button>
                <button onClick={() => { handleSort('name'); setShowSortDropdown(false); }}>Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</button>
                <button onClick={() => { handleSort('completedPercent'); setShowSortDropdown(false); }}>Progress {sortConfig.key === 'completedPercent' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</button>
              </div>
            )}
          </div>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-secondary" onClick={handleExportCSV}><Download size={16} />Export</button>
          <button className="btn btn-primary" onClick={handleDrawerOpen}><Plus size={16} />Campaign</button>
        </div>
      </div>
      {showFilters && (
        <div className="filters-panel">
          <div className="filter-row">
            <div className="filter-group"><label>Type</label><select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}><option value="">All</option>{CAMPAIGN_TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
            <div className="filter-group"><label>Created By</label><select value={filters.createdBy} onChange={(e) => setFilters({ ...filters, createdBy: e.target.value })}><option value="">All</option>{CAMPAIGN_CREATED_BY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
            <div className="filter-group"><label>Date Range</label><div className="date-range-input"><input type="date" value={filters.dateRange.start} onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } })} /><span>to</span><input type="date" value={filters.dateRange.end} onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } })} /></div></div>
          </div>
          <div className="filter-row">
            <div className="filter-actions"><button className="btn btn-primary" onClick={() => setShowFilters(false)}>{ACTION_FILTER}</button><button className="btn btn-secondary" onClick={clearFilters}>{ACTION_CLEAR}</button></div>
          </div>
        </div>
      )}
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
                <td className="lead-name-cell">{row.name}</td>
                <td><span className={`badge badge-${row.type.toLowerCase()}`}>{row.type}</span></td>
                <td>{row.totalTasks}</td>
                <td>{row.completedTasks}</td>
                <td>
                  <div className="progress-cell">
                    <span>{row.completedPercent}%</span>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: row.completedPercent + '%' }}></div></div>
                  </div>
                </td>
                <td>{row.createdBy}</td>
                <td>{row.createdAt}</td>
                <td className="action-cell">
                  <div className="action-menu-container">
                    <button className="action-btn" onClick={() => setActionMenuOpen(actionMenuOpen === row.id ? null : row.id)}><MoreHorizontal size={16} /></button>
                    {actionMenuOpen === row.id && (
                      <div className="action-dropdown">
                        <button><Eye size={14} />{ACTION_VIEW}</button>
                        <button><Edit2 size={14} />{ACTION_EDIT}</button>
                        <button><User size={14} />Assign</button>
                        <button onClick={() => handleDeleteCampaign(row.id)} className="delete"><Trash2 size={14} />{ACTION_DELETE}</button>
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
          <span className="rows-label">{LABEL_ROWS_PER_PAGE}</span>
          <select value={rowsPerPage} onChange={handleRowsPerPageChange} className="rows-select">
            {ROWS_OPTIONS_10_25_50_100.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <span className="pagination-info">{LABEL_SHOWING} {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredData.length)} {LABEL_OF} {filteredData.length}</span>
        </div>
        <div className="pagination-right">
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>{LABEL_FIRST}</button>
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}><ChevronLeft size={16} /></button>
          <span className="page-indicator">{LABEL_PAGE} {currentPage} {LABEL_OF} {totalPages}</span>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}><ChevronRight size={16} /></button>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>{LABEL_LAST}</button>
        </div>
      </div>
      <AddCampaignDrawer isOpen={isDrawerOpen} onClose={handleDrawerClose} onSave={handleDrawerSave} />
    </PageContainer>
  );
};

export default CampaignsPage;
