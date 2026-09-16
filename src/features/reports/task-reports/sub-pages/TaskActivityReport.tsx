import React, { useEffect, useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import DateRangeFilter from '../../../../shared/components/filters/DateRangeFilter';
import ToastNotification from '../../../../shared/components/ToastNotification';
import { useToast } from '../../../../shared/hooks/useToast';
import {
  Table,
  THead,
  TBody,
  TRow,
  TCell,
  EmptyState,
  Pagination,
} from '../../../../shared/components/table';
import { useStaffOptions } from '../../../task/common/hooks/useStaffOptions';
import { useTaskWorkflowOptions } from '../../../task/common/hooks/useTaskWorkflowOptions';
import { useTaskActivityReport } from '../hooks/useTaskActivityReport';
import { useTaskActivityExport } from '../hooks/useTaskActivityExport';
import TaskActivityRow from '../components/TaskActivityRow';
import {
  ACTIVITY_DATE_FIELD_OPTIONS,
  ACTIVITY_DEFAULT_DATE_FIELD,
  ACTIVITY_PRIORITY_OPTIONS,
  ACTIVITY_STATUS_OPTIONS,
  ACTIVITY_TYPE_OPTIONS,
} from '../constants/taskActivity.data';
import type { DateRange } from '../../../../shared/types/common';
import type { Column } from '../../../../shared/types/table';
import type { TaskActivityDateField, TaskActivityType } from '../types';
import '../../sub-pages/ReportsSubPages.css';

const EMPTY_DATE_RANGE: DateRange = { start: '', end: '' };
const DEFAULT_PAGE_SIZE = 10;
const SEARCH_DEBOUNCE_MS = 400;

const ACTIVITY_COLUMNS: Column[] = [
  { key: 'title', label: 'Task Title' },
  { key: 'type', label: 'Type' },
  { key: 'priority', label: 'Priority' },
  { key: 'status', label: 'Status' },
  { key: 'assigneeName', label: 'Assignee' },
  { key: 'workflowName', label: 'Workflow' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'dueDate', label: 'Due Date' },
  { key: 'completedAt', label: 'Completed At' },
  { key: 'attachmentCount', label: 'Attachments' },
  { key: 'tags', label: 'Tags' },
];

const TaskActivityReport = () => {
  const [dateField, setDateField] = useState<TaskActivityDateField>(ACTIVITY_DEFAULT_DATE_FIELD);
  const [dateRange, setDateRange] = useState<DateRange>(EMPTY_DATE_RANGE);
  const [status, setStatus] = useState('');
  const [type, setType] = useState<'' | TaskActivityType>('');
  const [priority, setPriority] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [workflowId, setWorkflowId] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchApplied, setSearchApplied] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [exportError, setExportError] = useState<string | null>(null);

  const staffHook = useStaffOptions();
  const workflowHook = useTaskWorkflowOptions();
  const toast = useToast();
  const { tasks, pagination, isLoading, error, fetchReport } = useTaskActivityReport();
  const { isExporting, exportExcel } = useTaskActivityExport();

  useEffect(() => {
    staffHook.loadStaff();
  }, [staffHook.loadStaff]);

  useEffect(() => {
    setPageNumber(1);
  }, [searchApplied]);

  useEffect(() => {
    if (searchInput === '') {
      setSearchApplied('');
      return;
    }
    const timerId = window.setTimeout(() => setSearchApplied(searchInput), SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timerId);
  }, [searchInput]);

  useEffect(() => {
    fetchReport({
      pageNumber,
      limit: DEFAULT_PAGE_SIZE,
      dateField,
      dateFrom: dateRange.start,
      dateTo: dateRange.end,
      ...(status ? { status } : {}),
      ...(type ? { type } : {}),
      ...(priority ? { priority } : {}),
      ...(assigneeId ? { assigneeId: Number(assigneeId) } : {}),
      ...(workflowId ? { workflowId: Number(workflowId) } : {}),
      ...(searchApplied ? { search: searchApplied } : {}),
    });
  }, [
    dateField,
    dateRange,
    status,
    type,
    priority,
    assigneeId,
    workflowId,
    searchApplied,
    pageNumber,
    fetchReport,
  ]);

  const filtersApplied = Boolean(
    dateRange.start || dateRange.end || status || type || priority || assigneeId || workflowId || searchApplied,
  );

  const resetPage = () => setPageNumber(1);

  const buildFilterParams = () => ({
    dateField,
    dateFrom: dateRange.start,
    dateTo: dateRange.end,
    ...(status ? { status } : {}),
    ...(type ? { type } : {}),
    ...(priority ? { priority } : {}),
    ...(assigneeId ? { assigneeId: Number(assigneeId) } : {}),
    ...(workflowId ? { workflowId: Number(workflowId) } : {}),
    ...(searchApplied ? { search: searchApplied } : {}),
  });

  const handleExport = async () => {
    setExportError(null);
    const errorMessage = await exportExcel(buildFilterParams());
    if (errorMessage) setExportError(errorMessage);
  };

  useEffect(() => {
    if (exportError) {
      toast.showToastMessage(exportError, 'error');
    }
  }, [exportError, toast.showToastMessage]);

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Task Work / Activity Report" breadcrumb={false} />

      <div className="filters-panel">
        <div className="activity-filter-header">
          <span className="activity-filter-heading">Filters</span>
          <button
            className="btn btn-secondary btn-sm activity-export-btn"
            onClick={handleExport}
            disabled={isExporting || isLoading}
          >
            <Download size={14} />
            {isExporting ? 'Exporting...' : 'Export Excel'}
          </button>
        </div>
        <div className="filter-row">
          <div className="filter-group">
            <label>Date Field</label>
            <select value={dateField} onChange={(e) => { setDateField(e.target.value as TaskActivityDateField); resetPage(); }}>
              {ACTIVITY_DATE_FIELD_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <DateRangeFilter
            label="Date Range"
            idPrefix="task-activity-range"
            value={dateRange}
            onChange={(range) => { setDateRange(range); resetPage(); }}
          />
          <div className="filter-group">
            <label>Status</label>
            <select value={status} onChange={(e) => { setStatus(e.target.value); resetPage(); }}>
              <option value="">All statuses</option>
              {ACTIVITY_STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Type</label>
            <select value={type} onChange={(e) => { setType(e.target.value as '' | TaskActivityType); resetPage(); }}>
              <option value="">All types</option>
              {ACTIVITY_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Priority</label>
            <select value={priority} onChange={(e) => { setPriority(e.target.value); resetPage(); }}>
              <option value="">All priorities</option>
              {ACTIVITY_PRIORITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Assignee</label>
            <select value={assigneeId} onChange={(e) => { setAssigneeId(e.target.value); resetPage(); }} disabled={staffHook.staffLoading}>
              <option value="">All assignees</option>
              {staffHook.staffOptions.map((staff) => (
                <option key={staff.value} value={staff.value}>
                  {staff.label}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Workflow</label>
            <select value={workflowId} onChange={(e) => { setWorkflowId(e.target.value); resetPage(); }} disabled={workflowHook.isLoading}>
              <option value="">All workflows</option>
              {workflowHook.workflowOptions.map((workflow) => (
                <option key={workflow.value} value={workflow.value}>
                  {workflow.label}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group activity-search-group">
            <label>Search</label>
            <input
              type="text"
              placeholder="Search task title..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
      </div>

      {error && !isLoading && <div className="report-load-error">{error}</div>}

      <div className="table-container">
        <Table wrapperClassName="table-scroll" className="enquiries-table">
          <THead>
            <TRow>
              {ACTIVITY_COLUMNS.map((col) => (
                <TCell key={col.key} variant="th">
                  {col.label}
                </TCell>
              ))}
            </TRow>
          </THead>
          <TBody>
            {!isLoading && tasks.length === 0 ? (
              <EmptyState
                colSpan={ACTIVITY_COLUMNS.length}
                message={filtersApplied ? 'No tasks match your filters' : 'No task data for this period'}
              />
            ) : (
              tasks.map((row) => <TaskActivityRow key={row.taskId} row={row} />)
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
          onPageChange={setPageNumber}
        />
      )}

      <ToastNotification
        isVisible={toast.showToast}
        type={toast.toastType}
        message={toast.toastMessage}
        onDismiss={() => toast.setShowToast(false)}
      />
    </div>
  );
};

export default TaskActivityReport;