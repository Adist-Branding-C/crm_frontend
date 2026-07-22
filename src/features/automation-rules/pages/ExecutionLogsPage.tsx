import { useNavigate } from 'react-router-dom';
import { ChevronDown, Filter } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { Table, THead, TBody, TRow, TCell, TableNav, Pagination, EmptyState } from '../../../shared/components/table';
import ToastNotification from '../../../shared/components/ToastNotification';
import ConfirmDialog from '../components/ConfirmDialog';
import ExecutionLogRow from '../components/ExecutionLogRow';
import { useExecutionLogsPage } from '../hooks/useExecutionLogsPage';
import { EXECUTION_STATUS_FILTER_OPTIONS } from '../constants';
import '../styles/automation.css';
import './ExecutionLogsPage.css';

const ExecutionLogsPage = () => {
  const navigate = useNavigate();
  const page = useExecutionLogsPage();

  return (
    <div className="automation-rules-page">
      <PageHeader
        title={page.rule ? `Execution Logs — ${page.rule.name}` : 'Execution Logs'}
        breadcrumb={[
          { label: 'Automation Rules', link: '/automation-rules' },
          { label: 'Execution Logs', link: null },
        ]}
        action={
          <button className="btn btn-secondary" onClick={() => navigate('/automation-rules')}>Back to Rule</button>
        }
      />

      <div className="table-container">
        {page.isLoading && page.logs.length === 0 ? (
          <p className="automation-empty-hint" style={{ padding: '2rem' }}>Loading…</p>
        ) : page.isEmpty ? (
          <p className="automation-empty-hint" style={{ padding: '2rem' }}>No activity yet — this rule hasn't been triggered.</p>
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
                      {EXECUTION_STATUS_FILTER_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
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
                  <TCell variant="th" />
                  <TCell variant="th">Lead</TCell>
                  <TCell variant="th">Action Type</TCell>
                  <TCell variant="th">Status</TCell>
                  <TCell variant="th">Triggered At</TCell>
                  <TCell variant="th">Retry Count</TCell>
                  <TCell variant="th" />
                </TRow>
              </THead>
              <TBody>
                {page.logs.length === 0 ? (
                  <EmptyState colSpan={7} message="No logs match your filters" />
                ) : (
                  page.logs.map((log) => (
                    <ExecutionLogRow
                      key={log.id}
                      log={log}
                      isExpanded={page.expandedIds.has(log.id)}
                      onToggle={() => page.toggleExpanded(log.id)}
                      onRetry={() => page.requestRetry(log.id)}
                    />
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

      <ConfirmDialog
        isOpen={!!page.retryTarget}
        title="Retry action"
        message="Retry this action now?"
        confirmLabel="Retry"
        onConfirm={page.confirmRetry}
        onClose={page.cancelRetry}
      />

      <ToastNotification
        isVisible={page.toast.showToast}
        type={page.toast.toastType}
        message={page.toast.toastMessage}
        onDismiss={() => page.toast.setShowToast(false)}
      />
    </div>
  );
};

export default ExecutionLogsPage;
