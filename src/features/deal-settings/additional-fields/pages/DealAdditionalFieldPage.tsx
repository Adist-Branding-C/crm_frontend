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
import { exportDealAdditionalFieldsToCsv } from '../helpers/exportDealAdditionalFields.helper';
import { Table, THead, TBody, TRow, TCell, TableNav, Pagination, EmptyState } from '../../../../shared/components/table';
import DealAdditionalFieldFormPanel from '../components/DealAdditionalFieldFormPanel';
import DeleteDealAdditionalFieldModal from '../components/DeleteDealAdditionalFieldModal';
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
  const crud = useDealAdditionalFieldCrud({
    editingItem: drawer.editingItem,
    closeDrawer: drawer.closeDrawer,
    setError: pagination.setError,
    refresh: pagination.refresh,
  });
  const deleteConfirm = useDeleteConfirmation<DealAdditionalField>(crud.handleDelete);
  const { handleEditClick, handleDeleteClick } = useRowActions<DealAdditionalField>({
    onEdit: drawer.openEditDrawer,
    onDelete: deleteConfirm.handleDeleteClick,
    closeDropdown: dropdown.closeDropdown,
  });

  return (
    <PageContainer>
      <PageHeader title="Deal Settings" description="Manage deal types, stages and custom fields" />
      <SettingsTabs items={dealSettingsTabs} />

      <div className="additional-fields-layout">
        <div className="additional-form-panel">
          <DealAdditionalFieldFormPanel initialValues={drawer.drawerInitialValues} editingItem={drawer.editingItem}
            onSubmit={crud.handleSubmit} />
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
                  <TCell variant="th">in filter</TCell>
                  <TCell variant="th">in list</TCell>
                  <TCell variant="th">Required</TCell>
                  <TCell variant="th">Actions</TCell>
                </TRow>
              </THead>
              <TBody>
                {pagination.list.length === 0 ? (
                  <EmptyState colSpan={7} />
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

      {deleteConfirm.deletingItem && (
        <DeleteDealAdditionalFieldModal deletingItem={deleteConfirm.deletingItem}
          onConfirm={deleteConfirm.handleConfirmDelete} onClose={deleteConfirm.closeDeleteModal} />
      )}
    </PageContainer>
  );
};

export default DealAdditionalFieldPage;
