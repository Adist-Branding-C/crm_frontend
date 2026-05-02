import React, { useState } from 'react';
import { MoreHorizontal, Edit2, Trash2, Plus, Search, X, Filter, List, FileText } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './LeadSettings.css';

const purposeData = [
  { id: 1, title: '12th Pass' },
  { id: 2, title: '12th Grade' },
  { id: 3, title: 'MBBS' },
  { id: 4, title: 'bachelor' },
  { id: 5, title: 'HOT' },
  { id: 6, title: 'WARM' },
];

const statusData = [
  { id: 1, status: 'New', color: '#22c55e' },
  { id: 2, status: 'Connected', color: '#3b82f6' },
  { id: 3, status: 'Interested', color: '#f59e0b' },
  { id: 4, status: 'Registered', color: '#8b5cf6' },
  { id: 5, status: 'Not Interested', color: '#ef4444' },
  { id: 6, status: 'Just Enquiry', color: '#6b7280' },
];

const sourceData = [
  { id: 1, addedBy: 'You', source: 'TMU | Kerala | Lead | VD | Ad' },
  { id: 2, addedBy: 'You', source: 'PG ENG - 349000 Whatsapp' },
  { id: 3, addedBy: 'You', source: 'BSC Nursing | Bulgaria | V2' },
];

const typeData = [
  { id: 1, addedBy: 'You', type: 'Seminar Saudi' },
  { id: 2, addedBy: 'You', type: 'Seminar UAE' },
  { id: 3, addedBy: 'You', type: 'Seminar Qatar' },
  { id: 4, addedBy: 'You', type: 'MBBS Doing' },
  { id: 5, addedBy: 'You', type: 'Hot' },
  { id: 6, addedBy: 'You', type: 'In follow up' },
];

const additionalFieldsData = [
  { id: 1, field: 'Assigned Date', type: 'DateTime', inFilter: false, inList: true, required: false, purpose: false },
  { id: 2, field: 'Date', type: 'Date', inFilter: true, inList: true, required: false, purpose: false },
  { id: 3, field: 'Remarks', type: 'Text', inFilter: true, inList: true, required: false, purpose: false },
  { id: 4, field: 'location', type: 'Text', inFilter: true, inList: true, required: false, purpose: false },
];

const menuItems = [
  { id: 'purpose', label: 'Purpose', icon: FileText },
  { id: 'status', label: 'Status', icon: FileText },
  { id: 'source', label: 'Source', icon: FileText },
  { id: 'types', label: 'Types', icon: FileText },
  { id: 'additional', label: 'Additional Fields', icon: FileText },
];

const LeadSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('purpose');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  
  const [additionalForm, setAdditionalForm] = useState({
    fieldName: '',
    fieldType: '',
    isShownInFilter: false,
    showInList: false,
    isRequired: false,
    connectWithPurpose: false,
  });

  const getData = () => {
    switch (activeTab) {
      case 'purpose': return purposeData;
      case 'status': return statusData;
      case 'source': return sourceData;
      case 'types': return typeData;
      case 'additional': return additionalFieldsData;
      default: return [];
    }
  };

  const filteredData = getData().filter(item => {
    const searchFields = activeTab === 'purpose' ? item.title :
                       activeTab === 'status' ? item.status :
                       activeTab === 'source' ? item.source :
                       activeTab === 'types' ? item.type :
                       activeTab === 'additional' ? item.field : '';
    return searchFields?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleAddClick = () => {
    setShowForm(true);
    setEditingItem(null);
    if (activeTab === 'status') {
      setFormData({ status: '', color: '#3b82f6' });
    } else if (activeTab === 'purpose') {
      setFormData({ title: '' });
    } else if (activeTab === 'source') {
      setFormData({ source: '' });
    } else if (activeTab === 'types') {
      setFormData({ type: '' });
    }
  };

  const handleEditClick = (item) => {
    setShowForm(true);
    setEditingItem(item);
    if (activeTab === 'status') {
      setFormData({ status: item.status, color: item.color });
    } else if (activeTab === 'purpose') {
      setFormData({ title: item.title });
    } else if (activeTab === 'source') {
      setFormData({ source: item.source });
    } else if (activeTab === 'types') {
      setFormData({ type: item.type });
    }
    setDropdownOpen(null);
  };

  const handleDeleteClick = (item) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  };

  const handleConfirmDelete = () => {
    console.log('Deleting:', deletingItem);
    setDeletingItem(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'purpose': return 'Lead Purpose';
      case 'status': return 'Lead Status';
      case 'source': return 'Lead Source';
      case 'types': return 'Lead Type';
      case 'additional': return 'Additional Fields';
      default: return '';
    }
  };

  const handleAdditionalFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAdditionalForm(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleAdditionalSubmit = (e) => {
    e.preventDefault();
    console.log('Additional field submitted:', additionalForm);
  };

  return (
    <div className="lead-settings-page">
      <PageHeader title="Lead Settings" description="Configure lead purposes, statuses, sources and types" />

      <div className="lead-settings-layout">
        <div className="settings-menu">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>

        <div className="settings-content">
          {activeTab !== 'additional' && (
            <>
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
                    <Plus size={16} /> 
                    {activeTab === 'purpose' ? 'Lead Purpose' : 
                     activeTab === 'status' ? 'Lead Status' : 
                     activeTab === 'source' ? 'Lead Source' : 'Lead Type'}
                  </button>
                </div>
              </div>

              <div className="table-container">
                <div className="table-scroll">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Sl No</th>
                        {activeTab === 'purpose' && <th>Purpose Title</th>}
                        {activeTab === 'status' && <th>Status</th>}
                        {activeTab === 'status' && <th>Color</th>}
                        {activeTab === 'source' && <th>Added By</th>}
                        {activeTab === 'source' && <th>Source</th>}
                        {activeTab === 'types' && <th>Added By</th>}
                        {activeTab === 'types' && <th>Lead Type</th>}
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.slice(0, rowsPerPage).map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          {activeTab === 'purpose' && <td>{item.title}</td>}
                          {activeTab === 'status' && <td>{item.status}</td>}
                          {activeTab === 'status' && (
                            <td>
                              <span 
                                className="color-pill" 
                                style={{ background: item.color }}
                              />
                            </td>
                          )}
                          {activeTab === 'source' && <td>{item.addedBy}</td>}
                          {activeTab === 'source' && (
                            <td className="truncate-cell" title={item.source}>
                              {item.source}
                            </td>
                          )}
                          {activeTab === 'types' && <td>{item.addedBy}</td>}
                          {activeTab === 'types' && <td>{item.type}</td>}
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
            </>
          )}

          {activeTab === 'additional' && (
            <div className="additional-fields-layout">
              <div className="additional-form-panel">
                <div className="card">
                  <div className="card-header">
                    <h5>Add Field</h5>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleAdditionalSubmit}>
                      <div className="checkbox-group">
                        <label className="checkbox-item">
                          <input 
                            type="checkbox" 
                            name="isShownInFilter"
                            checked={additionalForm.isShownInFilter}
                            onChange={handleAdditionalFormChange}
                          />
                          Is Shown in filter
                        </label>
                        <label className="checkbox-item">
                          <input 
                            type="checkbox" 
                            name="showInList"
                            checked={additionalForm.showInList}
                            onChange={handleAdditionalFormChange}
                          />
                          Show in list
                        </label>
                        <label className="checkbox-item">
                          <input 
                            type="checkbox" 
                            name="isRequired"
                            checked={additionalForm.isRequired}
                            onChange={handleAdditionalFormChange}
                          />
                          Is Required?
                        </label>
                        <label className="checkbox-item">
                          <input 
                            type="checkbox" 
                            name="connectWithPurpose"
                            checked={additionalForm.connectWithPurpose}
                            onChange={handleAdditionalFormChange}
                          />
                          Connect with lead purpose?
                        </label>
                      </div>
                      <div className="form-group">
                        <label>Field Name <span className="text-danger">*</span></label>
                        <input 
                          type="text" 
                          name="fieldName"
                          className="form-control"
                          placeholder="Enter field name"
                          value={additionalForm.fieldName}
                          onChange={handleAdditionalFormChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Select Type <span className="text-danger">*</span></label>
                        <select 
                          name="fieldType"
                          className="form-control"
                          value={additionalForm.fieldType}
                          onChange={handleAdditionalFormChange}
                        >
                          <option value="">Select Type</option>
                          <option value="text">Text</option>
                          <option value="number">Number</option>
                          <option value="date">Date</option>
                          <option value="datetime">DateTime</option>
                          <option value="dropdown">Dropdown</option>
                          <option value="checkbox">Checkbox</option>
                        </select>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        <Plus size={16} /> Add Field
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              <div className="additional-table-panel">
                <div className="table-container">
                  <div className="table-scroll">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Field</th>
                          <th>Type</th>
                          <th>in filter</th>
                          <th>in list</th>
                          <th>Required</th>
                          <th>Purpose</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {additionalFieldsData.map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.field}</td>
                            <td>{item.type}</td>
                            <td>
                              <span className={`badge ${item.inFilter ? 'badge-success' : 'badge-secondary'}`}>
                                {item.inFilter ? 'YES' : 'NO'}
                              </span>
                            </td>
                            <td>
                              <span className={`badge ${item.inList ? 'badge-success' : 'badge-secondary'}`}>
                                {item.inList ? 'YES' : 'NO'}
                              </span>
                            </td>
                            <td>
                              <span className={`badge ${item.required ? 'badge-success' : 'badge-secondary'}`}>
                                {item.required ? 'YES' : 'NO'}
                              </span>
                            </td>
                            <td>
                              <span className={`badge ${item.purpose ? 'badge-success' : 'badge-secondary'}`}>
                                {item.purpose ? 'YES' : 'NO'}
                              </span>
                            </td>
                            <td>
                              <div className="dropdown-container">
                                <button 
                                  className="dropdown-toggle"
                                  onClick={() => setDropdownOpen(dropdownOpen === `add_${item.id}` ? null : `add_${item.id}`)}
                                >
                                  <MoreHorizontal size={16} />
                                </button>
                                {dropdownOpen === `add_${item.id}` && (
                                  <div className="dropdown-menu">
                                    <a className="dropdown-item">
                                      <Edit2 size={14} /> Edit
                                    </a>
                                    <a className="dropdown-item">
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
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <div className="drawer-overlay" onClick={handleCloseForm}>
          <div className="drawer drawer-right" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h5>{editingItem ? `Edit ${getTitle()}` : `Add ${getTitle()}`}</h5>
              <button className="drawer-close" onClick={handleCloseForm}>
                <X size={20} />
              </button>
            </div>
            <div className="drawer-body">
              <form>
                {activeTab === 'purpose' && (
                  <div className="form-group">
                    <label>Purpose Title <span className="text-danger">*</span></label>
                    <input 
                      type="text" 
                      name="title"
                      className="form-control"
                      placeholder="Enter purpose title"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
                {activeTab === 'status' && (
                  <>
                    <div className="form-group">
                      <label>Status <span className="text-danger">*</span></label>
                      <input 
                        type="text" 
                        name="status"
                        className="form-control"
                        placeholder="Enter status"
                        value={formData.status}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Color</label>
                      <input 
                        type="color" 
                        name="color"
                        className="form-control color-input"
                        value={formData.color}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                )}
                {activeTab === 'source' && (
                  <div className="form-group">
                    <label>Source <span className="text-danger">*</span></label>
                    <input 
                      type="text" 
                      name="source"
                      className="form-control"
                      placeholder="Enter source"
                      value={formData.source}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
                {activeTab === 'types' && (
                  <div className="form-group">
                    <label>Lead Type <span className="text-danger">*</span></label>
                    <input 
                      type="text" 
                      name="type"
                      className="form-control"
                      placeholder="Enter lead type"
                      value={formData.type}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
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
              <p>Are you sure you want to delete this item?</p>
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

export default LeadSettingsPage;