import { useMemo, useCallback } from 'react';
import { Plus, Phone, MessageSquare, Users, Tag } from 'lucide-react';
import { useMeetingOutcome } from '../hooks/useMeetingOutcome';
import { useMeetingOutcomeForm } from '../hooks/useMeetingOutcomeForm';
import { addMeetingOutcomeValidationSchema, editMeetingOutcomeValidationSchema } from '../validation/meetingOutcome.schema';
import { ADD_MEETING_OUTCOME_INITIAL_VALUES } from '../constants/meetingOutcome.constants';
import MeetingOutcomeTable from '../components/MeetingOutcomeTable';
import AddMeetingOutcomeDrawer from '../components/AddMeetingOutcomeDrawer';
import EditMeetingOutcomeDrawer from '../components/EditMeetingOutcomeDrawer';
import DeleteMeetingOutcomeDialog from '../components/DeleteMeetingOutcomeDialog';
import SettingsTabs from '../../components/SettingsTabs/SettingsTabs';
import './MeetingOutcomePage.css';

const tabs = [
  { label: 'Call Status', path: '/user/call_status', icon: <Phone size={16} /> },
  { label: 'Call Reasons', path: '/user/call_reasons', icon: <MessageSquare size={16} /> },
  { label: 'Meeting Outcome', path: '/user/meeting_outcome', icon: <Users size={16} /> },
  { label: 'Task Categories', path: '/user/task_categories', icon: <Tag size={16} /> },
];

const MeetingOutcomePage = () => {
  const {
    meetingOutcomeList,
    isLoading,
    error,
    handleAdd,
    handleUpdate,
    handleDelete,
  } = useMeetingOutcome();

  const form = useMeetingOutcomeForm();

  const filteredData = useMemo(
    () => meetingOutcomeList.filter(item =>
      (item.name || '').toLowerCase().includes(form.searchQuery.toLowerCase())
    ),
    [meetingOutcomeList, form.searchQuery]
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
            <span className="usage-count">{filteredData.length}</span> / <span className="usage-total">{meetingOutcomeList.length}</span> Outcomes
          </span>
          <div className="task-nav">
            <button className="btn btn-primary" onClick={form.openAddDrawer}>
              <Plus size={16} /> Add Outcome
            </button>
          </div>
        </div>
        <div className="meeting-outcome-table-wrapper">
          <MeetingOutcomeTable
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
        <AddMeetingOutcomeDrawer
          isOpen={form.showAddDrawer}
          onClose={form.closeAddDrawer}
          validationSchema={addMeetingOutcomeValidationSchema}
          initialValues={ADD_MEETING_OUTCOME_INITIAL_VALUES}
          onSubmit={handleAddSubmit}
          isLoading={isLoading}
          error={error}
        />
        <EditMeetingOutcomeDrawer
          isOpen={form.showEditDrawer}
          onClose={form.closeEditDrawer}
          validationSchema={editMeetingOutcomeValidationSchema}
          initialValues={form.editInitialValues}
          onSubmit={handleEditSubmit}
          isLoading={isLoading}
          error={error}
          editingItem={form.editingItem}
        />
        <DeleteMeetingOutcomeDialog
          isOpen={!!form.deletingItem}
          itemName={form.deletingItem?.name || ''}
          onConfirm={handleConfirmDelete}
          onClose={form.closeDeleteDialog}
        />
      </div>
    </div>
  );
};

export default MeetingOutcomePage;
