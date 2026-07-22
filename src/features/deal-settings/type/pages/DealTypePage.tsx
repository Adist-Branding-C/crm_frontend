import { useMemo, useRef } from 'react';
import { Download, Plus } from 'lucide-react';
import { useDrawer } from '../../../../shared/hooks/useDrawer';
import { useDropdownMenu } from '../../../../shared/hooks/useDropdownMenu';
import { useRowActions } from '../../../../shared/hooks/useRowActions';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { useToast } from '../../../task-settings/hooks/useToast';
import { useDealTypeSubmitHandlers } from '../hooks';
import { dealTypeService } from '../services/dealType.service';
import { DealTypeMapper } from '../mappers/dealType.mapper';
import { ADD_DEAL_TYPE_INITIAL_VALUES } from '../constants/deal-type.constants';
import { exportNameStatusRowsToCsv } from '../../shared/helpers/exportNameStatusRows.helper';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import PageContainer from '../../../../shared/components/layout/PageContainer';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { dealSettingsTabs } from '../../shared/dealSettingsTabs';
import Drawer from '../../../../shared/components/Drawer';
import { Table, THead, TBody, TRow, TCell, TableNav, Pagination, EmptyState } from '../../../../shared/components/table';
import DealTypeForm from '../components/DealTypeForm';
import DeleteDealTypeModal from '../components/DeleteDealTypeModal';
import NameStatusRow from '../../shared/components/NameStatusRow';
import ToastNotification from '../../../task-settings/components/ToastNotification';
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
  const addDrawer = useDrawer();
  const editDrawer = useDrawer<DealTypeItem>();
  const deleteDialog = useDrawer<DealTypeItem>();
  const dropdown = useDropdownMenu<number>();
  const toast = useToast();
  const formBodyRef = useRef<HTMLDivElement>(null);

  const handlers = useDealTypeSubmitHandlers(
    {
      onAddSuccess: addDrawer.close,
      onEditSuccess: editDrawer.close,
      onDeleteSuccess: deleteDialog.close,
      editingItem: editDrawer.item,
      deletingItem: deleteDialog.item,
    },
    { setError: pagination.setError, refresh: pagination.refresh },
    toast,
  );

  const editInitialValues = useMemo(
    () => editDrawer.item ? DealTypeMapper.toFormData(editDrawer.item) : ADD_DEAL_TYPE_INITIAL_VALUES,
    [editDrawer.item],
  );

  const { handleEditClick, handleDeleteClick } = useRowActions<DealTypeItem>({
    onEdit: (item) => editDrawer.open(item),
    onDelete: (item) => deleteDialog.open(item),
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
          {/* <button className="btn btn-secondary" onClick={() => exportNameStatusRowsToCsv(pagination.list, 'deal-types.csv')} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Download size={16} /> Export
          </button> */}
          <button className="btn btn-primary" onClick={() => addDrawer.open()} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
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

      <Drawer ref={formBodyRef} isOpen={addDrawer.isOpen} onClose={addDrawer.close} title="Add Deal Type">
        <DealTypeForm
          editingItem={null}
          initialValues={ADD_DEAL_TYPE_INITIAL_VALUES}
          onSubmit={handlers.handleAddSubmit}
          isLoading={false}
          error={pagination.error}
          onCancel={addDrawer.close}
          scrollContainerRef={formBodyRef}
        />
      </Drawer>

      <Drawer ref={formBodyRef} isOpen={editDrawer.isOpen} onClose={editDrawer.close} title="Edit Deal Type">
        <DealTypeForm
          editingItem={editDrawer.item}
          initialValues={editInitialValues}
          onSubmit={handlers.handleEditSubmit}
          isLoading={false}
          error={pagination.error}
          onCancel={editDrawer.close}
          scrollContainerRef={formBodyRef}
        />
      </Drawer>

      <DeleteDealTypeModal
        isOpen={deleteDialog.isOpen}
        itemName={deleteDialog.item?.name ?? ''}
        onConfirm={handlers.handleConfirmDelete}
        onClose={deleteDialog.close}
      />

      <ToastNotification
        message={toast.toastMessage}
        type={toast.toastType}
        visible={toast.showToast}
        onClose={() => toast.setShowToast(false)}
      />
    </PageContainer>
  );
};

export default DealTypePage;
