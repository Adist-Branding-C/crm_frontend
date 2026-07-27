import { Loader2 } from 'lucide-react';
import { TRow, TCell } from '../../../../shared/components/table';

interface TaskListLoadingRowProps {
  colSpan: number;
}

/**
 * Single table row shown while a task-type list request is in flight.
 *
 * Used by:
 * - TaskPage, CallTaskPage, CampaignTaskPage, DealTaskPage - rendered instead of
 *   the empty-state row so "No data available" never appears until the request
 *   has actually resolved with zero records.
 */
const TaskListLoadingRow = ({ colSpan }: TaskListLoadingRowProps) => (
  <TRow>
    <TCell colSpan={colSpan} className="dataTables_empty">
      <Loader2 size={16} className="spin" /> Loading...
    </TCell>
  </TRow>
);

export default TaskListLoadingRow;
