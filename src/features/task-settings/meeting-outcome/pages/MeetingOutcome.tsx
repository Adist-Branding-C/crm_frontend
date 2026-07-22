import { useCallback, useRef } from 'react';
import { Download, Plus } from 'lucide-react';
import { useFetchMeetingOutcomes } from '../hooks/useFetchMeetingOutcomes';
import { useMeetingOutcomeCrud } from '../hooks/useMeetingOutcomeCrud';
import { useMeetingOutcomeDrawer } from '../hooks/useMeetingOutcomeDrawer';
import { useMeetingOutcomeForm } from '../hooks/useMeetingOutcomeForm';
import { useMeetingOutcomeDeleteConfirm } from '../hooks/useMeetingOutcomeDeleteConfirm';
import { useMeetingOutcomeFormSubmit } from '../hooks/useMeetingOutcomeFormSubmit';
import { useMeetingOutcomeRowActions } from '../hooks/useMeetingOutcomeRowActions';
import { useDropdownMenu } from '../../../../shared/hooks/useDropdownMenu';
import { useToast } from '../../../../shared/hooks/useToast';
import { useTableSearch } from '../../../../shared/hooks/useTableSearch';
import { SETTINGS_TABS } from '../../constants/index';
import { addMeetingOutcomeValidationSchema, editMeetingOutcomeValidationSchema } from '../validations/index';
import { ADD_MEETING_OUTCOME_INITIAL_VALUES, MEETING_OUTCOME_CSV_COLUMNS } from '../constants/index';
import { exportToCsv } from '../../../../shared/helpers/csvExport.helper';
import MeetingOutcomeForm from '../components/MeetingOutcomeForm';
import MeetingOutcomeRow from '../components/MeetingOutcomeRow';
import Drawer from '../../../../shared/components/Drawer';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import { Table, THead, TBody, TRow, TCell, TableNav, Pagination, EmptyState } from '../../../../shared/components/table';
import ToastNotification from '../../../../shared/components/ToastNotification';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import './MeetingOutcome.css';

/**
 * Meeting-outcomes settings page: composes the fetch/crud/drawer/form/delete/row-action hooks
 * and renders them through shared table, drawer, and modal primitives. Lives at the module root
 * rather than in a page/ subfolder like its siblings (call-reason, call-status, task-category).
 */
const MeetingOutcomePage = () => {
  const fetch = useFetchMeetingOutcomes();
  const toast = useToast();
  const crud = useMeetingOutcomeCrud({ pagination: fetch, showToastMessage: toast.showToastMessage });
  const drawer = useMeetingOutcomeDrawer();
  const form = useMeetingOutcomeForm(drawer.editingItem);
  const dropdown = useDropdownMenu<number>();
  const deleteConfirm = useMeetingOutcomeDeleteConfirm(crud.handleDeleteMeetingOutcome);
  const formSubmit = useMeetingOutcomeFormSubmit({
    editingItem: drawer.editingItem,
    closeAddDrawer: drawer.closeAddDrawer,
    closeEditDrawer: drawer.closeEditDrawer,
    handleAddMeetingOutcome: crud.handleAddMeetingOutcome,
    handleUpdateMeetingOutcome: crud.handleUpdateMeetingOutcome,
  });
  const rowActions = useMeetingOutcomeRowActions({
    openEditDrawer: drawer.openEditDrawer,
    onDeleteClick: deleteConfirm.handleDeleteClick,
    closeDropdown: dropdown.closeDropdown,
  });

  const { searchValue, handleSearchInput } = useTableSearch(fetch.searchQuery, fetch.handleSearchChange);

  const handleExportCSV = useCallback(() => {
    exportToCsv(fetch.meetingOutcomeList, MEETING_OUTCOME_CSV_COLUMNS, 'meeting-outcomes.csv');
  }, [fetch.meetingOutcomeList]);

  const addDrawerBodyRef = useRef<HTMLDivElement>(null);
  const editDrawerBodyRef = useRef<HTMLDivElement>(null);

  return (
    <div className="task-settings-page">
      <PageHeader title="Task Settings" description="Manage task configurations and settings" />
      <SettingsTabs items={SETTINGS_TABS} />
      <div className="account-content">
        <div className="meeting-outcome-table-wrapper table-container">
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
              <Plus size={16} /> Add Outcome
            </button>
          </TableNav>

          <Table wrapperClassName="table-scroll" className="data-table">
            <THead>
              <TRow>
                <TCell variant="th">Sl No</TCell>
                <TCell variant="th">Outcome</TCell>
                <TCell variant="th">Status</TCell>
                <TCell variant="th">Actions</TCell>
              </TRow>
            </THead>
            <TBody>
              {fetch.meetingOutcomeList.length === 0 ? (
                <EmptyState colSpan={4} />
              ) : (
                fetch.meetingOutcomeList.map((item, index) => (
                  <MeetingOutcomeRow
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

        <Drawer isOpen={drawer.showAddDrawer} onClose={drawer.closeAddDrawer} title="Add Meeting Outcome" ref={addDrawerBodyRef}>
          <MeetingOutcomeForm
            validationSchema={addMeetingOutcomeValidationSchema}
            initialValues={ADD_MEETING_OUTCOME_INITIAL_VALUES}
            onSubmit={formSubmit.handleSubmit}
            onCancel={drawer.closeAddDrawer}
            isLoading={fetch.isLoading}
            error={fetch.error}
            bodyRef={addDrawerBodyRef}
          />
        </Drawer>

        <Drawer isOpen={drawer.showEditDrawer} onClose={drawer.closeEditDrawer} title="Edit Meeting Outcome" ref={editDrawerBodyRef}>
          <MeetingOutcomeForm
            validationSchema={editMeetingOutcomeValidationSchema}
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

export default MeetingOutcomePage;
