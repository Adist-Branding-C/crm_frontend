import { useNavigate } from 'react-router-dom';
import { ChevronDown, Filter } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { Table, THead, TBody, TRow, TCell, TableNav, Pagination, EmptyState } from '../../../shared/components/table';
import { useWebhookHistoryPage } from '../hooks/useWebhookHistoryPage';
import { WEBHOOK_ATTEMPT_STATUS_FILTER_OPTIONS } from '../constants';
import '../styles/automation.css';
import './ExecutionLogsPage.css';

const WebhookHistoryPage = () => {
  const navigate = useNavigate();
  const page = useWebhookHistoryPage();

  return (
    <div className="automation-rules-page">
      <PageHeader
        title="Webhook History"
        description="Every webhook delivery attempt across all automation rules"
        breadcrumb={[
          { label: 'Automation Rules', link: '/automation-rules' },
          { label: 'Webhook Endpoints', link: '/automation/webhooks' },
          { label: 'Webhook History', link: null },
        ]}
        action={
          <button className="btn btn-secondary" onClick={() => navigate('/automation/webhooks')}>Back to Endpoints</button>
        }
      />

      <div className="table-container">
        {page.isLoading && page.entries.length === 0 ? (
          <p className="automation-empty-hint" style={{ padding: '2rem' }}>Loading…</p>
        ) : page.isEmpty ? (
          <p className="automation-empty-hint" style={{ padding: '2rem' }}>No webhook attempts recorded yet.</p>
        ) : (
          <>
            <TableNav
              searchQuery=""
              onSearchChange={() => {}}
              rowsPerPage={page.rowsPerPage}
              onRowsPerPageChange={page.handleRowsPerPageChange}
            >
              <button className="btn btn-secondary" onClick={() => page.setShowFilters(!page.showFilters)}>
                <Filter size={16} /> Filter <ChevronDown size={14} className={page.showFilters ? 'rotate' : ''} />
              </button>
            </TableNav>

            {page.showFilters && (
              <div className="filters-panel">
                <div className="filter-row">
                  <div className="filter-group">
                    <label>Status</label>
                    <select value={page.statusFilter} onChange={(e) => page.setStatusFilter(e.target.value as typeof page.statusFilter)}>
                      {WEBHOOK_ATTEMPT_STATUS_FILTER_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-group">
                    <label>Endpoint</label>
                    <select value={page.endpointFilter} onChange={(e) => page.setEndpointFilter(e.target.value)}>
                      <option value="">All Endpoints</option>
                      {page.endpointOptions.map((endpoint) => (
                        <option key={endpoint.id} value={endpoint.id}>{endpoint.url}</option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-group">
                    <label>Date Range</label>
                    <div className="date-range-input">
                      <input type="date" value={page.fromDate} onChange={(e) => page.setFromDate(e.target.value)} />
                      <span>to</span>
                      <input type="date" value={page.toDate} onChange={(e) => page.setToDate(e.target.value)} />
                    </div>
                  </div>
                  <div className="filter-actions">
                    <button className="btn btn-secondary" onClick={page.clearFilters}>Clear</button>
                  </div>
                </div>
              </div>
            )}

            <Table wrapperClassName="table-scroll" className="data-table">
              <THead>
                <TRow>
                  <TCell variant="th">Endpoint URL</TCell>
                  <TCell variant="th">Lead</TCell>
                  <TCell variant="th">Status Code</TCell>
                  <TCell variant="th">Status</TCell>
                  <TCell variant="th">Duration</TCell>
                  <TCell variant="th">Attempted At</TCell>
                </TRow>
              </THead>
              <TBody>
                {page.entries.length === 0 ? (
                  <EmptyState colSpan={6} message="No attempts match your filters" />
                ) : (
                  page.entries.map((entry) => (
                    <TRow key={entry.id}>
                      <TCell>{entry.webhookUrl ?? '-'}</TCell>
                      <TCell>{entry.leadId ?? '-'}</TCell>
                      <TCell>{entry.statusCode ?? '-'}</TCell>
                      <TCell>
                        <span className={`badge ${entry.status === 'success' ? 'badge-exec-success' : 'badge-exec-failed'}`}>
                          {entry.status === 'success' ? 'Success' : 'Failed'}
                        </span>
                      </TCell>
                      <TCell>{entry.durationMs ? `${entry.durationMs} ms` : '-'}</TCell>
                      <TCell>{new Date(entry.createdAt).toLocaleString()}</TCell>
                    </TRow>
                  ))
                )}
              </TBody>
            </Table>

            <Pagination
              currentPage={page.currentPage}
              totalPages={page.totalPages}
              totalItems={page.totalItems}
              rowsPerPage={page.rowsPerPage}
              onPageChange={page.setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default WebhookHistoryPage;
