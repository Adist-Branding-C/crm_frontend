import React from 'react';
import './WidgetStyles.css';
import { useDealByStage } from '../../hooks/useDealByStage';
import { ListRowsSkeleton } from './WidgetSkeletons';
import type { DashboardPeriod } from '../../types';

interface DealByStageWidgetProps {
  period: DashboardPeriod;
  from?: string;
  to?: string;
}

const DealByStageWidget = ({ period, from, to }: DealByStageWidgetProps) => {
  const { data, isLoading, isError } = useDealByStage(period, from, to);

  return (
    <div className="card widget-base">
      <h3 className="widget-title">Deal by stage</h3>
      {isLoading ? (
        <ListRowsSkeleton rows={3} />
      ) : isError ? (
        <div className="widget-status-text">Failed to load deal by stage</div>
      ) : data.length === 0 ? (
        <div className="widget-status-text">No deal stage data found</div>
      ) : (
        <div className="list-container">
          {data.map((item) => (
            <div key={item.stage} className="list-item">
              <div className="list-item-left">
                <div className="color-box" style={{ backgroundColor: item.color }}></div>
                <span>{item.stage}</span>
              </div>
              <span className="list-item-value">{item.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DealByStageWidget;
