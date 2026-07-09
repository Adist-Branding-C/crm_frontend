import { Plus } from 'lucide-react';
import LeadSettingsSidebar from '../../components/LeadSettingsSidebar';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { useDebouncedSearch } from '../../../../shared/hooks/useDebouncedSearch';
import { useDropdownMenu } from '../../../../shared/hooks/useDropdownMenu';
import { useEditDrawer } from '../../../../shared/hooks/useEditDrawer';
import { useLeadPurposeCrud } from '../hooks/useLeadPurposeCrud';
import { useLeadPurposeDeleteConfirm } from '../hooks/useLeadPurposeDeleteConfirm';
import { useLeadPurposeFormSubmit } from '../hooks/useLeadPurposeFormSubmit';
import { useLeadPurposeTableActions } from '../hooks/useLeadPurposeTableActions';
import { Table, THead, TBody, TRow, TCell, EmptyState, TableNav } from '../../../../shared/components/table';
import AdminPagination from '../../../../shared/components/crud/AdminPagination';
import DrawerShell from '../../../../shared/components/crud/DrawerShell';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import { LABEL_SL_NO, LABEL_ACTIONS, LABEL_NO_DATA } from '../../../../shared/constants/labels';
import { ACTION_EDIT, ACTION_ADD } from '../../../../shared/constants/actionLabels';
import './LeadPurposePage.css';
import { EMPTY_LEAD_PURPOSE_FORM_DATA, ADD_LEAD_PURPOSE_LABEL, LEAD_PURPOSE_COLUMN_TITLE } from '../constants';
import { leadPurposeService } from '../services';
import { mapApiToUI, mapItemToFormData } from '../mappers/leadPurpose.mapper';
import { leadPurposeValidationSchema } from '../validations/leadPurpose.validation';
import LeadPurposeForm from '../components/LeadPurposeForm';
import LeadPurposeRow from '../components/LeadPurposeRow';
import type { LeadPurposeItem, LeadPurposeFormData } from '../types/interface';

const LeadPurposePage = () => {
  const table = useTableData<LeadPurposeItem>({
    fetchFn: async (params) => {
      const response = await leadPurposeService.getLeadPurposes(params.pageNumber, params.limit, params.search);
      return {
        items: (response.data?.items ?? []).map(mapApiToUI),
        total: response.data?.pagination?.total ?? 0,
      };
    },
  });

  const search = useDebouncedSearch(table.handleSearchChange);
  const dropdown = useDropdownMenu<string>();
  const drawer = useEditDrawer<LeadPurposeItem, LeadPurposeFormData>({
    mapItemToFormData,
    emptyFormData: EMPTY_LEAD_PURPOSE_FORM_DATA,
    onOpen: () => table.setError(''),
  });
  const crud = useLeadPurposeCrud({ table });
  const deleteConfirm = useLeadPurposeDeleteConfirm({ handleDeleteLeadPurpose: crud.handleDeleteLeadPurpose });
  const formSubmit = useLeadPurposeFormSubmit({
    editingItem: drawer.editingItem,
    closeDrawer: drawer.closeDrawer,
    handleCreateLeadPurpose: crud.handleCreateLeadPurpose,
    handleUpdateLeadPurpose: crud.handleUpdateLeadPurpose,
  });
  const actions = useLeadPurposeTableActions({ table, drawer, dropdown, deleteConfirm });

  return (
    <div className="lead-settings-page">
      <PageHeader title="Lead Purpose" description="Define lead purposes" />
      <LeadSettingsSidebar />
      <div className="settings-content">
        <div className="table-container">
          <TableNav searchQuery={search.searchValue} onSearchChange={search.handleSearchChange}
            rowsPerPage={table.limit} onRowsPerPageChange={actions.handleRowsPerPageChange}>
            <button className="btn btn-primary" onClick={drawer.openAddDrawer}>
              <Plus size={16} /> {ADD_LEAD_PURPOSE_LABEL}
            </button>
          </TableNav>

          <Table wrapperClassName="table-scroll" className="data-table">
            <THead>
              <TRow>
                <TCell variant="th">{LABEL_SL_NO}</TCell>
                <TCell variant="th">{LEAD_PURPOSE_COLUMN_TITLE}</TCell>
                <TCell variant="th">{LABEL_ACTIONS}</TCell>
              </TRow>
            </THead>
            <TBody>
              {table.list.length === 0 ? (
                <EmptyState colSpan={3} message={LABEL_NO_DATA} />
              ) : (
                table.list.map((item, idx) => (
                  <LeadPurposeRow
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
            prevNextOnly />
        </div>
      </div>
      <DrawerShell
        isOpen={drawer.showDrawer}
        title={drawer.editingItem ? `${ACTION_EDIT} Lead Purpose` : `${ACTION_ADD} Lead Purpose`}
        onClose={drawer.closeDrawer}
      >
        <LeadPurposeForm
          form={{
            validationSchema: leadPurposeValidationSchema,
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
      <AdminDeleteModal isOpen={!!deleteConfirm.deletingItem} itemName={deleteConfirm.deletingItem?.title} itemType="lead purpose"
        error={table.error} onConfirm={deleteConfirm.handleConfirmDelete} onClose={deleteConfirm.closeDeleteModal} />
    </div>
  );
};

export default LeadPurposePage;
