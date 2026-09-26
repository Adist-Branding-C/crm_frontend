import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import Modal from '../../../../shared/components/Modal';
import {
  Table,
  THead,
  TBody,
  TRow,
  TCell,
  EmptyState,
  Pagination,
} from '../../../../shared/components/table';
import {
  TEAM_PERFORMANCE_DEFAULT_PAGE_SIZE,
} from '../constants/teamPerformance.data';
import { useTaskTeamPerformanceDrilldown } from '../hooks/useTaskTeamPerformanceDrilldown';
import TeamPerformanceStaffRow from './TeamPerformanceStaffRow';
import type { DateRange } from '../../../../shared/types/common';
import type { Column } from '../../../../shared/types/table';
import type { TeamPerformanceRollupRow } from '../types';

const STAFF_COLUMNS: Column[] = [
  { key: 'staffName', label: 'Staff Name' },
  { key: 'totalTasks', label: 'Total Tasks' },
  { key: 'completedCount', label: 'Completed' },
  { key: 'openCount', label: 'Open' },
  { key: 'overdueCount', label: 'Overdue' },
  { key: 'completionRate', label: 'Completion Rate' },
  { key: 'slaBreachRate', label: 'SLA Breach Rate' },
  { key: 'avgTimeToCompleteHours', label: 'Avg. Time to Complete' },
];

interface TeamPerformanceDrilldownModalProps {
  isOpen: boolean;
  group: TeamPerformanceRollupRow | null;
  dateRange: DateRange;
  workflowId: string;
  onClose: () => void;
}

/**
 * Drill-down modal for the Task Team / Department Performance report. Shows
 * the selected department's full per-staff breakdown (same metric columns as
 * the rollup table, minus staff count), reusing the group's filters.
 *
 * Used by:
 * - TaskTeamPerformanceReport
 */
const TeamPerformanceDrilldownModal = ({
  isOpen,
  group,
  dateRange,
  workflowId,
  onClose,
}: TeamPerformanceDrilldownModalProps) => {
  const [pageNumber, setPageNumber] = useState(1);
  const { rows, pagination, isLoading, error, fetchReport } =
    useTaskTeamPerformanceDrilldown();

  useEffect(() => {
    if (!isOpen || !group) return;
    setPageNumber(1);
  }, [isOpen, group]);

  useEffect(() => {
    if (!isOpen || !group) return;
    fetchReport({
      dateFrom: dateRange.start,
      dateTo: dateRange.end,
      ...(workflowId ? { workflowId: Number(workflowId) } : {}),
      departmentId: Number(group.groupId),
      pageNumber,
      limit: TEAM_PERFORMANCE_DEFAULT_PAGE_SIZE,
    });
  }, [isOpen, group, dateRange, workflowId, pageNumber, fetchReport]);

  if (!isOpen || !group) return null;

  return (
    <Modal isOpen onClose={onClose} title={`${group.groupName} — Staff Breakdown`} maxWidth="860px">
      <div className="team-performance-summary-chips">
        <span className="team-performance-summary-chip">
          Staff Count
          <strong>{group.staffCount}</strong>
        </span>
        <span className="team-performance-summary-chip">
          Total Tasks
          <strong>{group.totalTasks}</strong>
        </span>
      </div>

      <div className="table-container">
        <Table wrapperClassName="table-scroll" className="enquiries-table">
          <THead>
            <TRow>
              {STAFF_COLUMNS.map((col) => (
                <TCell key={col.key} variant="th">
                  {col.label}
                </TCell>
              ))}
            </TRow>
          </THead>
          <TBody>
            {!isLoading && rows.length === 0 ? (
              <EmptyState colSpan={STAFF_COLUMNS.length} message="No staff data for this group" />
            ) : (
              rows.map((row) => <TeamPerformanceStaffRow key={row.staffId} row={row} />)
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
    </Modal>
  );
};

export default TeamPerformanceDrilldownModal;