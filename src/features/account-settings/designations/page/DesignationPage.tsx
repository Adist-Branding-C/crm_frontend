import { X } from 'lucide-react';
import { useDesignationPage } from '../hooks/useDesignationPage';
import DesignationsTable from '../components/DesignationsTable';
import AddDesignationDrawer from '../components/AddDesignationDrawer';
import DeleteDesignationDialog from '../components/DeleteDesignationDialog';
import ToastNotification from '../../../../shared/components/ToastNotification';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import './DesignationPage.css';

const DesignationPage = () => {
  const p = useDesignationPage();

  return (
    <div className="account-page">
      <PageHeader title="Account Settings" description="Manage your login credentials, settings, and preferences" />
      <SettingsTabs />
      <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
        <DesignationsTable
          data={p.data}
          searchQuery={p.searchQuery}
          onSearchChange={p.onSearchChange}
          rowsPerPage={p.rowsPerPage}
          onRowsPerPageChange={p.onRowsPerPageChange}
          totalRecords={p.totalRecords}
          currentPage={p.currentPage}
          totalPages={p.totalPages}
          onPageChange={p.onPageChange}
          dropdownOpen={p.dropdownOpen}
          onToggleDropdown={p.onToggleDropdown}
          onEdit={p.onEdit}
          onDelete={p.onDelete}
          onAdd={p.onAdd}
        />
        <AddDesignationDrawer
          isOpen={p.isOpen}
          onClose={p.onClose}
          validationSchema={p.validationSchema}
          initialValues={p.initialValues}
          onSubmit={p.onSubmit}
          isLoading={p.isLoading}
          error={p.error}
          isEditing={p.isEditing}
        />
        <DeleteDesignationDialog
          isOpen={!!p.deletingItem}
          itemName={p.itemName}
          onConfirm={p.onConfirmDelete}
          onClose={p.onCloseDelete}
        />
        {p.dependencyError && (
          <div className="modal-overlay" onClick={p.onCloseDependencyError}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '450px' }}>
              <div className="modal-header">
                <h5>Cannot Delete Designation</h5>
                <button className="modal-close" onClick={p.onCloseDependencyError}>
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <p className="delete-warning">
                  This designation is currently assigned to one or more staff members.
                </p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={p.onCloseDependencyError}>OK</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastNotification
        message={p.toastMessage}
        type={p.toastType}
        visible={p.showToast}
        onClose={p.onCloseToast}
      />
    </div>
  );
};

export default DesignationPage;
