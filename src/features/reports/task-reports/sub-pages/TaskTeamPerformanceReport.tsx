import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import PageHeader from '../../../../shared/components/layout/PageHeader';
import DateRangeFilter from '../../../../shared/components/filters/DateRangeFilter';
import {
  Table,
  THead,
  TBody,
  TRow,
  TCell,
  EmptyState,
  Pagination,
} from '../../../../shared/components/table';
import { useTaskWorkflowOptions } from '../../../task/common/hooks/useTaskWorkflowOptions';
import { useTaskTeamPerformanceReport } from '../hooks/useTaskTeamPerformanceReport';
import TeamPerformanceRollupRow from '../components/TeamPerformanceRollupRow';
import TeamPerformanceDrilldownModal from '../components/TeamPerformanceDrilldownModal';
import { TEAM_PERFORMANCE_DEFAULT_PAGE_SIZE } from '../constants/teamPerformance.data';
import type { DateRange } from '../../../../shared/types/common';
import type { Column } from '../../../../shared/types/table';
import type { TeamPerformanceRollupRow as RollupRow } from '../types';
import '../../sub-pages/ReportsSubPages.css';

const EMPTY_DATE_RANGE: DateRange = { start: '', end: '' };

const TaskTeamPerformanceReport = () => {
  const [dateRange, setDateRange] = useState<DateRange>(EMPTY_DATE_RANGE);
  const [workflowId, setWorkflowId] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedGroup, setSelectedGroup] = useState<RollupRow | null>(null);

  const workflowHook = useTaskWorkflowOptions();
  const { rows, pagination, isLoading, error, fetchReport } =
    useTaskTeamPerformanceReport();

  useEffect(() => {
    fetchReport({
      dateFrom: dateRange.start,
      dateTo: dateRange.end,
      ...(workflowId ? { workflowId: Number(workflowId) } : {}),
      pageNumber,
      limit: TEAM_PERFORMANCE_DEFAULT_PAGE_SIZE,
    });
  }, [dateRange, workflowId, pageNumber, fetchReport]);

  const rollupColumns: Column[] = [
    { key: 'groupName', label: 'Department' },
    { key: 'staffCount', label: 'Staff Count' },
    { key: 'totalTasks', label: 'Total Tasks' },
    { key: 'completedCount', label: 'Completed' },
    { key: 'openCount', label: 'Open' },
    { key: 'overdueCount', label: 'Overdue' },
    { key: 'completionRate', label: 'Completion Rate' },
    { key: 'slaBreachRate', label: 'SLA Breach Rate' },
    { key: 'avgTimeToCompleteHours', label: 'Avg. Time to Complete' },
  ];

  const filtersApplied = Boolean(dateRange.start || dateRange.end || workflowId);

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
    setPageNumber(1);
  };

  const handleWorkflowChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWorkflowId(e.target.value);
    setPageNumber(1);
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Rep / Team / Department Performance Report" breadcrumb={false} />

      <div className="filters-panel">
        <div className="filter-row">
          <DateRangeFilter
            label="Date Range"
            idPrefix="team-performance-range"
            value={dateRange}
            onChange={handleDateRangeChange}
          />
          <div className="filter-group">
            <label>Workflow</label>
            <select
              value={workflowId}
              onChange={handleWorkflowChange}
              disabled={workflowHook.isLoading}
            >
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
              {rollupColumns.map((col) => (
                <TCell key={col.key} variant="th">
                  {col.label}
                </TCell>
              ))}
            </TRow>
          </THead>
          <TBody>
            {!isLoading && rows.length === 0 ? (
              <EmptyState
                colSpan={rollupColumns.length}
                message={
                  filtersApplied
                    ? 'No teams match the selected filters'
                    : 'No team performance data for this period'
                }
              />
            ) : (
              rows.map((row) => (
                <TeamPerformanceRollupRow key={row.groupId} row={row} onSelect={setSelectedGroup} />
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
          onPageChange={setPageNumber}
        />
      )}

      <TeamPerformanceDrilldownModal
        isOpen={Boolean(selectedGroup)}
        group={selectedGroup}
        dateRange={dateRange}
        workflowId={workflowId}
        onClose={() => setSelectedGroup(null)}
      />
    </div>
  );
};

export default TaskTeamPerformanceReport;