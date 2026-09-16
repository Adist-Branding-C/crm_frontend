import React, { useState } from 'react';
import { Download } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import ReportStateWrapper from '../../components/ReportStateWrapper';
import { useForecastByPeriod } from '../../../deal-analytics/hooks/useForecastByPeriod';
import { useDealReportFilterOptions } from '../../../deal-analytics/hooks/useDealReportFilterOptions';
import { formatAmountWithCurrency } from '../../../../shared/constants/currencies';
import { triggerBlobDownload } from '../../../../shared/utils/blobDownload.util';
import CustomDateRangeField from '../../../../shared/components/filters/CustomDateRangeField';
import type { ReportPeriod } from '../../../deal-analytics/types';

const PERIOD_OPTIONS: { value: ReportPeriod; label: string }[] = [
  { value: 'this_month', label: 'This Month' },
  { value: 'next_month', label: 'Next Month' },
  { value: 'this_quarter', label: 'This Quarter' },
  { value: 'next_quarter', label: 'Next Quarter' },
  { value: 'custom', label: 'Custom Range' },
];


const DealForecastReport = () => {
  const [period, setPeriod] = useState<ReportPeriod>('this_month');
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');
  const [pipelineId, setPipelineId] = useState<number | undefined>(undefined);
  const [agentId, setAgentId] = useState<number | undefined>(undefined);
  const { pipelineOptions, staffOptions } = useDealReportFilterOptions();


  const isCustomReady = period !== 'custom' || Boolean(customFrom && customTo);
  const { data, isLoading, isError, error, refetch } = useForecastByPeriod({
    period: isCustomReady ? period : 'this_month',
    from: isCustomReady && period === 'custom' ? customFrom : undefined,
    to: isCustomReady && period === 'custom' ? customTo : undefined,
    pipelineId,
    agentId,
  });

  const byCurrency = data?.byCurrency ?? [];
  const byPipeline = data?.byPipeline ?? [];
  const unscheduled = data?.unscheduled ?? [];

  const handleExport = () => {
    const headers = ['Pipeline', 'Currency', 'Open Deals', 'Open Value', 'Weighted Value'];
    const rows = byPipeline.map((p) => [p.pipelineName, p.currency, p.openCount, p.openAmount, p.weightedAmount]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    triggerBlobDownload(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), 'forecasted_revenue.csv');
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Forecasted Revenue / Weighted Pipeline Value" description="Expected revenue weighted by win probability" breadcrumb={false} />

      <div className="filters-panel">
        <div className="filter-row">
          <div className="filter-group">
            <label>Period</label>
            <select value={period} onChange={(e) => setPeriod(e.target.value as ReportPeriod)}>
              {PERIOD_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          {period === 'custom' && (
            <CustomDateRangeField
              label="Custom Range"
              from={customFrom}
              to={customTo}
              onChange={(from, to) => { setCustomFrom(from); setCustomTo(to); }}
            />
          )}
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
              onClick={() => { setPeriod('this_month'); setCustomFrom(''); setCustomTo(''); setPipelineId(undefined); setAgentId(undefined); }}
            >
              Clear
            </button>
            <button className="btn btn-primary" onClick={handleExport} disabled={byPipeline.length === 0}>
              <Download size={16} /> Export
            </button>
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
              {byPipeline.map((p) => (
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
      </ReportStateWrapper>
    </div>
  );
};

export default DealForecastReport;
