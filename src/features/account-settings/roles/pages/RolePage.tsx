import { Check, X } from 'lucide-react';
import { useRolePage } from '../hooks';
import AddRoleDrawer from '../components/AddRoleDrawer';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { SettingsTableLayout } from '../../../../shared/components/settings';
import { ROLE_TABLE_COLUMNS } from '../constants/roleTableColumns';
import './RolePage.css';

const RolePage = () => {
  const {
    role,
    searchQuery, handleSearchChange,
    rowsPerPage, handleRowsPerPageChange,
    pageNumber, setPageNumber,
    totalCount,
    startIndex,
    totalPages,
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
  } = useRolePage();

  return (
    <div className="account-page">
      <PageHeader title="Account Settings" description="Manage your login credentials, settings, and preferences" />
      <SettingsTabs />
      <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
        <SettingsTableLayout
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onAdd={handleAddClick}
          addLabel="Add Role"
          data={filteredData}
          columns={ROLE_TABLE_COLUMNS}
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
          onRowsPerPageChange={handleRowsPerPageChange}
        />
        <AddRoleDrawer
          isOpen={showDrawer}
          onClose={handleCloseDrawer}
          validationSchema={editingItem ? role.editValidationSchema : role.validationSchema}
          initialValues={drawerInitialValues}
          onSubmit={editingItem ? handleEditSubmit : handleSubmit}
          isLoading={role.isLoading}
          error={role.error}
          isEditing={!!editingItem}
        />
        {!!deletingItem && !role.dependencyError && (
          <AdminDeleteModal
            isOpen={!!deletingItem}
            itemName={deletingItem?.roleName || deletingItem?.name || ''}
            onConfirm={handleConfirmDelete}
            onClose={handleCloseDeleteModal}
          />
        )}
        {role.dependencyError && (
          <div className="modal-overlay" onClick={role.clearDependencyError}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '450px' }}>
              <div className="modal-header">
                <h5>Cannot Delete Role</h5>
                <button className="modal-close" onClick={role.clearDependencyError}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <p className="delete-warning">
                  This role is currently assigned to one or more staff members. Please reassign or remove those staff members before deleting this role.
                </p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={role.clearDependencyError}>OK</button>
              </div>
            </div>
          </div>
        )}
        {role.showToast && (
          <div className={`toast-notification toast-${role.toastType}`} onClick={() => role.setShowToast(false)}>
            {role.toastType === 'success' ? <Check size={18} /> : <X size={18} />}
            <span>{role.toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RolePage;
