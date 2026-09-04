import React, { useMemo } from 'react';
import { CHART_PALETTE, CHART_PALETTE_DEFAULT } from '../../../../shared/constants/chartPalette';
import './LeadPurposeWidget.css';
import './WidgetStyles.css';
import { BarRowsSkeleton } from './WidgetSkeletons';
import type { LeadPurposeCountItem } from '../../types';


function colorForIndex(index: number): string {
  return CHART_PALETTE[index % CHART_PALETTE.length] ?? CHART_PALETTE_DEFAULT;
}

interface LeadPurposeWidgetProps {
  items?: LeadPurposeCountItem[];
  isLoading?: boolean;
  isError?: boolean;
}

const LeadPurposeWidget = ({ items = [], isLoading, isError }: LeadPurposeWidgetProps) => {
  const coloredItems = useMemo(() => {
    const maxCount = Math.max(0, ...items.map((item) => item.count));
    return items.map((item, index) => ({
      ...item,
      color: colorForIndex(index),
      widthPercent: maxCount > 0 ? Math.round((item.count / maxCount) * 100) : 0,
    }));
  }, [items]);

  return (
    <div className="card widget-base lead-purpose-widget">
      <h3 className="widget-title">Lead Purpose</h3>
      {isLoading ? (
        <BarRowsSkeleton rows={4} />
      ) : isError ? (
        <div className="widget-status-text">Failed to load lead purpose statistics</div>
      ) : coloredItems.length === 0 ? (
        <div className="widget-status-text">No leads in this period</div>
      ) : (
        <div className="purpose-list list-container">
          {coloredItems.map((item) => (
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
