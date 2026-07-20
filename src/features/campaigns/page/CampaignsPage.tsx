import { useCallback, useRef } from 'react';
import { Download, Plus } from 'lucide-react';
import { useFetchCampaigns } from '../hooks/useFetchCampaigns';
import { useCampaignCrud } from '../hooks/useCampaignCrud';
import { useCampaignDrawer } from '../hooks/useCampaignDrawer';
import { useCampaignForm } from '../hooks/useCampaignForm';
import { useCampaignDeleteConfirm } from '../hooks/useCampaignDeleteConfirm';
import { useCampaignFormSubmit } from '../hooks/useCampaignFormSubmit';
import { useCampaignRowActions } from '../hooks/useCampaignRowActions';
import { useCampaignExport } from '../hooks/useCampaignExport';
import { useDropdownMenu } from '../../../shared/hooks/useDropdownMenu';
import { useToast } from '../../../shared/hooks/useToast';
import { useTableSearch } from '../../../shared/hooks/useTableSearch';
import { campaignValidationSchema } from '../validations/index';
import { ADD_CAMPAIGN_INITIAL_VALUES } from '../constants/index';
import { LABEL_NO_DATA } from '../../../shared/constants/labels';
import CampaignForm from '../components/CampaignForm';
import CampaignRow from '../components/CampaignRow';
import ToastNotification from '../../../shared/components/ToastNotification';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import Drawer from '../../../shared/components/Drawer';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import { Table, THead, TBody, TRow, TCell, TableNav, Pagination, EmptyState } from '../../../shared/components/table';
import type { Campaign } from '../types';
import './CampaignsPage.css';

/**
 * Campaigns page: composes the fetch/crud/drawer/form/delete/row-action hooks and renders them
 * through shared table, drawer, and modal primitives. Holds no business logic of its own — every
 * handler here is a single hook call or a thin event-unwrapping adapter. View and Assign are the
 * exception: both are intentionally unimplemented stubs (see useCampaignRowActions), so they stay
 * as inline no-ops here rather than being wired through any hook.
 */
const CampaignsPage = () => {
  const fetch = useFetchCampaigns();
  const toast = useToast();
  const crud = useCampaignCrud({ pagination: fetch, showToastMessage: toast.showToastMessage });
  const drawer = useCampaignDrawer();
  const form = useCampaignForm(drawer.editingItem);
  const dropdown = useDropdownMenu<number>();
  const deleteConfirm = useCampaignDeleteConfirm(crud.handleDeleteCampaign);
  const formSubmit = useCampaignFormSubmit({
    editingItem: drawer.editingItem,
    closeAddDrawer: drawer.closeAddDrawer,
    closeEditDrawer: drawer.closeEditDrawer,
    handleAddCampaign: crud.handleAddCampaign,
    handleUpdateCampaign: crud.handleUpdateCampaign,
  });
  const rowActions = useCampaignRowActions({
    openEditDrawer: drawer.openEditDrawer,
    onDeleteClick: deleteConfirm.handleDeleteClick,
    closeDropdown: dropdown.closeDropdown,
  });
  const { handleExportCSV } = useCampaignExport(fetch.campaignList);

  const { searchValue, handleSearchInput } = useTableSearch(fetch.searchQuery, fetch.handleSearchChange);

  const handleView = useCallback((_campaign: Campaign) => {}, []);
  const handleAssignClick = useCallback((_campaign: Campaign) => {}, []);

  const addDrawerBodyRef = useRef<HTMLDivElement>(null);
  const editDrawerBodyRef = useRef<HTMLDivElement>(null);

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
          <button className="btn btn-primary" onClick={drawer.openAddDrawer} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
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
              <TCell variant="th">Pool Agents</TCell>
              <TCell variant="th">Created At</TCell>
              <TCell variant="th">Actions</TCell>
            </TRow>
          </THead>
          <TBody>
            {fetch.campaignList.length === 0 ? (
              <EmptyState colSpan={10} message={LABEL_NO_DATA} />
            ) : (
              fetch.campaignList.map((campaign) => (
                <CampaignRow
                  key={campaign.id}
                  campaign={campaign}
                  dropdownOpen={dropdown.dropdownOpen}
                  onToggleDropdown={dropdown.toggleDropdown}
                  onView={handleView}
                  onEdit={rowActions.handleEditClick}
                  onAssign={handleAssignClick}
                  onDelete={rowActions.handleDeleteClick}
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

      <Drawer isOpen={drawer.showAddDrawer} onClose={drawer.closeAddDrawer} title="Add Campaign" ref={addDrawerBodyRef}>
        <CampaignForm
          validationSchema={campaignValidationSchema}
          initialValues={ADD_CAMPAIGN_INITIAL_VALUES}
          onSubmit={formSubmit.handleSubmit}
          onCancel={drawer.closeAddDrawer}
          isLoading={fetch.isLoading}
          error={fetch.error}
          bodyRef={addDrawerBodyRef}
        />
      </Drawer>

      <Drawer isOpen={drawer.showEditDrawer} onClose={drawer.closeEditDrawer} title="Edit Campaign" ref={editDrawerBodyRef}>
        <CampaignForm
          validationSchema={campaignValidationSchema}
          initialValues={form.editInitialValues}
          onSubmit={formSubmit.handleEditSubmit}
          onCancel={drawer.closeEditDrawer}
          isLoading={fetch.isLoading}
          error={fetch.error}
          isEditing
          bodyRef={editDrawerBodyRef}
        />
      </Drawer>

      <AdminDeleteModal
        isOpen={!!deleteConfirm.deletingItem}
        itemName={deleteConfirm.deletingItem?.name || ''}
        onConfirm={deleteConfirm.handleConfirmDelete}
        onClose={deleteConfirm.closeDeleteModal}
      />

      <ToastNotification
        isVisible={toast.showToast}
        type={toast.toastType}
        message={toast.toastMessage}
        onDismiss={() => toast.setShowToast(false)}
      />
    </PageContainer>
  );
};

export default CampaignsPage;
