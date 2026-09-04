import React, { useMemo } from 'react';
import { CHART_PALETTE, CHART_PALETTE_DEFAULT } from '../../../../shared/constants/chartPalette';
import './WidgetStyles.css';
import { ListRowsSkeleton } from './WidgetSkeletons';
import type { LeadSourceCountItem } from '../../types';


function colorForIndex(index: number): string {
  return CHART_PALETTE[index % CHART_PALETTE.length] ?? CHART_PALETTE_DEFAULT;
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
