import PageHeader from '../../../../shared/components/layout/PageHeader';
import ReportStateWrapper from '../../components/ReportStateWrapper';
import { useSizeDistribution } from '../../../deal-analytics/hooks/useSizeDistribution';
import { useDealReportFilterOptions } from '../../../deal-analytics/hooks/useDealReportFilterOptions';
import { formatAmountWithCurrency, CURRENCY_OPTIONS, DEFAULT_CURRENCY } from '../../../../shared/constants/currencies';
import { useTablePagination } from '../../../../shared/hooks/useTablePagination';
import { useFilterState } from '../../../../shared/hooks/useFilterState';
import Pagination from '../../../../shared/components/table/Pagination';
import type { AnalyticsPeriod } from '../../../deal-analytics/types';

const TIER_LABEL: Record<string, string> = {
  SMALL: 'Small',
  MEDIUM: 'Medium',
  ENTERPRISE: 'Enterprise',
};

const PERIOD_OPTIONS: { value: AnalyticsPeriod | ''; label: string }[] = [
  { value: '', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
];


interface DealFilters {
  currency: string;
  period: AnalyticsPeriod | '';
  pipelineId: number | undefined;
}

const INITIAL_FILTERS: DealFilters = { currency: DEFAULT_CURRENCY, period: '', pipelineId: undefined };

const DealSizeDistributionReport = () => {
  const { filters, setFilters, appliedFilters, applyFilters, resetFilters } = useFilterState<DealFilters>(INITIAL_FILTERS);
  const { pipelineOptions } = useDealReportFilterOptions();
  const { data, isLoading, isError, error, refetch } = useSizeDistribution({ currency: appliedFilters.currency, period: appliedFilters.period || undefined, pipelineId: appliedFilters.pipelineId });
  const tiers = data?.tiers ?? [];
  const { currentPage, setCurrentPage, totalPages, paginatedData: pagedTiers } = useTablePagination(tiers);

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Deal Size & Value Distribution" description={`Distribution of deals by value tier (${data?.currency ?? appliedFilters.currency})`} breadcrumb={false} />

      <div className="filters-panel">
        <div className="filter-row">
          <div className="filter-group">
            <label>Currency</label>
            <select value={filters.currency} onChange={(e) => setFilters((f) => ({ ...f, currency: e.target.value }))}>
              {CURRENCY_OPTIONS.map((opt) => (
                <option key={opt.code} value={opt.code}>{opt.code}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Period</label>
            <select value={filters.period} onChange={(e) => setFilters((f) => ({ ...f, period: e.target.value as AnalyticsPeriod | '' }))}>
              {PERIOD_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Pipeline</label>
            <select value={filters.pipelineId ?? ''} onChange={(e) => setFilters((f) => ({ ...f, pipelineId: e.target.value ? Number(e.target.value) : undefined }))}>
              <option value="">All Pipelines</option>
              {pipelineOptions.map((opt) => (
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

      <ReportStateWrapper isLoading={isLoading} isError={isError} error={error} onRetry={refetch} isEmpty={!isLoading && !isError && tiers.length === 0} emptyMessage={`No deals in ${appliedFilters.currency} for this period`}>
        <div style={{ display: 'flex', gap: '2rem', margin: '1rem 0' }}>
          {tiers.map((t) => (
            <div key={t.tier}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{TIER_LABEL[t.tier] ?? t.tier}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{t.count} ({t.percentOfTotal}%)</div>
            </div>
          ))}
        </div>

        <div className="table-container">
          <table className="enquiries-table deal-report-table">
            <thead>
              <tr>
                <th>Tier</th>
                <th>Count</th>
                <th>% of Total</th>
                <th>Total Value</th>
                <th>Won Revenue</th>
                <th>Avg Value</th>
                <th>Win Rate</th>
              </tr>
            </thead>
            <tbody>
              {pagedTiers.map((t) => (
                <tr key={t.tier}>
                  <td>{TIER_LABEL[t.tier] ?? t.tier}</td>
                  <td>{t.count}</td>
                  <td>{t.percentOfTotal}%</td>
                  <td>{formatAmountWithCurrency(t.totalAmount, data?.currency)}</td>
                  <td>{formatAmountWithCurrency(t.wonAmount, data?.currency)}</td>
                  <td>{formatAmountWithCurrency(t.avgAmount, data?.currency)}</td>
                  <td>{t.winRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={tiers.length}
          rowsPerPage={10}
          onPageChange={setCurrentPage}
        />
      </ReportStateWrapper>
    </div>
  );
};

export default DealSizeDistributionReport;
