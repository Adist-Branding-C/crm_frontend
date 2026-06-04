import { useState, useMemo, useCallback } from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { useDesignation } from '../hooks/useDesignation';
import AddDesignationDrawer from '../components/AddDesignationDrawer';
import DeleteDesignationModal from '../components/DeleteDesignationModal';
import DesignationTable from '../components/DesignationTable';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../../shared/constants/pagination';
import './DesignationPage.css';

const DesignationPage = () => {
  const designation = useDesignation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDrawer, setShowDrawer] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deletingItem, setDeletingItem] = useState(null);

  const filteredData = useMemo(
    () => designation.designationList.filter(item =>
      (item.designationName || '').toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [designation.designationList, searchQuery]
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
    const success = await designation.handleAddDesignation(values, helpers);
    if (success) {
      handleCloseDrawer();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [designation.handleAddDesignation, handleCloseDrawer]);

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
    const success = await designation.handleDeleteDesignation(deletingItem.id);
    if (success) {
      setDeletingItem(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletingItem, designation.handleDeleteDesignation]);

  const handleCloseDeleteModal = useCallback(() => {
    setDeletingItem(null);
  }, []);

  const drawerInitialValues = useMemo(
    () => editingItem
      ? { designationName: editingItem.designationName || '', description: editingItem.description || '', status: editingItem.status || '' }
      : designation.initialValues,
    [editingItem, designation.initialValues]
  );

  const handleEditSubmit = useCallback(async (values, helpers) => {
    if (!editingItem) return;
    const success = await designation.handleUpdateDesignation(editingItem.id, values, helpers);
    if (success) {
      handleCloseDrawer();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingItem, designation.handleUpdateDesignation, handleCloseDrawer]);

  return (
    <div className="account-page">
      <div className="account-layout">
        <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
          <PageHeader title="Account Settings" description="Manage your login credentials, settings, and preferences" />
          <SettingsTabs />
          <div className="task-panel">
            <span className="usage-quote">
              <span className="usage-count">{filteredData.length}</span> / <span className="usage-total">{filteredData.length}</span> Designations
            </span>
            <div className="task-nav">
              <button className="btn btn-primary" onClick={handleAddClick}>
                <Plus size={16} /> Add Designation
              </button>
            </div>
          </div>
          <div className="designation-table-wrapper">
            <DesignationTable
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
          <AddDesignationDrawer
            isOpen={showDrawer}
            onClose={handleCloseDrawer}
            validationSchema={designation.validationSchema}
            initialValues={drawerInitialValues}
            onSubmit={editingItem ? handleEditSubmit : handleSubmit}
            isLoading={designation.isLoading}
            error={designation.error}
            isEditing={!!editingItem}
          />
          <DeleteDesignationModal
            isOpen={!!deletingItem}
            itemName={deletingItem?.designationName || deletingItem?.name || ''}
            onConfirm={handleConfirmDelete}
            onClose={handleCloseDeleteModal}
          />
        </div>
      </div>
    </div>
  );
};

export default DesignationPage;
