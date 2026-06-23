import { useWorkModePage } from '../hooks';
import AddWorkModeDrawer from '../components/AddWorkModeDrawer';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { SettingsTableLayout, SettingsStatusBadge } from '../../../../shared/components/settings';
import type { Column } from '../../../../shared/types/crud';
import type { WorkModeItem } from '../types/workMode.types';

const WorkModePage = () => {
  const {
    workMode,
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
  } = useWorkModePage();

  const startIndex = (pageNumber - 1) * rowsPerPage;
  const totalPages = Math.ceil(totalCount / rowsPerPage) || 1;

  const columns: Column<WorkModeItem>[] = [
    { key: 'workModeName', label: 'Work Mode', render: (item) => item.workModeName || item.name || '-' },
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
          addLabel="Add Work Mode"
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
        <AddWorkModeDrawer
          isOpen={showDrawer}
          onClose={handleCloseDrawer}
          validationSchema={editingItem ? workMode.editValidationSchema : workMode.validationSchema}
          initialValues={drawerInitialValues}
          onSubmit={editingItem ? handleEditSubmit : handleSubmit}
          isLoading={workMode.isLoading}
          error={workMode.error}
          isEditing={!!editingItem}
        />
        <AdminDeleteModal
          isOpen={!!deletingItem}
          itemName={deletingItem?.workModeName || deletingItem?.name || ''}
          onConfirm={handleConfirmDelete}
          onClose={handleCloseDeleteModal}
        />
      </div>
    </div>
  );
};

export default WorkModePage;
