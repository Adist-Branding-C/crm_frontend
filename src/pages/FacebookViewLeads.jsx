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
      filtered = filtered.filter(l => 
        l.name.toLowerCase().includes(searchLower) || 
        l.phone.includes(searchLower)
      );
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
      return <span className={`lead-status-badge ${badges[status] || ''}`}>{status}</span>;
    }
    const badges = { 'success': 'success', 'failed': 'failed', 'pending': 'pending' };
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

      {/* Filter Options Card */}
      <div className="filter-card">
        <h3 className="filter-card-title">Filter Options</h3>
        
        <div className="filter-grid">
          <div className="filter-group">
            <label>Date Range</label>
            <div className="date-range-input">
              <input 
                type="date" 
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              />
              <span className="date-separator">-</span>
              <input 
                type="date" 
                value={filters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              />
              <button className="calendar-btn"><Calendar size={14} /></button>
            </div>
          </div>

          <div className="filter-group">
            <label>Workflow</label>
            <select 
              value={filters.workflow}
              onChange={(e) => handleFilterChange('workflow', e.target.value)}
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
                onChange={(e) => handleFilterChange('search', e.target.value)}
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

      {/* Summary Cards */}
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

      {/* Table Controls */}
      <div className="table-controls">
        <div className="table-controls-left">
          <span className="show-entries">Show entries</span>
          <select 
            value={rowsPerPage}
            onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
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
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
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

      {/* Pagination */}
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

      {/* Details Modal */}
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

      {/* Clear Confirm Modal */}
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