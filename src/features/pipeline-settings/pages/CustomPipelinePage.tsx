import { Plus } from 'lucide-react';
import { useTableData } from '../../../shared/hooks/useTableData';
import { useDebouncedSearch } from '../../../shared/hooks/useDebouncedSearch';
import { useDropdownMenu } from '../../../shared/hooks/useDropdownMenu';
import { useEditDrawer } from '../../../shared/hooks/useEditDrawer';
import { useCustomPipelineCrud } from '../hooks/useCustomPipelineCrud';
import { useCustomPipelineDeleteConfirm } from '../hooks/useCustomPipelineDeleteConfirm';
import { useCustomPipelineFormSubmit } from '../hooks/useCustomPipelineFormSubmit';
import { useCustomPipelineTableActions } from '../hooks/useCustomPipelineTableActions';
import {
  Table,
  THead,
  TBody,
  TRow,
  TCell,
  EmptyState,
  TableNav,
  SortToggleButton,
} from '../../../shared/components/table';
import AdminPagination from '../../../shared/components/crud/AdminPagination';
import DrawerShell from '../../../shared/components/crud/DrawerShell';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import PageHeader from '../../../shared/components/layout/PageHeader';
import {
  LABEL_SL_NO,
  LABEL_ACTIONS,
  LABEL_NO_DATA,
} from '../../../shared/constants/labels';
import {
  ACTION_EDIT,
  ACTION_ADD,
} from '../../../shared/constants/actionLabels';
import './CustomPipelinePage.css';
import {
  EMPTY_CUSTOM_PIPELINE_FORM_DATA,
  ADD_CUSTOM_PIPELINE_LABEL,
  CUSTOM_PIPELINE_COLUMN_NAME,
  CUSTOM_PIPELINE_COLUMN_ENTITY_TYPE,
  CUSTOM_PIPELINE_COLUMN_GROUP_BY,
  CUSTOM_PIPELINE_COLUMN_STATUS,
} from '../constants';
import { customPipelineService } from '../services';
import {
  mapApiToUI,
  mapItemToFormData,
} from '../mappers/customPipeline.mapper';
import { customPipelineValidationSchema } from '../validations/customPipeline.validation';
import CustomPipelineForm from '../components/CustomPipelineForm';
import CustomPipelineRow from '../components/CustomPipelineRow';
import type {
  CustomPipelineItem,
  CustomPipelineFormData,
} from '../types/interface';

const CustomPipelinePage = () => {
  const table = useTableData<CustomPipelineItem>({
    fetchFn: async (params) => {
      const response = await customPipelineService.getCustomPipelines(
        params.pageNumber,
        params.limit,
        params.search,
      );
      return {
        items: (response.data?.items ?? []).map(mapApiToUI),
        total: response.data?.pagination?.total ?? 0,
      };
    },
  });

  const search = useDebouncedSearch(table.handleSearchChange);
  const dropdown = useDropdownMenu<string>();
  const drawer = useEditDrawer<CustomPipelineItem, CustomPipelineFormData>({
    mapItemToFormData,
    emptyFormData: EMPTY_CUSTOM_PIPELINE_FORM_DATA,
    onOpen: () => table.setError(''),
  });
  const crud = useCustomPipelineCrud({ table });
  const deleteConfirm = useCustomPipelineDeleteConfirm({
    handleDeleteCustomPipeline: crud.handleDeleteCustomPipeline,
  });
  const formSubmit = useCustomPipelineFormSubmit({
    editingItem: drawer.editingItem,
    closeDrawer: drawer.closeDrawer,
    handleCreateCustomPipeline: crud.handleCreateCustomPipeline,
    handleUpdateCustomPipeline: crud.handleUpdateCustomPipeline,
  });
  const actions = useCustomPipelineTableActions({
    table,
    drawer,
    dropdown,
    deleteConfirm,
  });

  return (
    <div className="pipeline-settings-page">
      <PageHeader
        title="Custom Pipeline"
        description="Configure custom pipeline structures for leads, deals, and tasks"
      />
      <div className="settings-content">
        <div className="table-container">
          <TableNav
            searchQuery={search.searchValue}
            onSearchChange={search.handleSearchChange}
            rowsPerPage={table.limit}
            onRowsPerPageChange={table.handleRowsPerPageChange}
          >
            <SortToggleButton
              sortOrder={table.sortOrder}
              onToggle={table.toggleSortOrder}
            />
            <button className="btn btn-primary" onClick={drawer.openAddDrawer}>
              <Plus size={16} /> {ADD_CUSTOM_PIPELINE_LABEL}
            </button>
          </TableNav>

          <Table wrapperClassName="table-scroll" className="data-table">
            <THead>
              <TRow>
                <TCell variant="th">{LABEL_SL_NO}</TCell>
                <TCell variant="th">{CUSTOM_PIPELINE_COLUMN_NAME}</TCell>
                <TCell variant="th">{CUSTOM_PIPELINE_COLUMN_ENTITY_TYPE}</TCell>
                <TCell variant="th">{CUSTOM_PIPELINE_COLUMN_GROUP_BY}</TCell>
                <TCell variant="th">{CUSTOM_PIPELINE_COLUMN_STATUS}</TCell>
                <TCell variant="th">{LABEL_ACTIONS}</TCell>
              </TRow>
            </THead>
            <TBody>
              {table.list.length === 0 ? (
                <EmptyState colSpan={6} message={LABEL_NO_DATA} />
              ) : (
                table.list.map((item, idx) => (
                  <CustomPipelineRow
                    key={item.id}
                    item={item}
                    index={table.startIndex + idx}
                    isMenuOpen={dropdown.dropdownOpen === item.id}
                    onToggleMenu={(open) =>
                      dropdown.toggleDropdown(open ? item.id : null)
                    }
                    onEdit={actions.handleEditClick}
                    onDelete={actions.handleDeleteClick}
                  />
                ))
              )}
            </TBody>
          </Table>

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
      <DrawerShell
        isOpen={drawer.showDrawer}
        title={
          drawer.editingItem
            ? `${ACTION_EDIT} Custom Pipeline`
            : `${ACTION_ADD} Custom Pipeline`
        }
        onClose={drawer.closeDrawer}
      >
        <CustomPipelineForm
          form={{
            validationSchema: customPipelineValidationSchema,
            initialValues: drawer.drawerInitialValues,
            onSubmit: drawer.editingItem
              ? formSubmit.handleEditSubmit
              : formSubmit.handleSubmit,
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
      <AdminDeleteModal
        isOpen={!!deleteConfirm.deletingItem}
        itemName={deleteConfirm.deletingItem?.name}
        itemType="pipeline"
        error={table.error}
        isDeleting={crud.isDeleting}
        onConfirm={deleteConfirm.handleConfirmDelete}
        onClose={deleteConfirm.closeDeleteModal}
      />
    </div>
  );
};

export default CustomPipelinePage;
