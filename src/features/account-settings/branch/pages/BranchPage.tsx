import { Check, X } from 'lucide-react';
import { useBranchPage } from '../hooks';
import AddBranchDrawer from '../components/AddBranchDrawer';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { SettingsTableLayout, SettingsStatusBadge } from '../../../../shared/components/settings';
import type { Column } from '../../../../shared/types/crud';
import type { BranchItem } from '../types/branch.types';

const BranchPage = () => {
  const {
    branch,
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
  } = useBranchPage();

  const startIndex = (pageNumber - 1) * rowsPerPage;
  const totalPages = Math.ceil(totalCount / rowsPerPage) || 1;

  const columns: Column<BranchItem>[] = [
    { key: 'branchName', label: 'Branch Name', render: (item) => item.name || item.branchName || '-' },
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
          addLabel="Add Branch"
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
        <AddBranchDrawer
          isOpen={showDrawer}
          onClose={handleCloseDrawer}
          validationSchema={editingItem ? branch.editValidationSchema : branch.validationSchema}
          initialValues={drawerInitialValues}
          onSubmit={editingItem ? handleEditSubmit : handleSubmit}
          isLoading={branch.isLoading}
          error={branch.error}
          isEditing={!!editingItem}
        />
        <AdminDeleteModal
          isOpen={!!deletingItem}
          itemName={deletingItem?.name || deletingItem?.branchName || ''}
          onConfirm={handleConfirmDelete}
          onClose={handleCloseDeleteModal}
        />
        {branch.showToast && (
          <div className={`toast-notification toast-${branch.toastType}`} onClick={() => branch.setShowToast(false)}>
            {branch.toastType === 'success' ? <Check size={18} /> : <X size={18} />}
            <span>{branch.toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BranchPage;
