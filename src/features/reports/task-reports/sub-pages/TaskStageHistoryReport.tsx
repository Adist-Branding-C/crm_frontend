import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import DateRangeFilter from '../../../../shared/components/filters/DateRangeFilter';
import { Table, THead, TBody, TRow, TCell, EmptyState, Pagination } from '../../../../shared/components/table';
import { useStaffOptions } from '../../../task/common/hooks/useStaffOptions';
import { useTaskWorkflowOptions } from '../../../task/common/hooks/useTaskWorkflowOptions';
import { useTaskStageHistoryReport } from '../hooks/useTaskStageHistoryReport';
import TaskStageHistoryRow from '../components/TaskStageHistoryRow';
import type { DateRange } from '../../../../shared/types/common';
import type { Column } from '../../../../shared/types/table';
import '../../sub-pages/ReportsSubPages.css';

const EMPTY_DATE_RANGE: DateRange = { start: '', end: '' };
const DEFAULT_PAGE_SIZE = 10;

const STAGE_HISTORY_COLUMNS: Column[] = [
  { key: 'taskTitle', label: 'Task Title' },
  { key: 'change', label: 'Change' },
  { key: 'movedByStaffName', label: 'Changed By' },
  { key: 'changedAt', label: 'Changed At' },
];

const TaskStageHistoryReport = () => {
  const [dateRange, setDateRange] = useState<DateRange>(EMPTY_DATE_RANGE);
  const [staffId, setStaffId] = useState('');
  const [workflowId, setWorkflowId] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const staffHook = useStaffOptions();
  const workflowHook = useTaskWorkflowOptions();
  const { history, pagination, isLoading, error, fetchReport } = useTaskStageHistoryReport();

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
    });
  }, [dateRange, staffId, workflowId, pageNumber, fetchReport]);

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

  const handlePageChange = (nextPage: number) => {
    setPageNumber(nextPage);
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Stage & Status Change History Report" breadcrumb={false} />

      <div className="filters-panel">
        <div className="filter-row">
          <DateRangeFilter
            label="Date Range"
            idPrefix="stage-history-range"
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
        </div>
      </div>

      <div className="table-container">
        <Table wrapperClassName="table-scroll" className="enquiries-table">
          <THead>
            <TRow>
              {STAGE_HISTORY_COLUMNS.map((col) => (
                <TCell key={col.key} variant="th">
                  {col.label}
                </TCell>
              ))}
            </TRow>
          </THead>
          <TBody>
            {!isLoading && history.length === 0 ? (
              <EmptyState colSpan={STAGE_HISTORY_COLUMNS.length} message="No stage changes for the selected filters" />
            ) : (
              history.map((row, index) => (
                <TaskStageHistoryRow
                  key={`${row.taskId}-${row.changedAt}-${index}`}
                  row={row}
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
    </div>
  );
};

export default TaskStageHistoryReport;