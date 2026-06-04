import { useState, useMemo, useCallback } from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { useWorkModes } from '../hooks/useWorkModes';
import AddWorkModeDrawer from '../components/AddWorkModeDrawer';
import DeleteWorkModeModal from '../components/DeleteWorkModeModal';
import WorkModeTable from '../components/WorkModeTable';
import './WorkModePage.css';

const WorkModePage = () => {
  const workMode = useWorkModes();
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showDrawer, setShowDrawer] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);

  const filteredData = useMemo(
    () => workMode.workModeList.filter(item =>
      (item.workModeName || item.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [workMode.workModeList, searchQuery]
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
    const success = await workMode.handleAddWorkMode(values, helpers);
    if (success) {
      handleCloseDrawer();
    }
  }, [workMode.handleAddWorkMode, handleCloseDrawer]);

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
    const success = await workMode.handleDeleteWorkMode(deletingItem.id);
    if (success) {
      setDeletingItem(null);
    }
  }, [deletingItem, workMode.handleDeleteWorkMode]);

  const handleCloseDeleteModal = useCallback(() => {
    setDeletingItem(null);
  }, []);

  const drawerInitialValues = useMemo(
    () => editingItem
      ? { workModeName: editingItem.workModeName || editingItem.name || '', description: editingItem.description || '', status: editingItem.status || '' }
      : workMode.initialValues,
    [editingItem, workMode.initialValues]
  );

  const handleEditSubmit = useCallback(async (values, helpers) => {
    if (!editingItem) return;
    const success = await workMode.handleUpdateWorkMode(editingItem.id, values, helpers);
    if (success) {
      handleCloseDrawer();
    }
  }, [editingItem, workMode.handleUpdateWorkMode, handleCloseDrawer]);

  return (
    <div className="account-page">
      <div className="account-layout">
        <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
          <PageHeader title="Account Settings" description="Manage your login credentials, settings, and preferences" />
          <SettingsTabs />
          <div className="task-panel">
            <span className="usage-quote">
              <span className="usage-count">{filteredData.length}</span> / <span className="usage-total">{filteredData.length}</span> Work Modes
            </span>
            <div className="task-nav">
              <button className="btn btn-primary" onClick={handleAddClick}>
                <Plus size={16} /> Add Work Mode
              </button>
            </div>
          </div>
          <div className="work-mode-table-wrapper">
            <WorkModeTable
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
          <AddWorkModeDrawer
            isOpen={showDrawer}
            onClose={handleCloseDrawer}
            validationSchema={workMode.validationSchema}
            initialValues={drawerInitialValues}
            onSubmit={editingItem ? handleEditSubmit : handleSubmit}
            isLoading={workMode.isLoading}
            error={workMode.error}
            isEditing={!!editingItem}
          />
          <DeleteWorkModeModal
            isOpen={!!deletingItem}
            itemName={deletingItem?.workModeName || deletingItem?.name || ''}
            onConfirm={handleConfirmDelete}
            onClose={handleCloseDeleteModal}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkModePage;
