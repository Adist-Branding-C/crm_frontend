import React, { useState } from 'react';
import { Download } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import ReportStateWrapper from '../../components/ReportStateWrapper';
import { useWinLossReasons } from '../../../deal-analytics/hooks/useWinLossReasons';
import { useDealReportFilterOptions } from '../../../deal-analytics/hooks/useDealReportFilterOptions';
import { formatAmountWithCurrency } from '../../../../shared/constants/currencies';
import { triggerBlobDownload } from '../../../../shared/utils/blobDownload.util';
import type { AnalyticsPeriod } from '../../../deal-analytics/types';

const PERIOD_OPTIONS: { value: AnalyticsPeriod | ''; label: string }[] = [
  { value: '', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
];


const DealWinLossReport = () => {
  const [period, setPeriod] = useState<AnalyticsPeriod | ''>('');
  const [pipelineId, setPipelineId] = useState<number | undefined>(undefined);
  const [agentId, setAgentId] = useState<number | undefined>(undefined);
  const { pipelineOptions, staffOptions } = useDealReportFilterOptions();
  const { data, isLoading, isError, error, refetch } = useWinLossReasons({ period: period || undefined, pipelineId, agentId });

  const won = data?.won;
  const lost = data?.lost;
  const lostReasons = data?.lostReasons ?? [];

  const handleExport = () => {
    const headers = ['Lost Reason', 'Count', 'Amount', '% of Lost'];
    const rows = lostReasons.map((r) => [r.reason, r.count, r.amount, r.percentOfLost]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    triggerBlobDownload(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), 'win_loss_reasons.csv');
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Win / Loss Analysis & Reasons" description="Won vs lost breakdown, with lost-reason analysis" breadcrumb={false} />

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
            <select value={pipelineId ?? ''} onChange={(e) => setPipelineId(e.target.value ? Number(e.target.value) : undefined)}>
              <option value="">All Pipelines</option>
              {pipelineOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
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
              onClick={() => { setPeriod(''); setPipelineId(undefined); setAgentId(undefined); }}
            >
              Clear
            </button>
            <button className="btn btn-primary" onClick={handleExport} disabled={lostReasons.length === 0}>
              <Download size={16} /> Export
            </button>
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
              {lostReasons.map((r) => (
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
      </ReportStateWrapper>
    </div>
  );
};

export default DealWinLossReport;
