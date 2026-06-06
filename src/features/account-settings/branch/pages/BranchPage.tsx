import { Plus } from 'lucide-react';
import { useBranchPage } from '../hooks';
import AddBranchDrawer from '../components/AddBranchDrawer';
import DeleteBranchModal from '../components/DeleteBranchModal';
import BranchTable from '../components/BranchTable';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import './BranchPage.css';

const BranchPage = () => {
  const {
    branch,
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
  } = useBranchPage();

  return (
    <div className="account-page">
      <div className="account-layout">
        <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
          <PageHeader title="Account Settings" description="Manage your login credentials, settings, and preferences" />
          <SettingsTabs />
          <div className="task-panel">
            <span className="usage-quote">
              <span className="usage-count">{totalRecords}</span> / <span className="usage-total">{totalRecords}</span> Branches
            </span>
            <div className="task-nav">
              <button className="btn btn-primary" onClick={handleAddClick}>
                <Plus size={16} /> Add Branch
              </button>
            </div>
          </div>
          <div className="branch-table-wrapper">
            <BranchTable
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
          <DeleteBranchModal
            isOpen={!!deletingItem}
            itemName={deletingItem?.name || deletingItem?.branchName || ''}
            onConfirm={handleConfirmDelete}
            onClose={handleCloseDeleteModal}
          />
        </div>
      </div>
    </div>
  );
};

export default BranchPage;
