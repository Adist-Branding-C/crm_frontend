import React, { useState } from 'react';
import { Download } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import ReportStateWrapper from '../../components/ReportStateWrapper';
import { useVelocity } from '../../../deal-analytics/hooks/useVelocity';
import { useDealReportFilterOptions } from '../../../deal-analytics/hooks/useDealReportFilterOptions';
import { useDealPipelineDetail } from '../../../deal-pipeline-builder/hooks/useDealPipelineDetail';
import { triggerBlobDownload } from '../../../../shared/utils/blobDownload.util';
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


const DealVelocityReport = () => {
  const [period, setPeriod] = useState<AnalyticsPeriod | ''>('');
  const [pipelineId, setPipelineId] = useState<number | undefined>(undefined);
  const [agentId, setAgentId] = useState<number | undefined>(undefined);
  const [stageId, setStageId] = useState<number | undefined>(undefined);
  const { pipelineOptions, staffOptions } = useDealReportFilterOptions();
  const { data, isLoading, isError, error, refetch } = useVelocity({
    period: period || undefined,
    pipelineId,
    agentId,
    stageId,
  });

  const stages = data?.stages ?? [];
  const cycleTime = data?.cycleTime ?? [];
  const maxDuration = Math.max(1, ...stages.map((s) => s.avgDurationSeconds));

  const handleExport = () => {
    const headers = ['Stage', 'Avg. Time in Stage', 'Occupancies'];
    const rows = stages.map((s) => [s.stageName, formatDuration(s.avgDurationSeconds), s.occupancyCount]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    triggerBlobDownload(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), 'deal_velocity.csv');
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Deal Velocity & Sales Cycle Duration" description="Average time per stage and full sales cycle duration" breadcrumb={false} />

      <div className="filters-panel">
        <div className="filter-row">
          <div className="filter-group">
            <label>Period</label>
            <select value={period} onChange={(e) => setPeriod(e.target.value as AnalyticsPeriod | '')}>
              {PERIOD_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Pipeline</label>
            <select
              value={pipelineId ?? ''}
              onChange={(e) => {
                const next = e.target.value ? Number(e.target.value) : undefined;
                setPipelineId(next);
                setStageId(undefined); // stage belongs to the previous pipeline - reset
              }}
            >
              <option value="">All Pipelines</option>
              {pipelineOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          {pipelineId !== undefined && (
            <StageSelect pipelineId={pipelineId} value={stageId} onChange={setStageId} />
          )}
          <div className="filter-group">
            <label>Agent</label>
            <select value={agentId ?? ''} onChange={(e) => setAgentId(e.target.value ? Number(e.target.value) : undefined)}>
              <option value="">All Agents</option>
              {staffOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-actions">
            <button
              className="btn btn-secondary"
              onClick={() => { setPeriod(''); setPipelineId(undefined); setAgentId(undefined); setStageId(undefined); }}
            >
              Clear
            </button>
            <button className="btn btn-primary" onClick={handleExport} disabled={stages.length === 0}>
              <Download size={16} /> Export
            </button>
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
              {stages.map((s) => (
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
      </ReportStateWrapper>
    </div>
  );
};

export default DealVelocityReport;
