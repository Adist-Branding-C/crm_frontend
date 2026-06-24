import { useState } from 'react';
import { X } from 'lucide-react';

import './MailConfigurationPage.css';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { SettingsTableLayout, SettingsStatusBadge } from '../../../../shared/components/settings';
import { MAIL_DRIVER_OPTIONS, ENCRYPTION_OPTIONS } from '../constants';
import { useMailConfigData } from '../hooks/useMailConfigData';
import type { Column } from '../../../../shared/types/crud';
import type { MailConfigItem } from '../types';

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

  const [pageNumber, setPageNumber] = useState(1);

  const startIndex = (pageNumber - 1) * rowsPerPage;
  const totalPages = Math.ceil(filteredData.length / rowsPerPage) || 1;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCloseForm();
  };

  const columns: Column<MailConfigItem>[] = [
    { key: 'driver', label: 'Driver/Host', render: (item) => `${item.driver}${item.host ? ` / ${item.host}` : ''}` },
    { key: 'port', label: 'Port/Encryption', render: (item) => `${item.port}/${item.encryption}` },
    { key: 'auth', label: 'Authentication' },
    { key: 'active', label: 'Active', render: (item) => <SettingsStatusBadge status={item.active ? 'Active' : 'Inactive'} /> },
  ];

  return (
    <div className="account-page">
      <PageHeader
        title="Mail Configuration"
        description="Configure email settings"
      />

      <SettingsTabs />

      <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
        <SettingsTableLayout
          searchQuery={searchQuery}
          onSearchChange={(v) => setSearchQuery(v)}
          onAdd={handleAddClick}
          addLabel="Add Config"
          data={paginatedData}
          columns={columns}
          startIndex={startIndex}
          dropdownOpen={dropdownOpen}
          onToggleDropdown={setDropdownOpen}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          currentPage={pageNumber}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          totalItems={filteredData.length}
          onPageChange={setPageNumber}
          onRowsPerPageChange={(e) => setRowsPerPage(Number(e.target.value))}
        />
      </div>

      <AdminDeleteModal
        isOpen={!!deletingItem}
        itemName={deletingItem?.driver || ''}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeletingItem(null)}
      />

      {showForm && (
        <div className="drawer-overlay" onClick={handleCloseForm}>
          <div className="drawer drawer-right" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <div className="drawer-header">
              <h5>{editingItem ? 'Edit Mail Config' : 'Add Mail Config'}</h5>
              <button className="drawer-close" onClick={handleCloseForm}>
                <X size={20} />
              </button>
            </div>
            <div className="drawer-body">
              <form onSubmit={handleFormSubmit}>
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
    </div>
  );
};

export default MailConfigPage;
