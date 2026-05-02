import React from 'react';
import './WidgetStyles.css';

const LeadSourceWidget = () => {
  const data = [
    { label: 'Facebook', value: '08', color: '#e2e8f0' },
    { label: 'Instagram', value: '50', color: '#cbd5e1' },
    { label: 'Advertisement', value: '100', color: '#e2e8f0' },
    { label: 'Sale', value: '08', color: '#cbd5e1' },
    { label: 'Marketing', value: '50', color: '#e2e8f0' },
    { label: 'Other', value: '100', color: '#cbd5e1' },
  ];

  return (
    <div className="card widget-base">
      <h3 className="widget-title">Lead source</h3>
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

export default LeadSourceWidget;
