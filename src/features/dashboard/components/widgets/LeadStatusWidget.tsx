import React, { useMemo } from 'react';
import './WidgetStyles.css';
import { ListRowsSkeleton } from './WidgetSkeletons';
import type { LeadStatusCountItem } from '../../types';

const STATUS_COLOR_PALETTE = ['#f472b6', '#38bdf8', '#eab308', '#fb7185', '#34d399', '#fbbf24'];
const DEFAULT_STATUS_COLOR = '#38bdf8';

function colorForIndex(index: number): string {
  return STATUS_COLOR_PALETTE[index % STATUS_COLOR_PALETTE.length] ?? DEFAULT_STATUS_COLOR;
}

interface LeadStatusWidgetProps {
  items?: LeadStatusCountItem[];
  isLoading?: boolean;
  isError?: boolean;
}

const LeadStatusWidget = ({ items = [], isLoading, isError }: LeadStatusWidgetProps) => {
  const coloredItems = useMemo(() => {
    return items.map((item, index) => ({
      ...item,
      color: colorForIndex(index),
    }));
  }, [items]);

  return (
    <div className="card widget-base">
      <h3 className="widget-title">Lead status</h3>
      {isLoading ? (
        <ListRowsSkeleton rows={3} />
      ) : isError ? (
        <div className="widget-status-text">Failed to load lead status statistics</div>
      ) : coloredItems.length === 0 ? (
        <div className="widget-status-text">No leads in this period</div>
      ) : (
        <div className="list-container">
          {coloredItems.map((item) => (
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
