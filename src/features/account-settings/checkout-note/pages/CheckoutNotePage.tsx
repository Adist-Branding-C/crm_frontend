import { Plus } from 'lucide-react';
import { useCheckoutNotePage } from '../hooks';
import AddCheckoutNoteDrawer from '../components/AddCheckoutNoteDrawer';
import DeleteCheckoutNoteModal from '../components/DeleteCheckoutNoteModal';
import CheckoutNoteTable from '../components/CheckoutNoteTable';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import './CheckoutNotePage.css';

const CheckoutNotePage = () => {
  const {
    checkoutNote,
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
  } = useCheckoutNotePage();

  return (
    <div className="account-page">
      <div className="account-layout">
        <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
          <PageHeader title="Account Settings" description="Manage your login credentials, settings, and preferences" />
          <SettingsTabs />
          <div className="task-panel">
            <span className="usage-quote">
              <span className="usage-count">{totalRecords}</span> / <span className="usage-total">{totalRecords}</span> Notes
            </span>
            <div className="task-nav">
              <button className="btn btn-primary" onClick={handleAddClick}>
                <Plus size={16} /> Add Note
              </button>
            </div>
          </div>
          <div className="checkout-note-table-wrapper">
            <CheckoutNoteTable
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
          <AddCheckoutNoteDrawer
            isOpen={showDrawer}
            onClose={handleCloseDrawer}
            validationSchema={editingItem ? checkoutNote.editValidationSchema : checkoutNote.validationSchema}
            initialValues={drawerInitialValues}
            onSubmit={editingItem ? handleEditSubmit : handleSubmit}
            isLoading={checkoutNote.isLoading}
            error={checkoutNote.error}
            isEditing={!!editingItem}
          />
          <DeleteCheckoutNoteModal
            isOpen={!!deletingItem}
            itemName={deletingItem?.title || deletingItem?.note || ''}
            onConfirm={handleConfirmDelete}
            onClose={handleCloseDeleteModal}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutNotePage;
