import { Activity as ActivityIcon } from 'lucide-react';
import './ActivityEmptyState.css';

const ActivityEmptyState = () => (
  <div className="empty-state">
    <ActivityIcon size={48} />
    <p>No activity found for selected filters</p>
  </div>
);

export default ActivityEmptyState;
