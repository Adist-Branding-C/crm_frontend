import { Plus } from 'lucide-react';
import LeadSettingsSidebar from '../../components/LeadSettingsSidebar';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { useDebouncedSearch } from '../../../../shared/hooks/useDebouncedSearch';
import { useDropdownMenu } from '../../../../shared/hooks/useDropdownMenu';
import { useEditDrawer } from '../../../../shared/hooks/useEditDrawer';
import { useLeadStatusCrud } from '../hooks/useLeadStatusCrud';
import { useLeadStatusDeleteConfirm } from '../hooks/useLeadStatusDeleteConfirm';
import { useLeadStatusFormSubmit } from '../hooks/useLeadStatusFormSubmit';
import { useLeadStatusTableActions } from '../hooks/useLeadStatusTableActions';
import { Table, THead, TBody, TRow, TCell, EmptyState, TableNav, SortToggleButton } from '../../../../shared/components/table';
import AdminPagination from '../../../../shared/components/crud/AdminPagination';
import DrawerShell from '../../../../shared/components/crud/DrawerShell';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import { LABEL_SL_NO, LABEL_ACTIONS, LABEL_NO_DATA } from '../../../../shared/constants/labels';
import { ACTION_EDIT, ACTION_ADD } from '../../../../shared/constants/actionLabels';
import './LeadStatusPage.css';
import {
  EMPTY_LEAD_STATUS_FORM_DATA,
  ADD_LEAD_STATUS_LABEL,
  LEAD_STATUS_COLUMN_ADDED_BY,
  LEAD_STATUS_COLUMN_STATUS,
  LEAD_STATUS_COLUMN_COLOR,
  LEAD_STATUS_COLUMN_CONVERSION,
} from '../constants';
import { leadStatusService } from '../services';
import { mapApiToUI, mapItemToFormData } from '../mappers/leadStatus.mapper';
import { leadStatusValidationSchema } from '../validations/leadStatus.validation';
import LeadStatusForm from '../components/LeadStatusForm';
import LeadStatusRow from '../components/LeadStatusRow';
import type { LeadStatusItem, LeadStatusFormData } from '../types/interface';

const LeadStatusPage = () => {
  const table = useTableData<LeadStatusItem>({
    initialSortOrder: 'DESC',
    fetchFn: async (params) => {
      const response = await leadStatusService.getLeadStatuses(params.pageNumber, params.limit, params.search, params.sortOrder);
      return {
        items: (response.data?.items ?? []).map(mapApiToUI),
        total: response.data?.pagination?.total ?? 0,
      };
    },
  });

  const search = useDebouncedSearch(table.handleSearchChange);
  const dropdown = useDropdownMenu<string>();
  const drawer = useEditDrawer<LeadStatusItem, LeadStatusFormData>({
    mapItemToFormData,
    emptyFormData: EMPTY_LEAD_STATUS_FORM_DATA,
    onOpen: () => table.setError(''),
  });
  const crud = useLeadStatusCrud({ table });
  const deleteConfirm = useLeadStatusDeleteConfirm({ handleDeleteLeadStatus: crud.handleDeleteLeadStatus });
  const formSubmit = useLeadStatusFormSubmit({
    editingItem: drawer.editingItem,
    closeDrawer: drawer.closeDrawer,
    handleCreateLeadStatus: crud.handleCreateLeadStatus,
    handleUpdateLeadStatus: crud.handleUpdateLeadStatus,
  });
  const actions = useLeadStatusTableActions({ table, drawer, dropdown, deleteConfirm });

  return (
    <div className="lead-settings-page">
      <PageHeader title="Lead Status" description="Manage lead statuses and conversion metrics" />
      <LeadSettingsSidebar />
      <div className="settings-content">
        <div className="table-container">
          <TableNav searchQuery={search.searchValue} onSearchChange={search.handleSearchChange}
            rowsPerPage={table.limit} onRowsPerPageChange={actions.handleRowsPerPageChange}>
            <SortToggleButton sortOrder={table.sortOrder} onToggle={table.toggleSortOrder} />
            <button className="btn btn-primary" onClick={drawer.openAddDrawer}>
              <Plus size={16} /> {ADD_LEAD_STATUS_LABEL}
            </button>
          </TableNav>

          <Table wrapperClassName="table-scroll" className="data-table">
            <THead>
              <TRow>
                <TCell variant="th">{LABEL_SL_NO}</TCell>
                <TCell variant="th">{LEAD_STATUS_COLUMN_ADDED_BY}</TCell>
                <TCell variant="th">{LEAD_STATUS_COLUMN_STATUS}</TCell>
                <TCell variant="th">{LEAD_STATUS_COLUMN_COLOR}</TCell>
                <TCell variant="th">{LEAD_STATUS_COLUMN_CONVERSION}</TCell>
                <TCell variant="th">{LABEL_ACTIONS}</TCell>
              </TRow>
            </THead>
            <TBody>
              {table.list.length === 0 ? (
                <EmptyState colSpan={6} message={LABEL_NO_DATA} />
              ) : (
                table.list.map((item, idx) => (
                  <LeadStatusRow
                    key={item.id}
                    item={item}
                    index={table.startIndex + idx}
                    isMenuOpen={dropdown.dropdownOpen === item.id}
                    onToggleMenu={(open) => dropdown.toggleDropdown(open ? item.id : null)}
                    onEdit={actions.handleEditClick}
                    onDelete={actions.handleDeleteClick}
                  />
                ))
              )}
            </TBody>
          </Table>

          <AdminPagination currentPage={table.pageNumber} totalPages={table.totalPages}
            startIndex={table.startIndex} rowsPerPage={table.limit} totalItems={table.totalCount}
            onPageChange={table.setPageNumber} onRowsPerPageChange={actions.handleRowsPerPageChange}
            prevNextOnly alwaysShowNav />
        </div>
      </div>
      <DrawerShell
        isOpen={drawer.showDrawer}
        title={drawer.editingItem ? `${ACTION_EDIT} Lead Status` : `${ACTION_ADD} Lead Status`}
        onClose={drawer.closeDrawer}
      >
        <LeadStatusForm
          form={{
            validationSchema: leadStatusValidationSchema,
            initialValues: drawer.drawerInitialValues,
            onSubmit: drawer.editingItem ? formSubmit.handleEditSubmit : formSubmit.handleSubmit,
            onCancel: drawer.closeDrawer,
            isEditing: !!drawer.editingItem,
          }}
          status={{
            isLoading: table.isLoading,
            error: table.error,
            onClearError: actions.clearError,
          }}
        />
      </DrawerShell>
      <AdminDeleteModal isOpen={!!deleteConfirm.deletingItem} itemName={deleteConfirm.deletingItem?.status} itemType="status"
        error={table.error} onConfirm={deleteConfirm.handleConfirmDelete} onClose={deleteConfirm.closeDeleteModal} />
    </div>
  );
};

export default LeadStatusPage;
