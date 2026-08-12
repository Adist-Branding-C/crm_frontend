import { useCallback, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import PageContainer from '../../../shared/components/layout/PageContainer';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import AdminConfirmationModal from '../../../shared/components/crud/AdminConfirmationModal';
import { Table, THead, TBody, TRow, TCell, TableNav, Pagination, EmptyState } from '../../../shared/components/table';
import { useDebouncedSearch } from '../../../shared/hooks/useDebouncedSearch';
import { useRowDropdown } from '../../../shared/hooks/useRowDropdown';
import { useCampaign } from '../hooks/useCampaign';
import { useCampaignLeads } from '../hooks/useCampaignLeads';
import { useCampaignLeadRemoveConfirm } from '../hooks/useCampaignLeadRemoveConfirm';
import CampaignLeadActions from '../components/CampaignLeadActions';
import { formatDisplayDate } from '../utils/date.utils';
import { getCreatedByLabel, getPoolAgentsLabel, getCampaignTypeBadgeClass, getCampaignLeadStatusBadgeClass } from '../utils/campaign.utils';
import { CAMPAIGN_TYPES } from '../constants';
import { LABEL_NO_DATA } from '../../../shared/constants/labels';
import { DEFAULT_ROWS_PER_PAGE } from '../../../shared/constants/pagination';
import './CampaignsPage.css';

const CampaignLeadsPage = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const navigate = useNavigate();

  const [pageNumber, setPageNumber] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [filterQuery, setFilterQuery] = useState('');

  const { campaign, isLoading: campaignLoading } = useCampaign(campaignId ?? null);
  const isLeadCampaign = campaign?.type === CAMPAIGN_TYPES.LEAD_CAMPAIGN;

  const { leads, isLoading, error, updateStatus, removeLead } = useCampaignLeads(campaignId ?? null);
  const removeConfirm = useCampaignLeadRemoveConfirm(removeLead);
  const dropdown = useRowDropdown();

  const { searchValue, handleSearchChange } = useDebouncedSearch(useCallback((value: string) => {
    setFilterQuery(value);
    setPageNumber(1);
  }, []));

  const handleRowsPerPageChange = useCallback((value: number) => {
    setRowsPerPage(value);
    setPageNumber(1);
  }, []);

  const filteredLeads = useMemo(() => {
    if (!filterQuery.trim()) return leads;
    const q = filterQuery.toLowerCase();
    return leads.filter((item) =>
      (item.lead?.name ?? '').toLowerCase().includes(q) ||
      (item.lead?.phone ?? '').toLowerCase().includes(q) ||
      (item.lead?.email ?? '').toLowerCase().includes(q),
    );
  }, [leads, filterQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / rowsPerPage));
  const paginatedLeads = useMemo(
    () => filteredLeads.slice((pageNumber - 1) * rowsPerPage, pageNumber * rowsPerPage),
    [filteredLeads, pageNumber, rowsPerPage],
  );

  return (
    <PageContainer>
      <PageHeader
        title={campaignLoading ? 'Loading...' : (campaign?.name || 'Campaign')}
        description={campaign?.description || (isLeadCampaign ? 'Leads assigned to this campaign.' : 'Leads claimed through this pool.')}
        breadcrumb={[
          { label: 'Campaigns', link: '/campaigns' },
          { label: campaignLoading ? 'Loading...' : (campaign?.name || 'Campaign'), link: null },
        ]}
        action={
          <button className="btn btn-secondary" onClick={() => navigate('/campaigns')}>
            <ArrowLeft size={16} /> Back to Campaigns
          </button>
        }
      />

      {campaign && (
        <div className="campaign-detail-summary">
          <span className={getCampaignTypeBadgeClass(campaign.type)}>{campaign.type}</span>
          <dl className="campaign-detail-meta">
            {isLeadCampaign && (
              <>
                <div><dt>Start Date</dt><dd>{formatDisplayDate(campaign.startDate)}</dd></div>
                <div><dt>End Date</dt><dd>{formatDisplayDate(campaign.endDate)}</dd></div>
              </>
            )}
            <div><dt>Created By</dt><dd>{getCreatedByLabel(campaign.createdBy)}</dd></div>
            <div><dt>{isLeadCampaign ? 'Agents' : 'Pool Agents'}</dt><dd>{getPoolAgentsLabel(campaign.poolAgents)}</dd></div>
          </dl>
        </div>
      )}

      {error && <ErrorMessage message={error} />}

      <div className="table-container">
        <TableNav
          searchQuery={searchValue}
          onSearchChange={handleSearchChange}
          searchPlaceholder="Search assigned leads..."
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />

        <Table wrapperClassName="table-scroll" className="data-table">
          <THead>
            <TRow>
              <TCell variant="th">Sl No</TCell>
              <TCell variant="th">Name</TCell>
              <TCell variant="th">Phone</TCell>
              <TCell variant="th">Email</TCell>
              <TCell variant="th">Location</TCell>
              <TCell variant="th">Status</TCell>
              <TCell variant="th">Assigned At</TCell>
              <TCell variant="th">Actions</TCell>
            </TRow>
          </THead>
          <TBody>
            {isLoading ? (
              <EmptyState colSpan={8} message="Loading assigned leads..." />
            ) : paginatedLeads.length === 0 ? (
              <EmptyState colSpan={8} message={LABEL_NO_DATA} />
            ) : (
              paginatedLeads.map((item, index) => (
                <TRow key={item.id}>
                  <TCell>{(pageNumber - 1) * rowsPerPage + index + 1}</TCell>
                  <TCell>{item.lead?.name ?? `Lead #${item.leadId}`}</TCell>
                  <TCell>{item.lead?.phone || '-'}</TCell>
                  <TCell>{item.lead?.email || '-'}</TCell>
                  <TCell>{item.lead?.location || '-'}</TCell>
                  <TCell><span className={getCampaignLeadStatusBadgeClass(item.status)}>{item.status}</span></TCell>
                  <TCell>{formatDisplayDate(item.createdAt)}</TCell>
                  <TCell>
                    <CampaignLeadActions
                      item={item}
                      dropdownOpen={dropdown.dropdownOpen}
                      onToggleDropdown={dropdown.toggleDropdown}
                      onUpdateStatus={updateStatus}
                      onRemove={() => removeConfirm.handleDeleteClick(item)}
                    />
                  </TCell>
                </TRow>
              ))
            )}
          </TBody>
        </Table>

        <Pagination
          currentPage={pageNumber}
          totalPages={totalPages}
          totalItems={filteredLeads.length}
          rowsPerPage={rowsPerPage}
          onPageChange={setPageNumber}
        />
      </div>

      <AdminConfirmationModal
        isOpen={!!removeConfirm.deletingItem}
        title="Remove Lead"
        message={`Are you sure you want to remove ${removeConfirm.deletingItem?.lead?.name ?? 'this lead'} from ${isLeadCampaign ? 'this campaign' : 'this pool'}? This does not delete the lead itself.`}
        confirmText="Remove"
        confirmButtonVariant="danger"
        isLoading={removeConfirm.isRemoving}
        onConfirm={removeConfirm.handleConfirmDelete}
        onCancel={removeConfirm.closeDeleteModal}
      />
    </PageContainer>
  );
};

export default CampaignLeadsPage;
