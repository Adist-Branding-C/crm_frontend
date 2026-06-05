import { Plus } from 'lucide-react';
import { useBranch, useBranchDrawer, useBranchDropdown, useBranchFilters, useBranchActions } from '../hooks';
import AddBranchDrawer from '../components/AddBranchDrawer';
import DeleteBranchModal from '../components/DeleteBranchModal';
import BranchTable from '../components/BranchTable';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import './BranchPage.css';

const BranchPage = () => {
  const agent = useBranch();
  const drawer = useBranchDrawer();
  const dropdown = useBranchDropdown();
  const filters = useBranchFilters(agent.branchList);
  const actions = useBranchActions({ agent, drawer });

  return (
    <div className="account-page">
      <div className="account-layout">
        <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
          <PageHeader title="Account Settings" description="Manage your login credentials, settings, and preferences" />
          <SettingsTabs />
          <div className="task-panel">
            <span className="usage-quote">
              <span className="usage-count">{filters.totalRecords}</span> / <span className="usage-total">{filters.totalRecords}</span> Branches
            </span>
            <div className="task-nav">
              <button className="btn btn-primary" onClick={drawer.openAddDrawer}>
                <Plus size={16} /> Add Branch
              </button>
            </div>
          </div>
          <div className="branch-table-wrapper">
            <BranchTable
              data={filters.filteredData.slice(0, filters.rowsPerPage)}
              searchQuery={filters.searchQuery}
              onSearchChange={filters.setSearchQuery}
              rowsPerPage={filters.rowsPerPage}
              onRowsPerPageChange={filters.setRowsPerPage}
              totalRecords={filters.totalRecords}
              dropdownOpen={dropdown.dropdownOpen}
              onToggleDropdown={dropdown.toggleDropdown}
              onEdit={(item) => { drawer.openEditDrawer(item); dropdown.closeDropdown(); }}
              onDelete={(item) => { actions.handleDeleteClick(item); dropdown.closeDropdown(); }}
            />
          </div>
          <AddBranchDrawer
            isOpen={drawer.showDrawer}
            onClose={drawer.closeDrawer}
            validationSchema={agent.validationSchema}
            initialValues={drawer.drawerInitialValues}
            onSubmit={drawer.editingItem ? actions.handleEditSubmit : actions.handleSubmit}
            isLoading={agent.isLoading}
            error={agent.error}
            isEditing={!!drawer.editingItem}
          />
          <DeleteBranchModal
            isOpen={!!actions.deletingItem}
            itemName={actions.deletingItem?.name || actions.deletingItem?.branchName || ''}
            onConfirm={actions.handleConfirmDelete}
            onClose={actions.closeDeleteModal}
          />
        </div>
      </div>
    </div>
  );
};

export default BranchPage;
