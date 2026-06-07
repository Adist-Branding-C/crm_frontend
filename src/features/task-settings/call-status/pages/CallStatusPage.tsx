import { useMemo, useCallback } from 'react';
import { Plus, Phone, MessageSquare, Users, Tag } from 'lucide-react';
import { useCallStatus } from '../hooks/useCallStatus';
import { useCallStatusForm } from '../hooks/useCallStatusForm';
import { addCallStatusValidationSchema, editCallStatusValidationSchema } from '../validation/callStatus.schema';
import { ADD_CALL_STATUS_INITIAL_VALUES } from '../constants/callStatus.constants';
import CallStatusTable from '../components/CallStatusTable';
import AddCallStatusDrawer from '../components/AddCallStatusDrawer';
import EditCallStatusDrawer from '../components/EditCallStatusDrawer';
import DeleteCallStatusDialog from '../components/DeleteCallStatusDialog';
import SettingsTabs from '../../components/SettingsTabs/SettingsTabs';
import './CallStatusPage.css';

const tabs = [
  { label: 'Call Status', path: '/user/call_status', icon: <Phone size={16} /> },
  { label: 'Call Reasons', path: '/user/call_reasons', icon: <MessageSquare size={16} /> },
  { label: 'Meeting Outcome', path: '/user/meeting_outcome', icon: <Users size={16} /> },
  { label: 'Task Categories', path: '/user/task_categories', icon: <Tag size={16} /> },
];

const CallStatusPage = () => {
  const {
    callStatusList,
    isLoading,
    error,
    handleAdd,
    handleUpdate,
    handleDelete,
  } = useCallStatus();

  const form = useCallStatusForm();

  const filteredData = useMemo(
    () => callStatusList.filter(item =>
      (item.name || '').toLowerCase().includes(form.searchQuery.toLowerCase())
    ),
    [callStatusList, form.searchQuery]
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
            <span className="usage-count">{filteredData.length}</span> / <span className="usage-total">{callStatusList.length}</span> Call Statuses
          </span>
          <div className="task-nav">
            <button className="btn btn-primary" onClick={form.openAddDrawer}>
              <Plus size={16} /> Add Call Status
            </button>
          </div>
        </div>
        <div className="call-status-table-wrapper">
          <CallStatusTable
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
        <AddCallStatusDrawer
          isOpen={form.showAddDrawer}
          onClose={form.closeAddDrawer}
          validationSchema={addCallStatusValidationSchema}
          initialValues={ADD_CALL_STATUS_INITIAL_VALUES}
          onSubmit={handleAddSubmit}
          isLoading={isLoading}
          error={error}
        />
        <EditCallStatusDrawer
          isOpen={form.showEditDrawer}
          onClose={form.closeEditDrawer}
          validationSchema={editCallStatusValidationSchema}
          initialValues={form.editInitialValues}
          onSubmit={handleEditSubmit}
          isLoading={isLoading}
          error={error}
          editingItem={form.editingItem}
        />
        <DeleteCallStatusDialog
          isOpen={!!form.deletingItem}
          itemName={form.deletingItem?.name || ''}
          onConfirm={handleConfirmDelete}
          onClose={form.closeDeleteDialog}
        />
      </div>
    </div>
  );
};

export default CallStatusPage;
