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

interface LeadSourceItem {
  id: number;
  addedBy: string;
  source: string;
}

const initialData: LeadSourceItem[] = [
  { id: 1, addedBy: 'You', source: 'TMU | Kerala | Lead | VD | Ad' },
  { id: 2, addedBy: 'You', source: 'PG ENG - 349000 Whatsapp' },
  { id: 3, addedBy: 'You', source: 'BSC Nursing | Bulgaria | V2' },
];

const LeadSourcePage = () => {
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<LeadSourceItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<LeadSourceItem | null>(null);
  const [formData, setFormData] = useState({ source: '' });

  const filteredData = data.filter(item =>
    item.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClick = () => {
    setShowForm(true);
    setEditingItem(null);
    setFormData({ source: '' });
  };

  const handleEditClick = (item: LeadSourceItem) => {
    setShowForm(true);
    setEditingItem(item);
    setFormData({ source: item.source });
    setDropdownOpen(null);
  };

  const handleDeleteClick = (item: LeadSourceItem) => {
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
    setFormData({ source: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setData(prev => prev.map(item =>
        item.id === editingItem.id ? { ...item, source: formData.source } : item
      ));
    } else {
      setData(prev => [...prev, { id: Date.now(), addedBy: 'You', source: formData.source }]);
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
                className={`menu-item ${item.id === 'source' ? 'active' : ''}`}
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
                <Plus size={16} /> Lead Source
              </button>
            </div>
          </div>

          <div className="table-container">
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Added By</th>
                    <th>Source</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.slice(0, rowsPerPage).map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.addedBy}</td>
                      <td className="truncate-cell" title={item.source}>
                        {item.source}
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
              <h5>{editingItem ? 'Edit Lead Source' : 'Add Lead Source'}</h5>
              <button className="drawer-close" onClick={handleCloseForm}>
                <X size={20} />
              </button>
            </div>
            <div className="drawer-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Source <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter source"
                    value={formData.source}
                    onChange={(e) => setFormData({ source: e.target.value })}
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
              <p>Are you sure you want to delete this source?</p>
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

export default LeadSourcePage;
