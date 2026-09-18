import PageHeader from '../../../../shared/components/layout/PageHeader';
import ReportStateWrapper from '../../components/ReportStateWrapper';
import { useSourceConversion } from '../../../deal-analytics/hooks/useSourceConversion';
import { useDealReportFilterOptions } from '../../../deal-analytics/hooks/useDealReportFilterOptions';
import { useSourceOptions } from '../../../deal-analytics/hooks/useSourceOptions';
import { formatAmountWithCurrency } from '../../../../shared/constants/currencies';
import { useTablePagination } from '../../../../shared/hooks/useTablePagination';
import { useFilterState } from '../../../../shared/hooks/useFilterState';
import Pagination from '../../../../shared/components/table/Pagination';
import type { AnalyticsPeriod } from '../../../deal-analytics/types';

const PERIOD_OPTIONS: { value: AnalyticsPeriod | ''; label: string }[] = [
  { value: '', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
];


interface DealFilters {
  period: AnalyticsPeriod | '';
  pipelineId: number | undefined;
  sourceId: string;
}

const INITIAL_FILTERS: DealFilters = { period: '', pipelineId: undefined, sourceId: '' };

const DealSourceConversionReport = () => {
  const { filters, setFilters, appliedFilters, applyFilters, resetFilters } = useFilterState<DealFilters>(INITIAL_FILTERS);
  const { pipelineOptions } = useDealReportFilterOptions();
  const { sourceOptions, isLoading: sourceOptionsLoading } = useSourceOptions();

  const { data, isLoading, isError, error, refetch } = useSourceConversion({
    period: appliedFilters.period || undefined,
    pipelineId: appliedFilters.pipelineId,
    sourceIds: appliedFilters.sourceId || undefined,
  });
  const rows = data ?? [];
  const { currentPage, setCurrentPage, totalPages, paginatedData: pagedRows } = useTablePagination(rows);

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Deal Conversion Rate by Source" description="Conversion performance by originating lead source" breadcrumb={false} />

      <div className="filters-panel">
        <div className="filter-row">
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
          <div className="filter-group">
            <label>Source</label>
            <select value={filters.sourceId} onChange={(e) => setFilters((f) => ({ ...f, sourceId: e.target.value }))} disabled={sourceOptionsLoading}>
              <option value="">Select</option>
              {sourceOptions.map((opt) => (
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

      <ReportStateWrapper isLoading={isLoading} isError={isError} error={error} onRetry={refetch} isEmpty={!isLoading && !isError && rows.length === 0}>
        <div className="table-container">
          <table className="enquiries-table deal-report-table">
            <thead>
              <tr>
                <th>Source</th>
                <th>Total Deals</th>
                <th>Won</th>
                <th>Lost</th>
                <th>Conversion Rate</th>
                <th>Total Value</th>
                <th>Won Revenue</th>
                <th>Avg Deal Value</th>
              </tr>
            </thead>
            <tbody>
              {pagedRows.map((r) => (
                <tr key={r.sourceId ?? 'unknown'}>
                  <td>{r.sourceName}</td>
                  <td>{r.total}</td>
                  <td>{r.won}</td>
                  <td>{r.lost}</td>
                  <td>{r.conversionRate}%</td>
                  <td>{formatAmountWithCurrency(r.totalAmount)}</td>
                  <td>{formatAmountWithCurrency(r.wonAmount)}</td>
                  <td>{formatAmountWithCurrency(r.avgDealValue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={rows.length}
          rowsPerPage={10}
          onPageChange={setCurrentPage}
        />
      </ReportStateWrapper>
    </div>
  );
};

export default DealSourceConversionReport;
