import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDown, ArrowUp, ArrowUpDown, Download, Filter, Loader2, Plus } from 'lucide-react';
import { useDrawer } from '../../../shared/hooks/useDrawer';
import { useRowDropdown } from '../../../shared/hooks/useRowDropdown';
import { useDebouncedSearch } from '../../../shared/hooks/useDebouncedSearch';
import { useFetchCampaigns } from '../hooks/useFetchCampaigns';
import { useCampaignSubmitHandlers } from '../hooks/useCampaignSubmitHandlers';
import { useCampaignExport } from '../hooks/useCampaignExport';
import { useAgentFilterOptions } from '../hooks/useAgentFilterOptions';
import { useToast } from '../../task-settings/hooks/useToast';
import { CampaignMapper } from '../mappers/campaign.mapper';
import { campaignValidationSchema } from '../validations/index';
import { ADD_CAMPAIGN_INITIAL_VALUES } from '../constants/index';
import { LABEL_NO_DATA } from '../../../shared/constants/labels';
import { ACTION_FILTER } from '../../../shared/constants/actionLabels';
import CampaignForm from '../components/CampaignForm';
import CampaignRow from '../components/CampaignRow';
import CampaignFilters from '../components/CampaignFilters';
import DeleteCampaignDialog from '../components/DeleteCampaignDialog';
import ToastNotification from '../../task-settings/components/ToastNotification';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import Drawer from '../../../shared/components/Drawer';
import Modal from '../../../shared/components/Modal';
import { Table, THead, TBody, TRow, TCell, TableNav, Pagination, EmptyState } from '../../../shared/components/table';
import type { Campaign, CampaignSortField } from '../types';
import './CampaignsPage.css';

const CampaignsPage = () => {
  const navigate = useNavigate();
  const fetch = useFetchCampaigns();
  const addDrawer = useDrawer();
  const editDrawer = useDrawer<Campaign>();
  const deleteDialog = useDrawer<Campaign>();
  const dropdown = useRowDropdown();
  const toast = useToast();
  const { handleExportCSV, isExporting, exportError } = useCampaignExport(fetch.searchQuery);
  const { agents: agentOptions, isLoading: agentOptionsLoading } = useAgentFilterOptions();
  const [showFilters, setShowFilters] = useState(false);
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

  const { searchValue, handleSearchChange } = useDebouncedSearch(fetch.handleSearchChange);

  const handleRowsPerPageChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    fetch.handleRowsPerPageChange(Number(e.target.value));
  }, [fetch.handleRowsPerPageChange]);

  const editInitialValues = useMemo(
    () => CampaignMapper.toFormValues(editDrawer.item),
    [editDrawer.item],
  );

  useEffect(() => {
    if (exportError) {
      toast.showToastMessage(exportError, 'error');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportError]);

  const handleViewLeads = useCallback((campaign: Campaign) => {
    navigate(`/campaigns/${campaign.id}/leads`);
  }, [navigate]);

  const renderSortableHeader = (label: string, field: CampaignSortField): ReactNode => {
    const isActive = fetch.sortBy === field;
    const Icon = isActive ? (fetch.sortOrder === 'ASC' ? ArrowUp : ArrowDown) : ArrowUpDown;
    return (
      <button type="button" className="sortable-column-header" onClick={() => fetch.onSortChange(field)}>
        {label}
        <Icon size={14} />
      </button>
    );
  };

  return (
    <PageContainer>
      <PageHeader title="Campaigns" description="Manage campaign tasks and activities." />

      <div className="table-container">
        <TableNav
          searchQuery={searchValue}
          onSearchChange={handleSearchChange}
          rowsPerPage={fetch.limit}
          onRowsPerPageChange={handleRowsPerPageChange}
        >
          <button className="btn btn-secondary" onClick={() => setShowFilters((prev) => !prev)}>
            <Filter size={16} /> {ACTION_FILTER}
          </button>
          <button className="btn btn-secondary" onClick={handleExportCSV} disabled={isExporting}>
            {isExporting ? <Loader2 size={16} className="spin" /> : <Download size={16} />}Export
          </button>
          <button className="btn btn-primary" onClick={() => addDrawer.open()}>
            <Plus size={16} /> Campaign
          </button>
        </TableNav>

        {showFilters && (
          <CampaignFilters
            filters={fetch.filters}
            onFilterChange={fetch.setFilter}
            onClearFilters={fetch.clearFilters}
            onClose={() => setShowFilters(false)}
            agentOptions={agentOptions}
            agentOptionsLoading={agentOptionsLoading}
          />
        )}

        <Table wrapperClassName="table-scroll" className="data-table">
          <THead>
            <TRow>
              <TCell variant="th">Sl No</TCell>
              <TCell variant="th">{renderSortableHeader('Name', 'name')}</TCell>
              <TCell variant="th">Type</TCell>
              <TCell variant="th">Total Tasks</TCell>
              <TCell variant="th">Completed Tasks</TCell>
              <TCell variant="th">{renderSortableHeader('Completed %', 'progress')}</TCell>
              <TCell variant="th">Created By</TCell>
              <TCell variant="th">Pool Agents</TCell>
              <TCell variant="th">Created At</TCell>
              <TCell variant="th">Actions</TCell>
            </TRow>
          </THead>
          <TBody>
            {fetch.isLoading ? (
              <EmptyState colSpan={10} message="Loading campaigns..." />
            ) : fetch.campaignList.length === 0 ? (
              <EmptyState colSpan={10} message={LABEL_NO_DATA} />
            ) : (
              fetch.campaignList.map((campaign) => (
                <CampaignRow
                  key={campaign.id}
                  campaign={campaign}
                  dropdownOpen={dropdown.dropdownOpen}
                  onToggleDropdown={dropdown.toggleDropdown}
                  onView={handleViewLeads}
                  onEdit={editDrawer.open}
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
          isDeleting={handlers.isDeleting}
          error={handlers.deleteError}
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
