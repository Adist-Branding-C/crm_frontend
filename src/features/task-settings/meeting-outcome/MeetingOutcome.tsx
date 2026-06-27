import { useCallback } from 'react';
import { Check, X, Phone, MessageSquare, Users, Tag } from 'lucide-react';
import type { FormikHelpers } from 'formik';
import { useMeetingOutcome } from './hooks/useMeetingOutcome';
import { useMeetingOutcomeForm } from './hooks/useMeetingOutcomeForm';
import { useTaskSettingsSearch } from '../hooks/useTaskSettingsSearch';
import { addMeetingOutcomeValidationSchema, editMeetingOutcomeValidationSchema } from './validations/index';
import { ADD_MEETING_OUTCOME_INITIAL_VALUES } from './constants/index';
import MeetingOutcomeTable from './components/MeetingOutcomeTable';
import AddMeetingOutcomeDrawer from './components/AddMeetingOutcomeDrawer';
import EditMeetingOutcomeDrawer from './components/EditMeetingOutcomeDrawer';
import DeleteMeetingOutcomeDialog from './components/DeleteMeetingOutcomeDialog';
import PageHeader from '../../../shared/components/layout/PageHeader';
import SettingsTabs from '../components/SettingsTabs/SettingsTabs';
import type { MeetingOutcomeFormData } from './types/index';
import './MeetingOutcome.css';

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
    toastMessage,
    toastType,
    showToast,
    setShowToast,
    pageNumber,
    setPageNumber,
    limit,
    totalCount,
    searchQuery,
    handleSearchChange,
    handleRowsPerPageChange,
  } = useMeetingOutcome();

  const form = useMeetingOutcomeForm();

  const { searchValue, handleSearchInput } = useTaskSettingsSearch(searchQuery, handleSearchChange);

  const totalPages = Math.ceil(totalCount / limit) || 1;

  const handleAddSubmit = useCallback(async (
    values: MeetingOutcomeFormData,
    helpers: FormikHelpers<MeetingOutcomeFormData>,
  ) => {
    const success = await handleAdd(values, helpers);
    if (success) {
      form.closeAddDrawer();
    }
  }, [handleAdd, form]);

  const handleEditSubmit = useCallback(async (
    values: MeetingOutcomeFormData,
    helpers: FormikHelpers<MeetingOutcomeFormData>,
  ) => {
    if (!form.editingItem) return;
    const item = form.editingItem;
    const original: MeetingOutcomeFormData = {
      name: item.name || '',
      status: item.status || 'Active',
    };
    if (JSON.stringify(values) === JSON.stringify(original)) {
      helpers.setSubmitting(false);
      return;
    }
    const success = await handleUpdate(form.editingItem.id, values, helpers);
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
      <PageHeader title="Task Settings" description="Manage task configurations and settings" />
      <SettingsTabs tabs={tabs} />
      <div className="account-content">
        <div className="meeting-outcome-table-wrapper">
          <MeetingOutcomeTable
            data={meetingOutcomeList}
            searchQuery={searchValue}
            onSearchChange={handleSearchInput}
            rowsPerPage={limit}
            onRowsPerPageChange={handleRowsPerPageChange}
            totalRecords={totalCount}
            currentPage={pageNumber}
            totalPages={totalPages}
            onPageChange={setPageNumber}
            dropdownOpen={form.dropdownOpen}
            onToggleDropdown={form.toggleDropdown}
            onEdit={form.openEditDrawer}
            onDelete={form.handleDeleteClick}
            onAdd={form.openAddDrawer}
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
      {showToast && (
        <div className={`toast-notification toast-${toastType}`} onClick={() => setShowToast(false)}>
          {toastType === 'success' ? <Check size={18} /> : <X size={18} />}
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default MeetingOutcomePage;
