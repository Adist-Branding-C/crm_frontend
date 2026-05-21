import { useState } from 'react';
import { MoreHorizontal, Edit2, Trash2, Plus, Search, X } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../shared/components/SettingsTabs';
import '../../../pages/Account.css';

interface BranchItem {
  id: number;
  name: string;
  createdBy: string;
  status: string;
}

const branchData: BranchItem[] = [
  { id: 1, name: 'Main Branch', createdBy: 'Admin', status: 'Active' },
];

const BranchPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<BranchItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<BranchItem | null>(null);
  const [formData, setFormData] = useState({ name: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const filteredData = branchData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setShowForm(true);
    setEditingItem(null);
    setFormData({ name: '' });
  };

  const handleEditClick = (item: BranchItem) => {
    setShowForm(true);
    setEditingItem(item);
    setFormData({ name: item.name });
    setDropdownOpen(null);
  };

  const handleDeleteClick = (item: BranchItem) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  };

  const handleConfirmDelete = () => {
    setDeletingItem(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData({ name: '' });
  };

  return (
    <div className="account-page">
      <div className="account-layout">
        <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
          <PageHeader
            title="Branch"
            description="Create and manage branches"
            action={
              <button className="btn btn-primary" onClick={handleAddClick}>
                <Plus size={16} /> Add Branch
              </button>
            }
          />

          <SettingsTabs />

          <div className="table-container">
            <div className="table-header-controls">
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
              <div className="search-input">
                <Search size={16} />
                <input
                  type="search"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Branch Name</th>
                    <th>Created By</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="dataTables_empty">
                        No data available in table
                      </td>
                    </tr>
                  ) : (
                    filteredData.slice(0, rowsPerPage).map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.createdBy}</td>
                        <td>{item.status}</td>
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
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="table-footer">
              <div className="table-info">
                {filteredData.length === 0
                  ? 'Showing 0 to 0 of 0 entries'
                  : `Showing 1 to ${Math.min(rowsPerPage, filteredData.length)} of ${filteredData.length} entries`
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="drawer-overlay" onClick={handleCloseForm}>
          <div className="drawer drawer-right" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h5>{editingItem ? 'Edit Branch' : 'Add Branch'}</h5>
              <button className="drawer-close" onClick={handleCloseForm}>
                <X size={20} />
              </button>
            </div>
            <div className="drawer-body">
              <form>
                <div className="form-group">
                  <label>Branch Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter branch name"
                    value={formData.name}
                    onChange={handleInputChange}
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
              <p className="delete-warning">
                Are you sure you want to delete <strong>{deletingItem.name}</strong>?
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-danger" onClick={handleConfirmDelete}>
                Confirm
              </button>
              <button className="btn btn-secondary" onClick={() => setDeletingItem(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchPage;
