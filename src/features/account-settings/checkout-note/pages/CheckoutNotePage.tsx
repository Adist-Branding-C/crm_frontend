import { Plus } from 'lucide-react';
import { useCheckoutNote, useCheckoutNoteDrawer, useCheckoutNoteDropdown, useCheckoutNoteFilters, useCheckoutNoteActions } from '../hooks';
import AddCheckoutNoteDrawer from '../components/AddCheckoutNoteDrawer';
import DeleteCheckoutNoteModal from '../components/DeleteCheckoutNoteModal';
import CheckoutNoteTable from '../components/CheckoutNoteTable';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import './CheckoutNotePage.css';

const CheckoutNotePage = () => {
  const checkout = useCheckoutNote();
  const drawer = useCheckoutNoteDrawer();
  const dropdown = useCheckoutNoteDropdown();
  const filters = useCheckoutNoteFilters(checkout.checkoutNoteList);
  const actions = useCheckoutNoteActions({ checkout, drawer });

  return (
    <div className="account-page">
      <div className="account-layout">
        <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
          <PageHeader title="Account Settings" description="Manage your login credentials, settings, and preferences" />
          <SettingsTabs />
          <div className="task-panel">
            <span className="usage-quote">
              <span className="usage-count">{filters.totalRecords}</span> / <span className="usage-total">{filters.totalRecords}</span> Notes
            </span>
            <div className="task-nav">
              <button className="btn btn-primary" onClick={drawer.openAddDrawer}>
                <Plus size={16} /> Add Note
              </button>
            </div>
          </div>
          <div className="checkout-note-table-wrapper">
            <CheckoutNoteTable
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
          <AddCheckoutNoteDrawer
            isOpen={drawer.showDrawer}
            onClose={drawer.closeDrawer}
            validationSchema={checkout.validationSchema}
            initialValues={drawer.drawerInitialValues}
            onSubmit={drawer.editingItem ? actions.handleEditSubmit : actions.handleSubmit}
            isLoading={checkout.isLoading}
            error={checkout.error}
            isEditing={!!drawer.editingItem}
          />
          <DeleteCheckoutNoteModal
            isOpen={!!actions.deletingItem}
            itemName={actions.deletingItem?.title || actions.deletingItem?.note || ''}
            onConfirm={actions.handleConfirmDelete}
            onClose={actions.closeDeleteModal}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutNotePage;
