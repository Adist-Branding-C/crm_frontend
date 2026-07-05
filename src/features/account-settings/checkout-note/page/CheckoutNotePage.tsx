import { useCheckoutNotePage } from '../hooks/useCheckoutNotePage';
import CheckoutNoteTable from '../components/CheckoutNoteTable';
import AddCheckoutNoteDrawer from '../components/AddCheckoutNoteDrawer';
import DeleteCheckoutNoteDialog from '../components/DeleteCheckoutNoteDialog';
import ToastNotification from '../../../../shared/components/ToastNotification';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import './CheckoutNotePage.css';

const CheckoutNotePage = () => {
  const p = useCheckoutNotePage();

  return (
    <div className="account-page">
      <PageHeader title="Account Settings" description="Manage your login credentials, settings, and preferences" />
      <SettingsTabs />
      <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
        <CheckoutNoteTable
          data={p.data}
          searchQuery={p.searchQuery}
          onSearchChange={p.onSearchChange}
          rowsPerPage={p.rowsPerPage}
          onRowsPerPageChange={p.onRowsPerPageChange}
          totalRecords={p.totalRecords}
          currentPage={p.currentPage}
          totalPages={p.totalPages}
          onPageChange={p.onPageChange}
          dropdownOpen={p.dropdownOpen}
          onToggleDropdown={p.onToggleDropdown}
          onEdit={p.onEdit}
          onDelete={p.onDelete}
          onAdd={p.onAdd}
        />
        <AddCheckoutNoteDrawer
          isOpen={p.isOpen}
          onClose={p.onClose}
          validationSchema={p.validationSchema}
          initialValues={p.initialValues}
          onSubmit={p.onSubmit}
          isLoading={p.isLoading}
          error={p.error}
          isEditing={p.isEditing}
        />
        <DeleteCheckoutNoteDialog
          isOpen={!!p.deletingItem}
          itemName={p.itemName}
          onConfirm={p.onConfirmDelete}
          onClose={p.onCloseDelete}
        />
      </div>
      <ToastNotification
        message={p.toastMessage}
        type={p.toastType}
        visible={p.showToast}
        onClose={p.onCloseToast}
      />
    </div>
  );
};

export default CheckoutNotePage;
