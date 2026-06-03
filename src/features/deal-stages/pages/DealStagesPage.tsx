import { Link } from 'react-router-dom';
import { Tag, Layers, FileText } from 'lucide-react';
import { useDealStagesData } from '../hooks/useDealStagesData';
import AdminToolbar from '../../../shared/components/crud/AdminToolbar';
import AdminTable from '../../../shared/components/crud/AdminTable';
import AdminPagination from '../../../shared/components/crud/AdminPagination';
import AdminFormDrawer from '../../../shared/components/crud/AdminFormDrawer';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../shared/components/layout/PageHeader';
import './DealStagesPage.css';
import { formFields, columns } from '../constants';

const DealStagesPage = () => {
  const d = useDealStagesData();

  return (
    <div className="deal-settings-page">
      <div className="settings-menu">
        <Link to="/user/deal-types"><Tag size={16} /> Type</Link>
        <Link to="/user/deal-stages"><Layers size={16} /> Status</Link>
        <Link to="/user/additional-fields-deal"><FileText size={16} /> Additional Fields</Link>
      </div>
      <div className="settings-content">
        <PageHeader title="Deal Stages" description="Manage deal pipeline stages" />
        <div className="table-container">
          <AdminToolbar searchQuery={d.searchQuery} onSearchChange={d.setSearchQuery} onAdd={d.handleAdd} addLabel="Add Stage" />
          <AdminTable data={d.paginatedData} columns={columns} startIndex={d.startIndex}
            dropdownOpen={d.dropdownOpen} onToggleDropdown={d.setDropdownOpen}
            onEdit={d.handleEdit} onDelete={d.handleDeleteClick} />
          <AdminPagination currentPage={d.currentPage} totalPages={d.totalPages}
            startIndex={d.startIndex} rowsPerPage={d.rowsPerPage} totalItems={d.filteredData.length}
            onPageChange={d.setCurrentPage} onRowsPerPageChange={d.handleRowsPerPageChange}
            prevNextOnly />
        </div>
      </div>
      <AdminFormDrawer isOpen={d.showForm} title="Stage" fields={formFields}
        formData={d.formData} onChange={d.setFormData} onSave={d.handleSave} onClose={d.handleCloseForm}
        isEditing={!!d.editingItem} />
      <AdminDeleteModal isOpen={!!d.deletingItem} itemName={d.deletingItem?.status} itemType="stage"
        onConfirm={d.handleConfirmDelete} onClose={() => d.setDeletingItem(null)} />
    </div>
  );
};

export default DealStagesPage;
