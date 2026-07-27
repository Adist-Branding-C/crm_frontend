import { useCallback, useRef } from 'react';
import { Download, Plus } from 'lucide-react';
import { useFetchCallStatus } from '../hooks/useFetchCallStatus';
import { useCallStatusCrud } from '../hooks/useCallStatusCrud';
import { useCallStatusDrawer } from '../hooks/useCallStatusDrawer';
import { useCallStatusForm } from '../hooks/useCallStatusForm';
import { useCallStatusDeleteConfirm } from '../hooks/useCallStatusDeleteConfirm';
import { useCallStatusFormSubmit } from '../hooks/useCallStatusFormSubmit';
import { useCallStatusRowActions } from '../hooks/useCallStatusRowActions';
import { useDropdownMenu } from '../../../../shared/hooks/useDropdownMenu';
import { useToast } from '../../../../shared/hooks/useToast';
import { SETTINGS_TABS } from '../../constants/index';
import { addCallStatusValidationSchema, editCallStatusValidationSchema } from '../validations/index';
import { ADD_CALL_STATUS_INITIAL_VALUES, CALL_STATUS_CSV_COLUMNS } from '../constants/index';
import { exportToCsv } from '../../../../shared/helpers/csvExport.helper';
import CallStatusForm from '../components/CallStatusForm';
import CallStatusRow from '../components/CallStatusRow';
import Drawer from '../../../../shared/components/Drawer';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import { Table, THead, TBody, TRow, TCell, TableNav, Pagination, EmptyState } from '../../../../shared/components/table';
import ToastNotification from '../../../../shared/components/ToastNotification';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import './CallStatus.css';
import { useTableSearch } from '../../../../shared/hooks/useTableSearch';

/**
 * Call-statuses settings page: composes the fetch/crud/drawer/form/delete/row-action hooks and
 * renders them through shared table, drawer, and modal primitives. Holds no business logic of
 * its own — every handler here is a single hook call or a thin event-unwrapping adapter.
 */
const CallStatusPage = () => {
  const fetch = useFetchCallStatus();
  const toast = useToast();
  const crud = useCallStatusCrud({ pagination: fetch, showToastMessage: toast.showToastMessage });
  const drawer = useCallStatusDrawer();
  const form = useCallStatusForm(drawer.editingItem);
  const dropdown = useDropdownMenu<number>();
  const deleteConfirm = useCallStatusDeleteConfirm(crud.handleDeleteCallStatus);
  const formSubmit = useCallStatusFormSubmit({
    editingItem: drawer.editingItem,
    closeAddDrawer: drawer.closeAddDrawer,
    closeEditDrawer: drawer.closeEditDrawer,
    handleAddCallStatus: crud.handleAddCallStatus,
    handleUpdateCallStatus: crud.handleUpdateCallStatus,
  });
  const rowActions = useCallStatusRowActions({
    openEditDrawer: drawer.openEditDrawer,
    onDeleteClick: deleteConfirm.handleDeleteClick,
    closeDropdown: dropdown.closeDropdown,
  });

  const { searchValue, handleSearchInput } = useTableSearch(fetch.searchQuery, fetch.handleSearchChange);

  const handleExportCSV = useCallback(() => {
    exportToCsv(fetch.callStatusList, CALL_STATUS_CSV_COLUMNS, 'call-status.csv');
  }, [fetch.callStatusList]);

  const addDrawerBodyRef = useRef<HTMLDivElement>(null);
  const editDrawerBodyRef = useRef<HTMLDivElement>(null);

  return (
    <div className="task-settings-page">
      <PageHeader title="Task Settings" description="Manage task configurations and settings" />
      <SettingsTabs items={SETTINGS_TABS} />
      <div className="account-content">
        <div className="call-status-table-wrapper table-container">
          <TableNav
            searchQuery={searchValue}
            onSearchChange={handleSearchInput}
            rowsPerPage={fetch.limit}
            onRowsPerPageChange={fetch.handleRowsPerPageChange}
          >
            {/* <button className="btn btn-secondary" onClick={handleExportCSV} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <Download size={16} />Export
            </button> */}
            <button className="btn btn-primary" onClick={drawer.openAddDrawer} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={16} /> Add Call Status
            </button>
          </TableNav>

          <Table wrapperClassName="table-scroll" className="data-table">
            <THead>
              <TRow>
                <TCell variant="th">Sl No</TCell>
                <TCell variant="th">Name</TCell>
                <TCell variant="th">Created By</TCell>
                <TCell variant="th">Status</TCell>
                <TCell variant="th">Actions</TCell>
              </TRow>
            </THead>
            <TBody>
              {fetch.callStatusList.length === 0 ? (
                <EmptyState colSpan={5} />
              ) : (
                fetch.callStatusList.map((item, index) => (
                  <CallStatusRow
                    key={item.id}
                    item={item}
                    index={fetch.startIndex + index}
                    dropdownOpen={dropdown.dropdownOpen}
                    onToggleDropdown={dropdown.toggleDropdown}
                    onEdit={rowActions.handleEditClick}
                    onDelete={rowActions.handleDeleteClick}
                  />
                ))
              )}
            </TBody>
          </Table>

          <Pagination
            currentPage={fetch.pageNumber}
            totalPages={fetch.totalPages}
            totalItems={fetch.totalCount}
            rowsPerPage={fetch.limit}
            onPageChange={fetch.setPageNumber}
          />
        </div>

        <Drawer isOpen={drawer.showAddDrawer} onClose={drawer.closeAddDrawer} title="Add Call Status" ref={addDrawerBodyRef}>
          <CallStatusForm
            validationSchema={addCallStatusValidationSchema}
            initialValues={ADD_CALL_STATUS_INITIAL_VALUES}
            onSubmit={formSubmit.handleSubmit}
            onCancel={drawer.closeAddDrawer}
            isLoading={fetch.isLoading}
            error={fetch.error}
            bodyRef={addDrawerBodyRef}
          />
        </Drawer>

        <Drawer isOpen={drawer.showEditDrawer} onClose={drawer.closeEditDrawer} title="Edit Call Status" ref={editDrawerBodyRef}>
          <CallStatusForm
            validationSchema={editCallStatusValidationSchema}
            initialValues={form.editInitialValues}
            onSubmit={formSubmit.handleEditSubmit}
            onCancel={drawer.closeEditDrawer}
            isLoading={fetch.isLoading}
            error={fetch.error}
            isEditing
            bodyRef={editDrawerBodyRef}
          />
        </Drawer>

        <AdminDeleteModal
          isOpen={!!deleteConfirm.deletingItem}
          itemName={deleteConfirm.deletingItem?.name || ''}
          onConfirm={deleteConfirm.handleConfirmDelete}
          onClose={deleteConfirm.closeDeleteModal}
        />
      </div>
      <ToastNotification
        isVisible={toast.showToast}
        type={toast.toastType}
        message={toast.toastMessage}
        onDismiss={() => toast.setShowToast(false)}
      />
    </div>
  );
};

export default CallStatusPage;
