import { useDepartmentPage } from '../hooks';
import AddDepartmentDrawer from '../components/AddDepartmentDrawer';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { SettingsTableLayout, SettingsStatusBadge } from '../../../../shared/components/settings';
import type { Column } from '../../../../shared/types/crud';
import type { DepartmentItem } from '../types/department.types';

const DepartmentPage = () => {
  const {
    department,
    searchQuery, handleSearchChange,
    rowsPerPage, handleRowsPerPageChange,
    pageNumber, setPageNumber,
    totalCount,
    showDrawer,
    dropdownOpen, onToggleDropdown,
    editingItem,
    deletingItem,
    filteredData,
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

  const startIndex = (pageNumber - 1) * rowsPerPage;
  const totalPages = Math.ceil(totalCount / rowsPerPage) || 1;

  const columns: Column<DepartmentItem>[] = [
    { key: 'departmentName', label: 'Department Name', render: (item) => item.departmentName || item.name || '-' },
    { key: 'description', label: 'Description' },
    { key: 'status', label: 'Status', render: (item) => <SettingsStatusBadge status={item.status} /> },
  ];

  return (
    <div className="account-page">
      <PageHeader title="Account Settings" description="Manage your login credentials, settings, and preferences" />
      <SettingsTabs />
      <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
        <SettingsTableLayout
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onAdd={handleAddClick}
          addLabel="Add Department"
          data={filteredData}
          columns={columns}
          startIndex={startIndex}
          dropdownOpen={dropdownOpen}
          onToggleDropdown={onToggleDropdown}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          currentPage={pageNumber}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          totalItems={totalCount}
          onPageChange={setPageNumber}
          onRowsPerPageChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
        />
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
        <AdminDeleteModal
          isOpen={!!deletingItem}
          itemName={deletingItem?.departmentName || deletingItem?.name || ''}
          onConfirm={handleConfirmDelete}
          onClose={handleCloseDeleteModal}
        />
      </div>
    </div>
  );
};

export default DepartmentPage;
