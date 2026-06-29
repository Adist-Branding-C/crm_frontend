import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useFetchCallStatus } from '../hooks/useFetchCallStatus';
import { useCreateCallStatus } from '../hooks/useCreateCallStatus';
import { useUpdateCallStatus } from '../hooks/useUpdateCallStatus';
import { useDeleteCallStatus } from '../hooks/useDeleteCallStatus';
import { useCallStatusForm } from '../hooks/useCallStatusForm';
import { useCallStatusDrawer } from '../hooks/useCallStatusDrawer';
import { useCallStatusTable } from '../hooks/useCallStatusTable';
import { useTaskSettingsSearch } from '../../hooks/useTaskSettingsSearch';
import { useDrawerScroll } from '../../hooks/useDrawerScroll';
import { useToast } from '../../hooks/useToast';
import { applyFieldErrors } from '../../call-reason/utils/applyFieldErrors';
import { SETTINGS_TABS } from '../../constants/index';
import { addCallStatusValidationSchema, editCallStatusValidationSchema } from '../validations/index';
import { ADD_CALL_STATUS_INITIAL_VALUES } from '../constants/index';
import CallStatusActions from '../components/CallStatusActions';
import AddCallStatusDrawer from '../components/AddCallStatusDrawer';
import EditCallStatusDrawer from '../components/EditCallStatusDrawer';
import DeleteCallStatusDialog from '../components/DeleteCallStatusDialog';
import { Table, THead, TBody, TRow, TCell, TableToolbar, TablePagination } from '../../../../shared/components/table';
import SettingsStatusBadge from '../../../../shared/components/settings/SettingsStatusBadge';
import ToastNotification from '../../components/ToastNotification';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../components/SettingsTabs/SettingsTabs';
import type { CallStatusFormData, CallStatusApiResponse } from '../types/index';
import './CallStatus.css';

