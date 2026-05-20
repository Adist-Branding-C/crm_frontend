import React from 'react';
import './WidgetStyles.css';

const DealByStageWidget = () => {
  const data = [
    { label: 'New', value: '08', color: '#f472b6' },
    { label: 'Follow up', value: '50', color: '#3b82f6' },
    { label: 'Partially interested', value: '100', color: '#fbbf24' },
    { label: 'Interested', value: '08', color: '#10b981' },
    // Add a few more to match image if needed
  ];

  return (
    <div className="card widget-base">
      <h3 className="widget-title">Deal by stage</h3>
      <div className="list-container">
        {data.map((item, index) => (
          <div key={index} className="list-item">
            <div className="list-item-left">
              <div className="color-box" style={{ backgroundColor: item.color }}></div>
              <span>{item.label}</span>
            </div>
            <span className="list-item-value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealByStageWidget;
