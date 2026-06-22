import type { ActivityTimelineProps } from '../types';
import ActivityTimelineCard from './ActivityTimelineCard';
import ActivityEmptyState from './ActivityEmptyState';
import './ActivityTimeline.css';

const ActivityTimeline = ({ activities }: ActivityTimelineProps) => {
  if (activities.length === 0) {
    return (
      <div className="activity-timeline">
        <ActivityEmptyState />
      </div>
    );
  }

  return (
    <div className="activity-timeline">
      {activities.map(activity => (
        <ActivityTimelineCard
          key={activity.id}
          activity={activity}
        />
      ))}
    </div>
  );
};

export default ActivityTimeline;
