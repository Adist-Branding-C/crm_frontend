import React from 'react';
import './WidgetStyles.css';

const LeadStatusWidget = () => {
  const data = [
    { label: 'New', value: '08', color: '#f472b6' },
    { label: 'Interested', value: '50', color: '#38bdf8' },
    { label: 'Cool', value: '100', color: '#eab308' },
    { label: 'Warm', value: '08', color: '#fb7185' },
    { label: 'No reply', value: '50', color: '#34d399' },
    { label: 'Hot', value: '100', color: '#fbbf24' },
  ];

  return (
    <div className="card widget-base">
      <h3 className="widget-title">Lead status</h3>
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

export default LeadStatusWidget;
