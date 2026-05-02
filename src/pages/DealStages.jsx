import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Edit2, Trash2, Plus, Search, X, Tag, Layers, FileText } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './DealSettings.css';

const menuItems = [
  { id: 'types', label: 'Type', link: '/user/deal-types', icon: Tag },
  { id: 'stages', label: 'Status', link: '/user/deal-stages', icon: Layers },
  { id: 'additional', label: 'Additional Fields', link: '/user/additional-fields-deal', icon: FileText },
];

const initialData = [
  { id: 1, status: 'Deal Lost', stage: 'Lose', priority: 1 },
  { id: 2, status: 'Deal Win', stage: 'Win', priority: 2 },
  { id: 3, status: 'Final Stage', stage: 'In Progress', priority: 3 },
  { id: 4, status: 'In progress', stage: 'In Progress', priority: 4 },
  { id: 5, status: 'Invoice', stage: 'In Progress', priority: 5 },
  { id: 6, status: 'Create papers', stage: 'In Progress', priority: 6 },
  { id: 7, status: 'New', stage: 'In Progress', priority: 7 },
];

const DealStagesPage = () => {
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [formData, setFormData] = useState({
    status: '',
    stage: 'In Progress',
    priority: ''
  });

  const filteredData = data.filter(item => 
    item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClick = () => {
    setShowForm(true);
    setEditingItem(null);
    setFormData({ status: '', stage: 'In Progress', priority: '' });
  };

  const handleEditClick = (item) => {
    setShowForm(true);
    setEditingItem(item);
    setFormData({ status: item.status, stage: item.stage, priority: item.priority });
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
    setFormData({ status: '', stage: 'In Progress', priority: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      setData(prev => prev.map(item => 
        item.id === editingItem.id ? { ...item, ...formData } : item
      ));
    } else {
      setData(prev => [...prev, { id: Date.now(), ...formData }]);
    }
    handleCloseForm();
  };

  return (
    <div className="deal-settings-page">
      <PageHeader title="Deal Settings" description="Configure deal types, stages and custom fields" />

      <div className="deal-settings-layout">
        <div className="settings-menu">
          {menuItems.map(item => (
            <Link
              key={item.id}
              to={item.link}
              className={`menu-item ${item.id === 'stages' ? 'active' : ''}`}
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
                <Plus size={16} /> Deal Status
              </button>
            </div>
          </div>

          <div className="table-container">
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Deal Status</th>
                    <th>Deal Stage</th>
                    <th>Priority</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.slice(0, rowsPerPage).map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.status}</td>
                      <td>{item.stage}</td>
                      <td>{item.priority}</td>
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
              <h5>{editingItem ? 'Edit Deal Status' : 'Add Deal Status'}</h5>
              <button className="drawer-close" onClick={handleCloseForm}>
                <X size={20} />
              </button>
            </div>
            <div className="drawer-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Deal Status <span className="text-danger">*</span></label>
                  <input 
                    type="text" 
                    name="status"
                    className="form-control"
                    placeholder="Enter deal status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Deal Stage</label>
                  <select 
                    name="stage"
                    className="form-control"
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Win">Win</option>
                    <option value="Lose">Lose</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <input 
                    type="number" 
                    name="priority"
                    className="form-control"
                    placeholder="Enter priority"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  />
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

export default DealStagesPage;