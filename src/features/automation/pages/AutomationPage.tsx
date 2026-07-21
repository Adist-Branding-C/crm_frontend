import { useCallback } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useDrawer } from '../../../shared/hooks/useDrawer';
import { useRowDropdown } from '../../../shared/hooks/useRowDropdown';
import { useDebouncedSearch } from '../../../shared/hooks/useDebouncedSearch';
import { useFetchAutomations, useAutomationSubmitHandlers } from '../hooks';
import { useToast } from '../../task-settings/hooks/useToast';
import { LABEL_NO_DATA } from '../../../shared/constants/labels';
import AutomationRow from '../components/AutomationRow';
import DeleteAutomationDialog from '../components/DeleteAutomationDialog';
import ToastNotification from '../../task-settings/components/ToastNotification';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import Modal from '../../../shared/components/Modal';
import { Table, THead, TBody, TRow, TCell, TableNav, Pagination, EmptyState } from '../../../shared/components/table';
import type { AutomationRule } from '../types';

const AutomationPage = () => {
  const navigate = useNavigate();
  const fetch = useFetchAutomations();
  const deleteDialog = useDrawer<AutomationRule>();
  const dropdown = useRowDropdown<string>();
  const toast = useToast();

  const handlers = useAutomationSubmitHandlers(
    {
      onDeleteSuccess: deleteDialog.close,
      deletingItem: deleteDialog.item,
    },
    fetch,
    toast,
  );

  const { searchValue, handleSearchChange: handleSearchInputChange } = useDebouncedSearch(fetch.handleSearchChange);

  const { handleRowsPerPageChange: setRowsPerPage } = fetch;
  const handleRowsPerPageChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
  }, [setRowsPerPage]);

  const handleEdit = useCallback((automation: AutomationRule) => {
    navigate(`/automation/${automation.id}/edit`);
  }, [navigate]);

  return (
    <PageContainer>
      <PageHeader
        title="Automation"
        description="Automate lead assignment, tasks, webhooks, and reminders based on rules you define."
        breadcrumb={false}
      />

      <div className="table-container">
        <TableNav
          searchQuery={searchValue}
          onSearchChange={handleSearchInputChange}
          searchPlaceholder="Search automations..."
          rowsPerPage={fetch.limit}
          onRowsPerPageChange={handleRowsPerPageChange}
        >
          <button className="btn btn-primary" onClick={() => navigate('/automation/create')} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={16} /> Add Automation
          </button>
        </TableNav>

        <Table wrapperClassName="table-scroll" className="data-table">
          <THead>
            <TRow>
              <TCell variant="th">Sl No</TCell>
              <TCell variant="th">Name</TCell>
              <TCell variant="th">Type</TCell>
              <TCell variant="th">Created At</TCell>
              <TCell variant="th">Status</TCell>
              <TCell variant="th">Actions</TCell>
            </TRow>
          </THead>
          <TBody>
            {fetch.automationList.length === 0 ? (
              <EmptyState colSpan={6} message={LABEL_NO_DATA} />
            ) : (
              fetch.automationList.map((automation) => (
                <AutomationRow
                  key={automation.id}
                  automation={automation}
                  dropdownOpen={dropdown.dropdownOpen}
                  onToggleDropdown={dropdown.toggleDropdown}
                  onEdit={handleEdit}
                  onDelete={deleteDialog.open}
                  onToggleStatus={handlers.handleToggleStatus}
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

      <Modal isOpen={deleteDialog.isOpen} onClose={deleteDialog.close} title="Confirm Delete" maxWidth="450px">
        <DeleteAutomationDialog
          itemName={deleteDialog.item?.name || ''}
          onConfirm={handlers.handleConfirmDelete}
          onCancel={deleteDialog.close}
        />
      </Modal>

      <ToastNotification
        message={toast.toastMessage}
        type={toast.toastType}
        visible={toast.showToast}
        onClose={() => toast.setShowToast(false)}
      />
    </PageContainer>
  );
};

export default AutomationPage;
