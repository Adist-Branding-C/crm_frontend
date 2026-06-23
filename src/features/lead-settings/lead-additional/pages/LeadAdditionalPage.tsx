import LeadSettingsSidebar from '../../components/LeadSettingsSidebar';
import { Loader2 } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import AdminToolbar from '../../../../shared/components/crud/AdminToolbar';
import AdminTable from '../../../../shared/components/crud/AdminTable';
import AdminPagination from '../../../../shared/components/crud/AdminPagination';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
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
            error={d.error}
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
                />
              </>
            )}
          </div>
        </div>
      </div>

      <AdminDeleteModal
        isOpen={!!d.deletingItem}
        itemName={d.deletingItem?.field}
        itemType="additional field"
        onConfirm={d.handleConfirmDelete}
        onClose={() => d.setDeletingItem(null)}
      />
    </div>
  );
};

export default LeadAdditionalPage;
