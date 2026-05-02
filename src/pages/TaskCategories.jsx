import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Edit2, Trash2, Plus, Search, X, Phone, MessageSquare, Users, Tag } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './TaskSettings.css';

const menuItems = [
  { id: 'call_status', label: 'Call Status', link: '/user/call_status', icon: Phone },
  { id: 'reason', label: 'Call Reasons', link: '/user/reason', icon: MessageSquare },
  { id: 'outcome', label: 'Meeting Outcome', link: '/user/meeting-outcome', icon: Users },
  { id: 'categories', label: 'Task Categories', link: '/user/task-categories', icon: Tag },
];

const initialData = [
  { id: 1, category: 'Meeting', action: 'Default' },
  { id: 2, category: 'Call', action: 'Default' },
  { id: 3, category: 'Sales', action: 'Default' },
];

const TaskCategoriesPage = () => {
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [formData, setFormData] = useState({ category: '', action: 'Default' });

  const filteredData = data.filter(item => 
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClick = () => {
    setShowForm(true);
    setEditingItem(null);
    setFormData({ category: '', action: 'Default' });
  };

  const handleEditClick = (item) => {
    setShowForm(true);
    setEditingItem(item);
    setFormData({ category: item.category, action: item.action });
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
    setFormData({ category: '', action: 'Default' });
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
    <div className="task-settings-page">
      <PageHeader title="Task Settings" description="Configure call status, reasons, meeting outcomes and task categories" />

      <div className="task-settings-layout">
        <div className="settings-menu">
          {menuItems.map(item => (
            <Link
              key={item.id}
              to={item.link}
              className={`menu-item ${item.id === 'categories' ? 'active' : ''}`}
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
                <Plus size={16} /> Task Categories
              </button>
            </div>
          </div>

          <div className="table-container">
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Task Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.slice(0, rowsPerPage).map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.category}</td>
                      <td>
                        <span className="action-link">{item.action}</span>
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
              <h5>{editingItem ? 'Edit Task Categories' : 'Add Task Categories'}</h5>
              <button className="drawer-close" onClick={handleCloseForm}>
                <X size={20} />
              </button>
            </div>
            <div className="drawer-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Task Category <span className="text-danger">*</span></label>
                  <input 
                    type="text" 
                    name="category"
                    className="form-control"
                    placeholder="Enter category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
              <p>Are you sure you want to delete <strong>{deletingItem.category}</strong>?</p>
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

export default TaskCategoriesPage;