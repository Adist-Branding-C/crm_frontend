import { Phone } from 'lucide-react';
import type { ActivityTimelineCardProps } from '../types';
import './ActivityTimelineCard.css';

const ActivityTimelineCard = ({ activity }: ActivityTimelineCardProps) => (
  <div className="timeline-card">
    <div className="timeline-content">
      <div className="timeline-meta">
        <span className="time-ago">{activity.timeAgo}</span>
        <span className="timestamp">• {activity.timestamp.split(' ')[1]}</span>
      </div>

      <div className="timeline-body">
        <div className="timeline-avatar">
          {activity.user?.trim()?.charAt(0)?.toUpperCase() || '?'}
        </div>

        <div className="timeline-details">
          <div className="timeline-title">
            <span className="activity-type-text">{activity.type} by </span>
            <span className="user-name">{activity.user}</span>
          </div>

          <div className="timeline-related-lead">
            <Phone size={12} />
            <span>{activity.relatedLead}</span>
          </div>

          <div className="timeline-description">
            {activity.description}
          </div>

          <div className="timeline-badges">
            <span className={`badge ${activity.badge.toLowerCase()}`}>{activity.badge}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ActivityTimelineCard;
