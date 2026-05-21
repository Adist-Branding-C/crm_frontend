import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Edit2, Trash2, Plus, Search, X, FileText, Tag, Globe, Layers } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import '../../../pages/LeadSettings.css';

const menuItems = [
  { id: 'purpose', label: 'Purpose', link: '/settings/lead-settings/purpose', icon: FileText },
  { id: 'status', label: 'Status', link: '/settings/lead-settings/status', icon: Tag },
  { id: 'source', label: 'Source', link: '/settings/lead-settings/source', icon: Globe },
  { id: 'types', label: 'Types', link: '/settings/lead-settings/types', icon: Layers },
  { id: 'additional', label: 'Additional Fields', link: '/settings/lead-settings/additional', icon: FileText },
];

interface LeadItem {
  id: number;
  title: string;
}

const initialData: LeadItem[] = [
  { id: 1, title: '12th Pass' },
  { id: 2, title: '12th Grade' },
  { id: 3, title: 'MBBS' },
  { id: 4, title: 'bachelor' },
  { id: 5, title: 'HOT' },
  { id: 6, title: 'WARM' },
];

const LeadPurposePage = () => {
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<LeadItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<LeadItem | null>(null);
  const [formData, setFormData] = useState({ title: '' });

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClick = () => {
    setShowForm(true);
    setEditingItem(null);
    setFormData({ title: '' });
  };

  const handleEditClick = (item: LeadItem) => {
    setShowForm(true);
    setEditingItem(item);
    setFormData({ title: item.title });
    setDropdownOpen(null);
  };

  const handleDeleteClick = (item: LeadItem) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  };

  const handleConfirmDelete = () => {
    setData(prev => prev.filter(item => item.id !== deletingItem!.id));
    setDeletingItem(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData({ title: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setData(prev => prev.map(item =>
        item.id === editingItem.id ? { ...item, title: formData.title } : item
      ));
    } else {
      setData(prev => [...prev, { id: Date.now(), title: formData.title }]);
    }
    handleCloseForm();
  };

  return (
    <div className="lead-settings-page">
      <PageHeader title="Lead Settings" description="Configure lead purposes, statuses, sources and types" />

      <div className="lead-settings-layout">
        <div className="settings-menu">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.link}
                className={`menu-item ${item.id === 'purpose' ? 'active' : ''}`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
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
                <Plus size={16} /> Lead Purpose
              </button>
            </div>
          </div>

          <div className="table-container">
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Purpose Title</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.slice(0, rowsPerPage).map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
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
              <h5>{editingItem ? 'Edit Lead Purpose' : 'Add Lead Purpose'}</h5>
              <button className="drawer-close" onClick={handleCloseForm}>
                <X size={20} />
              </button>
            </div>
            <div className="drawer-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Purpose Title <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Enter purpose title"
                    value={formData.title}
                    onChange={(e) => setFormData({ title: e.target.value })}
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
              <p>Are you sure you want to delete <strong>{deletingItem.title}</strong>?</p>
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

export default LeadPurposePage;
