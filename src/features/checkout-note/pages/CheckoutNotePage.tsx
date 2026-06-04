import { useState, useMemo, useCallback } from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../shared/components/SettingsTabs';
import { useCheckoutNote } from '../hooks/useCheckoutNote';
import AddCheckoutNoteDrawer from '../components/AddCheckoutNoteDrawer';
import DeleteCheckoutNoteModal from '../components/DeleteCheckoutNoteModal';
import CheckoutNoteTable from '../components/CheckoutNoteTable';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../shared/constants/pagination';
import './CheckoutNotePage.css';

const CheckoutNotePage = () => {
  const checkout = useCheckoutNote();
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showDrawer, setShowDrawer] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<{ id: number; note: string } | null>(null);
  const [deletingItem, setDeletingItem] = useState<{ id: number; note: string } | null>(null);

  const filteredData = useMemo(
    () => checkout.checkoutNoteList.filter(item =>
      (item.note || '').toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [checkout.checkoutNoteList, searchQuery]
  );

  const handleCloseDrawer = useCallback(() => {
    setShowDrawer(false);
    setEditingItem(null);
  }, []);

  const handleAddClick = useCallback(() => {
    setEditingItem(null);
    setShowDrawer(true);
  }, []);

  const handleSubmit = useCallback(async (values: { note: string }, helpers: { setSubmitting: (v: boolean) => void; resetForm: () => void }) => {
    const success = await checkout.handleAddCheckoutNote(values, helpers);
    if (success) {
      handleCloseDrawer();
    }
  }, [checkout.handleAddCheckoutNote, handleCloseDrawer]);

  const handleEditClick = useCallback((item: { id: number; note: string }) => {
    setEditingItem(item);
    setShowDrawer(true);
    setDropdownOpen(null);
  }, []);

  const handleDeleteClick = useCallback((item: { id: number; note: string }) => {
    setDeletingItem(item);
    setDropdownOpen(null);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingItem) return;
    const success = await checkout.handleDeleteCheckoutNote(deletingItem.id);
    if (success) {
      setDeletingItem(null);
    }
  }, [deletingItem, checkout.handleDeleteCheckoutNote]);

  const handleCloseDeleteModal = useCallback(() => {
    setDeletingItem(null);
  }, []);

  const drawerInitialValues = useMemo(
    () => editingItem
      ? { note: editingItem.note || '' }
      : checkout.initialValues,
    [editingItem, checkout.initialValues]
  );

  const handleEditSubmit = useCallback(async (values: { note: string }, helpers: { setSubmitting: (v: boolean) => void; resetForm: () => void }) => {
    if (!editingItem) return;
    const success = await checkout.handleUpdateCheckoutNote(editingItem.id, values, helpers);
    if (success) {
      handleCloseDrawer();
    }
  }, [editingItem, checkout.handleUpdateCheckoutNote, handleCloseDrawer]);

  return (
    <div className="account-page">
      <div className="account-layout">
        <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
          <PageHeader
            title="Checkout Note"
            description="Create and manage checkout notes"
          />
          <SettingsTabs />
          <div className="task-panel">
            <span className="usage-quote">
              <span className="usage-count">{filteredData.length}</span> / <span className="usage-total">{filteredData.length}</span> Notes
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
              totalRecords={filteredData.length}
              dropdownOpen={dropdownOpen}
              onToggleDropdown={setDropdownOpen}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </div>
          <AddCheckoutNoteDrawer
            isOpen={showDrawer}
            onClose={handleCloseDrawer}
            validationSchema={checkout.validationSchema}
            initialValues={drawerInitialValues}
            onSubmit={editingItem ? handleEditSubmit : handleSubmit}
            isLoading={checkout.isLoading}
            error={checkout.error}
            isEditing={!!editingItem}
          />
          <DeleteCheckoutNoteModal
            isOpen={!!deletingItem}
            itemName={deletingItem?.note || ''}
            onConfirm={handleConfirmDelete}
            onClose={handleCloseDeleteModal}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutNotePage;