const CallStatusPage = () => {
  const fetch = useFetchCallStatus();
  const create = useCreateCallStatus();
  const update = useUpdateCallStatus();
  const deletion = useDeleteCallStatus();
  const drawer = useCallStatusDrawer();
  const table = useCallStatusTable();
  const form = useCallStatusForm(drawer.editingItem);
  const { scrollAndFocusError, scrollToTop } = useDrawerScroll();
  const { showToastMessage, toastMessage, toastType, showToast, setShowToast } = useToast();

  const { searchValue, handleSearchInput } = useTaskSettingsSearch(fetch.searchQuery, fetch.handleSearchChange);

  const totalPages = Math.ceil(fetch.totalCount / fetch.limit) || 1;

  const handleAddSubmit = useCallback(async (
    values: CallStatusFormData,
    helpers: FormikHelpers<CallStatusFormData>,
  ) => {
    fetch.setError('');
    fetch.setIsLoading(true);

    try {
      const { name, status } = values;
      const response: CallStatusApiResponse | null = await create.create({ name: name.trim(), status });

      if (!response) {
        fetch.setError('Network error. Please try again.');
        return false;
      }

      if (response.status) {
        fetch.setPageNumber(1);
        fetch.setSearchQuery('');
        fetch.refresh();
        helpers.resetForm();
        showToastMessage('Call status added successfully', 'success');
        drawer.closeAddDrawer();
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, helpers.setFieldError);
      if (errorField) {
        scrollAndFocusError();
      } else {
        fetch.setError(response.message || 'Failed to add call status');
        scrollToTop();
      }
      return false;
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { errors?: Record<string, string[]>; message?: string; field?: string } } };
        const serverErrors = axiosErr.response?.data?.errors;
        const serverField = axiosErr.response?.data?.field;
        const serverMessage = axiosErr.response?.data?.message;
        if (serverErrors || (serverField && serverMessage)) {
          const errorField = applyFieldErrors(serverErrors, serverMessage, serverField, helpers.setFieldError);
          if (errorField) scrollAndFocusError();
          else { fetch.setError(serverMessage || 'Failed to add call status'); scrollToTop(); }
        } else {
          fetch.setError(serverMessage || 'Failed to add call status');
          scrollToTop();
        }
      } else if (err && typeof err === 'object' && 'message' in err) {
        fetch.setError((err as { message: string }).message);
        scrollToTop();
      } else {
        fetch.setError('Network error. Please try again.');
        scrollToTop();
      }
      return false;
    } finally {
      fetch.setIsLoading(false);
      helpers.setSubmitting(false);
    }
  }, [create, fetch, drawer, form, showToastMessage]);

  const handleEditSubmit = useCallback(async (
    values: CallStatusFormData,
    helpers: FormikHelpers<CallStatusFormData>,
  ) => {
    if (!drawer.editingItem) return;
    const item = drawer.editingItem;
    const original: CallStatusFormData = {
      name: item.name || '',
      status: item.status || 'Active',
    };
    if (JSON.stringify(values) === JSON.stringify(original)) {
      helpers.setSubmitting(false);
      return;
    }

    fetch.setError('');
    fetch.setIsLoading(true);

    try {
      const { name, status } = values;
      const response: CallStatusApiResponse | null = await update.update(drawer.editingItem.id, { name: name.trim(), status });

      if (!response) {
        fetch.setError('Network error. Please try again.');
        return false;
      }

      if (response.status) {
        fetch.refresh();
        showToastMessage('Call status updated successfully', 'success');
        drawer.closeEditDrawer();
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, helpers.setFieldError);
      if (errorField) {
        scrollAndFocusError();
      } else {
        fetch.setError(response.message || 'Failed to update call status');
        scrollToTop();
      }
      return false;
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { errors?: Record<string, string[]>; message?: string; field?: string } } };
        const serverErrors = axiosErr.response?.data?.errors;
        const serverField = axiosErr.response?.data?.field;
        const serverMessage = axiosErr.response?.data?.message;
        if (serverErrors || (serverField && serverMessage)) {
          const errorField = applyFieldErrors(serverErrors, serverMessage, serverField, helpers.setFieldError);
          if (errorField) scrollAndFocusError();
          else { fetch.setError(serverMessage || 'Failed to update call status'); scrollToTop(); }
        } else {
          fetch.setError(serverMessage || 'Failed to update call status');
          scrollToTop();
        }
      } else if (err && typeof err === 'object' && 'message' in err) {
        fetch.setError((err as { message: string }).message);
        scrollToTop();
      } else {
        fetch.setError('Network error. Please try again.');
        scrollToTop();
      }
      return false;
    } finally {
      fetch.setIsLoading(false);
      helpers.setSubmitting(false);
    }
  }, [drawer.editingItem, update, fetch, drawer, form, showToastMessage]);

  const handleConfirmDelete = useCallback(async () => {
    if (!table.deletingItem) return;
    fetch.setError('');

    try {
      const response = await deletion.remove(table.deletingItem.id);

      if (response?.status) {
        fetch.refresh();
        table.closeDeleteDialog();
      } else {
        fetch.setError(response?.message || 'Failed to delete call status');
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        fetch.setError(axiosErr.response?.data?.message || 'Failed to delete call status');
      } else if (err && typeof err === 'object' && 'message' in err) {
        fetch.setError((err as { message: string }).message);
      } else {
        fetch.setError('Network error. Please try again.');
      }
    }
  }, [table.deletingItem, deletion, fetch, table]);

  const startIndex = (fetch.pageNumber - 1) * fetch.limit;

  return (
    <div className="task-settings-page">
      <PageHeader title="Task Settings" description="Manage task configurations and settings" />
      <SettingsTabs tabs={SETTINGS_TABS} />
      <div className="account-content">
        <div className="call-status-table-wrapper">
          <TableToolbar
            searchQuery={searchValue}
            onSearchChange={handleSearchInput}
            rowsPerPage={fetch.limit}
            onRowsPerPageChange={fetch.handleRowsPerPageChange}
            onAdd={drawer.openAddDrawer}
            addLabel="Add Call Status"
          />
          <div className="table-scroll">
            <Table className="data-table">
              <THead>
                <TRow>
                  <TCell variant="th">Sl No</TCell>
                  <TCell variant="th">Name</TCell>
                  <TCell variant="th">Status</TCell>
                  <TCell variant="th">Actions</TCell>
                </TRow>
              </THead>
              <TBody>
                {fetch.callStatusList.length === 0 ? (
                  <TRow>
                    <TCell colSpan={4} className="dataTables_empty">No data available in table</TCell>
                  </TRow>
                ) : (
                  fetch.callStatusList.map((item, index) => (
                    <TRow key={item.id}>
                      <TCell>{startIndex + index + 1}</TCell>
                      <TCell>{item.name || '-'}</TCell>
                      <TCell>
                        <SettingsStatusBadge status={item.status} />
                      </TCell>
                      <TCell>
                        <CallStatusActions
                          item={item}
                          dropdownOpen={table.dropdownOpen}
                          onToggleDropdown={table.toggleDropdown}
                          onEdit={drawer.openEditDrawer}
                          onDelete={table.handleDeleteClick}
                        />
                      </TCell>
                    </TRow>
                  ))
                )}
              </TBody>
            </Table>
          </div>
          <TablePagination
            currentPage={fetch.pageNumber}
            totalPages={totalPages}
            rowsPerPage={fetch.limit}
            totalRecords={fetch.totalCount}
            onPageChange={fetch.setPageNumber}
          />
        </div>
        <AddCallStatusDrawer
          isOpen={drawer.showAddDrawer}
          onClose={drawer.closeAddDrawer}
          validationSchema={addCallStatusValidationSchema}
          initialValues={ADD_CALL_STATUS_INITIAL_VALUES}
          onSubmit={handleAddSubmit}
          isLoading={fetch.isLoading}
          error={fetch.error}
        />
        <EditCallStatusDrawer
          isOpen={drawer.showEditDrawer}
          onClose={drawer.closeEditDrawer}
          validationSchema={editCallStatusValidationSchema}
          initialValues={form.editInitialValues}
          onSubmit={handleEditSubmit}
          isLoading={fetch.isLoading}
          error={fetch.error}
          editingItem={drawer.editingItem}
        />
        <DeleteCallStatusDialog
          isOpen={!!table.deletingItem}
          itemName={table.deletingItem?.name || ''}
          onConfirm={handleConfirmDelete}
          onClose={table.closeDeleteDialog}
        />
      </div>
      <ToastNotification message={toastMessage} type={toastType} visible={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
};

export default CallStatusPage;
