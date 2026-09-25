import PageHeader from '../../../../shared/components/layout/PageHeader';
import ReportStateWrapper from '../../components/ReportStateWrapper';
import { useForecastByPeriod } from '../../../deal-analytics/hooks/useForecastByPeriod';
import { useDealReportFilterOptions } from '../../../deal-analytics/hooks/useDealReportFilterOptions';
import { formatAmountWithCurrency } from '../../../../shared/constants/currencies';
import { useTablePagination } from '../../../../shared/hooks/useTablePagination';
import { useFilterState } from '../../../../shared/hooks/useFilterState';
import Pagination from '../../../../shared/components/table/Pagination';
import CustomDateRangeField from '../../../../shared/components/filters/CustomDateRangeField';
import type { ReportPeriod } from '../../../deal-analytics/types';

const PERIOD_OPTIONS: { value: ReportPeriod; label: string }[] = [
  { value: 'this_month', label: 'This Month' },
  { value: 'next_month', label: 'Next Month' },
  { value: 'this_quarter', label: 'This Quarter' },
  { value: 'next_quarter', label: 'Next Quarter' },
  { value: 'custom', label: 'Custom Range' },
];


interface DealFilters {
  period: ReportPeriod;
  customFrom: string;
  customTo: string;
  pipelineId: number | undefined;
  agentId: number | undefined;
}

const INITIAL_FILTERS: DealFilters = { period: 'this_month', customFrom: '', customTo: '', pipelineId: undefined, agentId: undefined };

const DealForecastReport = () => {
  const { filters, setFilters, appliedFilters, applyFilters, resetFilters } = useFilterState<DealFilters>(INITIAL_FILTERS);
  const { pipelineOptions, staffOptions } = useDealReportFilterOptions();


  const isCustomReady = appliedFilters.period !== 'custom' || Boolean(appliedFilters.customFrom && appliedFilters.customTo);
  const { data, isLoading, isError, error, refetch } = useForecastByPeriod({
    period: isCustomReady ? appliedFilters.period : 'this_month',
    from: isCustomReady && appliedFilters.period === 'custom' ? appliedFilters.customFrom : undefined,
    to: isCustomReady && appliedFilters.period === 'custom' ? appliedFilters.customTo : undefined,
    pipelineId: appliedFilters.pipelineId,
    agentId: appliedFilters.agentId,
  });

  const byCurrency = data?.byCurrency ?? [];
  const byPipeline = data?.byPipeline ?? [];
  const unscheduled = data?.unscheduled ?? [];
  const { currentPage, setCurrentPage, totalPages, paginatedData: pagedByPipeline } = useTablePagination(byPipeline);

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Forecasted Revenue / Weighted Pipeline Value" description="Expected revenue weighted by win probability" breadcrumb={false} />

      <div className="filters-panel">
        <div className="filter-row">
          <div className="filter-group">
            <label>Period</label>
            <select value={filters.period} onChange={(e) => setFilters((f) => ({ ...f, period: e.target.value as ReportPeriod }))}>
              {PERIOD_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          {filters.period === 'custom' && (
            <CustomDateRangeField
              label="Custom Range"
              from={filters.customFrom}
              to={filters.customTo}
              onChange={(from, to) => setFilters((f) => ({ ...f, customFrom: from, customTo: to }))}
            />
          )}
          <div className="filter-group">
            <label>Pipeline</label>
            <select value={filters.pipelineId ?? ''} onChange={(e) => setFilters((f) => ({ ...f, pipelineId: e.target.value ? Number(e.target.value) : undefined }))}>
              <option value="">All Pipelines</option>
              {pipelineOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
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
          <div className="filter-actions">
            <button className="btn btn-secondary" onClick={resetFilters}>Clear</button>
            <button className="btn btn-primary" onClick={applyFilters}>Apply Filters</button>
          </div>
        </div>
      </div>

      {!isCustomReady && (
        <div className="widget-status-text" style={{ marginBottom: '0.75rem' }}>
          Showing This Month while you finish picking a custom range — select both a start and end date.
        </div>
      )}

      <ReportStateWrapper
        isLoading={isLoading}
        isError={isError}
        error={error}
        onRetry={refetch}
        isEmpty={!isLoading && !isError && byPipeline.length === 0 && unscheduled.length === 0}
        emptyMessage="No open deals in this period"
      >
        {byCurrency.map((c) => (
          <div key={c.currency} style={{ display: 'flex', gap: '2rem', margin: '1rem 0' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Raw Pipeline Value ({c.currency})</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{formatAmountWithCurrency(c.openAmount, c.currency)}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Weighted Forecast ({c.currency})</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--chart-1)' }}>{formatAmountWithCurrency(c.weightedAmount, c.currency)}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Open Deals</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{c.openCount}</div>
            </div>
          </div>
        ))}

        {unscheduled.length > 0 && (
          <div className="widget-status-text" style={{ marginBottom: '1rem' }}>
            {unscheduled.map((u) => `${u.count} unscheduled open deal(s) worth ${formatAmountWithCurrency(u.amount, u.currency)} (no close date set) not included above`).join(' · ')}
          </div>
        )}

        <div className="table-container">
          <table className="enquiries-table deal-report-table">
            <thead>
              <tr>
                <th>Pipeline</th>
                <th>Currency</th>
                <th>Open Deals</th>
                <th>Open Value</th>
                <th>Weighted Value</th>
              </tr>
            </thead>
            <tbody>
              {pagedByPipeline.map((p) => (
                <tr key={`${p.pipelineId}-${p.currency}`}>
                  <td>{p.pipelineName}</td>
                  <td>{p.currency}</td>
                  <td>{p.openCount}</td>
                  <td>{formatAmountWithCurrency(p.openAmount, p.currency)}</td>
                  <td>{formatAmountWithCurrency(p.weightedAmount, p.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={byPipeline.length}
          rowsPerPage={10}
          onPageChange={setCurrentPage}
        />
      </ReportStateWrapper>
    </div>
  );
};

export default DealForecastReport;
