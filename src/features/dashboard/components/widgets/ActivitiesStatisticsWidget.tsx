import React from 'react';
import { CHART_PALETTE, CHART_PALETTE_DEFAULT } from '../../../../shared/constants/chartPalette';
import './WidgetStyles.css';
import { useActivitiesStatistics } from '../../hooks/useActivitiesStatistics';
import { ListRowsSkeleton } from './WidgetSkeletons';
import type { DashboardPeriod } from '../../types';

interface ActivitiesStatisticsWidgetProps {
  period: DashboardPeriod;
  from?: string;
  to?: string;
}


function colorForIndex(index: number): string {
  return CHART_PALETTE[index % CHART_PALETTE.length] ?? CHART_PALETTE_DEFAULT;
}

const ActivitiesStatisticsWidget = ({ period, from, to }: ActivitiesStatisticsWidgetProps) => {
  const { byType, byEntity, timeline, isLoading, isError } = useActivitiesStatistics(period, from, to);
  const total = byType.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="card widget-base activities-statistics-widget">
      <h3 className="widget-title">Activities ({total})</h3>
      {isLoading ? (
        <div className="activities-statistics-columns">
          <div className="activities-statistics-column">
            <div className="activities-statistics-column-title">By type</div>
            <ListRowsSkeleton rows={4} />
          </div>
          <div className="activities-statistics-column">
            <div className="activities-statistics-column-title">By entity</div>
            <ListRowsSkeleton rows={3} />
          </div>
          <div className="activities-statistics-column">
            <div className="activities-statistics-column-title">Daily timeline</div>
            <ListRowsSkeleton rows={5} />
          </div>
        </div>
      ) : isError ? (
        <div className="widget-status-text">Failed to load activity statistics</div>
      ) : byType.length === 0 ? (
        <div className="widget-status-text">No activity in this period</div>
      ) : (
        <div className="activities-statistics-columns">
          <div className="activities-statistics-column">
            <div className="activities-statistics-column-title">By type</div>
            <div className="list-container">
              {byType.map((item, index) => (
                <div key={item.activityType} className="list-item">
                  <div className="list-item-left">
                    <div className="color-box" style={{ backgroundColor: colorForIndex(index) }}></div>
                    <span>{item.activityType}</span>
                  </div>
                  <span className="list-item-value">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="activities-statistics-column">
            <div className="activities-statistics-column-title">By entity</div>
            <div className="list-container">
              {byEntity.length === 0 ? (
                <div className="widget-status-text">No entity breakdown</div>
              ) : (
                byEntity.map((item, index) => (
                  <div key={item.entityType} className="list-item">
                    <div className="list-item-left">
                      <div className="color-box" style={{ backgroundColor: colorForIndex(index) }}></div>
                      <span>{item.entityType}</span>
                    </div>
                    <span className="list-item-value">{item.count}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="activities-statistics-column">
            <div className="activities-statistics-column-title">Daily timeline</div>
            <div className="list-container">
              {timeline.length === 0 ? (
                <div className="widget-status-text">No timeline data</div>
              ) : (
                timeline.map((point) => (
                  <div key={point.date} className="list-item">
                    <span>{point.date}</span>
                    <span className="list-item-value">{point.count}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivitiesStatisticsWidget;
