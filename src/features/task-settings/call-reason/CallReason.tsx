import { useMemo, useCallback } from 'react';
import { Plus, Phone, MessageSquare, Users, Tag } from 'lucide-react';
import { useCallReason } from './hooks/useCallReason';
import { useCallReasonForm } from './hooks/useCallReasonForm';
import { addCallReasonValidationSchema, editCallReasonValidationSchema } from './validations/index';
import { ADD_CALL_REASON_INITIAL_VALUES } from './constants/index';
import CallReasonTable from './components/CallReasonTable';
import AddCallReasonDrawer from './components/AddCallReasonDrawer';
import EditCallReasonDrawer from './components/EditCallReasonDrawer';
import DeleteCallReasonDialog from './components/DeleteCallReasonDialog';
import SettingsTabs from '../components/SettingsTabs/SettingsTabs';
import './CallReason.css';

const tabs = [
  { label: 'Call Status', path: '/user/call_status', icon: <Phone size={16} /> },
  { label: 'Call Reasons', path: '/user/call_reasons', icon: <MessageSquare size={16} /> },
  { label: 'Meeting Outcome', path: '/user/meeting_outcome', icon: <Users size={16} /> },
  { label: 'Task Categories', path: '/user/task_categories', icon: <Tag size={16} /> },
];

const CallReasonPage = () => {
  const {
    callReasonList,
    isLoading,
    error,
    handleAdd,
    handleUpdate,
    handleDelete,
  } = useCallReason();

  const form = useCallReasonForm();

  const filteredData = useMemo(
    () => callReasonList.filter(item =>
      (item.name || '').toLowerCase().includes(form.searchQuery.toLowerCase())
    ),
    [callReasonList, form.searchQuery]
  );

  const handleAddSubmit = useCallback(async (values: { name: string; status: string }) => {
    const success = await handleAdd(values);
    if (success) {
      form.closeAddDrawer();
    }
  }, [handleAdd, form]);

  const handleEditSubmit = useCallback(async (values: { name: string; status: string }) => {
    if (!form.editingItem) return;
    const success = await handleUpdate(form.editingItem.id, values);
    if (success) {
      form.closeEditDrawer();
    }
  }, [form.editingItem, handleUpdate, form]);

  const handleConfirmDelete = useCallback(async () => {
    if (!form.deletingItem) return;
    const success = await handleDelete(form.deletingItem.id);
    if (success) {
      form.closeDeleteDialog();
    }
  }, [form.deletingItem, handleDelete, form]);

  return (
    <div className="task-settings-page">
      <SettingsTabs tabs={tabs} />
      <div className="settings-content">
        <div className="task-panel">
          <span className="usage-quote">
            <span className="usage-count">{filteredData.length}</span> / <span className="usage-total">{callReasonList.length}</span> Reasons
          </span>
          <div className="task-nav">
            <button className="btn btn-primary" onClick={form.openAddDrawer}>
              <Plus size={16} /> Add Reason
            </button>
          </div>
        </div>
        <div className="call-reason-table-wrapper">
          <CallReasonTable
            data={filteredData.slice(0, form.rowsPerPage)}
            searchQuery={form.searchQuery}
            onSearchChange={form.setSearchQuery}
            rowsPerPage={form.rowsPerPage}
            onRowsPerPageChange={form.setRowsPerPage}
            totalRecords={filteredData.length}
            dropdownOpen={form.dropdownOpen}
            onToggleDropdown={form.toggleDropdown}
            onEdit={form.openEditDrawer}
            onDelete={form.handleDeleteClick}
          />
        </div>
        <AddCallReasonDrawer
          isOpen={form.showAddDrawer}
          onClose={form.closeAddDrawer}
          validationSchema={addCallReasonValidationSchema}
          initialValues={ADD_CALL_REASON_INITIAL_VALUES}
          onSubmit={handleAddSubmit}
          isLoading={isLoading}
          error={error}
        />
        <EditCallReasonDrawer
          isOpen={form.showEditDrawer}
          onClose={form.closeEditDrawer}
          validationSchema={editCallReasonValidationSchema}
          initialValues={form.editInitialValues}
          onSubmit={handleEditSubmit}
          isLoading={isLoading}
          error={error}
          editingItem={form.editingItem}
        />
        <DeleteCallReasonDialog
          isOpen={!!form.deletingItem}
          itemName={form.deletingItem?.name || ''}
          onConfirm={handleConfirmDelete}
          onClose={form.closeDeleteDialog}
        />
      </div>
    </div>
  );
};

export default CallReasonPage;
