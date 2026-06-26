import { Check, X } from 'lucide-react';
import { useCheckoutNotePage } from '../hooks';
import AddCheckoutNoteDrawer from '../components/AddCheckoutNoteDrawer';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { SettingsTableLayout, SettingsStatusBadge } from '../../../../shared/components/settings';
import type { Column } from '../../../../shared/types/crud';
import type { CheckoutNoteItem } from '../types/checkoutNote.types';

const CheckoutNotePage = () => {
  const {
    checkoutNote,
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
  } = useCheckoutNotePage();

  const startIndex = (pageNumber - 1) * rowsPerPage;
  const totalPages = Math.ceil(totalCount / rowsPerPage) || 1;

  const columns: Column<CheckoutNoteItem>[] = [
    { key: 'title', label: 'Title', render: (item) => item.title || '-' },
    { key: 'note', label: 'Note', render: (item) => item.note || '-' },
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
          addLabel="Add Note"
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
