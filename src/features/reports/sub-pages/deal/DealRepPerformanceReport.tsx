import React, { useState } from 'react';
import { Download } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import ReportStateWrapper from '../../components/ReportStateWrapper';
import { useOwnerLeaderboard } from '../../../deal-analytics/hooks/useOwnerLeaderboard';
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

const formatCycle = (seconds: number | null): string => {
  if (seconds === null) return '—';
  const days = Math.round(seconds / 86400);
  return `${days}d`;
};


const DealRepPerformanceReport = () => {
  const [period, setPeriod] = useState<AnalyticsPeriod | ''>('');
  const [pipelineId, setPipelineId] = useState<number | undefined>(undefined);
  const { pipelineOptions } = useDealReportFilterOptions();
  const { data, isLoading, isError, error, refetch } = useOwnerLeaderboard({ period: period || undefined, pipelineId });
  const rows = data ?? [];

  const handleExport = () => {
    const headers = ['Agent', 'Total Deals', 'Won', 'Lost', 'Win Rate', 'Total Value', 'Won Revenue', 'Avg Sales Cycle'];
    const csvRows = rows.map((r) => [r.agentName, r.totalDeals, r.wonDeals, r.lostDeals, `${r.winRate}%`, r.totalAmount, r.wonAmount, formatCycle(r.avgSalesCycleSeconds)]);
    const csv = [headers.join(','), ...csvRows.map((r) => r.join(','))].join('\n');
    triggerBlobDownload(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), 'sales_rep_performance.csv');
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Sales Rep Deal Performance" description="Leaderboard comparing sales rep performance" breadcrumb={false} />

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
          <div className="filter-actions">
            <button className="btn btn-secondary" onClick={() => { setPeriod(''); setPipelineId(undefined); }}>Clear</button>
            <button className="btn btn-primary" onClick={handleExport} disabled={rows.length === 0}>
              <Download size={16} /> Export
            </button>
          </div>
        </div>
      </div>

      <ReportStateWrapper isLoading={isLoading} isError={isError} error={error} onRetry={refetch} isEmpty={!isLoading && !isError && rows.length === 0}>
        <div className="table-container">
          <table className="enquiries-table deal-report-table">
            <thead>
              <tr>
                <th>Agent</th>
                <th>Total Deals</th>
                <th>Won</th>
                <th>Lost</th>
                <th>Win Rate</th>
                <th>Total Value</th>
                <th>Won Revenue</th>
                <th>Avg Sales Cycle</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.agentId}>
                  <td>{r.agentName}</td>
                  <td>{r.totalDeals}</td>
                  <td>{r.wonDeals}</td>
                  <td>{r.lostDeals}</td>
                  <td>{r.winRate}%</td>
                  <td>{formatAmountWithCurrency(r.totalAmount)}</td>
                  <td>{formatAmountWithCurrency(r.wonAmount)}</td>
                  <td>{formatCycle(r.avgSalesCycleSeconds)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ReportStateWrapper>
    </div>
  );
};

export default DealRepPerformanceReport;
