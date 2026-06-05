import { Plus } from 'lucide-react';
import { useDesignationPage } from '../hooks/useDesignationPage';
import AddDesignationDrawer from '../components/AddDesignationDrawer';
import DeleteDesignationModal from '../components/DeleteDesignationModal';
import DesignationTable from '../components/DesignationTable';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import './DesignationPage.css';

const DesignationPage = () => {
  const {
    designation,
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
  } = useDesignationPage();

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
              onEdit={(item) => { handleEditClick(item); setDropdownOpen(null); }}
              onDelete={(item) => { handleDeleteClick(item); setDropdownOpen(null); }}
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
