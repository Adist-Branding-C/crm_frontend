import React, { useState } from 'react';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import ReportStateWrapper from '../../components/ReportStateWrapper';
import { useAgingDeals } from '../../../deal-analytics/hooks/useAgingDeals';
import { useDealReportFilterOptions } from '../../../deal-analytics/hooks/useDealReportFilterOptions';
import { formatAmountWithCurrency } from '../../../../shared/constants/currencies';
import { triggerBlobDownload } from '../../../../shared/utils/blobDownload.util';
import { useDebouncedSearch } from '../../../../shared/hooks/useDebouncedSearch';

/**
 * Stalled / Aging Deals (issues5.md report #7). All three filters are
 * independently toggleable, per the approved draft - omitted filters are
 * simply not applied.
 *
 * "No activity" is computed from Activities + Remarks + Tasks only - Call
 * Logs are excluded because call_logs has no deal-level column anywhere in
 * this schema (only lead_id); see DealRepository.getAgingDeals' own comment
 * for the full reasoning. Flagged here too since it's a user-visible
 * behavior difference from the ticket's literal "no recent calls" wording.
 */
const DealAgingReport = () => {
  // Committed (debounced) values - these actually drive the API call.
  const [noActivityDays, setNoActivityDays] = useState<string>('');
  const [inStageDays, setInStageDays] = useState<string>('');
  const [closeDateExceeded, setCloseDateExceeded] = useState(false);
  const [pipelineId, setPipelineId] = useState<number | undefined>(undefined);
  const [agentId, setAgentId] = useState<number | undefined>(undefined);
  const [page, setPage] = useState(1);
  const { pipelineOptions, staffOptions } = useDealReportFilterOptions();

  // These two are free-typed number inputs, not a select - without
  // debouncing, every keystroke (e.g. typing "14") fires its own API call.
  // Matches the same useDebouncedSearch pattern already used for search boxes
  // elsewhere in this codebase (useDealSearch.ts, DealTaskPage.tsx).
  const {
    searchValue: noActivityDaysInput,
    handleSearchChange: handleNoActivityDaysInputChange,
    resetSearch: resetNoActivityDaysInput,
  } = useDebouncedSearch((value) => { setNoActivityDays(value); setPage(1); }, 500);

  const {
    searchValue: inStageDaysInput,
    handleSearchChange: handleInStageDaysInputChange,
    resetSearch: resetInStageDaysInput,
  } = useDebouncedSearch((value) => { setInStageDays(value); setPage(1); }, 500);

  const { data, isLoading, isError, error, refetch } = useAgingDeals({
    noActivityDays: noActivityDays ? Number(noActivityDays) : undefined,
    inStageDays: inStageDays ? Number(inStageDays) : undefined,
    closeDateExceeded: closeDateExceeded || undefined,
    pipelineId,
    agentId,
    pageNumber: page,
    limit: 10,
  });

  const items = data?.items ?? [];
  const pagination = data?.pagination;

  const handleExport = () => {
    const headers = ['Deal', 'Stage', 'Days in Stage', 'Days Until/Past Close', 'Amount', 'Agent'];
    const rows = items.map((d) => [d.dealName, d.stageName, d.daysInCurrentStage, d.daysUntilOrPastCloseDate ?? '—', d.amount, d.agentName ?? 'Unassigned']);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    triggerBlobDownload(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), 'stalled_aging_deals.csv');
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Stalled / Aging Deals" description="Deals that may require attention" breadcrumb={false} />

      <div className="filters-panel">
        <div className="filter-row">
          <div className="filter-group">
            <label>No Activity For (Days)</label>
            <input
              type="number"
              min={0}
              placeholder="e.g. 14"
              value={noActivityDaysInput}
              onChange={(e) => handleNoActivityDaysInputChange(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>In Stage More Than (Days)</label>
            <input
              type="number"
              min={0}
              placeholder="e.g. 30"
              value={inStageDaysInput}
              onChange={(e) => handleInStageDaysInputChange(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>&nbsp;</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', minHeight: '38px', fontWeight: 400, textTransform: 'none', letterSpacing: 'normal', fontSize: '0.875rem', color: 'var(--text-main)' }}>
              <input
                type="checkbox"
                checked={closeDateExceeded}
                onChange={(e) => { setCloseDateExceeded(e.target.checked); setPage(1); }}
                style={{ width: 'auto', minHeight: 'auto' }}
              />
              Close date exceeded
            </label>
          </div>
          <div className="filter-group">
            <label>Pipeline</label>
            <select
              value={pipelineId ?? ''}
              onChange={(e) => { setPipelineId(e.target.value ? Number(e.target.value) : undefined); setPage(1); }}
            >
              <option value="">All Pipelines</option>
              {pipelineOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Agent</label>
            <select
              value={agentId ?? ''}
              onChange={(e) => { setAgentId(e.target.value ? Number(e.target.value) : undefined); setPage(1); }}
            >
              <option value="">All Agents</option>
              {staffOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-actions">
            <button
              className="btn btn-secondary"
              onClick={() => {
                resetNoActivityDaysInput(); resetInStageDaysInput();
                setNoActivityDays(''); setInStageDays(''); setCloseDateExceeded(false);
                setPipelineId(undefined); setAgentId(undefined); setPage(1);
              }}
            >
              Clear
            </button>
            <button className="btn btn-primary" onClick={handleExport} disabled={items.length === 0}>
              <Download size={16} /> Export
            </button>
          </div>
        </div>
      </div>

      <ReportStateWrapper
        isLoading={isLoading}
        isError={isError}
        error={error}
        onRetry={refetch}
        isEmpty={!isLoading && !isError && items.length === 0}
        emptyMessage="No deals match these aging filters"
      >
        <div className="table-container">
          <table className="enquiries-table deal-report-table">
            <thead>
              <tr>
                <th>Deal</th>
                <th>Stage</th>
                <th>Days in Current Stage</th>
                <th>Days Until / Past Close Date</th>
                <th>Amount</th>
                <th>Agent</th>
              </tr>
            </thead>
            <tbody>
              {items.map((d) => (
                <tr key={d.id}>
                  <td>{d.dealName}</td>
                  <td>{d.stageName}</td>
                  <td>{d.daysInCurrentStage}</td>
                  <td>
                    {d.daysUntilOrPastCloseDate === null
                      ? '—'
                      : d.daysUntilOrPastCloseDate < 0
                        ? `${Math.abs(d.daysUntilOrPastCloseDate)}d overdue`
                        : `${d.daysUntilOrPastCloseDate}d left`}
                  </td>
                  <td>{formatAmountWithCurrency(d.amount, d.currency)}</td>
                  <td>{d.agentName ?? 'Unassigned'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pagination && (
          <div className="pagination-container">
            <div className="pagination-left">
              <span className="pagination-info">
                Showing {(pagination.page - 1) * pagination.limit + 1}-{Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
              </span>
            </div>
            <div className="pagination-right">
              <button className="pagination-btn" disabled={!pagination.has_previous} onClick={() => setPage((p) => p - 1)}>
                <ChevronLeft size={16} />
              </button>
              <span className="page-indicator">Page {pagination.page} of {pagination.total_pages || 1}</span>
              <button className="pagination-btn" disabled={!pagination.has_next} onClick={() => setPage((p) => p + 1)}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </ReportStateWrapper>
    </div>
  );
};

export default DealAgingReport;
