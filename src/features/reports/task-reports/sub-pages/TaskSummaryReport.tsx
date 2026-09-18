import React, { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown, Loader2 } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import DateRangeFilter from '../../../../shared/components/filters/DateRangeFilter';
import { Table, THead, TBody, TRow, TCell, EmptyState } from '../../../../shared/components/table';
import { useTableSorting } from '../../../../shared/hooks/useTableSorting';
import { useStaffOptions } from '../../../task/common/hooks/useStaffOptions';
import { useTaskWorkflowOptions } from '../../../task/common/hooks/useTaskWorkflowOptions';
import { useTaskSummaryReport } from '../hooks/useTaskSummaryReport';
import { formatTaskDuration } from '../utils/formatTaskDuration';
import StaffCell from '../components/StaffCell';
import type { DateRange } from '../../../../shared/types/common';
import type { Column } from '../../../../shared/types/table';
import '../../sub-pages/ReportsSubPages.css';

const EMPTY_DATE_RANGE: DateRange = { start: '', end: '' };

const SUMMARY_COLUMNS: Column[] = [
  { key: 'staffName', label: 'Staff Name', sortable: true },
  { key: 'assignedCount', label: 'Assigned', sortable: true },
  { key: 'completedCount', label: 'Completed', sortable: true },
  { key: 'openCount', label: 'Open', sortable: true },
  { key: 'overdueCount', label: 'Overdue', sortable: true },
  { key: 'completionRate', label: 'Completion Rate', sortable: true },
  { key: 'avgTimeToCompleteHours', label: 'Avg. Time to Complete', sortable: true },
];

const TaskSummaryReport = () => {
  const [dateRange, setDateRange] = useState<DateRange>(EMPTY_DATE_RANGE);
  const [staffId, setStaffId] = useState('');
  const [workflowId, setWorkflowId] = useState('');

  const staffHook = useStaffOptions();
  const workflowHook = useTaskWorkflowOptions();
  const { rows, isLoading, error, fetchReport } = useTaskSummaryReport();

  useEffect(() => {
    staffHook.loadStaff();
  }, [staffHook.loadStaff]);

  useEffect(() => {
    fetchReport({
      dateFrom: dateRange.start,
      dateTo: dateRange.end,
      staffId,
      workflowId,
    });
  }, [dateRange, staffId, workflowId, fetchReport]);

  const { sortedData: sortedRows, sortConfig, handleSort } = useTableSorting(rows);

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Task Summary / Productivity Report" breadcrumb={false} />

      <div className="filters-panel">
        <div className="filter-row">
          <DateRangeFilter label="Date Range" idPrefix="task-summary-range" value={dateRange} onChange={setDateRange} />
          <div className="filter-group">
            <label>Staff</label>
            <select value={staffId} onChange={(e) => setStaffId(e.target.value)} disabled={staffHook.staffLoading}>
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
            <select value={workflowId} onChange={(e) => setWorkflowId(e.target.value)} disabled={workflowHook.isLoading}>
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
              {SUMMARY_COLUMNS.map((col) => (
                <TCell
                  key={col.key}
                  variant="th"
                  className={col.sortable ? 'sortable' : ''}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  {col.label}
                  {col.sortable && sortConfig.key === col.key && (
                    sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                  )}
                </TCell>
              ))}
            </TRow>
          </THead>
          <TBody>
            {!isLoading && sortedRows.length === 0 ? (
              <EmptyState colSpan={SUMMARY_COLUMNS.length} message="No task data for this period" />
            ) : (
              sortedRows.map((row) => (
                <TRow key={row.staffId}>
                  <TCell>
                    <StaffCell name={row.staffName} />
                  </TCell>
                  <TCell>{row.assignedCount}</TCell>
                  <TCell>{row.completedCount}</TCell>
                  <TCell>{row.openCount}</TCell>
                  <TCell className={row.overdueCount > 0 ? 'text-danger' : undefined}>{row.overdueCount}</TCell>
                  <TCell>{row.completionRate}%</TCell>
                  <TCell>{formatTaskDuration(row.avgTimeToCompleteHours)}</TCell>
                </TRow>
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
    </div>
  );
};

export default TaskSummaryReport;