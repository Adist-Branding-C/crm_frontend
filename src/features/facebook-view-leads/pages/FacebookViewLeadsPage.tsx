import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, X, Calendar, ChevronLeft, Eye, ChevronRight, AlertCircle } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { workflowsList, sampleLeads } from '../constants';
import type { FacebookLead, Filters, LeadStats } from '../types';
import '../../../pages/FacebookViewLeads.css';

const FacebookViewLeadsPage: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Filters>({
    dateFrom: '2026-04-25',
    dateTo: '2026-04-25',
    workflow: '',
    search: ''
  });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<FacebookLead | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleFilterChange = (field: keyof Filters, value: string) => {
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

  const handleViewDetails = (lead: FacebookLead) => {
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
      filtered = filtered.filter(l =>
        l.name.toLowerCase().includes(searchLower) ||
        l.phone.includes(searchLower)
      );
    }

    return filtered;
  }, [filters]);

  const stats: LeadStats = useMemo(() => ({
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

  const getStatusBadge = (status: string, type: string) => {
    if (type === 'lead') {
      const badges: Record<string, string> = { 'New': 'new', 'Existing': 'existing', 'Duplicate': 'duplicate' };
      return <span className={`lead-status-badge ${badges[status] || ''}`}>{status}</span>;
    }
    const badges: Record<string, string> = { 'success': 'success', 'failed': 'failed', 'pending': 'pending' };
    return <span className={`status-badge ${badges[status] || ''}`}>{status}</span>;
  };

  return (
    <div className="facebook-view-leads-page">
      <PageHeader
        title="Facebook Lead Requests"
        description="View and manage Facebook lead form submissions"
        breadcrumb={[
          { label: 'GL Connect', link: '/user/gl-connect' },
          { label: 'Facebook Integration', link: '/facebook/workflows' },
          { label: 'View Leads' }
        ]}
      />

      <div className="filter-card">
        <h3 className="filter-card-title">Filter Options</h3>

        <div className="filter-grid">
          <div className="filter-group">
            <label>Date Range</label>
            <div className="date-range-input">
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilterChange('dateFrom', e.target.value)}
              />
              <span className="date-separator">-</span>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilterChange('dateTo', e.target.value)}
              />
              <button className="calendar-btn"><Calendar size={14} /></button>
            </div>
          </div>

          <div className="filter-group">
            <label>Workflow</label>
            <select
              value={filters.workflow}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleFilterChange('workflow', e.target.value)}
            >
              {workflowsList.map(w => (
                <option key={w.id} value={w.id === 1 ? '' : w.name}>{w.name}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Search by Name or Phone</label>
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Enter at least 3 characters..."
                value={filters.search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilterChange('search', e.target.value)}
              />
              <button className="search-btn"><Search size={14} /></button>
            </div>
          </div>

          <div className="filter-actions">
            <button className="btn btn-primary" onClick={() => {}}>
              <Filter size={14} /> Filter
            </button>
            <button className="btn btn-secondary" onClick={() => setShowClearConfirm(true)}>
              <X size={14} /> Clear
            </button>
          </div>
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card blue">
          <div className="summary-content">
            <span className="summary-title">Total Records</span>
            <span className="summary-value">{stats.total}</span>
          </div>
        </div>
        <div className="summary-card green">
          <div className="summary-content">
            <span className="summary-title">Success Records</span>
            <span className="summary-value">{stats.success}</span>
          </div>
        </div>
        <div className="summary-card red">
          <div className="summary-content">
            <span className="summary-title">Failed Records</span>
            <span className="summary-value">{stats.failed}</span>
          </div>
        </div>
        <div className="summary-card green">
          <div className="summary-content">
            <span className="summary-title">New Records</span>
            <span className="summary-value">{stats.new}</span>
          </div>
        </div>
        <div className="summary-card teal">
          <div className="summary-content">
            <span className="summary-title">Duplicate Records</span>
            <span className="summary-value">{stats.duplicate}</span>
          </div>
        </div>
        <div className="summary-card yellow">
          <div className="summary-content">
            <span className="summary-title">Pending Records</span>
            <span className="summary-value">{stats.pending}</span>
          </div>
        </div>
      </div>

      <div className="table-controls">
        <div className="table-controls-left">
          <span className="show-entries">Show entries</span>
          <select
            value={rowsPerPage}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className="table-controls-right">
          <div className="live-search">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilterChange('search', e.target.value)}
            />
          </div>
        </div>
      </div>

      {filteredLeads.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"><AlertCircle size={48} /></div>
          <p>No Facebook leads found</p>
        </div>
      ) : (
        <div className="leads-table-wrapper">
          <table className="leads-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Workflow Name</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Additional Data</th>
                <th>Status</th>
                <th>Lead Status</th>
                <th>Created At</th>
                <th>Failure Reason</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLeads.map(lead => (
                <tr key={lead.id}>
                  <td>{lead.id}</td>
                  <td>{lead.workflowName}</td>
                  <td>{lead.name}</td>
                  <td>{lead.phone}</td>
                  <td>
                    <button
                      className="view-data-btn"
                      onClick={() => handleViewDetails(lead)}
                    >
                      <Eye size={14} />
                    </button>
                  </td>
                  <td>{getStatusBadge(lead.status, 'status')}</td>
                  <td>{getStatusBadge(lead.leadStatus, 'lead')}</td>
                  <td>{lead.createdAt}</td>
                  <td>{lead.failureReason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredLeads.length > 0 && (
        <div className="pagination-bar">
          <span className="showing-text">
            Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, filteredLeads.length)} of {filteredLeads.length} entries
          </span>
          <div className="pagination-controls">
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={14} /> Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {showDetailsModal && selectedLead && (
        <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
          <div className="modal-content details-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Lead Details</h3>
              <button className="modal-close" onClick={() => setShowDetailsModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">Full Name</span>
                <span className="detail-value">{selectedLead.name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone</span>
                <span className="detail-value">{selectedLead.phone}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email</span>
                <span className="detail-value">{selectedLead.additionalData.email || '-'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">City</span>
                <span className="detail-value">{selectedLead.additionalData.city || '-'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Course</span>
                <span className="detail-value">{selectedLead.additionalData.course || '-'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Campaign</span>
                <span className="detail-value">{selectedLead.additionalData.campaign || '-'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">UTM Source</span>
                <span className="detail-value">-</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Raw JSON</span>
                <pre className="detail-json">{JSON.stringify(selectedLead.additionalData, null, 2)}</pre>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowDetailsModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showClearConfirm && (
        <div className="modal-overlay" onClick={() => setShowClearConfirm(false)}>
          <div className="modal-content confirm-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-body">
              <p>Are you sure you want to clear all filters?</p>
              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setShowClearConfirm(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleClear}>Clear</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacebookViewLeadsPage;
