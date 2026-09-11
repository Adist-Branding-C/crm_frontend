import { TCell } from '../../../../shared/components/table';
import RecurrenceBadge from './RecurrenceBadge';
import type { RepeatType, RepeatConfig } from '../../task/types/interface';
import './TaskRepeatCell.css';

interface TaskRepeatCellProps {
  repeatType?: RepeatType | null | undefined;
  repeatConfig?: RepeatConfig | null | undefined;
}

const TaskRepeatCell = ({ repeatType, repeatConfig }: TaskRepeatCellProps) => (
  <TCell>
    {repeatType && repeatType !== 'Never' ? (
      <RecurrenceBadge repeatType={repeatType} repeatConfig={repeatConfig} showLabel />
    ) : (
      <span className="cell-muted">-</span>
    )}
  </TCell>
);

export default TaskRepeatCell;