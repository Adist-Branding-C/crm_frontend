import { useMemo } from 'react';
import type { BarListWidgetProps } from '../../types';
import BarListRow from './BarListRow';
import { BarListSkeleton } from './WidgetSkeletons';
import './WidgetStyles.css';
import './BarListWidget.css';

const MIN_VISIBLE_FILL_PERCENT = 4;

const BarListWidget = ({ title, items, isLoading, isError, errorText, emptyText, skeletonRows = 5 }: BarListWidgetProps) => {
  const { rows, total } = useMemo(() => {
    const maxValue = Math.max(0, ...items.map((item) => item.value));
    return {
      total: items.reduce((sum, item) => sum + item.value, 0),
      rows: items.map((item) => ({
        ...item,
        widthPercent: item.value > 0 && maxValue > 0 ? Math.max(MIN_VISIBLE_FILL_PERCENT, (item.value / maxValue) * 100) : 0,
      })),
    };
  }, [items]);

  const showTotal = !isLoading && !isError && rows.length > 0;

  return (
    <div className="card widget-base bar-list-widget">
      <div className="widget-header">
        <h3 className="widget-title" title={title}>{title}</h3>
        {showTotal && <span className="bar-list-widget__total" title="Total">{total.toLocaleString()}</span>}
      </div>
      {isLoading ? (
        <BarListSkeleton rows={skeletonRows} />
      ) : isError ? (
        <div className="widget-status-text">{errorText}</div>
      ) : rows.length === 0 ? (
        <div className="widget-status-text">{emptyText}</div>
      ) : (
        <ul className="bar-list">
          {rows.map((row) => (
            <BarListRow key={row.id} label={row.label} value={row.value} color={row.color} widthPercent={row.widthPercent} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default BarListWidget;
