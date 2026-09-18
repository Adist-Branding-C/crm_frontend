import PageHeader from '../../../../shared/components/layout/PageHeader';
import ReportStateWrapper from '../../components/ReportStateWrapper';
import { useVelocity } from '../../../deal-analytics/hooks/useVelocity';
import { useDealReportFilterOptions } from '../../../deal-analytics/hooks/useDealReportFilterOptions';
import { useDealPipelineDetail } from '../../../deal-pipeline-builder/hooks/useDealPipelineDetail';
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

const formatDuration = (seconds: number): string => {
  const days = Math.floor(seconds / 86400);
  if (days > 0) return `${days}d ${Math.floor((seconds % 86400) / 3600)}h`;
  const hours = Math.floor(seconds / 3600);
  if (hours > 0) return `${hours}h ${Math.floor((seconds % 3600) / 60)}m`;
  return `${Math.floor(seconds / 60)}m`;
};


const StageSelect = ({
  pipelineId,
  value,
  onChange,
}: {
  pipelineId: number;
  value: number | undefined;
  onChange: (stageId: number | undefined) => void;
}) => {
  const { pipeline, isLoading } = useDealPipelineDetail(pipelineId);
  const stages = pipeline?.stages ?? [];

  return (
    <div className="filter-group">
      <label>Stage</label>
      <select
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : undefined)}
        disabled={isLoading}
      >
        <option value="">All Stages</option>
        {stages.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>
    </div>
  );
};


interface DealFilters {
  period: AnalyticsPeriod | '';
  pipelineId: number | undefined;
  agentId: number | undefined;
  stageId: number | undefined;
}

const INITIAL_FILTERS: DealFilters = { period: '', pipelineId: undefined, agentId: undefined, stageId: undefined };

const DealVelocityReport = () => {
  const { filters, setFilters, appliedFilters, applyFilters, resetFilters } = useFilterState<DealFilters>(INITIAL_FILTERS);
  const { pipelineOptions, staffOptions } = useDealReportFilterOptions();
  const { data, isLoading, isError, error, refetch } = useVelocity({
    period: appliedFilters.period || undefined,
    pipelineId: appliedFilters.pipelineId,
    agentId: appliedFilters.agentId,
    stageId: appliedFilters.stageId,
  });

  const stages = data?.stages ?? [];
  const cycleTime = data?.cycleTime ?? [];
  const maxDuration = Math.max(1, ...stages.map((s) => s.avgDurationSeconds));
  const { currentPage, setCurrentPage, totalPages, paginatedData: pagedStages } = useTablePagination(stages);

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Deal Velocity & Sales Cycle Duration" description="Average time per stage and full sales cycle duration" breadcrumb={false} />

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
            <select
              value={filters.pipelineId ?? ''}
              onChange={(e) => {
                const next = e.target.value ? Number(e.target.value) : undefined;
                // stage belongs to the previous pipeline - reset it alongside
                setFilters((f) => ({ ...f, pipelineId: next, stageId: undefined }));
              }}
            >
              <option value="">All Pipelines</option>
              {pipelineOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          {filters.pipelineId !== undefined && (
            <StageSelect
              pipelineId={filters.pipelineId}
              value={filters.stageId}
              onChange={(stageId) => setFilters((f) => ({ ...f, stageId }))}
            />
          )}
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
            <button className="btn btn-secondary" onClick={resetFilters}>
              Clear
            </button>
            <button className="btn btn-primary" onClick={applyFilters}>Apply Filters</button>
          </div>
        </div>
      </div>

      <ReportStateWrapper isLoading={isLoading} isError={isError} error={error} onRetry={refetch} isEmpty={!isLoading && !isError && stages.length === 0} emptyMessage="No closed stage occupancies yet">
        <div style={{ display: 'flex', gap: '2rem', margin: '1rem 0' }}>
          {cycleTime.map((c) => (
            <div key={c.outcome}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Avg. Cycle Time ({c.outcome === 'WON' ? 'Closed Won' : 'Closed Lost'})</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{formatDuration(c.avgCycleSeconds)}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{c.dealCount} deal(s)</div>
            </div>
          ))}
        </div>

        <div className="widget-status-text" style={{ marginBottom: '0.75rem' }}>
          The bar shows each stage's average time relative to the slowest stage — the longest bar is your bottleneck.
        </div>
        <div className="table-container">
          <table className="enquiries-table deal-report-table">
            <thead>
              <tr>
                <th style={{ width: '22%' }}>Stage</th>
                <th style={{ width: '46%' }}>Avg. Time in Stage</th>
                <th style={{ width: '32%' }}>Occupancies</th>
              </tr>
            </thead>
            <tbody>
              {pagedStages.map((s) => (
                <tr key={s.stageId}>
                  <td>{s.stageName}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ flex: '0 0 auto', minWidth: '64px', fontWeight: 600 }}>{formatDuration(s.avgDurationSeconds)}</span>
                      <div style={{ flex: '1 1 auto', height: '8px', borderRadius: '4px', background: 'var(--surface-2)', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${Math.max(4, (s.avgDurationSeconds / maxDuration) * 100)}%`,
                            height: '100%',
                            borderRadius: '4px',
                            background: s.avgDurationSeconds === maxDuration ? 'var(--danger, #e05252)' : 'var(--chart-1)',
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td>{s.occupancyCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={stages.length}
          rowsPerPage={10}
          onPageChange={setCurrentPage}
        />
      </ReportStateWrapper>
    </div>
  );
};

export default DealVelocityReport;
