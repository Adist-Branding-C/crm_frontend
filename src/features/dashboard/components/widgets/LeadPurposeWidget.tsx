import React from 'react';
import './LeadPurposeWidget.css';
import { LEAD_PURPOSE_DATA as data } from '../../constants/dashboard.constants';

const LeadPurposeWidget = () => {

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
