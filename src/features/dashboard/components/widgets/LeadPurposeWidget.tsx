import React, { useMemo } from 'react';
import './LeadPurposeWidget.css';
import './WidgetStyles.css';
import { BarRowsSkeleton } from './WidgetSkeletons';
import type { LeadPurposeCountItem } from '../../types';

const PURPOSE_COLOR_PALETTE = ['#f97316', '#8b5cf6', '#e0323e', '#10b981', '#3b82f6'];
const DEFAULT_PURPOSE_COLOR = '#8b5cf6';

function colorForIndex(index: number): string {
  return PURPOSE_COLOR_PALETTE[index % PURPOSE_COLOR_PALETTE.length] ?? DEFAULT_PURPOSE_COLOR;
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
