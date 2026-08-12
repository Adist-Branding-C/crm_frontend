import React from 'react';
import './ActivitiesWidget.css';
import { useRecentActivities } from '../../hooks/useRecentActivities';
import { Skeleton } from '../../../../shared/components/Skeleton';
import type { ActivitiesWidgetProps } from '../../types';

const ActivitiesWidget = ({ period, from, to }: ActivitiesWidgetProps) => {
  const { activities, isLoading } = useRecentActivities(period, from, to);

  return (
    <div className="card widget-base activities-widget">
      <h3 className="widget-title">Activities</h3>
      <div className="activities-list list-container">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="activity-item">
              <div className="timeline-dot"></div>
              {index !== 3 && <div className="timeline-line"></div>}
              <div className="activity-content">
                <Skeleton width="70%" height="0.875rem" />
                <div style={{ marginTop: '0.375rem' }}>
                  <Skeleton width="40%" height="0.75rem" />
                </div>
              </div>
            </div>
          ))
        ) : activities.length === 0 ? (
          <div className="activity-time">No recent activity</div>
        ) : (
          activities.map((activity, index) => (
            <div key={activity.id} className="activity-item">
              <div className={`timeline-dot ${index === 0 ? 'timeline-dot-highlight' : ''}`}></div>
              {index !== activities.length - 1 && <div className="timeline-line"></div>}

              <div className="activity-content">
                <div className="activity-title">
                  {activity.type} by {activity.user}
                </div>
                <div className="activity-time">
                  {activity.timestamp}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivitiesWidget;
