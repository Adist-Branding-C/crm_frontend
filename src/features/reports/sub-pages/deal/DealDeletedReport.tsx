import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import ReportStateWrapper from '../../components/ReportStateWrapper';
import { useDebouncedSearch } from '../../../../shared/hooks/useDebouncedSearch';
import { useDeletedDeals } from '../../../deal-analytics/hooks/useDeletedDeals';
import { useDealReportFilterOptions } from '../../../deal-analytics/hooks/useDealReportFilterOptions';
import { useDealFilterOptions } from '../../../deal/hooks/useDealFilterOptions';
import { useSourceOptions } from '../../../deal-analytics/hooks/useSourceOptions';
import { mapApiToUI } from '../../../deal/utils/dealMapper';
import { formatAmountWithCurrency } from '../../../../shared/constants/currencies';
import DateRangePicker from '../../../../shared/components/filters/DateRangePicker';


const DealDeletedReport = () => {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [dateFilterBy, setDateFilterBy] = useState('createdAt');
  const [type, setType] = useState('');
  const [deletedBy, setDeletedBy] = useState('');
  const [agentId, setAgentId] = useState<number | undefined>(undefined);
  const [statusId, setStatusId] = useState('');
  const [sourceId, setSourceId] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { staffOptions, deletedByOptions } = useDealReportFilterOptions();
  const { statusOptions } = useDealFilterOptions();
  const { sourceOptions } = useSourceOptions();

  const { searchValue: searchInput, handleSearchChange, resetSearch } = useDebouncedSearch((value) => {
    setSearch(value);
    setPage(1);
  });

  const { data, isLoading, isError, error, refetch } = useDeletedDeals({
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
    dateFilterBy,
    type: type || undefined,
    deletedBy: deletedBy || undefined,
    agentId,
    statusId: statusId || undefined,
    sourceId: sourceId || undefined,
    search: search || undefined,
    pageNumber: page,
    limit: 10,
  });

  const items = (data?.items ?? []).map(mapApiToUI);
  const pagination = data?.pagination;

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Deleted Deals" description="Soft-deleted deals (admin only)" breadcrumb={false} />

      <div className="filters-panel">
        <div className="filter-row">
          <div className="filter-group">
            <label>Search Deals</label>
            <input type="text" placeholder="Type a deal name..." value={searchInput} onChange={(e) => handleSearchChange(e.target.value)} />
          </div>
          <DateRangePicker
            label="Date Range"
            value={{ start: dateFrom, end: dateTo }}
            onChange={(range) => { setDateFrom(range.start); setDateTo(range.end); setPage(1); }}
          />
          <div className="filter-group">
            <label>Filter By Date</label>
            <select value={dateFilterBy} onChange={(e) => { setDateFilterBy(e.target.value); setPage(1); }}>
              <option value="createdAt">Created Date</option>
              <option value="updatedAt">Updated Date</option>
              <option value="startDate">Start Date</option>
              <option value="endDate">End Date</option>
            </select>
          </div>
        </div>
        <div className="filter-row">
          <div className="filter-group">
            <label>Stage</label>
            <select value={statusId} onChange={(e) => { setStatusId(e.target.value); setPage(1); }}>
              <option value="">All Stages</option>
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Source</label>
            <select value={sourceId} onChange={(e) => { setSourceId(e.target.value); setPage(1); }}>
              <option value="">All Sources</option>
              {sourceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Deal Type</label>
            <select value={type} onChange={(e) => { setType(e.target.value); setPage(1); }}>
              <option value="">All Types</option>
              <option value="New">New</option>
              <option value="Existing">Existing</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Agent</label>
            <select value={agentId ?? ''} onChange={(e) => { setAgentId(e.target.value ? Number(e.target.value) : undefined); setPage(1); }}>
              <option value="">All Agents</option>
              {staffOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Deleted By</label>
            <select value={deletedBy} onChange={(e) => { setDeletedBy(e.target.value); setPage(1); }}>
              <option value="">Anyone</option>
              {deletedByOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-actions">
            <button
              className="btn btn-secondary"
              onClick={() => {
                resetSearch(); setSearch(''); setDateFrom(''); setDateTo(''); setDateFilterBy('createdAt'); setType('');
                setAgentId(undefined); setDeletedBy(''); setStatusId(''); setSourceId(''); setPage(1);
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <ReportStateWrapper isLoading={isLoading} isError={isError} error={error} onRetry={refetch} isEmpty={!isLoading && !isError && items.length === 0} emptyMessage="No deleted deals match these filters">
        <div className="table-container">
          <table className="enquiries-table deal-report-table">
            <thead>
              <tr>
                <th>Deal</th>
                <th>Lead</th>
                <th>Stage</th>
                <th>Amount</th>
                <th>Agent</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {items.map((d) => (
                <tr key={d.id}>
                  <td>{d.dealName}</td>
                  <td>{d.lead}</td>
                  <td>{d.status}</td>
                  <td>{formatAmountWithCurrency(d.amount, d.currency)}</td>
                  <td>{d.agent || 'Unassigned'}</td>
                  <td>{d.createdAt}</td>
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

export default DealDeletedReport;
