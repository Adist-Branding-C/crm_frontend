import { useCallback, useMemo, useRef } from 'react';
import { Download, Plus } from 'lucide-react';
import { useDrawer } from '../../../shared/hooks/useDrawer';
import { useRowDropdown } from '../../../shared/hooks/useRowDropdown';
import { useDebouncedSearch } from '../../../shared/hooks/useDebouncedSearch';
import { useFetchCampaigns } from '../hooks/useFetchCampaigns';
import { useCampaignSubmitHandlers } from '../hooks/useCampaignSubmitHandlers';
import { useCampaignExport } from '../hooks/useCampaignExport';
import { useToast } from '../../task-settings/hooks/useToast';
import { CampaignMapper } from '../mappers/campaign.mapper';
import { campaignValidationSchema } from '../validations/index';
import { ADD_CAMPAIGN_INITIAL_VALUES } from '../constants/index';
import { LABEL_NO_DATA } from '../../../shared/constants/labels';
import CampaignForm from '../components/CampaignForm';
import CampaignRow from '../components/CampaignRow';
import DeleteCampaignDialog from '../components/DeleteCampaignDialog';
import ToastNotification from '../../task-settings/components/ToastNotification';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import Drawer from '../../../shared/components/Drawer';
import Modal from '../../../shared/components/Modal';
import { Table, THead, TBody, TRow, TCell, TableNav, Pagination, EmptyState } from '../../../shared/components/table';
import type { Campaign } from '../types';
import './CampaignsPage.css';

const CampaignsPage = () => {
  const fetch = useFetchCampaigns();
  const addDrawer = useDrawer();
  const editDrawer = useDrawer<Campaign>();
  const deleteDialog = useDrawer<Campaign>();
  const dropdown = useRowDropdown();
  const toast = useToast();
  const { handleExportCSV } = useCampaignExport(fetch.campaignList);
  const formBodyRef = useRef<HTMLDivElement>(null);

  const handlers = useCampaignSubmitHandlers(
    {
      onAddSuccess: addDrawer.close,
      onEditSuccess: editDrawer.close,
      onDeleteSuccess: deleteDialog.close,
      editingItem: editDrawer.item,
      deletingItem: deleteDialog.item,
    },
    fetch,
    toast,
  );

  const { searchValue, handleSearchInput } = useDebouncedSearch(fetch.searchQuery, fetch.handleSearchChange);

  const editInitialValues = useMemo(
    () => CampaignMapper.toFormValues(editDrawer.item),
    [editDrawer.item],
  );

  const handleView = useCallback((_campaign: Campaign) => {}, []);
  const handleAssignClick = useCallback((_campaign: Campaign) => {}, []);

  return (
    <PageContainer>
      <PageHeader title="Campaigns" description="Manage campaign tasks and activities." />

      <div className="table-container">
        <TableNav
          searchQuery={searchValue}
          onSearchChange={handleSearchInput}
          rowsPerPage={fetch.limit}
          onRowsPerPageChange={fetch.handleRowsPerPageChange}
        >
          <button className="btn btn-secondary" onClick={handleExportCSV} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Download size={16} />Export
          </button>
          <button className="btn btn-primary" onClick={() => addDrawer.open()} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={16} /> Campaign
          </button>
        </TableNav>

        <Table wrapperClassName="table-scroll" className="data-table">
          <THead>
            <TRow>
              <TCell variant="th">Sl No</TCell>
              <TCell variant="th">Name</TCell>
              <TCell variant="th">Type</TCell>
              <TCell variant="th">Total Tasks</TCell>
              <TCell variant="th">Completed Tasks</TCell>
              <TCell variant="th">Completed %</TCell>
              <TCell variant="th">Created By</TCell>
              <TCell variant="th">Created At</TCell>
              <TCell variant="th">Actions</TCell>
            </TRow>
          </THead>
          <TBody>
            {fetch.campaignList.length === 0 ? (
              <EmptyState colSpan={9} message={LABEL_NO_DATA} />
            ) : (
              fetch.campaignList.map((campaign) => (
                <CampaignRow
                  key={campaign.id}
                  campaign={campaign}
                  dropdownOpen={dropdown.dropdownOpen}
                  onToggleDropdown={dropdown.toggleDropdown}
                  onView={handleView}
                  onEdit={editDrawer.open}
                  onAssign={handleAssignClick}
                  onDelete={deleteDialog.open}
                />
              ))
            )}
          </TBody>
        </Table>

        <Pagination
          currentPage={fetch.pageNumber}
          totalPages={fetch.totalPages}
          totalItems={fetch.totalCount}
          rowsPerPage={fetch.limit}
          onPageChange={fetch.setPageNumber}
        />
      </div>

      <Drawer ref={formBodyRef} isOpen={addDrawer.isOpen} onClose={addDrawer.close} title="Add Campaign">
        <CampaignForm
          editingItem={null}
          validationSchema={campaignValidationSchema}
          initialValues={ADD_CAMPAIGN_INITIAL_VALUES}
          onSubmit={handlers.handleAddSubmit}
          isLoading={fetch.isLoading}
          error={fetch.error}
          onCancel={addDrawer.close}
          scrollContainerRef={formBodyRef}
        />
      </Drawer>

      <Drawer ref={formBodyRef} isOpen={editDrawer.isOpen} onClose={editDrawer.close} title="Edit Campaign">
        <CampaignForm
          editingItem={editDrawer.item}
          validationSchema={campaignValidationSchema}
          initialValues={editInitialValues}
          onSubmit={handlers.handleEditSubmit}
          isLoading={fetch.isLoading}
          error={fetch.error}
          onCancel={editDrawer.close}
          scrollContainerRef={formBodyRef}
        />
      </Drawer>

      <Modal isOpen={deleteDialog.isOpen} onClose={deleteDialog.close} title="Confirm Delete" maxWidth="450px">
        <DeleteCampaignDialog
          itemName={deleteDialog.item?.name || ''}
          onConfirm={handlers.handleConfirmDelete}
          onCancel={deleteDialog.close}
        />
      </Modal>

      <ToastNotification
        message={toast.toastMessage}
        type={toast.toastType}
        visible={toast.showToast}
        onClose={() => toast.setShowToast(false)}
      />
    </PageContainer>
  );
};

export default CampaignsPage;
