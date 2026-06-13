import { Activity as ActivityIcon } from 'lucide-react';
import type { ActivitySummaryCardProps } from '../types';
import './ActivitySummaryCard.css';

const ActivitySummaryCard = ({ totalActivities }: ActivitySummaryCardProps) => (
  <div className="activity-count-section">
    <div className="activity-count-icon">
      <ActivityIcon size={24} />
    </div>
    <div className="activity-count-info">
      <span className="activity-count-label">Activity Count</span>
      <span className="activity-count-number">{totalActivities}</span>
    </div>
  </div>
);

export default ActivitySummaryCard;
