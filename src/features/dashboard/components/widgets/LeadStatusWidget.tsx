import React from 'react';
import './WidgetStyles.css';
import { useLeadStatusStatistics } from '../../hooks/useLeadStatusStatistics';
import { ListRowsSkeleton } from './WidgetSkeletons';
import type { LeadStatusWidgetProps } from '../../types';

const LeadStatusWidget = ({ period, from, to }: LeadStatusWidgetProps) => {
  const { items, isLoading, isError } = useLeadStatusStatistics(period, from, to);

  return (
    <div className="card widget-base">
      <h3 className="widget-title">Lead status</h3>
      {isLoading ? (
        <ListRowsSkeleton rows={3} />
      ) : isError ? (
        <div className="widget-status-text">Failed to load lead status statistics</div>
      ) : items.length === 0 ? (
        <div className="widget-status-text">No leads in this period</div>
      ) : (
        <div className="list-container">
          {items.map((item) => (
            <div key={item.statusId} className="list-item">
              <div className="list-item-left">
                <div className="color-box" style={{ backgroundColor: item.color }}></div>
                <span>{item.status}</span>
              </div>
              <span className="list-item-value">{item.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeadStatusWidget;
