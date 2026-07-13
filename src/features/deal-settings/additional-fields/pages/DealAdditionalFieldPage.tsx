import { useCallback, useMemo, useRef } from 'react';
import { Download } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import PageContainer from '../../../../shared/components/layout/PageContainer';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { dealSettingsTabs } from '../../shared/dealSettingsTabs';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { useDropdownMenu } from '../../../../shared/hooks/useDropdownMenu';
import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
import { useRowActions } from '../../../../shared/hooks/useRowActions';
import { useDealAdditionalFieldDrawer, useDealAdditionalFieldCrud } from '../hooks';
import { dealAdditionalFieldService } from '../services/dealAdditionalField.service';
import { DealAdditionalFieldMapper } from '../mappers/dealAdditionalField.mapper';
import { ADD_DEAL_ADDITIONAL_FIELD_INITIAL_VALUES } from '../constants/deal-additional-field.constants';
import { exportDealAdditionalFieldsToCsv } from '../helpers/exportDealAdditionalFields.helper';
import { Table, THead, TBody, TRow, TCell, TableNav, Pagination, EmptyState } from '../../../../shared/components/table';
import AdminConfirmationModal from '../../../../shared/components/crud/AdminConfirmationModal';
import AdminDeleteModal from '../../../../shared/components/crud/AdminDeleteModal';
import DealAdditionalFieldFormPanel from '../components/DealAdditionalFieldFormPanel';
import DealAdditionalFieldRow from '../components/DealAdditionalFieldRow';
import type { DealAdditionalField } from '../types/interface';
import './DealAdditionalFieldPage.css';

const DealAdditionalFieldPage = () => {
  const pagination = useTableData<DealAdditionalField>({
    fetchFn: async (params) => {
      const response = await dealAdditionalFieldService.getAllDealAdditionalFields(params);
      if (!response.status) throw new Error(response.message || 'Failed to fetch deal additional fields');
      return DealAdditionalFieldMapper.toListResult(response);
    },
  });

  const drawer = useDealAdditionalFieldDrawer();
  const dropdown = useDropdownMenu<string>();

  const refetchRef = useRef<() => void>(() => {});
  refetchRef.current = () => pagination.refresh();

  const crud = useDealAdditionalFieldCrud({
    editingItem: drawer.editingItem,
    closeDrawer: drawer.closeDrawer,
    setError: pagination.setError,
    refresh: useCallback(() => refetchRef.current(), []),
  });

  const deleteConfirm = useDeleteConfirmation<DealAdditionalField>(crud.handleDelete);
  const { handleEditClick, handleDeleteClick } = useRowActions<DealAdditionalField>({
    onEdit: drawer.openEditDrawer,
    onDelete: deleteConfirm.handleDeleteClick,
    closeDropdown: dropdown.closeDropdown,
  });

  const initialValues = useMemo(
    () => drawer.editingItem ? DealAdditionalFieldMapper.toFormData(drawer.editingItem) : ADD_DEAL_ADDITIONAL_FIELD_INITIAL_VALUES,
    [drawer.editingItem],
  );

  const clearError = useCallback(() => pagination.setError(''), [pagination.setError]);

  return (
    <PageContainer>
      <PageHeader title="Deal Settings" description="Manage deal types, stages and custom fields" />
      <SettingsTabs items={dealSettingsTabs} />

      <div className="additional-fields-layout">
        <div className="additional-form-panel">
          <DealAdditionalFieldFormPanel
            editingItem={drawer.editingItem}
            initialValues={initialValues}
            onSubmit={crud.requestSave}
            isSaving={crud.isSaving}
            error={pagination.error}
            onClearError={clearError}
          />
        </div>

        <div className="additional-table-panel">
          <div className="table-container">
            <TableNav
              searchQuery={pagination.searchQuery}
              onSearchChange={pagination.handleSearchChange}
              rowsPerPage={pagination.limit}
              onRowsPerPageChange={pagination.handleRowsPerPageChange}
            >
              <button className="btn btn-secondary" onClick={() => exportDealAdditionalFieldsToCsv(pagination.list)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Download size={16} /> Export
              </button>
            </TableNav>

            <Table wrapperClassName="table-scroll" className="data-table">
              <THead>
                <TRow>
                  <TCell variant="th">Sl.No</TCell>
                  <TCell variant="th">Field</TCell>
                  <TCell variant="th">Type</TCell>
                  <TCell variant="th">Values</TCell>
                  <TCell variant="th">in filter</TCell>
                  <TCell variant="th">in list</TCell>
                  <TCell variant="th">Required</TCell>
                  <TCell variant="th">Actions</TCell>
                </TRow>
              </THead>
              <TBody>
                {pagination.list.length === 0 ? (
                  <EmptyState colSpan={8} />
                ) : (
                  pagination.list.map((item, idx) => (
                    <DealAdditionalFieldRow
                      key={item.id}
                      item={item}
                      index={idx}
                      dropdownOpen={dropdown.dropdownOpen}
                      onToggleDropdown={dropdown.toggleDropdown}
                      onEdit={handleEditClick}
                      onDelete={handleDeleteClick}
                    />
                  ))
                )}
              </TBody>
            </Table>

            <Pagination
              currentPage={pagination.pageNumber}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalCount}
              rowsPerPage={pagination.limit}
              onPageChange={pagination.setPageNumber}
            />
          </div>
        </div>
      </div>

      <AdminConfirmationModal
        isOpen={crud.showSaveConfirm}
        title={crud.saveConfirmMode === 'create' ? 'Create Additional Field' : 'Update Additional Field'}
        message={crud.saveConfirmMode === 'create'
          ? 'Are you sure you want to create this Additional Field?'
          : 'Are you sure you want to update this Additional Field?'
        }
        isLoading={crud.isSaving}
        onConfirm={crud.confirmSave}
        onCancel={crud.cancelSave}
      />

      <AdminDeleteModal
        isOpen={!!deleteConfirm.deletingItem}
        itemName={deleteConfirm.deletingItem?.field}
        itemType="additional field"
        onConfirm={deleteConfirm.handleConfirmDelete}
        onClose={deleteConfirm.closeDeleteModal}
      />
    </PageContainer>
  );
};

export default DealAdditionalFieldPage;
