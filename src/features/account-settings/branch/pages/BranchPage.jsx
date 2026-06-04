import { useState, useMemo, useCallback } from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { useBranch } from '../hooks/useBranch';
import AddBranchDrawer from '../components/AddBranchDrawer';
import DeleteBranchModal from '../components/DeleteBranchModal';
import BranchTable from '../components/BranchTable';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../../shared/constants/pagination';
import './BranchPage.css';

const BranchPage = () => {
  const branch = useBranch();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDrawer, setShowDrawer] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deletingItem, setDeletingItem] = useState(null);

  const filteredData = useMemo(
    () => branch.branchList.filter(item =>
      (item.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [branch.branchList, searchQuery]
  );

  const handleCloseDrawer = useCallback(() => {
    setShowDrawer(false);
    setEditingItem(null);
  }, []);

  const handleAddClick = useCallback(() => {
    setEditingItem(null);
    setShowDrawer(true);
  }, []);

  const handleSubmit = useCallback(async (values, helpers) => {
    const success = await branch.handleAddBranch(values, helpers);
    if (success) {
      handleCloseDrawer();
    }
  }, [branch.handleAddBranch, handleCloseDrawer]);

  const handleEditClick = useCallback((item) => {
    setEditingItem(item);
    setShowDrawer(true);
    setDropdownOpen(null);
  }, []);

  const handleDeleteClick = useCallback((item) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    const success = await branch.handleDeleteBranch(deletingItem.id);
    if (success) {
      setDeletingItem(null);
    }
  }, [deletingItem, branch.handleDeleteBranch]);

  const handleCloseDeleteModal = useCallback(() => {
    setDeletingItem(null);
  }, []);

  const drawerInitialValues = useMemo(
    () => editingItem
      ? { name: editingItem.name || editingItem.branchName || '', description: editingItem.description || '', status: editingItem.status || '' }
      : branch.initialValues,
    [editingItem, branch.initialValues]
  );

  const handleEditSubmit = useCallback(async (values, helpers) => {
    if (!editingItem) return;
    const success = await branch.handleUpdateBranch(editingItem.id, values, helpers);
    if (success) {
      handleCloseDrawer();
    }
  }, [editingItem, branch.handleUpdateBranch, handleCloseDrawer]);

  return (
    <div className="account-page">
      <div className="account-layout">
        <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
          <PageHeader title="Account Settings" description="Manage your login credentials, settings, and preferences" />
          <SettingsTabs />
          <div className="task-panel">
            <span className="usage-quote">
              <span className="usage-count">{filteredData.length}</span> / <span className="usage-total">{filteredData.length}</span> Branches
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
              totalRecords={filteredData.length}
              dropdownOpen={dropdownOpen}
              onToggleDropdown={setDropdownOpen}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </div>
          <AddBranchDrawer
            isOpen={showDrawer}
            onClose={handleCloseDrawer}
            validationSchema={branch.validationSchema}
            initialValues={drawerInitialValues}
            onSubmit={editingItem ? handleEditSubmit : handleSubmit}
            isLoading={branch.isLoading}
            error={branch.error}
            isEditing={!!editingItem}
          />
          <DeleteBranchModal
            isOpen={!!deletingItem}
            itemName={deletingItem?.name || ''}
            onConfirm={handleConfirmDelete}
            onClose={handleCloseDeleteModal}
          />
        </div>
      </div>
    </div>
  );
};

export default BranchPage;
