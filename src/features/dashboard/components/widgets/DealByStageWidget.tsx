import React from 'react';
import './WidgetStyles.css';
import { DEAL_BY_STAGE_DATA as data } from '../../constants/dashboard.constants';

const DealByStageWidget = () => {

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
