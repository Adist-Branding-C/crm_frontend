import { Plus } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { useWorkModePage } from '../hooks/useWorkModePage';
import AddWorkModeDrawer from '../components/AddWorkModeDrawer';
import DeleteWorkModeModal from '../components/DeleteWorkModeModal';
import WorkModeTable from '../components/WorkModeTable';
import './WorkModePage.css';

const WorkModePage = () => {
  const {
    workMode,
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
  } = useWorkModePage();

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
              onEdit={(item) => { handleEditClick(item); setDropdownOpen(null); }}
              onDelete={(item) => { handleDeleteClick(item); setDropdownOpen(null); }}
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
