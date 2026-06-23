import LeadSettingsSidebar from '../../components/LeadSettingsSidebar';
import { useLeadTypesData } from '../hooks/useLeadTypesData';
import AdminToolbar from '../../../../shared/components/crud/AdminToolbar';
import AdminTable from '../../../../shared/components/crud/AdminTable';
import AdminPagination from '../../../../shared/components/crud/AdminPagination';
import AdminFormDrawer from '../../../../shared/components/crud/AdminFormDrawer';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../../shared/components/layout/PageHeader';
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
          <AdminTable data={d.paginatedData} columns={columns} startIndex={d.startIndex}
            dropdownOpen={d.dropdownOpen} onToggleDropdown={d.setDropdownOpen}
            onEdit={d.handleEdit} onDelete={d.handleDeleteClick} />
          <AdminPagination currentPage={d.currentPage} totalPages={d.totalPages}
            startIndex={d.startIndex} rowsPerPage={d.rowsPerPage} totalItems={d.totalItems}
            onPageChange={d.setCurrentPage} onRowsPerPageChange={d.handleRowsPerPageChange}
            prevNextOnly />
          </div>
        </div>
      <AdminFormDrawer isOpen={d.showForm} title="Lead Type" fields={formFields}
        formData={d.formData} onChange={d.setFormData} onSave={d.handleSave} onClose={d.handleCloseForm}
        isEditing={!!d.editingItem} />
      <AdminDeleteModal isOpen={!!d.deletingItem} itemName={d.deletingItem?.type} itemType="lead type"
        onConfirm={d.handleConfirmDelete} onClose={() => d.setDeletingItem(null)} />
    </div>
  );
};

export default LeadTypesPage;
