import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Edit2, Trash2, Search, X, Bell } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import './NotificationSettings.css';

const menuItems = [
  { id: 'configure', label: 'Configure Notification', link: '/user/notifications-users', icon: Bell },
];

const initialData = [
  { id: 1, type: 'Email', status: 'Active', config: { smtpHost: '', port: '', username: '', password: '', fromName: '' } },
  { id: 2, type: 'SMS', status: 'Inactive', config: { provider: '', apiKey: '', senderId: '' } },
  { id: 3, type: 'Telegram', status: 'Active', config: { botToken: '', chatId: '', webhookUrl: '' } },
];

const NotificationSettingsPage = () => {
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [configuringItem, setConfiguringItem] = useState(null);
  const [formData, setFormData] = useState({});

  const filteredData = data.filter(item => 
    item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfigClick = (item) => {
    setConfiguringItem(item);
    setFormData({ ...item.config });
    setShowConfigModal(true);
    setDropdownOpen(null);
  };

  const handleToggleStatus = (item) => {
    setData(prev => prev.map(d => 
      d.id === item.id ? { ...d, status: d.status === 'Active' ? 'Inactive' : 'Active' } : d
    ));
    setDropdownOpen(null);
  };

  const handleCloseModal = () => {
    setShowConfigModal(false);
    setConfiguringItem(null);
    setFormData({});
  };

  const handleSaveConfig = (e) => {
    e.preventDefault();
    setData(prev => prev.map(item => 
      item.id === configuringItem.id ? { ...item, config: { ...formData } } : item
    ));
    handleCloseModal();
  };

  const getConfigFields = (type) => {
    switch (type) {
      case 'Email':
        return (
          <>
            <div className="form-group">
              <label>SMTP Host</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="smtp.example.com"
                value={formData.smtpHost || ''}
                onChange={(e) => setFormData({ ...formData, smtpHost: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Port</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="587"
                value={formData.port || ''}
                onChange={(e) => setFormData({ ...formData, port: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="username"
                value={formData.username || ''}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                className="form-control"
                placeholder="password"
                value={formData.password || ''}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>From Name</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="Company Name"
                value={formData.fromName || ''}
                onChange={(e) => setFormData({ ...formData, fromName: e.target.value })}
              />
            </div>
          </>
        );
      case 'SMS':
        return (
          <>
            <div className="form-group">
              <label>Provider</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="Twilio / MSG91 / etc"
                value={formData.provider || ''}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>API Key</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="API Key"
                value={formData.apiKey || ''}
                onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Sender ID</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="SENDER"
                value={formData.senderId || ''}
                onChange={(e) => setFormData({ ...formData, senderId: e.target.value })}
              />
            </div>
          </>
        );
      case 'Telegram':
        return (
          <>
            <div className="form-group">
              <label>Bot Token</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="123456:ABC-DEF1234ghIkl-zyx57W2v"
                value={formData.botToken || ''}
                onChange={(e) => setFormData({ ...formData, botToken: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Chat ID</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="123456789"
                value={formData.chatId || ''}
                onChange={(e) => setFormData({ ...formData, chatId: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Webhook URL</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="https://your-webhook.com"
                value={formData.webhookUrl || ''}
                onChange={(e) => setFormData({ ...formData, webhookUrl: e.target.value })}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const isStatusActive = (status) => status.toLowerCase() === 'active';

  return (
    <div className="notification-settings-page">
      <PageHeader title="Notification Settings" description="Configure notification channels and preferences" />

      <div className="notification-settings-layout">
        <div className="settings-menu">
          {menuItems.map(item => (
            <Link
              key={item.id}
              to={item.link}
              className={`menu-item active`}
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
            </div>
          </div>

          <div className="table-container">
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.slice(0, rowsPerPage).map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.type}</td>
                      <td>
                        <span className={`status-badge ${isStatusActive(item.status) ? 'active' : 'inactive'}`}>
                          {item.status}
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
                              <a className="dropdown-item" onClick={() => handleConfigClick(item)}>
                                <Edit2 size={14} /> Configure
                              </a>
                              <a className="dropdown-item" onClick={() => handleToggleStatus(item)}>
                                {isStatusActive(item.status) ? 'Disable' : 'Enable'}
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

      {showConfigModal && configuringItem && (
        <div className="drawer-overlay" onClick={handleCloseModal}>
          <div className="drawer drawer-right" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h5>Configure {configuringItem.type}</h5>
              <button className="drawer-close" onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>
            <div className="drawer-body">
              <form onSubmit={handleSaveConfig}>
                {getConfigFields(configuringItem.type)}
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    Save Configuration
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSettingsPage;