import { Paperclip } from 'lucide-react';
import { TRow, TCell } from '../../../../shared/components/table';
import { formatDateTime } from '../../../../shared/utils/dateUtils';
import StaffCell from './StaffCell';
import {
  getActivityPriorityTone,
  getActivityStatusTone,
  getActivityTypeTone,
  getVisibleTags,
} from '../utils/taskActivity.util';
import type { TaskActivityRow as TaskActivityRowData } from '../types';

/**
 * Table row for one task in the Task Work / Activity report.
 *
 * Used by:
 * - TaskActivityReport
 */
const TaskActivityRow = ({ row }: { row: TaskActivityRowData }) => {
  const statusTone = getActivityStatusTone(row.status);
  const { visible, overflowCount } = getVisibleTags(row.tags ?? [], 2);

  return (
    <TRow>
      <TCell>
        <span className="report-task-title">{row.title}</span>
      </TCell>
      <TCell>
        <span className={`badge badge-${getActivityTypeTone(row.type)}`}>
          {row.type === 'recurring' ? 'Recurring' : 'One-time'}
        </span>
      </TCell>
      <TCell>
        <span className={`report-priority-badge report-priority-${getActivityPriorityTone(row.priority)}`}>
          {row.priority}
        </span>
      </TCell>
      <TCell>
        {row.status ? (
          <span className={`badge ${statusTone ? `badge-${statusTone}` : ''}`}>{row.status}</span>
        ) : (
          '—'
        )}
      </TCell>
      <TCell>
        {row.assigneeName ? <StaffCell name={row.assigneeName} /> : '—'}
      </TCell>
      <TCell>
        <span className="activity-workflow-name">{row.workflowName || '—'}</span>
      </TCell>
      <TCell>
        <span className="activity-date-cell">{formatDateTime(row.createdAt)}</span>
      </TCell>
      <TCell>
        <span className="activity-date-cell">{row.dueDate ? formatDateTime(row.dueDate) : '—'}</span>
      </TCell>
      <TCell>
        <span className="activity-date-cell">{row.completedAt ? formatDateTime(row.completedAt) : '—'}</span>
      </TCell>
      <TCell>
        {(row.attachmentCount ?? 0) > 0 ? (
          <span className="activity-attachments">
            <Paperclip size={13} /> {row.attachmentCount}
          </span>
        ) : (
          '—'
        )}
      </TCell>
      <TCell>
        <div className="activity-tag-list">
          {row.tags?.length ? (
            <>
              {visible.map((tag) => (
                <span key={tag} className="activity-tag-pill">{tag}</span>
              ))}
              {overflowCount > 0 && (
                <span className="activity-tag-overflow">+{overflowCount} more</span>
              )}
            </>
          ) : (
            '—'
          )}
        </div>
      </TCell>
    </TRow>
  );
};

export default TaskActivityRow;