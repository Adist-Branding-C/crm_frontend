import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import ReportStateWrapper from '../../components/ReportStateWrapper';
import { useDeletedDeals } from '../../../deal-analytics/hooks/useDeletedDeals';
import { useDealReportFilterOptions } from '../../../deal-analytics/hooks/useDealReportFilterOptions';
import { useDealFilterOptions } from '../../../deal/hooks/useDealFilterOptions';
import { useSourceOptions } from '../../../deal-analytics/hooks/useSourceOptions';
import { mapApiToUI } from '../../../deal/utils/dealMapper';
import { formatAmountWithCurrency } from '../../../../shared/constants/currencies';
import DateRangePicker from '../../../../shared/components/filters/DateRangePicker';
import { useFilterState } from '../../../../shared/hooks/useFilterState';

interface DealFilters {
  dateFrom: string;
  dateTo: string;
  dateFilterBy: string;
  type: string;
  deletedBy: string;
  agentId: number | undefined;
  statusId: string;
  sourceId: string;
  search: string;
}

const INITIAL_FILTERS: DealFilters = {
  dateFrom: '', dateTo: '', dateFilterBy: 'createdAt', type: '', deletedBy: '',
  agentId: undefined, statusId: '', sourceId: '', search: '',
};


const DealDeletedReport = () => {
  const { filters, setFilters, appliedFilters, applyFilters, resetFilters } = useFilterState<DealFilters>(INITIAL_FILTERS);
  const [page, setPage] = useState(1);
  const { staffOptions, deletedByOptions } = useDealReportFilterOptions();
  const { statusOptions } = useDealFilterOptions();
  const { sourceOptions } = useSourceOptions();

  const { data, isLoading, isError, error, refetch } = useDeletedDeals({
    dateFrom: appliedFilters.dateFrom || undefined,
    dateTo: appliedFilters.dateTo || undefined,
    dateFilterBy: appliedFilters.dateFilterBy,
    type: appliedFilters.type || undefined,
    deletedBy: appliedFilters.deletedBy || undefined,
    agentId: appliedFilters.agentId,
    statusId: appliedFilters.statusId || undefined,
    sourceId: appliedFilters.sourceId || undefined,
    search: appliedFilters.search || undefined,
    pageNumber: page,
    limit: 10,
  });

  const handleApplyFilters = () => {
    applyFilters();
    setPage(1);
  };

  const items = (data?.items ?? []).map(mapApiToUI);
  const pagination = data?.pagination;

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Deleted Deals" description="Soft-deleted deals (admin only)" breadcrumb={false} />

      <div className="filters-panel">
        <div className="filter-row">
          <div className="filter-group">
            <label>Search Deals</label>
            <input type="text" placeholder="Type a deal name..." value={filters.search} onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))} />
          </div>
          <DateRangePicker
            label="Date Range"
            value={{ start: filters.dateFrom, end: filters.dateTo }}
            onChange={(range) => setFilters((f) => ({ ...f, dateFrom: range.start, dateTo: range.end }))}
          />
          <div className="filter-group">
            <label>Filter By Date</label>
            <select value={filters.dateFilterBy} onChange={(e) => setFilters((f) => ({ ...f, dateFilterBy: e.target.value }))}>
              <option value="createdAt">Created Date</option>
              <option value="updatedAt">Updated Date</option>
              <option value="startDate">Start Date</option>
              <option value="endDate">End Date</option>
            </select>
          </div>
        </div>
        <div className="filter-row">
          <div className="filter-group">
            <label>Stage</label>
            <select value={filters.statusId} onChange={(e) => setFilters((f) => ({ ...f, statusId: e.target.value }))}>
              <option value="">All Stages</option>
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Source</label>
            <select value={filters.sourceId} onChange={(e) => setFilters((f) => ({ ...f, sourceId: e.target.value }))}>
              <option value="">All Sources</option>
              {sourceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Deal Type</label>
            <select value={filters.type} onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}>
              <option value="">All Types</option>
              <option value="New">New</option>
              <option value="Existing">Existing</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Agent</label>
            <select value={filters.agentId ?? ''} onChange={(e) => setFilters((f) => ({ ...f, agentId: e.target.value ? Number(e.target.value) : undefined }))}>
              <option value="">All Agents</option>
              {staffOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Deleted By</label>
            <select value={filters.deletedBy} onChange={(e) => setFilters((f) => ({ ...f, deletedBy: e.target.value }))}>
              <option value="">Anyone</option>
              {deletedByOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-actions">
            <button
              className="btn btn-secondary"
              onClick={() => { resetFilters(); setPage(1); }}
            >
              Clear
            </button>
            <button className="btn btn-primary" onClick={handleApplyFilters}>Apply Filters</button>
          </div>
        </div>
      </div>

      <ReportStateWrapper isLoading={isLoading} isError={isError} error={error} onRetry={refetch} isEmpty={!isLoading && !isError && items.length === 0} emptyMessage="No deleted deals match these filters">
        <div className="table-container">
          <table className="enquiries-table deal-report-table">
            <thead>
              <tr>
                <th>Deal</th>
                <th>Lead</th>
                <th>Stage</th>
                <th>Amount</th>
                <th>Agent</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {items.map((d) => (
                <tr key={d.id}>
                  <td>{d.dealName}</td>
                  <td>{d.lead}</td>
                  <td>{d.status}</td>
                  <td>{formatAmountWithCurrency(d.amount, d.currency)}</td>
                  <td>{d.agent || 'Unassigned'}</td>
                  <td>{d.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pagination && (
          <div className="pagination-container">
            <div className="pagination-left">
              <span className="pagination-info">
                Showing {(pagination.page - 1) * pagination.limit + 1}-{Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
              </span>
            </div>
            <div className="pagination-right">
              <button className="pagination-btn" disabled={!pagination.has_previous} onClick={() => setPage((p) => p - 1)}>
                <ChevronLeft size={16} />
              </button>
              <span className="page-indicator">Page {pagination.page} of {pagination.total_pages || 1}</span>
              <button className="pagination-btn" disabled={!pagination.has_next} onClick={() => setPage((p) => p + 1)}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </ReportStateWrapper>
    </div>
  );
};

export default DealDeletedReport;
