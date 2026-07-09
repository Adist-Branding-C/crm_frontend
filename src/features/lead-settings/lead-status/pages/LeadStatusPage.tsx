import { Loader2 } from 'lucide-react';
import LeadSettingsSidebar from '../../components/LeadSettingsSidebar';
import { useLeadStatusData } from '../hooks/useLeadStatusData';
import AdminToolbar from '../../../../shared/components/crud/AdminToolbar';
import AdminTable from '../../../../shared/components/crud/AdminTable';
import AdminPagination from '../../../../shared/components/crud/AdminPagination';
import AdminFormDrawer from '../../../../shared/components/crud/AdminFormDrawer';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import AdminConfirmationModal from '../../../../shared/components/crud/AdminConfirmationModal';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import ValidationAlert from '../../../../shared/components/ValidationAlert';
import Toast from '../../../../shared/components/Toast';
import './LeadStatusPage.css';
import { formFields, columns } from '../constants';

const LeadStatusPage = () => {
  const d = useLeadStatusData();

  return (
    <div className="lead-settings-page">
      <PageHeader title="Lead Status" description="Manage lead statuses and conversion metrics" />
      <LeadSettingsSidebar />
      <div className="settings-content">
          <div className="table-container">
          <AdminToolbar searchQuery={d.searchQuery} onSearchChange={d.setSearchQuery} onAdd={d.handleAdd} addLabel="Add Status" />
          {d.error && !d.showForm && (
            <ValidationAlert message={d.error} onClose={d.clearError} />
          )}
          {d.isLoading ? (
            <div className="table-loading">
              <Loader2 size={32} className="spin" />
              <p>Loading lead statuses...</p>
            </div>
          ) : (
            <>
              <AdminTable data={d.paginatedData} columns={columns} startIndex={d.startIndex}
                dropdownOpen={d.dropdownOpen} onToggleDropdown={d.setDropdownOpen}
                onEdit={d.handleEdit} onDelete={d.handleDeleteClick} />
              <AdminPagination currentPage={d.currentPage} totalPages={d.totalPages}
                startIndex={d.startIndex} rowsPerPage={d.rowsPerPage} totalItems={d.totalItems}
                onPageChange={d.setCurrentPage} onRowsPerPageChange={d.handleRowsPerPageChange}
                prevNextOnly showRowsSelector={true} />
            </>
          )}
          </div>
        </div>
      <AdminFormDrawer isOpen={d.showForm} title="Status" fields={formFields}
        formData={d.formData} onChange={d.setFormData} onSave={d.handleSave} onClose={d.handleCloseForm}
        isEditing={!!d.editingItem} error={d.error} onClearError={d.clearError}
        isSaving={d.isSaving} saveDisabled={d.editingItem ? !d.hasChanges : false} />
      <AdminConfirmationModal isOpen={d.showSaveConfirm}
        title={d.saveConfirmMode === 'create' ? 'Create Status' : 'Update Status'}
        message={d.saveConfirmMode === 'create' ? 'Are you sure you want to create this Lead Status?' : 'Are you sure you want to update this Lead Status?'}
        isLoading={d.isSaving}
        onConfirm={d.executeSave} onCancel={d.cancelSave} />
      <AdminDeleteModal isOpen={!!d.deletingItem} itemName={d.deletingItem?.status} itemType="status"
        onConfirm={d.handleConfirmDelete} onClose={() => d.setDeletingItem(null)} />
      <Toast message={d.toastMessage} type={d.toastType} isVisible={d.showToast} onClose={d.clearToast} />
    </div>
  );
};

export default LeadStatusPage;
