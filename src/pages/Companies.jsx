import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, ChevronLeft, ChevronRight, Plus, MoreHorizontal, Edit2, Trash2, Eye, X, Building, Users, Calendar, Mail, Phone, DollarSign, AlertCircle, Clock } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import PageContainer from '../components/PageContainer';
import './Enquiries.css';

const sampleCompanies = [
  { id: 1, name: 'TechCorp Solutions', email: 'admin@techcorp.com', phone: '+1 234 567 8900', plan: 'Enterprise', staffCount: 25, leads: 1250, deals: 45, revenue: 125000, status: 'active', createdAt: '2024-01-15', expiryDate: '2025-01-15', plansHistory: [
    { plan: 'Basic', startDate: '2023-01-15', endDate: '2023-07-15', price: 500 },
    { plan: 'Professional', startDate: '2023-07-15', endDate: '2024-01-15', price: 1500 },
    { plan: 'Enterprise', startDate: '2024-01-15', endDate: '2025-01-15', price: 5000 }
  ]},
  { id: 2, name: 'StartupXYZ Inc', email: 'hello@startupxyz.com', phone: '+1 234 567 8901', plan: 'Professional', staffCount: 12, leads: 450, deals: 18, revenue: 45000, status: 'active', createdAt: '2024-03-20', expiryDate: '2025-03-20', plansHistory: [
    { plan: 'Basic', startDate: '2024-03-20', endDate: '2024-06-20', price: 500 },
    { plan: 'Professional', startDate: '2024-06-20', endDate: '2025-03-20', price: 1500 }
  ]},
  { id: 3, name: 'GlobalTech Systems', email: 'info@globaltech.com', phone: '+1 234 567 8902', plan: 'Enterprise', staffCount: 45, leads: 2800, deals: 95, revenue: 320000, status: 'active', createdAt: '2023-08-10', expiryDate: '2024-08-10', plansHistory: [
    { plan: 'Professional', startDate: '2022-08-10', endDate: '2023-08-10', price: 1500 },
    { plan: 'Enterprise', startDate: '2023-08-10', endDate: '2024-08-10', price: 5000 }
  ]},
  { id: 4, name: 'SmallBiz Solutions', email: 'contact@smallbiz.com', phone: '+1 234 567 8903', plan: 'Basic', staffCount: 5, leads: 120, deals: 8, revenue: 18000, status: 'active', createdAt: '2024-05-01', expiryDate: '2025-05-01', plansHistory: [
    { plan: 'Basic', startDate: '2024-05-01', endDate: '2025-05-01', price: 500 }
  ]},
  { id: 5, name: 'MegaCorp Industries', email: 'admin@megacorp.com', phone: '+1 234 567 8904', plan: 'Enterprise', staffCount: 80, leads: 5200, deals: 180, revenue: 650000, status: 'active', createdAt: '2023-02-28', expiryDate: '2024-02-28', plansHistory: [
    { plan: 'Professional', startDate: '2022-02-28', endDate: '2023-02-28', price: 1500 },
    { plan: 'Enterprise', startDate: '2023-02-28', endDate: '2024-02-28', price: 5000 }
  ]},
  { id: 6, name: 'AdAgency Pro', email: 'team@adagency.com', phone: '+1 234 567 8905', plan: 'Professional', staffCount: 18, leads: 680, deals: 32, revenue: 78000, status: 'expired', createdAt: '2023-06-15', expiryDate: '2024-06-15', plansHistory: [
    { plan: 'Professional', startDate: '2023-06-15', endDate: '2024-06-15', price: 1500 }
  ]},
  { id: 7, name: 'ShopMart Retail', email: 'admin@shopmart.com', phone: '+1 234 567 8906', plan: 'Basic', staffCount: 8, leads: 350, deals: 15, revenue: 28000, status: 'active', createdAt: '2024-02-10', expiryDate: '2025-02-10', plansHistory: [
    { plan: 'Basic', startDate: '2024-02-10', endDate: '2025-02-10', price: 500 }
  ]},
  { id: 8, name: 'DataFlow Analytics', email: 'hello@dataflow.com', phone: '+1 234 567 8907', plan: 'Professional', staffCount: 22, leads: 920, deals: 42, revenue: 145000, status: 'active', createdAt: '2023-11-05', expiryDate: '2024-11-05', plansHistory: [
    { plan: 'Basic', startDate: '2023-05-05', endDate: '2023-11-05', price: 500 },
    { plan: 'Professional', startDate: '2023-11-05', endDate: '2024-11-05', price: 1500 }
  ]},
  { id: 9, name: 'SecureNet Solutions', email: 'admin@securenet.com', phone: '+1 234 567 8908', plan: 'Enterprise', staffCount: 35, leads: 1850, deals: 78, revenue: 280000, status: 'active', createdAt: '2023-09-20', expiryDate: '2024-09-20', plansHistory: [
    { plan: 'Basic', startDate: '2023-03-20', endDate: '2023-09-20', price: 500 },
    { plan: 'Professional', startDate: '2023-09-20', endDate: '2024-03-20', price: 1500 },
    { plan: 'Enterprise', startDate: '2024-03-20', endDate: '2024-09-20', price: 5000 }
  ]},
  { id: 10, name: 'CloudTech Services', email: 'info@cloudtech.com', phone: '+1 234 567 8909', plan: 'Professional', staffCount: 15, leads: 580, deals: 25, revenue: 62000, status: 'active', createdAt: '2024-01-25', expiryDate: '2025-01-25', plansHistory: [
    { plan: 'Professional', startDate: '2024-01-25', endDate: '2025-01-25', price: 1500 }
  ]},
];

