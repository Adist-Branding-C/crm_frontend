import { Plus } from 'lucide-react';
import { useDepartmentPage } from '../hooks/useDepartmentPage';
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
    showDrawer,
    dropdownOpen, setDropdownOpen,
    editingItem,
    deletingItem,
    rowsPerPage, setRowsPerPage,
    filteredData,
    handleAddClick,
    handleCloseDrawer,
    handleEditClick,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseDeleteModal,
    handleSubmit,
    handleEditSubmit,
    drawerInitialValues,
  } = useDepartmentPage();

  return (
    <div className="account-page">
      <div className="account-layout">
        <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
          <PageHeader title="Account Settings" description="Manage your login credentials, settings, and preferences" />
          <SettingsTabs />
          <div className="task-panel">
            <span className="usage-quote">
              <span className="usage-count">{filteredData.length}</span> / <span className="usage-total">{filteredData.length}</span> Departments
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
              totalRecords={filteredData.length}
              dropdownOpen={dropdownOpen}
              onToggleDropdown={setDropdownOpen}
              onEdit={(item) => { handleEditClick(item); setDropdownOpen(null); }}
              onDelete={(item) => { handleDeleteClick(item); setDropdownOpen(null); }}
            />
          </div>
          <AddDepartmentDrawer
            isOpen={showDrawer}
            onClose={handleCloseDrawer}
            validationSchema={department.validationSchema}
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
