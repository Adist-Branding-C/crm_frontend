import { MoreHorizontal, Edit2, Trash2, Plus, Search, X } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../shared/components/SettingsTabs';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../shared/constants/pagination';
import { ACTION_SEARCH } from '../../../shared/constants/actionLabels';
import { MAIL_DRIVER_OPTIONS, ENCRYPTION_OPTIONS } from '../constants';
import { useMailConfigData } from '../hooks/useMailConfigData';
import './MailConfigPage.css';

const MailConfigPage = () => {
  const {
    showForm,
    editingItem,
    deletingItem,
    setDeletingItem,
    formData,
    searchQuery,
    setSearchQuery,
    rowsPerPage,
    setRowsPerPage,
    dropdownOpen,
    setDropdownOpen,
    filteredData,
    handleInputChange,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseForm,
  } = useMailConfigData();

  return (
    <div className="account-page">
      <div className="account-layout">
        <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
          <PageHeader
            title="Mail Configuration"
            description="Configure email settings"
            action={
              <button className="btn btn-primary" onClick={handleAddClick}>
                <Plus size={16} /> Add Config
              </button>
            }
          />

          <SettingsTabs />

          <div className="table-container">
            <div className="table-header-controls">
              <div className="entries-select">
                <label>Show
                  <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
                    {ROWS_OPTIONS_10_25_50_100.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                  entries
                </label>
              </div>
              <div className="search-input">
                <Search size={16} />
                <input
                  type="search"
                  placeholder={ACTION_SEARCH}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Driver/Host</th>
                    <th>Port/Encryption</th>
                    <th>Authentication</th>
                    <th>Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="dataTables_empty">
                        No data available in table
                      </td>
                    </tr>
                  ) : (
                    filteredData.slice(0, rowsPerPage).map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.driver}</td>
                        <td>{item.port}/{item.encryption}</td>
                        <td>{item.auth}</td>
                        <td>{item.active ? 'Yes' : 'No'}</td>
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
              <h5>{editingItem ? 'Edit Mail Config' : 'Add Mail Config'}</h5>
              <button className="drawer-close" onClick={handleCloseForm}>
                <X size={20} />
              </button>
            </div>
            <div className="drawer-body">
              <form>
                <div className="form-group">
                  <label>Mail Driver <span className="text-danger">*</span></label>
                  <select name="driver" className="form-control" value={formData.driver} onChange={handleInputChange}>
                    <option value="">Select Driver</option>
                    {MAIL_DRIVER_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Host</label>
                  <input type="text" name="host" className="form-control" placeholder="mail.example.com" value={formData.host} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Port</label>
                  <input type="text" name="port" className="form-control" placeholder="587" value={formData.port} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Encryption</label>
                  <select name="encryption" className="form-control" value={formData.encryption} onChange={handleInputChange}>
                    <option value="">Select</option>
                    {ENCRYPTION_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" name="username" className="form-control" placeholder="username" value={formData.username} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" name="password" className="form-control" placeholder="password" value={formData.password} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>From Email</label>
                  <input type="email" name="fromEmail" className="form-control" placeholder="noreply@example.com" value={formData.fromEmail} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>From Name</label>
                  <input type="text" name="fromName" className="form-control" placeholder="Company Name" value={formData.fromName} onChange={handleInputChange} />
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
                Are you sure you want to delete this mail configuration?
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

export default MailConfigPage;
