import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import DateRangeFilter from '../../../../shared/components/filters/DateRangeFilter';
import { Table, THead, TBody, TRow, TCell, EmptyState, Pagination } from '../../../../shared/components/table';
import { useStaffOptions } from '../../../task/common/hooks/useStaffOptions';
import { useTaskWorkflowOptions } from '../../../task/common/hooks/useTaskWorkflowOptions';
import { RECURRING_COMPLIANCE_STATUS_OPTIONS } from '../constants/recurringCompliance.data';
import { useTaskRecurringComplianceReport } from '../hooks/useTaskRecurringComplianceReport';
import RecurringTaskComplianceRow from '../components/RecurringTaskComplianceRow';
import RecurringComplianceInstancesModal from '../components/RecurringComplianceInstancesModal';
import type { DateRange } from '../../../../shared/types/common';
import type { Column } from '../../../../shared/types/table';
import type {
  RecurringTaskComplianceRow as RecurringTaskChain,
  RecurringTaskComplianceStatus,
} from '../types';

const EMPTY_DATE_RANGE: DateRange = { start: '', end: '' };
const DEFAULT_PAGE_SIZE = 10;

const RECURRING_COMPLIANCE_COLUMNS: Column[] = [
  { key: 'taskName', label: 'Task Name' },
  { key: 'recurrenceRule', label: 'Recurrence Rule' },
  { key: 'expectedActual', label: 'Expected / Actual' },
  { key: 'counts', label: 'On-Time / Late / Missed' },
  { key: 'complianceRate', label: 'Compliance Rate' },
  { key: 'lastGeneratedAt', label: 'Last Generated' },
  { key: 'status', label: 'Status' },
];

const TaskRecurringComplianceReport = () => {
  const [dateRange, setDateRange] = useState<DateRange>(EMPTY_DATE_RANGE);
  const [staffId, setStaffId] = useState('');
  const [workflowId, setWorkflowId] = useState('');
  const [status, setStatus] = useState<'' | RecurringTaskComplianceStatus>('');
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedChain, setSelectedChain] = useState<RecurringTaskChain | null>(null);

  const staffHook = useStaffOptions();
  const workflowHook = useTaskWorkflowOptions();
  const { chains, pagination, isLoading, error, fetchReport } = useTaskRecurringComplianceReport();

  useEffect(() => {
    staffHook.loadStaff();
  }, [staffHook.loadStaff]);

  useEffect(() => {
    fetchReport({
      dateFrom: dateRange.start,
      dateTo: dateRange.end,
      pageNumber,
      limit: DEFAULT_PAGE_SIZE,
      ...(staffId ? { staffId } : {}),
      ...(workflowId ? { workflowId } : {}),
      ...(status ? { status } : {}),
    });
  }, [dateRange, staffId, workflowId, status, pageNumber, fetchReport]);

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
    setPageNumber(1);
  };

  const handleStaffChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStaffId(e.target.value);
    setPageNumber(1);
  };

  const handleWorkflowChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWorkflowId(e.target.value);
    setPageNumber(1);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as '' | RecurringTaskComplianceStatus);
    setPageNumber(1);
  };

  const handlePageChange = (nextPage: number) => {
    setPageNumber(nextPage);
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Recurring Task Compliance Report" breadcrumb={false} />

      <div className="filters-panel">
        <div className="filter-row">
          <DateRangeFilter
            label="Date Range"
            idPrefix="recurring-compliance-range"
            value={dateRange}
            onChange={handleDateRangeChange}
          />
          <div className="filter-group">
            <label>Staff</label>
            <select value={staffId} onChange={handleStaffChange} disabled={staffHook.staffLoading}>
              <option value="">All staff</option>
              {staffHook.staffOptions.map((staff) => (
                <option key={staff.value} value={staff.value}>
                  {staff.label}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Workflow</label>
            <select value={workflowId} onChange={handleWorkflowChange} disabled={workflowHook.isLoading}>
              <option value="">All workflows</option>
              {workflowHook.workflowOptions.map((workflow) => (
                <option key={workflow.value} value={workflow.value}>
                  {workflow.label}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Status</label>
            <select value={status} onChange={handleStatusChange}>
              <option value="">All statuses</option>
              {RECURRING_COMPLIANCE_STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="table-container">
        <Table wrapperClassName="table-scroll" className="enquiries-table">
          <THead>
            <TRow>
              {RECURRING_COMPLIANCE_COLUMNS.map((col) => (
                <TCell key={col.key} variant="th">
                  {col.label}
                </TCell>
              ))}
            </TRow>
          </THead>
          <TBody>
            {!isLoading && chains.length === 0 ? (
              <EmptyState colSpan={RECURRING_COMPLIANCE_COLUMNS.length} message="No recurring chains match the selected filters" />
            ) : (
              chains.map((row) => (
                <RecurringTaskComplianceRow
                  key={row.taskId}
                  row={row}
                  onOpenDrillDown={setSelectedChain}
                />
              ))
            )}
          </TBody>
        </Table>

        {isLoading && (
          <div className="table-loading">
            <Loader2 size={24} className="spin" /> Loading...
          </div>
        )}

        {error && !isLoading && <div className="report-load-error">{error}</div>}
      </div>

      {pagination && pagination.total > 0 && !isLoading && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.total_pages}
          totalItems={pagination.total}
          rowsPerPage={pagination.limit}
          onPageChange={handlePageChange}
        />
      )}

      <RecurringComplianceInstancesModal
        isOpen={Boolean(selectedChain)}
        chain={selectedChain}
        onClose={() => setSelectedChain(null)}
      />
    </div>
  );
};

export default TaskRecurringComplianceReport;