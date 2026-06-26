import { useState } from 'react';
import { Check, X } from 'lucide-react';

import './MailConfigurationPage.css';
import AddMailConfigurationDrawer from '../components/AddMailConfigurationDrawer';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { SettingsTableLayout, SettingsStatusBadge } from '../../../../shared/components/settings';
import { useMailConfigurationPage } from '../hooks/useMailConfigurationPage';
import type { Column } from '../../../../shared/types/crud';
import type { MailConfigItem } from '../types';

const MailConfigurationPage = () => {
  const {
    mailConfig,
    mailConfigData,
    showDrawer,
    editingItem,
    drawerInitialValues,
    handleAddClick,
    handleEditClick,
    handleDeleteClick,
    handleCloseDrawer,
    handleSubmit,
    handleEditSubmit,
    handleConfirmDelete,
    handleCloseDeleteModal,
    searchQuery, setSearchQuery,
    rowsPerPage, setRowsPerPage,
    dropdownOpen, setDropdownOpen,
    filteredData,
    deletingItem,
  } = useMailConfigurationPage();

  const [pageNumber, setPageNumber] = useState(1);

  const startIndex = (pageNumber - 1) * rowsPerPage;
  const totalPages = Math.ceil(filteredData.length / rowsPerPage) || 1;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

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

      <AddMailConfigurationDrawer
        isOpen={showDrawer}
        onClose={handleCloseDrawer}
        validationSchema={editingItem ? mailConfig.editValidationSchema : mailConfig.validationSchema}
        initialValues={drawerInitialValues}
        onSubmit={editingItem ? handleEditSubmit : handleSubmit}
        isLoading={mailConfig.isLoading}
        error={mailConfig.error}
        isEditing={!!editingItem}
      />

      <AdminDeleteModal
        isOpen={!!deletingItem}
        itemName={deletingItem?.driver || ''}
        onConfirm={handleConfirmDelete}
        onClose={handleCloseDeleteModal}
      />

      {mailConfig.showToast && (
        <div className={`toast-notification toast-${mailConfig.toastType}`} onClick={() => mailConfig.setShowToast(false)}>
          {mailConfig.toastType === 'success' ? <Check size={18} /> : <X size={18} />}
          <span>{mailConfig.toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default MailConfigurationPage;
