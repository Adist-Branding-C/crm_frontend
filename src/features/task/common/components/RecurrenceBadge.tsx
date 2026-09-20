import { RefreshCw } from 'lucide-react';
import { getRecurrenceLabel } from '../utils/recurrence';
import { RepeatType, type RepeatConfig } from '../../task/types/interface';
import './RecurrenceBadge.css';

interface RecurrenceBadgeProps {
  repeatType?: RepeatType | null | undefined;
  repeatConfig?: RepeatConfig | null | undefined;
  showLabel?: boolean;
}

const RecurrenceBadge = ({ repeatType, repeatConfig, showLabel = false }: RecurrenceBadgeProps) => {
  if (!repeatType || repeatType === RepeatType.NEVER) return null;

  const label = getRecurrenceLabel(repeatType, repeatConfig);
  const badgeClass = `recurrence-badge recurrence-badge--${repeatType.toLowerCase()}`;

  return (
    <span
      className={`${badgeClass}${showLabel ? ' recurrence-badge--labeled' : ''}`}
      data-tooltip={label}
      title={label}
      aria-label={label}
    >
      <RefreshCw size={12} />
      {showLabel && <span className="recurrence-badge__label">{label.replace('Repeats: ', '')}</span>}
    </span>
  );
};

export default RecurrenceBadge;