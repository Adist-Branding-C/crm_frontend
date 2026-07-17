import { useCallback, useRef } from 'react';
import { Download, Plus } from 'lucide-react';
import { useFetchCallReasons } from '../hooks/useFetchCallReasons';
import { useCallReasonCrud } from '../hooks/useCallReasonCrud';
import { useCallReasonDrawer } from '../hooks/useCallReasonDrawer';
import { useCallReasonForm } from '../hooks/useCallReasonForm';
import { useCallReasonDeleteConfirm } from '../hooks/useCallReasonDeleteConfirm';
import { useCallReasonFormSubmit } from '../hooks/useCallReasonFormSubmit';
import { useCallReasonRowActions } from '../hooks/useCallReasonRowActions';
import { useDropdownMenu } from '../../../../shared/hooks/useDropdownMenu';
import { useToast } from '../../../../shared/hooks/useToast';
import { useTaskSettingsSearch } from '../../hooks/useTaskSettingsSearch';
import { SETTINGS_TABS } from '../../constants/index';
import { addCallReasonValidationSchema, editCallReasonValidationSchema } from '../validations/index';
import { ADD_CALL_REASON_INITIAL_VALUES, CALL_REASON_CSV_COLUMNS } from '../constants/index';
import { exportToCsv } from '../../../../shared/helpers/csvExport.helper';
import CallReasonForm from '../components/CallReasonForm';
import CallReasonRow from '../components/CallReasonRow';
import Drawer from '../../../../shared/components/Drawer';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import { Table, THead, TBody, TRow, TCell, TableNav, Pagination, EmptyState } from '../../../../shared/components/table';
import ToastNotification from '../../../../shared/components/ToastNotification';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../components/SettingsTabs/SettingsTabs';
import './CallReason.css';

const CallReasonPage = () => {
  const fetch = useFetchCallReasons();
  const toast = useToast();
  const crud = useCallReasonCrud({ pagination: fetch, showToastMessage: toast.showToastMessage });
  const drawer = useCallReasonDrawer();
  const form = useCallReasonForm(drawer.editingItem);
  const dropdown = useDropdownMenu<number>();
  const deleteConfirm = useCallReasonDeleteConfirm(crud.handleDeleteCallReason);
  const formSubmit = useCallReasonFormSubmit({
    editingItem: drawer.editingItem,
    closeAddDrawer: drawer.closeAddDrawer,
    closeEditDrawer: drawer.closeEditDrawer,
    handleAddCallReason: crud.handleAddCallReason,
    handleUpdateCallReason: crud.handleUpdateCallReason,
  });
  const rowActions = useCallReasonRowActions({
    openEditDrawer: drawer.openEditDrawer,
    onDeleteClick: deleteConfirm.handleDeleteClick,
    closeDropdown: dropdown.closeDropdown,
  });

  const { searchValue, handleSearchInput } = useTaskSettingsSearch(fetch.searchQuery, fetch.handleSearchChange);

  const handleExportCSV = useCallback(() => {
    exportToCsv(fetch.callReasonList, CALL_REASON_CSV_COLUMNS, 'call-reasons.csv');
  }, [fetch.callReasonList]);

  const addDrawerBodyRef = useRef<HTMLDivElement>(null);
  const editDrawerBodyRef = useRef<HTMLDivElement>(null);

  return (
    <div className="task-settings-page">
      <PageHeader title="Task Settings" description="Manage task configurations and settings" />
      <SettingsTabs tabs={SETTINGS_TABS} />
      <div className="account-content">
        <div className="call-reason-table-wrapper table-container">
          <TableNav
            searchQuery={searchValue}
            onSearchChange={handleSearchInput}
            rowsPerPage={fetch.limit}
            onRowsPerPageChange={(e) => fetch.handleRowsPerPageChange(Number(e.target.value))}
          >
            <button className="btn btn-secondary" onClick={handleExportCSV} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <Download size={16} />Export
            </button>
            <button className="btn btn-primary" onClick={drawer.openAddDrawer} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={16} /> Add Reason
            </button>
          </TableNav>

          <Table wrapperClassName="table-scroll" className="data-table">
            <THead>
              <TRow>
                <TCell variant="th">Sl No</TCell>
                <TCell variant="th">Reason</TCell>
                <TCell variant="th">Status</TCell>
                <TCell variant="th">Actions</TCell>
              </TRow>
            </THead>
            <TBody>
              {fetch.callReasonList.length === 0 ? (
                <EmptyState colSpan={4} />
              ) : (
                fetch.callReasonList.map((item, index) => (
                  <CallReasonRow
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

        <Drawer isOpen={drawer.showAddDrawer} onClose={drawer.closeAddDrawer} title="Add Call Reason" ref={addDrawerBodyRef}>
          <CallReasonForm
            validationSchema={addCallReasonValidationSchema}
            initialValues={ADD_CALL_REASON_INITIAL_VALUES}
            onSubmit={formSubmit.handleSubmit}
            onCancel={drawer.closeAddDrawer}
            isLoading={fetch.isLoading}
            error={fetch.error}
            bodyRef={addDrawerBodyRef}
          />
        </Drawer>

        <Drawer isOpen={drawer.showEditDrawer} onClose={drawer.closeEditDrawer} title="Edit Call Reason" ref={editDrawerBodyRef}>
          <CallReasonForm
            validationSchema={editCallReasonValidationSchema}
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

export default CallReasonPage;
