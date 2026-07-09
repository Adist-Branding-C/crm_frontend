import LeadSettingsSidebar from '../../components/LeadSettingsSidebar';
import { useLeadTypesData } from '../hooks/useLeadTypesData';
import AdminToolbar from '../../../../shared/components/crud/AdminToolbar';
import AdminTable from '../../../../shared/components/crud/AdminTable';
import AdminPagination from '../../../../shared/components/crud/AdminPagination';
import AdminFormDrawer from '../../../../shared/components/crud/AdminFormDrawer';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import AdminConfirmationModal from '../../../../shared/components/crud/AdminConfirmationModal';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import ValidationAlert from '../../../../shared/components/ValidationAlert';
import Toast from '../../../../shared/components/Toast';
import './LeadTypesPage.css';
import { formFields, columns } from '../constants';

const LeadTypesPage = () => {
  const d = useLeadTypesData();

  return (
    <div className="lead-settings-page">
      <PageHeader title="Lead Types" description="Define lead categories" />
      <LeadSettingsSidebar />
      <div className="settings-content">
          <div className="table-container">
          <AdminToolbar searchQuery={d.searchQuery} onSearchChange={d.setSearchQuery} onAdd={d.handleAdd} addLabel="Add Lead Type" />
          {d.error && !d.showForm && (
            <ValidationAlert message={d.error} onClose={d.clearError} />
          )}
          <AdminTable data={d.paginatedData} columns={columns} startIndex={d.startIndex}
            dropdownOpen={d.dropdownOpen} onToggleDropdown={d.setDropdownOpen}
            onEdit={d.handleEdit} onDelete={d.handleDeleteClick} />
          <AdminPagination currentPage={d.currentPage} totalPages={d.totalPages}
            startIndex={d.startIndex} rowsPerPage={d.rowsPerPage} totalItems={d.totalItems}
            onPageChange={d.setCurrentPage} onRowsPerPageChange={d.handleRowsPerPageChange}
            prevNextOnly showRowsSelector={true} />
          </div>
        </div>
      <AdminFormDrawer isOpen={d.showForm} title="Lead Type" fields={formFields}
        formData={d.formData} onChange={d.setFormData} onSave={d.handleSave} onClose={d.handleCloseForm}
        isEditing={!!d.editingItem} error={d.error} onClearError={d.clearError}
        isSaving={d.isSaving} saveDisabled={d.editingItem ? !d.hasChanges : false} />
      <AdminConfirmationModal isOpen={d.showSaveConfirm}
        title={d.saveConfirmMode === 'create' ? 'Create Lead Type' : 'Update Lead Type'}
        message={d.saveConfirmMode === 'create' ? 'Are you sure you want to create this Lead Type?' : 'Are you sure you want to update this Lead Type?'}
        isLoading={d.isSaving}
        onConfirm={d.executeSave} onCancel={d.cancelSave} />
      <AdminDeleteModal isOpen={!!d.deletingItem} itemName={d.deletingItem?.type} itemType="lead type"
        onConfirm={d.handleConfirmDelete} onClose={() => d.setDeletingItem(null)} />
      <Toast message={d.toastMessage} type={d.toastType} isVisible={d.showToast} onClose={d.clearToast} />
    </div>
  );
};

export default LeadTypesPage;
