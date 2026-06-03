import { Link } from 'react-router-dom';
import { Tag, Layers, Activity, Target } from 'lucide-react';
import { useLeadSourceData } from '../hooks/useLeadSourceData';
import AdminToolbar from '../../../shared/components/crud/AdminToolbar';
import AdminTable from '../../../shared/components/crud/AdminTable';
import AdminPagination from '../../../shared/components/crud/AdminPagination';
import AdminFormDrawer from '../../../shared/components/crud/AdminFormDrawer';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../shared/components/layout/PageHeader';
import './LeadSourcePage.css';
import { formFields, columns } from '../constants';

const LeadSourcePage = () => {
  const d = useLeadSourceData();

  return (
    <div className="lead-settings-page">
      <div className="settings-menu">
        <Link to="/leads/lead-types"><Tag size={16} /> Lead Types</Link>
        <Link to="/leads/lead-source"><Layers size={16} /> Lead Source</Link>
        <Link to="/leads/lead-status"><Activity size={16} /> Lead Status</Link>
        <Link to="/leads/lead-purpose"><Target size={16} /> Lead Purpose</Link>
      </div>
      <div className="settings-content">
        <PageHeader title="Lead Source" description="Manage lead source channels" />
        <div className="table-container">
          <AdminToolbar searchQuery={d.searchQuery} onSearchChange={d.setSearchQuery} onAdd={d.handleAdd} addLabel="Add Lead Source" />
          <AdminTable data={d.paginatedData} columns={columns} startIndex={d.startIndex}
            dropdownOpen={d.dropdownOpen} onToggleDropdown={d.setDropdownOpen}
            onEdit={d.handleEdit} onDelete={d.handleDeleteClick} />
          <AdminPagination currentPage={d.currentPage} totalPages={d.totalPages}
            startIndex={d.startIndex} rowsPerPage={d.rowsPerPage} totalItems={d.filteredData.length}
            onPageChange={d.setCurrentPage} onRowsPerPageChange={d.handleRowsPerPageChange}
            prevNextOnly />
        </div>
      </div>
      <AdminFormDrawer isOpen={d.showForm} title="Lead Source" fields={formFields}
        formData={d.formData} onChange={d.setFormData} onSave={d.handleSave} onClose={d.handleCloseForm}
        isEditing={!!d.editingItem} />
      <AdminDeleteModal isOpen={!!d.deletingItem}
        onConfirm={d.handleConfirmDelete} onClose={() => d.setDeletingItem(null)} />
    </div>
  );
};

export default LeadSourcePage;
