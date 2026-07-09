import LeadSettingsSidebar from '../../components/LeadSettingsSidebar';
import { Loader2 } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import AdminToolbar from '../../../../shared/components/crud/AdminToolbar';
import AdminTable from '../../../../shared/components/crud/AdminTable';
import AdminPagination from '../../../../shared/components/crud/AdminPagination';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import AdminConfirmationModal from '../../../../shared/components/crud/AdminConfirmationModal';
import Toast from '../../../../shared/components/Toast';
import AdditionalFieldForm from '../components/AdditionalFieldForm';
import { useLeadAdditionalData } from '../hooks/useLeadAdditionalData';
import { columns } from '../constants';
import './LeadAdditionalPage.css';

const LeadAdditionalPage = () => {
  const d = useLeadAdditionalData();

  return (
    <div className="lead-settings-page">
      <PageHeader title="Lead Settings" description="Configure lead purposes, statuses, sources and types" />

      <LeadSettingsSidebar />

      <div className="settings-content">
        <div className="additional-fields-layout">
          <AdditionalFieldForm
            formData={d.formData}
            purposes={d.purposes}
            editingItem={d.editingItem}
            isSaving={d.isSaving}
            saveDisabled={d.editingItem ? !d.hasChanges : false}
            error={d.error}
            onClearError={d.clearError}
            onInputChange={d.handleInputChange}
            onSubmit={d.handleSubmit}
            onDropdownValueChange={d.handleDropdownValueChange}
            onAddDropdownValue={d.handleAddDropdownValue}
            onRemoveDropdownValue={d.handleRemoveDropdownValue}
          />

          <div className="additional-table-panel">
            <AdminToolbar
              searchQuery={d.searchQuery}
              onSearchChange={d.setSearchQuery}
              onAdd={d.handleAddClick}
              addLabel="Add Field"
              showAddButton={false}

            />
            {d.isLoading ? (
              <div className="table-loading">
                <Loader2 size={32} className="spin" />
                <p>Loading additional fields...</p>
              </div>
            ) : (
              <>
                <div className="table-container">
                  <AdminTable
                    data={d.paginatedData}
                    columns={columns}
                    startIndex={d.startIndex}
                    dropdownOpen={d.dropdownOpen}
                    onToggleDropdown={d.setDropdownOpen}
                    onEdit={d.handleEditClick}
                    onDelete={d.handleDeleteClick}
                  />
                </div>
                <AdminPagination
                  currentPage={d.currentPage}
                  totalPages={d.totalPages}
                  startIndex={d.startIndex}
                  rowsPerPage={d.rowsPerPage}
                  totalItems={d.totalItems}
                  onPageChange={d.setCurrentPage}
                  onRowsPerPageChange={d.handleRowsPerPageChange}
                  prevNextOnly
                  showRowsSelector={true}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <AdminConfirmationModal isOpen={d.showSaveConfirm}
        title={d.saveConfirmMode === 'create' ? 'Create Additional Field' : 'Update Additional Field'}
        message={d.saveConfirmMode === 'create' ? 'Are you sure you want to create this Additional Field?' : 'Are you sure you want to update this Additional Field?'}
        isLoading={d.isSaving}
        onConfirm={d.executeSave} onCancel={d.cancelSave} />
      <AdminDeleteModal
        isOpen={!!d.deletingItem}
        itemName={d.deletingItem?.field}
        itemType="additional field"
        onConfirm={d.handleConfirmDelete}
        onClose={() => d.setDeletingItem(null)}
      />
      <Toast message={d.toastMessage} type={d.toastType} isVisible={d.showToast} onClose={d.clearToast} />
    </div>
  );
};

export default LeadAdditionalPage;
