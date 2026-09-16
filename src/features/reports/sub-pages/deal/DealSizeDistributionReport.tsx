import React, { useState } from 'react';
import { Download } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import ReportStateWrapper from '../../components/ReportStateWrapper';
import { useSizeDistribution } from '../../../deal-analytics/hooks/useSizeDistribution';
import { useDealReportFilterOptions } from '../../../deal-analytics/hooks/useDealReportFilterOptions';
import { formatAmountWithCurrency, CURRENCY_OPTIONS, DEFAULT_CURRENCY } from '../../../../shared/constants/currencies';
import { triggerBlobDownload } from '../../../../shared/utils/blobDownload.util';
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


const DealSizeDistributionReport = () => {
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [period, setPeriod] = useState<AnalyticsPeriod | ''>('');
  const [pipelineId, setPipelineId] = useState<number | undefined>(undefined);
  const { pipelineOptions } = useDealReportFilterOptions();
  const { data, isLoading, isError, error, refetch } = useSizeDistribution({ currency, period: period || undefined, pipelineId });
  const tiers = data?.tiers ?? [];

  const handleExport = () => {
    const headers = ['Tier', 'Count', '% of Total', 'Total Value', 'Won Revenue', 'Avg Value', 'Win Rate'];
    const rows = tiers.map((t) => [TIER_LABEL[t.tier] ?? t.tier, t.count, t.percentOfTotal, t.totalAmount, t.wonAmount, t.avgAmount, t.winRate]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    triggerBlobDownload(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), 'deal_size_distribution.csv');
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Deal Size & Value Distribution" description={`Distribution of deals by value tier (${data?.currency ?? currency})`} breadcrumb={false} />

      <div className="filters-panel">
        <div className="filter-row">
          <div className="filter-group">
            <label>Currency</label>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
              {CURRENCY_OPTIONS.map((opt) => (
                <option key={opt.code} value={opt.code}>{opt.code}</option>
              ))}
            </select>
          </div>
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
          <div className="filter-actions">
            <button
              className="btn btn-secondary"
              onClick={() => { setCurrency(DEFAULT_CURRENCY); setPeriod(''); setPipelineId(undefined); }}
            >
              Clear
            </button>
            <button className="btn btn-primary" onClick={handleExport} disabled={tiers.length === 0}>
              <Download size={16} /> Export
            </button>
          </div>
        </div>
      </div>

      <ReportStateWrapper isLoading={isLoading} isError={isError} error={error} onRetry={refetch} isEmpty={!isLoading && !isError && tiers.length === 0} emptyMessage={`No deals in ${currency} for this period`}>
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
              {tiers.map((t) => (
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
      </ReportStateWrapper>
    </div>
  );
};

export default DealSizeDistributionReport;
