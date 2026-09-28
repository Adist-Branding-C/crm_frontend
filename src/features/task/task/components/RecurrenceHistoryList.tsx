import { Loader2, History, ExternalLink } from 'lucide-react';
import { useGetRecurrenceChainQuery } from '../../common/services/taskApi';
import { getErrorMessage } from '../../../../shared/utils/error';
import { formatDate } from '../../../../shared/utils/dateUtils';
import type { RecurrenceChainItem } from '../types';
import './RecurrenceHistoryList.css';

interface RecurrenceHistoryListProps {
  taskId: number;
  onTaskClick?: (item: RecurrenceChainItem) => void;
}

const RecurrenceHistoryList = ({ taskId, onTaskClick }: RecurrenceHistoryListProps) => {
  const { currentData, isFetching, error: queryError } = useGetRecurrenceChainQuery(taskId, { refetchOnMountOrArgChange: true });
  const items = currentData ?? [];
  const isLoading = isFetching && !currentData;
  const error = queryError ? getErrorMessage(queryError, 'Failed to load recurrence history') : '';

  return (
    <div className="recurrence-history">
      <div className="recurrence-history__header">
        <History size={14} />
        <span>Recurrence History</span>
      </div>

      {isLoading ? (
        <div className="recurrence-history__loading">
          <Loader2 size={16} className="spin" />
          <span>Loading generated tasks...</span>
        </div>
      ) : error ? (
        <div className="recurrence-history__error">{error}</div>
      ) : items.length === 0 ? (
        <div className="recurrence-history__empty">No generated tasks yet.</div>
      ) : (
        <ul className="recurrence-history__list">
          {items.map((item) => (
            <li key={item.id} className="recurrence-history__item">
              <button
                type="button"
                className="recurrence-history__link"
                onClick={() => onTaskClick?.(item)}
                disabled={!onTaskClick}
              >
                <span className="recurrence-history__title">{item.title}</span>
                {item.scheduledDate && (
                  <span className="recurrence-history__date">{formatDate(item.scheduledDate)}</span>
                )}
              </button>
              <span className={`recurrence-history__status recurrence-history__status--${(item.status || '').toLowerCase()}`}>
                {item.status}
              </span>
              {onTaskClick && <ExternalLink size={12} className="recurrence-history__open-icon" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecurrenceHistoryList;