import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Edit2, Trash2, Plus, Search, X, FileText, Tag, Globe, Layers } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './LeadSettings.css';

const menuItems = [
  { id: 'purpose', label: 'Purpose', link: '/settings/lead-settings/purpose', icon: FileText },
  { id: 'status', label: 'Status', link: '/settings/lead-settings/status', icon: Tag },
  { id: 'source', label: 'Source', link: '/settings/lead-settings/source', icon: Globe },
  { id: 'types', label: 'Types', link: '/settings/lead-settings/types', icon: Layers },
  { id: 'additional', label: 'Additional Fields', link: '/settings/lead-settings/additional', icon: FileText },
];

const initialData = [
  { id: 1, status: 'New', color: '#22c55e', useForConversion: false },
  { id: 2, status: 'Connected', color: '#3b82f6', useForConversion: false },
  { id: 3, status: 'Interested', color: '#f59e0b', useForConversion: true },
  { id: 4, status: 'Registered', color: '#8b5cf6', useForConversion: true },
  { id: 5, status: 'Not Interested', color: '#ef4444', useForConversion: false },
  { id: 6, status: 'Just Enquiry', color: '#6b7280', useForConversion: false },
];

const LeadStatusPage = () => {
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [formData, setFormData] = useState({ status: '', color: '#3b82f6', useForConversion: false });

  const filteredData = data.filter(item => 
    item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClick = () => {
    setShowForm(true);
    setEditingItem(null);
    setFormData({ status: '', color: '#3b82f6', useForConversion: false });
  };

  const handleEditClick = (item) => {
    setShowForm(true);
    setEditingItem(item);
    setFormData({ status: item.status, color: item.color, useForConversion: item.useForConversion || false });
    setDropdownOpen(null);
  };

  const handleDeleteClick = (item) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  };

  const handleConfirmDelete = () => {
    setData(prev => prev.filter(item => item.id !== deletingItem.id));
    setDeletingItem(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData({ status: '', color: '#3b82f6', useForConversion: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      setData(prev => prev.map(item => 
        item.id === editingItem.id ? { ...item, status: formData.status, color: formData.color, useForConversion: formData.useForConversion } : item
      ));
    } else {
      setData(prev => [...prev, { id: Date.now(), status: formData.status, color: formData.color, useForConversion: formData.useForConversion }]);
    }
    handleCloseForm();
  };

  return (
    <div className="lead-settings-page">
      <PageHeader title="Lead Settings" description="Configure lead purposes, statuses, sources and types" />

      <div className="lead-settings-layout">
        <div className="settings-menu">
          {menuItems.map(item => (
            <Link
              key={item.id}
              to={item.link}
              className={`menu-item ${item.id === 'status' ? 'active' : ''}`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </div>

        <div className="settings-content">
          <div className="content-header">
            <div className="header-left">
              <div className="entries-select">
                <label>Show 
                  <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select> 
                  entries
                </label>
              </div>
            </div>
            <div className="header-right">
              <div className="search-input">
                <Search size={16} />
                <input 
                  type="search" 
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" onClick={handleAddClick}>
                <Plus size={16} /> Lead Status
              </button>
            </div>
          </div>

          <div className="table-container">
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Status</th>
                    <th>Color</th>
                    <th>Use for Conversion Metrics</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.slice(0, rowsPerPage).map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.status}</td>
                      <td>
                        <span className="color-pill" style={{ background: item.color }} />
                      </td>
                      <td>
                        <span className={`badge ${item.useForConversion ? 'badge-success' : 'badge-secondary'}`}>
                          {item.useForConversion ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td>
                        <div className="dropdown-container">
                          <button 
                            className="dropdown-toggle"
                            onClick={() => setDropdownOpen(dropdownOpen === item.id ? null : item.id)}
                          >
                            <MoreHorizontal size={16} />
                          </button>
                          {dropdownOpen === item.id && (
                            <div className="dropdown-menu">
                              <a className="dropdown-item" onClick={() => handleEditClick(item)}>
                                <Edit2 size={14} /> Edit
                              </a>
                              <a className="dropdown-item" onClick={() => handleDeleteClick(item)}>
                                <Trash2 size={14} /> Delete
                              </a>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-footer">
              <div className="table-info">
                Showing 1 to {Math.min(rowsPerPage, filteredData.length)} of {filteredData.length} entries
              </div>
              <div className="pagination">
                <button className="paginate-button disabled">Previous</button>
                <button className="paginate-button current">1</button>
                <button className="paginate-button disabled">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="drawer-overlay" onClick={handleCloseForm}>
          <div className="drawer drawer-right" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h5>{editingItem ? 'Edit Lead Status' : 'Add Lead Status'}</h5>
              <button className="drawer-close" onClick={handleCloseForm}>
                <X size={20} />
              </button>
            </div>
            <div className="drawer-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Status <span className="text-danger">*</span></label>
                  <input 
                    type="text" 
                    name="status"
                    className="form-control"
                    placeholder="Enter status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Color</label>
                  <input 
                    type="color" 
                    name="color"
                    className="form-control color-input"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Use for Conversion Metrics</label>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={formData.useForConversion}
                      onChange={(e) => setFormData({ ...formData, useForConversion: e.target.checked })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    {editingItem ? 'Update' : 'Save'}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={handleCloseForm}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {deletingItem && (
        <div className="modal-overlay" onClick={() => setDeletingItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5>Confirm Delete</h5>
              <button className="modal-close" onClick={() => setDeletingItem(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete <strong>{deletingItem.status}</strong>?</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-danger" onClick={handleConfirmDelete}>Confirm</button>
              <button className="btn btn-secondary" onClick={() => setDeletingItem(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadStatusPage;