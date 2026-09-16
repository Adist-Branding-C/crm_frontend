import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import DateRangeFilter from '../../../../shared/components/filters/DateRangeFilter';
import { Table, THead, TBody, TRow, TCell, EmptyState, Pagination } from '../../../../shared/components/table';
import { useStaffOptions } from '../../../task/common/hooks/useStaffOptions';
import { PRIORITY_OPTIONS } from '../../../task/common/constants/priorityOptions';
import { useTaskSlaBreachReport } from '../hooks/useTaskSlaBreachReport';
import RepeatOffendersCallout from '../components/RepeatOffendersCallout';
import SlaBreachRow from '../components/SlaBreachRow';
import type { DateRange } from '../../../../shared/types/common';
import type { Column } from '../../../../shared/types/table';
import type { TaskReportPriority } from '../types';
import '../../sub-pages/ReportsSubPages.css';

const EMPTY_DATE_RANGE: DateRange = { start: '', end: '' };
const DEFAULT_PAGE_SIZE = 10;

const SLA_BREACH_COLUMNS: Column[] = [
  { key: 'taskTitle', label: 'Task Title' },
  { key: 'priority', label: 'Priority' },
  { key: 'assignedToStaffName', label: 'Assigned To' },
  { key: 'scheduledDateTime', label: 'Scheduled Date/Time' },
  { key: 'breachedByHours', label: 'Breached By' },
  { key: 'notified', label: 'Notified' },
];

const TaskSLABreachReport = () => {
  const [dateRange, setDateRange] = useState<DateRange>(EMPTY_DATE_RANGE);
  const [priority, setPriority] = useState<'' | TaskReportPriority>('');
  const [staffId, setStaffId] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const staffHook = useStaffOptions();
  const { breaches, pagination, repeatOffenders, isLoading, error, fetchReport } = useTaskSlaBreachReport();

  useEffect(() => {
    staffHook.loadStaff();
  }, [staffHook.loadStaff]);

  useEffect(() => {
    fetchReport({
      dateFrom: dateRange.start,
      dateTo: dateRange.end,
      pageNumber,
      limit: DEFAULT_PAGE_SIZE,
      ...(priority ? { priority } : {}),
      ...(staffId ? { staffId } : {}),
    });
  }, [dateRange, priority, staffId, pageNumber, fetchReport]);

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
    setPageNumber(1);
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value as '' | TaskReportPriority);
    setPageNumber(1);
  };

  const handleStaffChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStaffId(e.target.value);
    setPageNumber(1);
  };

  const handlePageChange = (nextPage: number) => {
    setPageNumber(nextPage);
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="SLA Breach & Escalation Report" breadcrumb={false} />

      <div className="filters-panel">
        <div className="filter-row">
          <DateRangeFilter
            label="Date Range"
            idPrefix="sla-breach-range"
            value={dateRange}
            onChange={handleDateRangeChange}
          />
          <div className="filter-group">
            <label>Priority</label>
            <select value={priority} onChange={handlePriorityChange}>
              <option value="">All priorities</option>
              {PRIORITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
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
        </div>
      </div>

      <RepeatOffendersCallout repeatOffenders={repeatOffenders} />

      <div className="table-container">
        <Table wrapperClassName="table-scroll" className="enquiries-table">
          <THead>
            <TRow>
              {SLA_BREACH_COLUMNS.map((col) => (
                <TCell key={col.key} variant="th">
                  {col.label}
                </TCell>
              ))}
            </TRow>
          </THead>
          <TBody>
            {!isLoading && breaches.length === 0 ? (
              <EmptyState colSpan={SLA_BREACH_COLUMNS.length} message="No SLA breaches for the selected filters" />
            ) : (
              breaches.map((row) => (
                <SlaBreachRow key={`${row.taskId}-${row.notifiedAt}`} row={row} />
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

export default TaskSLABreachReport;