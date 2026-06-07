import { Plus } from 'lucide-react';
import { useDepartmentPage } from '../hooks';
import AddDepartmentDrawer from '../components/AddDepartmentDrawer';
import DeleteDepartmentModal from '../components/DeleteDepartmentModal';
import DepartmentTable from '../components/DepartmentTable';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import './DepartmentPage.css';

const DepartmentPage = () => {
  const {
    department,
    searchQuery, setSearchQuery,
    rowsPerPage, setRowsPerPage,
    showDrawer,
    dropdownOpen, onToggleDropdown,
    editingItem,
    deletingItem,
    filteredData,
    totalRecords,
    drawerInitialValues,
    handleAddClick,
    handleCloseDrawer,
    handleEditClick,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
    handleSubmit,
    handleEditSubmit,
  } = useDepartmentPage();

  return (
    <div className="account-page">
      <div className="account-layout">
        <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
          <PageHeader title="Account Settings" description="Manage your login credentials, settings, and preferences" />
          <SettingsTabs />
          <div className="task-panel">
            <span className="usage-quote">
              <span className="usage-count">{totalRecords}</span> / <span className="usage-total">{totalRecords}</span> Departments
            </span>
            <div className="task-nav">
              <button className="btn btn-primary" onClick={handleAddClick}>
                <Plus size={16} /> Add Department
              </button>
            </div>
          </div>
          <div className="department-table-wrapper">
            <DepartmentTable
              data={filteredData.slice(0, rowsPerPage)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={setRowsPerPage}
              totalRecords={totalRecords}
              dropdownOpen={dropdownOpen}
              onToggleDropdown={onToggleDropdown}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </div>
          <AddDepartmentDrawer
            isOpen={showDrawer}
            onClose={handleCloseDrawer}
            validationSchema={editingItem ? department.editValidationSchema : department.validationSchema}
            initialValues={drawerInitialValues}
            onSubmit={editingItem ? handleEditSubmit : handleSubmit}
            isLoading={department.isLoading}
            error={department.error}
            isEditing={!!editingItem}
          />
          <DeleteDepartmentModal
            isOpen={!!deletingItem}
            itemName={deletingItem?.departmentName || deletingItem?.name || ''}
            onConfirm={handleConfirmDelete}
            onClose={handleCloseDeleteModal}
          />
        </div>
      </div>
    </div>
  );
};

export default DepartmentPage;
