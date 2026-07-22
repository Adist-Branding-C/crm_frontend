import { useMemo, useRef } from 'react';
import { Download, Plus } from 'lucide-react';
import { useDrawer } from '../../../../shared/hooks/useDrawer';
import { useDropdownMenu } from '../../../../shared/hooks/useDropdownMenu';
import { useRowActions } from '../../../../shared/hooks/useRowActions';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { useToast } from '../../../task-settings/hooks/useToast';
import { useDealStatusSubmitHandlers } from '../hooks/useDealStatusSubmitHandlers';
import { dealStatusService } from '../services/dealStatus.service';
import { DealStatusMapper } from '../mappers/dealStatus.mapper';
import { ADD_DEAL_STATUS_INITIAL_VALUES } from '../constants/deal-status.constants';
import { exportDealStatusRowsToCsv } from '../helpers/exportDealStatusRows.helper';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import PageContainer from '../../../../shared/components/layout/PageContainer';
import SettingsTabs from '../../../../shared/components/SettingsTabs';
import { dealSettingsTabs } from '../../shared/dealSettingsTabs';
import Drawer from '../../../../shared/components/Drawer';
import { Table, THead, TBody, TRow, TCell, TableNav, Pagination, EmptyState } from '../../../../shared/components/table';
import DealStatusForm from '../components/DealStatusForm';
import DealStatusRow from '../components/DealStatusRow';
import DeleteDealStatusModal from '../components/DeleteDealStatusModal';
import ToastNotification from '../../../task-settings/components/ToastNotification';
import type { DealStatusItem } from '../types/interface';
import './DealStatusPage.css';

const DealStatusPage = () => {
  const pagination = useTableData<DealStatusItem>({
    fetchFn: async (params) => {
      const response = await dealStatusService.getAllDealStatuses(params);
      if (!response.status) throw new Error(response.message || 'Failed to fetch deal statuses');
      return DealStatusMapper.toListResult(response);
    },
  });
  const addDrawer = useDrawer();
  const editDrawer = useDrawer<DealStatusItem>();
  const deleteDialog = useDrawer<DealStatusItem>();
  const dropdown = useDropdownMenu<number>();
  const toast = useToast();
  const formBodyRef = useRef<HTMLDivElement>(null);

  const handlers = useDealStatusSubmitHandlers(
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
    () => editDrawer.item ? DealStatusMapper.toFormData(editDrawer.item) : ADD_DEAL_STATUS_INITIAL_VALUES,
    [editDrawer.item],
  );

  const { handleEditClick, handleDeleteClick } = useRowActions<DealStatusItem>({
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
          {/* <button className="btn btn-secondary" onClick={() => exportDealStatusRowsToCsv(pagination.list, 'deal-stages.csv')} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Download size={16} /> Export
          </button> */}
          <button className="btn btn-primary" onClick={() => addDrawer.open()} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={16} /> Add Deal Status
          </button>
        </TableNav>

        <Table wrapperClassName="table-scroll" className="data-table">
          <THead>
            <TRow>
              <TCell variant="th">Sl No</TCell>
              <TCell variant="th">Name</TCell>
              <TCell variant="th">Stage</TCell>
              <TCell variant="th">Status</TCell>
              <TCell variant="th">Actions</TCell>
            </TRow>
          </THead>
          <TBody>
            {pagination.list.length === 0 ? (
              <EmptyState colSpan={5} />
            ) : (
              pagination.list.map((item, idx) => (
                <DealStatusRow
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

      <Drawer ref={formBodyRef} isOpen={addDrawer.isOpen} onClose={addDrawer.close} title="Add Deal Status">
        <DealStatusForm
          editingItem={null}
          initialValues={ADD_DEAL_STATUS_INITIAL_VALUES}
          onSubmit={handlers.handleAddSubmit}
          isLoading={false}
          error={pagination.error}
          onCancel={addDrawer.close}
          scrollContainerRef={formBodyRef}
        />
      </Drawer>

      <Drawer ref={formBodyRef} isOpen={editDrawer.isOpen} onClose={editDrawer.close} title="Edit Deal Status">
        <DealStatusForm
          editingItem={editDrawer.item}
          initialValues={editInitialValues}
          onSubmit={handlers.handleEditSubmit}
          isLoading={false}
          error={pagination.error}
          onCancel={editDrawer.close}
          scrollContainerRef={formBodyRef}
        />
      </Drawer>

      <DeleteDealStatusModal
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

export default DealStatusPage;
