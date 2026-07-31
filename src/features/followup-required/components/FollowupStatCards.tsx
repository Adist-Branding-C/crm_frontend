import React from 'react';
import { Skeleton } from '../../../shared/components/Skeleton';
import type { FollowupBucket, FollowupStatCardsProps } from '../types';
import './FollowupStatCards.css';

const CARDS: { bucket: FollowupBucket; label: string }[] = [
  { bucket: 'overdue', label: 'Overdue' },
  { bucket: 'due_today', label: 'Due Today' },
  { bucket: 'upcoming', label: 'Upcoming' },
];

const FollowupStatCards: React.FC<FollowupStatCardsProps> = ({
  statistics,
  isLoading,
  activeBucket,
  onBucketClick,
}) => {
  return (
    <div className="followup-stat-cards">
      {CARDS.map(({ bucket, label }) => (
        <button
          key={bucket}
          type="button"
          className={`followup-stat-card ${activeBucket === bucket ? 'active' : ''}`}
          onClick={() => onBucketClick(bucket)}
        >
          {isLoading ? (
            <Skeleton width="3rem" height="1.5rem" />
          ) : (
            <div className="followup-stat-value">{statistics?.[toStatKey(bucket)] ?? 0}</div>
          )}
          <div className="followup-stat-label">{label}</div>
        </button>
      ))}
      <button
        type="button"
        className={`followup-stat-card followup-stat-card--total ${activeBucket === null ? 'active' : ''}`}
        onClick={() => onBucketClick(null)}
      >
        {isLoading ? (
          <Skeleton width="3rem" height="1.5rem" />
        ) : (
          <div className="followup-stat-value">{statistics?.total ?? 0}</div>
        )}
        <div className="followup-stat-label">Total</div>
      </button>
    </div>
  );
};

function toStatKey(bucket: FollowupBucket): 'overdue' | 'dueToday' | 'upcoming' {
  if (bucket === 'due_today') return 'dueToday';
  return bucket;
}

export default FollowupStatCards;
