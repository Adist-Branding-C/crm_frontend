import React from 'react';
import './LeadPurposeWidget.css';
import './WidgetStyles.css';
import { useLeadPurposeStatistics } from '../../hooks/useLeadPurposeStatistics';
import { BarRowsSkeleton } from './WidgetSkeletons';
import type { LeadPurposeWidgetProps } from '../../types';

const LeadPurposeWidget = ({ period, from, to }: LeadPurposeWidgetProps) => {
  const { items, isLoading, isError } = useLeadPurposeStatistics(period, from, to);

  return (
    <div className="card widget-base lead-purpose-widget">
      <h3 className="widget-title">Lead Purpose</h3>
      {isLoading ? (
        <BarRowsSkeleton rows={4} />
      ) : isError ? (
        <div className="widget-status-text">Failed to load lead purpose statistics</div>
      ) : items.length === 0 ? (
        <div className="widget-status-text">No leads in this period</div>
      ) : (
        <div className="purpose-list list-container">
          {items.map((item) => (
            <div key={item.purposeId} className="purpose-item">
              <div className="purpose-header">
                <span className="purpose-label">{item.purpose}</span>
                <span className="purpose-value">{item.count}</span>
              </div>
              <div className="purpose-bar-bg">
                <div
                  className="purpose-bar-fill"
                  style={{ width: `${item.widthPercent}%`, backgroundColor: item.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeadPurposeWidget;
