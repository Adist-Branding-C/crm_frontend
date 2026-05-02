import React from 'react';
import './LeadPurposeWidget.css';

const LeadPurposeWidget = () => {
  const data = [
    { label: 'CRM', value: '02', width: '30%', color: '#f97316' },
    { label: 'GI scratch', value: '08', width: '70%', color: '#8b5cf6' },
    { label: 'Gdesk', value: '12', width: '90%', color: '#e0323e' },
  ];

  return (
    <div className="card widget-base lead-purpose-widget">
      <h3 className="widget-title">Lead Purpose</h3>
      <div className="purpose-list">
        {data.map((item, index) => (
          <div key={index} className="purpose-item">
            <div className="purpose-header">
              <span className="purpose-label">{item.label}</span>
              <span className="purpose-value">{item.value}</span>
            </div>
            <div className="purpose-bar-bg">
              <div 
                className="purpose-bar-fill" 
                style={{ width: item.width, backgroundColor: item.color }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadPurposeWidget;
