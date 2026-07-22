import { Check, X } from 'lucide-react';
import { useCheckoutNotePage } from '../hooks';
import AddCheckoutNoteDrawer from '../components/AddCheckoutNoteDrawer';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { SettingsTableLayout } from '../../../../shared/components/settings';
import { CHECKOUT_NOTE_TABLE_COLUMNS } from '../constants/checkoutNoteTableColumns';

const CheckoutNotePage = () => {
  const {
    checkoutNote,
    searchQuery, handleSearchChange,
    rowsPerPage, handleRowsPerPageChange,
    pageNumber, setPageNumber,
    totalCount,
    startIndex,
    totalPages,
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
  } = useCheckoutNotePage();

  return (
    <div className="account-page">
      <PageHeader title="Account Settings" description="Manage your login credentials, settings, and preferences" />
      <SettingsTabs />
      <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
        <SettingsTableLayout
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onAdd={handleAddClick}
          addLabel="Add Note"
          data={filteredData}
          columns={CHECKOUT_NOTE_TABLE_COLUMNS}
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
          onRowsPerPageChange={handleRowsPerPageChange}
        />
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
        <AdminDeleteModal
          isOpen={!!deletingItem}
          itemName={deletingItem?.title || deletingItem?.note || ''}
          onConfirm={handleConfirmDelete}
          onClose={handleCloseDeleteModal}
        />
        {checkoutNote.showToast && (
          <div className={`toast-notification toast-${checkoutNote.toastType}`} onClick={() => checkoutNote.setShowToast(false)}>
            {checkoutNote.toastType === 'success' ? <Check size={18} /> : <X size={18} />}
            <span>{checkoutNote.toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutNotePage;
