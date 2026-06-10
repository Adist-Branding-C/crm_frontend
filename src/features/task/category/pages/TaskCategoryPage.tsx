import { Link } from 'react-router-dom';
import { Phone, MessageSquare, Users, Tag } from 'lucide-react';
import { useTaskCategoryData } from '../hooks/useTaskCategoryData';
import AdminToolbar from '../../../../shared/components/crud/AdminToolbar';
import AdminTable from '../../../../shared/components/crud/AdminTable';
import AdminPagination from '../../../../shared/components/crud/AdminPagination';
import AdminFormDrawer from '../../../../shared/components/crud/AdminFormDrawer';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import { formFields, columns } from '../constants';
import './TaskCategoryPage.css';

const TaskCategoryPage = () => {
  const d = useTaskCategoryData();

  return (
    <div className="task-settings-page">
      <div className="settings-menu">
        <Link to="/user/call_status"><Phone size={16} /> Call Status</Link>
        <Link to="/user/reason"><MessageSquare size={16} /> Call Reasons</Link>
        <Link to="/user/meeting-outcome"><Users size={16} /> Meeting Outcome</Link>
        <Link to="/user/task-categories"><Tag size={16} /> Task Categories</Link>
      </div>
      <div className="settings-content">
        <PageHeader title="Task Categories" description="Manage task category options" />
        <div className="table-container">
          <AdminToolbar searchQuery={d.searchQuery} onSearchChange={d.setSearchQuery} onAdd={d.handleAdd} addLabel="Add Category" />
          <AdminTable data={d.paginatedData} columns={columns} startIndex={d.startIndex}
            dropdownOpen={d.dropdownOpen} onToggleDropdown={d.setDropdownOpen}
            onEdit={d.handleEdit} onDelete={d.handleDeleteClick} />
          <AdminPagination currentPage={d.currentPage} totalPages={d.totalPages}
            startIndex={d.startIndex} rowsPerPage={d.rowsPerPage} totalItems={d.filteredData.length}
            onPageChange={d.setCurrentPage} onRowsPerPageChange={d.handleRowsPerPageChange}
            prevNextOnly />
        </div>
      </div>
      <AdminFormDrawer isOpen={d.showForm} title="Task Category" fields={formFields}
        formData={d.formData} onChange={d.setFormData} onSave={d.handleSave} onClose={d.handleCloseForm}
        isEditing={!!d.editingItem} />
      <AdminDeleteModal isOpen={!!d.deletingItem} itemName={d.deletingItem?.name}
        onConfirm={d.handleConfirmDelete} onClose={() => d.setDeletingItem(null)} />
    </div>
  );
};

export default TaskCategoryPage;
