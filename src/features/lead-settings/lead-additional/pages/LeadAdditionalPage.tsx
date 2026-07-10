import LeadSettingsSidebar from '../../components/LeadSettingsSidebar';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { useDebouncedSearch } from '../../../../shared/hooks/useDebouncedSearch';
import { useDropdownMenu } from '../../../../shared/hooks/useDropdownMenu';
import { useAsyncOptions } from '../../../../shared/hooks/useAsyncOptions';
import { useEditDrawer } from '../../../../shared/hooks/useEditDrawer';
import { useLeadAdditionalCrud } from '../hooks/useLeadAdditionalCrud';
import { useLeadAdditionalDeleteConfirm } from '../hooks/useLeadAdditionalDeleteConfirm';
import { useLeadAdditionalFormSubmit } from '../hooks/useLeadAdditionalFormSubmit';
import { useLeadAdditionalTableActions } from '../hooks/useLeadAdditionalTableActions';
import { Table, THead, TBody, TRow, TCell, EmptyState, TableNav, SortToggleButton } from '../../../../shared/components/table';
import AdminPagination from '../../../../shared/components/crud/AdminPagination';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import AdditionalFieldForm from '../components/AdditionalFieldForm';
import AdditionalFieldRow from '../components/AdditionalFieldRow';
import { leadAdditionalService } from '../services/leadAdditionalService';
import { leadPurposeService } from '../../lead-purpose/services';
import { mapApiToUI, mapPurposeApiToUI, mapItemToFormData } from '../mappers/additionalField.mapper';
import { additionalFieldValidationSchema } from '../validations/additionalField.validation';
import { EMPTY_ADDITIONAL_FIELD_FORM_DATA } from '../constants/form.constants';
import { LABEL_SL_NO, LABEL_ACTIONS, LABEL_NO_DATA } from '../../../../shared/constants/labels';
import {
  LEAD_ADDITIONAL_COLUMN_ADDED_BY,
  LEAD_ADDITIONAL_COLUMN_FIELD,
  LEAD_ADDITIONAL_COLUMN_TYPE,
  LEAD_ADDITIONAL_COLUMN_VALUES,
  LEAD_ADDITIONAL_COLUMN_IN_FILTER,
  LEAD_ADDITIONAL_COLUMN_IN_LIST,
  LEAD_ADDITIONAL_COLUMN_REQUIRED,
  LEAD_ADDITIONAL_COLUMN_PURPOSE,
} from '../constants';
import './LeadAdditionalPage.css';
import type { LeadAdditionalItem, AdditionalFieldFormData } from '../types/interface';

const LeadAdditionalPage = () => {
  const table = useTableData<LeadAdditionalItem>({
    initialSortOrder: 'DESC',
    fetchFn: async (params) => {
      const response = await leadAdditionalService.getAll(params.pageNumber, params.limit, params.search, params.sortOrder);
      return {
        items: (response.data?.items ?? []).map(mapApiToUI),
        total: response.data?.pagination?.total ?? 0,
      };
    },
  });

  const search = useDebouncedSearch(table.handleSearchChange);
  const dropdown = useDropdownMenu<string>();
  const purposeOptions = useAsyncOptions(
    () => leadPurposeService.getLeadPurposes(1, 100).then((r) => r.data?.items ?? []),
    mapPurposeApiToUI,
  );
  const drawer = useEditDrawer<LeadAdditionalItem, AdditionalFieldFormData>({
    mapItemToFormData,
    emptyFormData: EMPTY_ADDITIONAL_FIELD_FORM_DATA,
    onOpen: () => table.setError(''),
  });
  const crud = useLeadAdditionalCrud({ table });
  const deleteConfirm = useLeadAdditionalDeleteConfirm({ handleDeleteAdditionalField: crud.handleDeleteAdditionalField });
  const formSubmit = useLeadAdditionalFormSubmit({
    editingItem: drawer.editingItem,
    closeDrawer: drawer.closeDrawer,
    handleCreateAdditionalField: crud.handleCreateAdditionalField,
    handleUpdateAdditionalField: crud.handleUpdateAdditionalField,
  });
  const actions = useLeadAdditionalTableActions({ table, drawer, dropdown, deleteConfirm, crud });

  return (
    <div className="lead-settings-page">
      <PageHeader title="Lead Settings" description="Configure lead purposes, statuses, sources and types" />

      <LeadSettingsSidebar />

      <div className="settings-content">
        <div className="additional-fields-layout">
          <AdditionalFieldForm
            form={{
              validationSchema: additionalFieldValidationSchema,
              initialValues: drawer.drawerInitialValues,
              onSubmit: drawer.editingItem ? formSubmit.handleEditSubmit : formSubmit.handleSubmit,
              isEditing: !!drawer.editingItem,
            }}
            status={{
              isSaving: crud.isSaving,
              error: crud.error,
              onClearError: actions.clearError,
            }}
            purposes={purposeOptions.options}
          />

          <div className="additional-table-panel">
            <TableNav
              searchQuery={search.searchValue}
              onSearchChange={search.handleSearchChange}
              rowsPerPage={table.limit}
              onRowsPerPageChange={actions.handleRowsPerPageChange}
            >
              <SortToggleButton sortOrder={table.sortOrder} onToggle={table.toggleSortOrder} />
            </TableNav>

            <div className="table-container">
              <Table wrapperClassName="table-scroll" className="data-table">
                <THead>
                  <TRow>
                    <TCell variant="th">{LABEL_SL_NO}</TCell>
                    <TCell variant="th">{LEAD_ADDITIONAL_COLUMN_ADDED_BY}</TCell>
                    <TCell variant="th">{LEAD_ADDITIONAL_COLUMN_FIELD}</TCell>
                    <TCell variant="th">{LEAD_ADDITIONAL_COLUMN_TYPE}</TCell>
                    <TCell variant="th">{LEAD_ADDITIONAL_COLUMN_VALUES}</TCell>
                    <TCell variant="th">{LEAD_ADDITIONAL_COLUMN_IN_FILTER}</TCell>
                    <TCell variant="th">{LEAD_ADDITIONAL_COLUMN_IN_LIST}</TCell>
                    <TCell variant="th">{LEAD_ADDITIONAL_COLUMN_REQUIRED}</TCell>
                    <TCell variant="th">{LEAD_ADDITIONAL_COLUMN_PURPOSE}</TCell>
                    <TCell variant="th">{LABEL_ACTIONS}</TCell>
                  </TRow>
                </THead>
                <TBody>
                  {table.list.length === 0 ? (
                    <EmptyState colSpan={10} message={LABEL_NO_DATA} />
                  ) : (
                    table.list.map((item, idx) => (
                      <AdditionalFieldRow
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
            </div>
            <AdminPagination
              currentPage={table.pageNumber}
              totalPages={table.totalPages}
              startIndex={table.startIndex}
              rowsPerPage={table.limit}
              totalItems={table.totalCount}
              onPageChange={table.setPageNumber}
              onRowsPerPageChange={actions.handleRowsPerPageChange}
              prevNextOnly
              alwaysShowNav
            />
          </div>
        </div>
      </div>

      <AdminDeleteModal
        isOpen={!!deleteConfirm.deletingItem}
        itemName={deleteConfirm.deletingItem?.field}
        itemType="additional field"
        error={table.error}
        onConfirm={deleteConfirm.handleConfirmDelete}
        onClose={deleteConfirm.closeDeleteModal}
      />
    </div>
  );
};

export default LeadAdditionalPage;
