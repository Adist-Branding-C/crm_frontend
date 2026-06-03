import { Link } from 'react-router-dom';
import { Tag, Layers, Activity, Target } from 'lucide-react';
import { useLeadStatusData } from '../hooks/useLeadStatusData';
import AdminToolbar from '../../../shared/components/crud/AdminToolbar';
import AdminTable from '../../../shared/components/crud/AdminTable';
import AdminPagination from '../../../shared/components/crud/AdminPagination';
import AdminFormDrawer from '../../../shared/components/crud/AdminFormDrawer';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../shared/components/layout/PageHeader';
import './LeadStatusPage.css';
import { formFields, columns } from '../constants';

const LeadStatusPage = () => {
  const d = useLeadStatusData();

  return (
    <div className="lead-settings-page">
      <div className="settings-menu">
        <Link to="/leads/lead-types"><Tag size={16} /> Lead Types</Link>
        <Link to="/leads/lead-source"><Layers size={16} /> Lead Source</Link>
        <Link to="/leads/lead-status"><Activity size={16} /> Lead Status</Link>
        <Link to="/leads/lead-purpose"><Target size={16} /> Lead Purpose</Link>
      </div>
      <div className="settings-content">
        <PageHeader title="Lead Status" description="Manage lead statuses and conversion metrics" />
        <div className="table-container">
          <AdminToolbar searchQuery={d.searchQuery} onSearchChange={d.setSearchQuery} onAdd={d.handleAdd} addLabel="Add Status" />
          <AdminTable data={d.paginatedData} columns={columns} startIndex={d.startIndex}
            dropdownOpen={d.dropdownOpen} onToggleDropdown={d.setDropdownOpen}
            onEdit={d.handleEdit} onDelete={d.handleDeleteClick} />
          <AdminPagination currentPage={d.currentPage} totalPages={d.totalPages}
            startIndex={d.startIndex} rowsPerPage={d.rowsPerPage} totalItems={d.filteredData.length}
            onPageChange={d.setCurrentPage} onRowsPerPageChange={d.handleRowsPerPageChange}
            prevNextOnly />
        </div>
      </div>
      <AdminFormDrawer isOpen={d.showForm} title="Status" fields={formFields}
        formData={d.formData} onChange={d.setFormData} onSave={d.handleSave} onClose={d.handleCloseForm}
        isEditing={!!d.editingItem} />
      <AdminDeleteModal isOpen={!!d.deletingItem} itemName={d.deletingItem?.status} itemType="status"
        onConfirm={d.handleConfirmDelete} onClose={() => d.setDeletingItem(null)} />
    </div>
  );
};

export default LeadStatusPage;
