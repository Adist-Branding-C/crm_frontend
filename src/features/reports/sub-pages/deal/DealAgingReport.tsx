import { ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import ReportStateWrapper from '../../components/ReportStateWrapper';
import { useAgingDeals } from '../../../deal-analytics/hooks/useAgingDeals';
import { useDealReportFilterOptions } from '../../../deal-analytics/hooks/useDealReportFilterOptions';
import { formatAmountWithCurrency } from '../../../../shared/constants/currencies';
import { useFilterState } from '../../../../shared/hooks/useFilterState';
import { useState } from 'react';


interface DealFilters {
  noActivityDays: string;
  inStageDays: string;
  closeDateExceeded: boolean;
  pipelineId: number | undefined;
  agentId: number | undefined;
}

const INITIAL_FILTERS: DealFilters = {
  noActivityDays: '',
  inStageDays: '',
  closeDateExceeded: false,
  pipelineId: undefined,
  agentId: undefined,
};


const DealAgingReport = () => {
  const { filters, setFilters, appliedFilters, applyFilters, resetFilters } = useFilterState<DealFilters>(INITIAL_FILTERS);
  const [page, setPage] = useState(1);
  const { pipelineOptions, staffOptions } = useDealReportFilterOptions();

  const { data, isLoading, isError, error, refetch } = useAgingDeals({
    noActivityDays: appliedFilters.noActivityDays ? Number(appliedFilters.noActivityDays) : undefined,
    inStageDays: appliedFilters.inStageDays ? Number(appliedFilters.inStageDays) : undefined,
    closeDateExceeded: appliedFilters.closeDateExceeded || undefined,
    pipelineId: appliedFilters.pipelineId,
    agentId: appliedFilters.agentId,
    pageNumber: page,
    limit: 10,
  });

  const handleApplyFilters = () => {
    applyFilters();
    setPage(1);
  };

  const items = data?.items ?? [];
  const pagination = data?.pagination;

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Stalled / Aging Deals" description="Deals that may require attention" breadcrumb={false} />

      <div className="filters-panel">
        <div className="filter-row">
          <div className="filter-group">
            <label>No Activity For (Days)</label>
            <input
              type="number"
              min={0}
              placeholder="e.g. 14"
              value={filters.noActivityDays}
              onChange={(e) => setFilters((f) => ({ ...f, noActivityDays: e.target.value }))}
            />
          </div>
          <div className="filter-group">
            <label>In Stage More Than (Days)</label>
            <input
              type="number"
              min={0}
              placeholder="e.g. 30"
              value={filters.inStageDays}
              onChange={(e) => setFilters((f) => ({ ...f, inStageDays: e.target.value }))}
            />
          </div>
          <div className="filter-group">
            <label>&nbsp;</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', minHeight: '38px', fontWeight: 400, textTransform: 'none', letterSpacing: 'normal', fontSize: '0.875rem', color: 'var(--text-main)' }}>
              <input
                type="checkbox"
                checked={filters.closeDateExceeded}
                onChange={(e) => setFilters((f) => ({ ...f, closeDateExceeded: e.target.checked }))}
                style={{ width: 'auto', minHeight: 'auto' }}
              />
              Close date exceeded
            </label>
          </div>
          <div className="filter-group">
            <label>Pipeline</label>
            <select
              value={filters.pipelineId ?? ''}
              onChange={(e) => setFilters((f) => ({ ...f, pipelineId: e.target.value ? Number(e.target.value) : undefined }))}
            >
              <option value="">All Pipelines</option>
              {pipelineOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Agent</label>
            <select
              value={filters.agentId ?? ''}
              onChange={(e) => setFilters((f) => ({ ...f, agentId: e.target.value ? Number(e.target.value) : undefined }))}
            >
              <option value="">All Agents</option>
              {staffOptions.map((opt) => (
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

      <ReportStateWrapper
        isLoading={isLoading}
        isError={isError}
        error={error}
        onRetry={refetch}
        isEmpty={!isLoading && !isError && items.length === 0}
        emptyMessage="No deals match these aging filters"
      >
        <div className="table-container">
          <table className="enquiries-table deal-report-table">
            <thead>
              <tr>
                <th>Deal</th>
                <th>Stage</th>
                <th>Days in Current Stage</th>
                <th>Days Until / Past Close Date</th>
                <th>Amount</th>
                <th>Agent</th>
              </tr>
            </thead>
            <tbody>
              {items.map((d) => (
                <tr key={d.id}>
                  <td>{d.dealName}</td>
                  <td>{d.stageName}</td>
                  <td>{d.daysInCurrentStage}</td>
                  <td>
                    {d.daysUntilOrPastCloseDate === null
                      ? '—'
                      : d.daysUntilOrPastCloseDate < 0
                        ? `${Math.abs(d.daysUntilOrPastCloseDate)}d overdue`
                        : `${d.daysUntilOrPastCloseDate}d left`}
                  </td>
                  <td>{formatAmountWithCurrency(d.amount, d.currency)}</td>
                  <td>{d.agentName ?? 'Unassigned'}</td>
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

export default DealAgingReport;
