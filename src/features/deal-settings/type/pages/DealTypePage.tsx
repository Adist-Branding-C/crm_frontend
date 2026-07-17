import { Download, Plus } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import PageContainer from '../../../../shared/components/layout/PageContainer';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { dealSettingsTabs } from '../../shared/dealSettingsTabs';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { useDropdownMenu } from '../../../../shared/hooks/useDropdownMenu';
import { useDeleteConfirmation } from '../../../../shared/hooks/useDeleteConfirmation';
import { useRowActions } from '../../../../shared/hooks/useRowActions';
import { useDealTypeDrawer, useDealTypeCrud } from '../hooks';
import { dealTypeService } from '../services/dealType.service';
import { DealTypeMapper } from '../mappers/dealType.mapper';
import { exportNameStatusRowsToCsv } from '../../shared/helpers/exportNameStatusRows.helper';
import { Table, THead, TBody, TRow, TCell, TableNav, Pagination, EmptyState } from '../../../../shared/components/table';
import AddDealTypeDrawer from '../components/AddDealTypeDrawer';
import DeleteDealTypeModal from '../components/DeleteDealTypeModal';
import NameStatusRow from '../../shared/components/NameStatusRow';
import type { DealTypeItem } from '../types/interface';
import './DealTypePage.css';

const DealTypePage = () => {
  const pagination = useTableData<DealTypeItem>({
    fetchFn: async (params) => {
      const response = await dealTypeService.getAllDealTypes(params);
      if (!response.status) throw new Error(response.message || 'Failed to fetch deal types');
      return DealTypeMapper.toListResult(response);
    },
  });
  const drawer = useDealTypeDrawer();
  const dropdown = useDropdownMenu<number>();
  const crud = useDealTypeCrud({
    editingItem: drawer.editingItem,
    formData: drawer.formData,
    closeDrawer: drawer.closeDrawer,
    setError: pagination.setError,
    refresh: pagination.refresh,
  });
  const deleteConfirm = useDeleteConfirmation<DealTypeItem>(crud.handleDelete);
  const { handleEditClick, handleDeleteClick } = useRowActions<DealTypeItem>({
    onEdit: drawer.openEditDrawer,
    onDelete: deleteConfirm.handleDeleteClick,
    closeDropdown: dropdown.closeDropdown,
  });

  return (
    <PageContainer>
      <PageHeader title="Deal Settings" description="Manage deal types, stages and custom fields" />
      <SettingsTabs items={dealSettingsTabs} />

      <div className="table-container">
        <TableNav
          searchQuery={pagination.searchQuery}
          onSearchChange={pagination.handleSearchChange}
          rowsPerPage={pagination.limit}
          onRowsPerPageChange={pagination.handleRowsPerPageChange}
        >
          <button className="btn btn-secondary" onClick={() => exportNameStatusRowsToCsv(pagination.list, 'deal-types.csv')} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Download size={16} /> Export
          </button>
          <button className="btn btn-primary" onClick={drawer.openAddDrawer} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={16} /> Add Deal Type
          </button>
        </TableNav>

        <Table wrapperClassName="table-scroll" className="data-table">
          <THead>
            <TRow>
              <TCell variant="th">Sl No</TCell>
              <TCell variant="th">Name</TCell>
              <TCell variant="th">Status</TCell>
              <TCell variant="th">Actions</TCell>
            </TRow>
          </THead>
          <TBody>
            {pagination.list.length === 0 ? (
              <EmptyState colSpan={4} />
            ) : (
              pagination.list.map((item, idx) => (
                <NameStatusRow
                  key={item.id}
                  item={item}
                  index={idx}
                  startIndex={pagination.startIndex}
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

      <AddDealTypeDrawer isOpen={drawer.showDrawer} formData={drawer.formData}
        onChange={drawer.handleFormChange} onSave={crud.handleSave}
        onClose={drawer.closeDrawer} isEditing={!!drawer.editingItem} />
      <DeleteDealTypeModal isOpen={!!deleteConfirm.deletingItem} itemName={deleteConfirm.deletingItem?.name ?? ''}
        onConfirm={deleteConfirm.handleConfirmDelete} onClose={deleteConfirm.closeDeleteModal} />
    </PageContainer>
  );
};

export default DealTypePage;
