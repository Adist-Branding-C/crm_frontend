import React from 'react';
import './ActivitiesWidget.css';
import { useRecentActivities } from '../../hooks/useRecentActivities';

const ActivitiesWidget = () => {
  const { activities, isLoading } = useRecentActivities();

  return (
    <div className="card widget-base activities-widget">
      <h3 className="widget-title">Activities</h3>
      <div className="activities-list">
        {isLoading ? (
          <div className="activity-time">Loading...</div>
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
