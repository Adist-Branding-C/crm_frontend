import { Check, X } from 'lucide-react';
import { useDesignationPage } from '../hooks';
import AddDesignationDrawer from '../components/AddDesignationDrawer';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { SettingsTableLayout, SettingsStatusBadge } from '../../../../shared/components/settings';
import type { Column } from '../../../../shared/types/crud';
import type { DesignationItem } from '../types/designation.types';

const DesignationPage = () => {
  const {
    designation,
    searchQuery, handleSearchChange,
    rowsPerPage, handleRowsPerPageChange,
    pageNumber, setPageNumber,
    totalCount,
    showDrawer,
    dropdownOpen, onToggleDropdown,
    editingItem,
    deletingItem,
    filteredData,
    drawerInitialValues,
    handleAddClick,
    handleCloseDrawer,
    handleEditClick,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
    handleSubmit,
    handleEditSubmit,
  } = useDesignationPage();

  const startIndex = (pageNumber - 1) * rowsPerPage;
  const totalPages = Math.ceil(totalCount / rowsPerPage) || 1;

  const columns: Column<DesignationItem>[] = [
    { key: 'designationName', label: 'Designation', render: (item) => item.designationName || item.name || '-' },
    { key: 'description', label: 'Description' },
    { key: 'status', label: 'Status', render: (item) => <SettingsStatusBadge status={item.status} /> },
  ];

  return (
    <div className="account-page">
      <PageHeader title="Account Settings" description="Manage your login credentials, settings, and preferences" />
      <SettingsTabs />
      <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
        <SettingsTableLayout
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onAdd={handleAddClick}
          addLabel="Add Designation"
          data={filteredData}
          columns={columns}
          startIndex={startIndex}
          dropdownOpen={dropdownOpen}
          onToggleDropdown={onToggleDropdown}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          currentPage={pageNumber}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          totalItems={totalCount}
          onPageChange={setPageNumber}
          onRowsPerPageChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
        />
        <AddDesignationDrawer
          isOpen={showDrawer}
          onClose={handleCloseDrawer}
          validationSchema={editingItem ? designation.editValidationSchema : designation.validationSchema}
          initialValues={drawerInitialValues}
          onSubmit={editingItem ? handleEditSubmit : handleSubmit}
          isLoading={designation.isLoading}
          error={designation.error}
          isEditing={!!editingItem}
        />
        {!!deletingItem && !designation.dependencyError && (
          <AdminDeleteModal
            isOpen={!!deletingItem}
            itemName={deletingItem?.designationName || deletingItem?.name || ''}
            onConfirm={handleConfirmDelete}
            onClose={handleCloseDeleteModal}
          />
        )}
        {designation.dependencyError && (
          <div className="modal-overlay" onClick={designation.clearDependencyError}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '450px' }}>
              <div className="modal-header">
                <h5>Cannot Delete Designation</h5>
                <button className="modal-close" onClick={designation.clearDependencyError}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <p className="delete-warning">
                  This designation is currently assigned to one or more staff members. Please reassign or remove those staff members before deleting this designation.
                </p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={designation.clearDependencyError}>OK</button>
              </div>
            </div>
          </div>
        )}
        {designation.showToast && (
          <div className={`toast-notification toast-${designation.toastType}`} onClick={() => designation.setShowToast(false)}>
            {designation.toastType === 'success' ? <Check size={18} /> : <X size={18} />}
            <span>{designation.toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignationPage;
