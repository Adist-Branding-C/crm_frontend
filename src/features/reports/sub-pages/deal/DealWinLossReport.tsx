import PageHeader from '../../../../shared/components/layout/PageHeader';
import ReportStateWrapper from '../../components/ReportStateWrapper';
import { useWinLossReasons } from '../../../deal-analytics/hooks/useWinLossReasons';
import { useDealReportFilterOptions } from '../../../deal-analytics/hooks/useDealReportFilterOptions';
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
  agentId: number | undefined;
}

const INITIAL_FILTERS: DealFilters = { period: '', pipelineId: undefined, agentId: undefined };

const DealWinLossReport = () => {
  const { filters, setFilters, appliedFilters, applyFilters, resetFilters } = useFilterState<DealFilters>(INITIAL_FILTERS);
  const { pipelineOptions, staffOptions } = useDealReportFilterOptions();
  const { data, isLoading, isError, error, refetch } = useWinLossReasons({ period: appliedFilters.period || undefined, pipelineId: appliedFilters.pipelineId, agentId: appliedFilters.agentId });

  const won = data?.won;
  const lost = data?.lost;
  const lostReasons = data?.lostReasons ?? [];
  const { currentPage, setCurrentPage, totalPages, paginatedData: pagedLostReasons } = useTablePagination(lostReasons);

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Win / Loss Analysis & Reasons" description="Won vs lost breakdown, with lost-reason analysis" breadcrumb={false} />

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

      <ReportStateWrapper isLoading={isLoading} isError={isError} error={error} onRetry={refetch} isEmpty={!isLoading && !isError && !won && !lost}>
        <div style={{ display: 'flex', gap: '2rem', margin: '1rem 0' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Won</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success)' }}>{won?.count ?? 0} ({won?.percentOfTotal ?? 0}%)</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{formatAmountWithCurrency(won?.amount ?? 0)}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Lost</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--danger)' }}>{lost?.count ?? 0} ({lost?.percentOfTotal ?? 0}%)</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{formatAmountWithCurrency(lost?.amount ?? 0)}</div>
          </div>
        </div>

        <div className="table-container">
          <table className="enquiries-table deal-report-table">
            <thead>
              <tr>
                <th>Lost Reason</th>
                <th>Count</th>
                <th>Amount</th>
                <th>% of Lost Deals</th>
              </tr>
            </thead>
            <tbody>
              {pagedLostReasons.map((r) => (
                <tr key={r.reason}>
                  <td>{r.reason === 'UNSPECIFIED' ? 'Unspecified' : r.reason}</td>
                  <td>{r.count}</td>
                  <td>{formatAmountWithCurrency(r.amount)}</td>
                  <td>{r.percentOfLost}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={lostReasons.length}
          rowsPerPage={10}
          onPageChange={setCurrentPage}
        />
      </ReportStateWrapper>
    </div>
  );
};

export default DealWinLossReport;
