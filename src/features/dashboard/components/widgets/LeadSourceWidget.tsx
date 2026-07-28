import React from 'react';
import './WidgetStyles.css';
import { useLeadSourceStatistics } from '../../hooks/useLeadSourceStatistics';
import { ListRowsSkeleton } from './WidgetSkeletons';
import type { LeadSourceWidgetProps } from '../../types';

const LeadSourceWidget = ({ period, from, to }: LeadSourceWidgetProps) => {
  const { items, isLoading, isError } = useLeadSourceStatistics(period, from, to);

  return (
    <div className="card widget-base">
      <h3 className="widget-title">Lead source</h3>
      {isLoading ? (
        <ListRowsSkeleton rows={5} />
      ) : isError ? (
        <div className="widget-status-text">Failed to load lead source statistics</div>
      ) : items.length === 0 ? (
        <div className="widget-status-text">No leads in this period</div>
      ) : (
        <div className="list-container">
          {items.map((item) => (
            <div key={item.sourceId} className="list-item">
              <div className="list-item-left">
                <div className="color-box" style={{ backgroundColor: item.color }}></div>
                <span>{item.source}</span>
              </div>
              <span className="list-item-value">{item.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeadSourceWidget;
