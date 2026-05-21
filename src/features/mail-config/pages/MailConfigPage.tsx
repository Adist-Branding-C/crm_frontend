import { useState } from 'react';
import { MoreHorizontal, Edit2, Trash2, Plus, Search, X } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../shared/components/SettingsTabs';
import '../../../pages/Account.css';

interface MailConfigItem {
  id: number;
  driver: string;
  host?: string;
  port: number;
  encryption: string;
  username?: string;
  password?: string;
  fromEmail?: string;
  fromName?: string;
  auth: string;
  active: boolean;
}

const mailConfigData: MailConfigItem[] = [
  { id: 1, driver: 'SMTP', port: 587, encryption: 'TLS', auth: 'Yes', active: true },
];

const MailConfigPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MailConfigItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<MailConfigItem | null>(null);
  const [formData, setFormData] = useState({
    driver: '', host: '', port: '', encryption: '',
    username: '', password: '', fromEmail: '', fromName: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const filteredData = mailConfigData.filter(item =>
    item.driver.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setShowForm(true);
    setEditingItem(null);
    setFormData({ driver: '', host: '', port: '', encryption: '', username: '', password: '', fromEmail: '', fromName: '' });
  };

  const handleEditClick = (item: MailConfigItem) => {
    setShowForm(true);
    setEditingItem(item);
    setFormData({
      driver: item.driver,
      host: item.host || '',
      port: String(item.port),
      encryption: item.encryption,
      username: item.username || '',
      password: item.password || '',
      fromEmail: item.fromEmail || '',
      fromName: item.fromName || '',
    });
    setDropdownOpen(null);
  };

  const handleDeleteClick = (item: MailConfigItem) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  };

  const handleConfirmDelete = () => {
    setDeletingItem(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

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
                    <option value="smtp">SMTP</option>
                    <option value="sendmail">Sendmail</option>
                    <option value="mailgun">Mailgun</option>
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
                    <option value="tls">TLS</option>
                    <option value="ssl">SSL</option>
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
