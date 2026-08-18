import React, { useMemo } from 'react';
import './WidgetStyles.css';
import { ListRowsSkeleton } from './WidgetSkeletons';
import type { LeadSourceCountItem } from '../../types';

const SOURCE_COLOR_PALETTE = ['#f472b6', '#38bdf8', '#eab308', '#fb7185', '#34d399', '#fbbf24'];
const DEFAULT_SOURCE_COLOR = '#38bdf8';

function colorForIndex(index: number): string {
  return SOURCE_COLOR_PALETTE[index % SOURCE_COLOR_PALETTE.length] ?? DEFAULT_SOURCE_COLOR;
}

interface LeadSourceWidgetProps {
  items?: LeadSourceCountItem[];
  isLoading?: boolean;
  isError?: boolean;
}

const LeadSourceWidget = ({ items = [], isLoading, isError }: LeadSourceWidgetProps) => {
  const coloredItems = useMemo(() => {
    return items.map((item, index) => ({
      ...item,
      color: colorForIndex(index),
    }));
  }, [items]);

  return (
    <div className="card widget-base">
      <h3 className="widget-title">Lead source</h3>
      {isLoading ? (
        <ListRowsSkeleton rows={5} />
      ) : isError ? (
        <div className="widget-status-text">Failed to load lead source statistics</div>
      ) : coloredItems.length === 0 ? (
        <div className="widget-status-text">No leads in this period</div>
      ) : (
        <div className="list-container">
          {coloredItems.map((item) => (
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
