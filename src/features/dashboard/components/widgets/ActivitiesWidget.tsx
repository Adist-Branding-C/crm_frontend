import React from 'react';
import './ActivitiesWidget.css';
import { ACTIVITIES_DATA as activities } from '../../constants/dashboard.constants';

const ActivitiesWidget = () => {

  return (
    <div className="card widget-base activities-widget">
      <h3 className="widget-title">Activities</h3>
      <div className="activities-list">
        {activities.map((activity, index) => (
          <div key={activity.id} className="activity-item">
            <div className={`timeline-dot ${activity.highlight ? 'timeline-dot-highlight' : ''}`}></div>
            {index !== activities.length - 1 && <div className="timeline-line"></div>}
            
            <div className="activity-content">
              <div className="activity-title">
                {activity.title}
              </div>
              <div className="activity-time">
                {activity.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesWidget;
