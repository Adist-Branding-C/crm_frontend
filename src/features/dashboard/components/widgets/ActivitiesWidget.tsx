import React from 'react';
import './ActivitiesWidget.css';

const ActivitiesWidget = () => {
  const activities = [
    {
      id: 1,
      title: 'Farah left a Note',
      time: 'Jan 14 at 2:40 PM',
      highlight: false
    },
    {
      id: 2,
      title: 'Getlead demo created a Call task',
      time: 'Jan 14 at 2:40 PM',
      highlight: true
    }
    // Can add more if scrollable
  ];

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