export default function Companies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ plan: '', status: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const [viewingCompany, setViewingCompany] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showRenewalModal, setShowRenewalModal] = useState(false);
  const [renewalData, setRenewalData] = useState({ staffCount: '', perStaffPrice: '', plan: 'Basic' });
  const [editingCompany, setEditingCompany] = useState(null);
  const [newCompany, setNewCompany] = useState({ name: '', email: '', phone: '', plan: 'Basic', status: 'active' });

  const filteredCompanies = useMemo(() => {
    let result = [...sampleCompanies];
    
    if (searchQuery) {
      result = result.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery)
      );
    }
    
    if (filters.plan) {
      result = result.filter(c => c.plan === filters.plan);
    }
    
    if (filters.status) {
      result = result.filter(c => c.status === filters.status);
    }
    
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return result;
  }, [searchQuery, filters, sortConfig]);

  const stats = useMemo(() => {
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    const totalCompanies = sampleCompanies.length;
    const expiredCustomers = sampleCompanies.filter(c => c.status === 'expired').length;
    const soonExpire = sampleCompanies.filter(c => {
      const expiry = new Date(c.expiryDate);
      return c.status !== 'expired' && expiry <= thirtyDaysFromNow;
    }).length;
    const totalStaff = sampleCompanies.reduce((sum, c) => sum + c.staffCount, 0);
    const totalRevenue = sampleCompanies.reduce((sum, c) => sum + c.revenue, 0);

    return { totalCompanies, expiredCustomers, soonExpire, totalStaff, totalRevenue };
  }, []);

  const totalPages = Math.ceil(filteredCompanies.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedCompanies = filteredCompanies.slice(startIndex, startIndex + rowsPerPage);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = () => {
    if (selectedRows.length === paginatedCompanies.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedCompanies.map(c => c.id));
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this company?')) {
      console.log('Delete company:', id);
    }
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setNewCompany({
      name: company.name,
      email: company.email,
      phone: company.phone,
      plan: company.plan,
      status: company.status
    });
    setShowAddModal(true);
  };

  const handleView = (company) => {
    setViewingCompany(company);
    setIsViewDrawerOpen(true);
  };

  const handleAddCompany = () => {
    setEditingCompany(null);
    setNewCompany({ name: '', email: '', phone: '', plan: 'Basic', status: 'active' });
    setShowAddModal(true);
  };

  const handleSaveCompany = () => {
    if (editingCompany) {
      console.log('Edit company:', editingCompany.id, newCompany);
    } else {
      console.log('Add company:', newCompany);
    }
    setShowAddModal(false);
    setEditingCompany(null);
    setNewCompany({ name: '', email: '', phone: '', plan: 'Basic', status: 'active' });
  };

  const getStatusBadge = (status) => {
    return status === 'active' 
      ? <span className="status-badge active">Active</span>
      : <span className="status-badge expired">Expired</span>;
  };

  const getPlanBadge = (plan) => {
    const colors = { 'Enterprise': '#8b5cf6', 'Professional': '#3b82f6', 'Basic': '#10b981' };
    return <span className="plan-badge" style={{ background: colors[plan] + '20', color: colors[plan] }}>{plan}</span>;
  };

  return (
    <PageContainer>
      <PageHeader title="Company Management" description="Manage CRM tenants and their subscriptions" />
      
      <div className="company-stats-grid">
        <div className="company-stat-card">
          <div className="company-stat-icon" style={{ background: '#3b82f620' }}><Building size={20} color="#3b82f6" /></div>
          <div className="company-stat-info">
            <span className="company-stat-value">{stats.totalCompanies}</span>
            <span className="company-stat-label">Total Companies</span>
          </div>
        </div>
        <div className="company-stat-card">
          <div className="company-stat-icon" style={{ background: '#ef444420' }}><AlertCircle size={20} color="#ef4444" /></div>
          <div className="company-stat-info">
            <span className="company-stat-value">{stats.expiredCustomers}</span>
            <span className="company-stat-label">Expired</span>
          </div>
        </div>
        <div className="company-stat-card">
          <div className="company-stat-icon" style={{ background: '#f59e0b20' }}><Clock size={20} color="#f59e0b" /></div>
          <div className="company-stat-info">
            <span className="company-stat-value">{stats.soonExpire}</span>
            <span className="company-stat-label">Soon Expire</span>
          </div>
        </div>
        <div className="company-stat-card">
          <div className="company-stat-icon" style={{ background: '#8b5cf620' }}><Users size={20} color="#8b5cf6" /></div>
          <div className="company-stat-info">
            <span className="company-stat-value">{stats.totalStaff}</span>
            <span className="company-stat-label">Total Staff</span>
          </div>
        </div>
        <div className="company-stat-card">
          <div className="company-stat-icon" style={{ background: '#10b98120' }}><DollarSign size={20} color="#10b981" /></div>
          <div className="company-stat-info">
            <span className="company-stat-value">${stats.totalRevenue.toLocaleString()}</span>
            <span className="company-stat-label">Total Revenue</span>
          </div>
        </div>
      </div>
      
      <div className="enquiries-toolbar">
        <div className="toolbar-left">
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <button className={`btn btn-secondary ${showFilters ? 'active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
            <Filter size={16} /> Filter
            <ChevronDown size={14} className={showFilters ? 'rotate' : ''} />
          </button>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-primary" onClick={handleAddCompany}>
            <Plus size={16} /> Add Company
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-row">
            <div className="filter-group">
              <label>Plan</label>
              <select value={filters.plan} onChange={(e) => setFilters({ ...filters, plan: e.target.value })}>
                <option value="">All Plans</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Professional">Professional</option>
                <option value="Basic">Basic</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Status</label>
              <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            <div className="filter-actions">
              <button className="btn btn-primary" onClick={() => setShowFilters(false)}>Filter</button>
              <button className="btn btn-secondary" onClick={() => { setFilters({ plan: '', status: '' }); setShowFilters(false); }}>Clear</button>
            </div>
          </div>
        </div>
      )}
      
      <div className="table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" checked={selectedRows.length === paginatedCompanies.length && paginatedCompanies.length > 0} onChange={handleSelectAll} />
              </th>
              <th onClick={() => handleSort('name')} className="sortable">
                Company {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? <ChevronDown size={14} /> : <ChevronDown size={14} />)}
              </th>
              <th>Contact</th>
              <th>Plan</th>
              <th onClick={() => handleSort('staffCount')} className="sortable">Staff</th>
              <th onClick={() => handleSort('leads')} className="sortable">Leads</th>
              <th onClick={() => handleSort('deals')} className="sortable">Deals</th>
              <th onClick={() => handleSort('revenue')} className="sortable">Revenue</th>
              <th>Status</th>
              <th onClick={() => handleSort('expiryDate')} className="sortable">Expiry</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCompanies.map(company => (
              <tr key={company.id} className={selectedRows.includes(company.id) ? 'selected' : ''}>
                <td>
                  <input type="checkbox" checked={selectedRows.includes(company.id)} onChange={() => handleSelectRow(company.id)} />
                </td>
                <td>
                  <div className="company-name-cell">
                    <Building size={16} className="company-icon" />
                    <div>
                      <div className="company-name">{company.name}</div>
                      <div className="company-date">Since {company.createdAt}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="contact-cell">
                    <div><Mail size={12} /> {company.email}</div>
                    <div><Phone size={12} /> {company.phone}</div>
                  </div>
                </td>
                <td>{getPlanBadge(company.plan)}</td>
                <td>
                  <div className="stat-cell">
                    <Users size={14} /> {company.staffCount}
                  </div>
                </td>
                <td>{company.leads.toLocaleString()}</td>
                <td>{company.deals}</td>
                <td>${company.revenue.toLocaleString()}</td>
                <td>{getStatusBadge(company.status)}</td>
                <td>{company.expiryDate}</td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn" title="View" onClick={() => handleView(company)}><Eye size={14} /></button>
                    <button className="action-btn" title="Edit" onClick={() => handleEdit(company)}><Edit2 size={14} /></button>
                    <button className="action-btn delete" title="Delete" onClick={() => handleDelete(company.id)}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="pagination">
        <div className="pagination-info">
          Showing {startIndex + 1} to {Math.min(currentPage * rowsPerPage, filteredCompanies.length)} of {filteredCompanies.length} entries
        </div>
        <div className="pagination-controls">
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>First</button>
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}><ChevronLeft size={16} /></button>
          <span className="page-indicator">Page {currentPage} of {totalPages}</span>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}><ChevronRight size={16} /></button>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>Last</button>
        </div>
      </div>
      
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingCompany ? 'Edit Company' : 'Add New Company'}</h2>
              <button className="modal-close" onClick={() => setShowAddModal(false)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Company Name</label>
                <input type="text" value={newCompany.name} onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })} placeholder="Enter company name" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={newCompany.email} onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })} placeholder="Enter email" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" value={newCompany.phone} onChange={(e) => setNewCompany({ ...newCompany, phone: e.target.value })} placeholder="Enter phone number" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Plan</label>
                  <select value={newCompany.plan} onChange={(e) => setNewCompany({ ...newCompany, plan: e.target.value })}>
                    <option value="Basic">Basic</option>
                    <option value="Professional">Professional</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select value={newCompany.status} onChange={(e) => setNewCompany({ ...newCompany, status: e.target.value })}>
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSaveCompany}>{editingCompany ? 'Save Changes' : 'Add Company'}</button>
            </div>
          </div>
        </div>
      )}
      
      {isViewDrawerOpen && (
        <div className="drawer-overlay" onClick={() => setIsViewDrawerOpen(false)}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="drawer-title-section">
                <Building size={24} />
                <div>
                  <h2>{viewingCompany?.name}</h2>
                  <span className="drawer-subtitle">Company Details</span>
                </div>
              </div>
              <button className="drawer-close" onClick={() => setIsViewDrawerOpen(false)}><X size={20} /></button>
            </div>
            <div className="drawer-tabs">
              <button className={activeTab === 'overview' ? 'tab active' : 'tab'} onClick={() => setActiveTab('overview')}>Overview</button>
              <button className={activeTab === 'plans' ? 'tab active' : 'tab'} onClick={() => setActiveTab('plans')}>Plans</button>
            </div>
            <div className="drawer-content">
              {activeTab === 'overview' && (
                <div className="tab-content">
                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-icon" style={{ background: '#8b5cf620' }}><Users size={20} color="#8b5cf6" /></div>
                      <div className="stat-info">
                        <span className="stat-label">Staff Count</span>
                        <span className="stat-value">{viewingCompany?.staffCount}</span>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon" style={{ background: '#3b82f620' }}><Building size={20} color="#3b82f6" /></div>
                      <div className="stat-info">
                        <span className="stat-label">Total Leads</span>
                        <span className="stat-value">{viewingCompany?.leads?.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon" style={{ background: '#10b98120' }}><DollarSign size={20} color="#10b981" /></div>
                      <div className="stat-info">
                        <span className="stat-label">Total Deals</span>
                        <span className="stat-value">{viewingCompany?.deals}</span>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon" style={{ background: '#f59e0b20' }}><DollarSign size={20} color="#f59e0b" /></div>
                      <div className="stat-info">
                        <span className="stat-label">Total Revenue</span>
                        <span className="stat-value">${viewingCompany?.revenue?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="detail-section">
                    <h3>Company Information</h3>
                    <div className="detail-grid">
                      <div className="detail-item"><label>Email</label><span>{viewingCompany?.email}</span></div>
                      <div className="detail-item"><label>Phone</label><span>{viewingCompany?.phone}</span></div>
                      <div className="detail-item"><label>Current Plan</label><span>{getPlanBadge(viewingCompany?.plan)}</span></div>
                      <div className="detail-item"><label>Status</label><span>{getStatusBadge(viewingCompany?.status)}</span></div>
                      <div className="detail-item"><label>Created Date</label><span>{viewingCompany?.createdAt}</span></div>
                      <div className="detail-item"><label>Expiry Date</label><span className={viewingCompany?.status === 'expired' ? 'text-danger' : ''}>{viewingCompany?.expiryDate}</span></div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'plans' && (
                <div className="tab-content">
                  <div className="plans-list">
                    {viewingCompany?.plansHistory?.map((planItem, index) => (
                      <div key={index} className="plan-card">
                        <div className="plan-header">
                          <span className="plan-name">{planItem.plan}</span>
                          {index === 0 && <span className="current-badge">Current</span>}
                        </div>
                        <div className="plan-details">
                          <div className="plan-date"><Calendar size={14} /><span>{planItem.startDate} - {planItem.endDate}</span></div>
                          <div className="plan-price"><DollarSign size={14} /><span>{planItem.price?.toLocaleString()}/year</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="btn btn-primary renewal-btn" onClick={() => setShowRenewalModal(true)}>Renew Plan</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showRenewalModal && (
        <div className="modal-overlay" onClick={() => setShowRenewalModal(false)}>
          <div className="modal-content renewal-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Renew Plan</h2>
              <button className="modal-close" onClick={() => setShowRenewalModal(false)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Number of Staff</label>
                <input type="number" value={renewalData.staffCount} onChange={(e) => setRenewalData({ ...renewalData, staffCount: e.target.value })} placeholder="Enter number of staff" />
              </div>
              <div className="form-group">
                <label>Per Staff Price ($)</label>
                <input type="number" value={renewalData.perStaffPrice} onChange={(e) => setRenewalData({ ...renewalData, perStaffPrice: e.target.value })} placeholder="Enter price per staff" />
              </div>
              <div className="form-group">
                <label>Plan</label>
                <select value={renewalData.plan} onChange={(e) => setRenewalData({ ...renewalData, plan: e.target.value })}>
                  <option value="Basic">Basic</option>
                  <option value="Professional">Professional</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowRenewalModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={() => console.log('Renew:', renewalData)}>Renew</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
