import { Plus } from 'lucide-react';
import LeadSettingsSidebar from '../../components/LeadSettingsSidebar';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { useDebouncedSearch } from '../../../../shared/hooks/useDebouncedSearch';
import { useDropdownMenu } from '../../../../shared/hooks/useDropdownMenu';
import { useEditDrawer } from '../../../../shared/hooks/useEditDrawer';
import { useLeadSourceCrud } from '../hooks/useLeadSourceCrud';
import { useLeadSourceDeleteConfirm } from '../hooks/useLeadSourceDeleteConfirm';
import { useLeadSourceFormSubmit } from '../hooks/useLeadSourceFormSubmit';
import { useLeadSourceTableActions } from '../hooks/useLeadSourceTableActions';
import { Table, THead, TBody, TRow, TCell, EmptyState, TableNav } from '../../../../shared/components/table';
import AdminPagination from '../../../../shared/components/crud/AdminPagination';
import DrawerShell from '../../../../shared/components/crud/DrawerShell';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import { LABEL_SL_NO, LABEL_ACTIONS, LABEL_NO_DATA } from '../../../../shared/constants/labels';
import { ACTION_EDIT, ACTION_ADD } from '../../../../shared/constants/actionLabels';
import './LeadSourcePage.css';
import {
  EMPTY_LEAD_SOURCE_FORM_DATA,
  ADD_LEAD_SOURCE_LABEL,
  LEAD_SOURCE_COLUMN_ADDED_BY,
  LEAD_SOURCE_COLUMN_SOURCE,
} from '../constants';
import { leadSourceService } from '../services';
import { mapApiToUI, mapItemToFormData } from '../mappers/leadSource.mapper';
import { leadSourceValidationSchema } from '../validations/leadSource.validation';
import LeadSourceForm from '../components/LeadSourceForm';
import LeadSourceRow from '../components/LeadSourceRow';
import type { LeadSourceItem, LeadSourceFormData } from '../types/interface';

const LeadSourcePage = () => {
  const table = useTableData<LeadSourceItem>({
    fetchFn: async (params) => {
      const response = await leadSourceService.getLeadSources(params.pageNumber, params.limit, params.search);
      return {
        items: (response.data?.items ?? []).map(mapApiToUI),
        total: response.data?.pagination?.total ?? 0,
      };
    },
  });

  const search = useDebouncedSearch(table.handleSearchChange);
  const dropdown = useDropdownMenu<string>();
  const drawer = useEditDrawer<LeadSourceItem, LeadSourceFormData>({
    mapItemToFormData,
    emptyFormData: EMPTY_LEAD_SOURCE_FORM_DATA,
  });
  const crud = useLeadSourceCrud({ table });
  const deleteConfirm = useLeadSourceDeleteConfirm({ handleDeleteLeadSource: crud.handleDeleteLeadSource });
  const formSubmit = useLeadSourceFormSubmit({
    editingItem: drawer.editingItem,
    closeDrawer: drawer.closeDrawer,
    handleCreateLeadSource: crud.handleCreateLeadSource,
    handleUpdateLeadSource: crud.handleUpdateLeadSource,
  });
  const actions = useLeadSourceTableActions({ table, drawer, dropdown, deleteConfirm });

  return (
    <div className="lead-settings-page">
      <PageHeader title="Lead Source" description="Manage lead source channels" />
      <LeadSettingsSidebar />
      <div className="settings-content">
        <div className="table-container">
          <TableNav searchQuery={search.searchValue} onSearchChange={search.handleSearchChange}
            rowsPerPage={table.limit} onRowsPerPageChange={actions.handleRowsPerPageChange}>
            <button className="btn btn-primary" onClick={drawer.openAddDrawer}>
              <Plus size={16} /> {ADD_LEAD_SOURCE_LABEL}
            </button>
          </TableNav>

          <Table wrapperClassName="table-scroll" className="data-table">
            <THead>
              <TRow>
                <TCell variant="th">{LABEL_SL_NO}</TCell>
                <TCell variant="th">{LEAD_SOURCE_COLUMN_ADDED_BY}</TCell>
                <TCell variant="th">{LEAD_SOURCE_COLUMN_SOURCE}</TCell>
                <TCell variant="th">{LABEL_ACTIONS}</TCell>
              </TRow>
            </THead>
            <TBody>
              {table.list.length === 0 ? (
                <EmptyState colSpan={4} message={LABEL_NO_DATA} />
              ) : (
                table.list.map((item, idx) => (
                  <LeadSourceRow
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
        title={drawer.editingItem ? `${ACTION_EDIT} Lead Source` : `${ACTION_ADD} Lead Source`}
        onClose={drawer.closeDrawer}
      >
        <LeadSourceForm
          form={{
            validationSchema: leadSourceValidationSchema,
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
      <AdminDeleteModal isOpen={!!deleteConfirm.deletingItem} itemName={deleteConfirm.deletingItem?.source} itemType="lead source"
        onConfirm={deleteConfirm.handleConfirmDelete} onClose={deleteConfirm.closeDeleteModal} />
    </div>
  );
};

export default LeadSourcePage;
