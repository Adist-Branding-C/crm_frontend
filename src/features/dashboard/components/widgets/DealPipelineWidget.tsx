import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import type { CustomLabelProps, DashboardPeriod } from '../../types';
import { useDealPipeline } from '../../hooks/useDealPipeline';
import { ChartSkeleton } from './WidgetSkeletons';
import './WidgetStyles.css';

const MIN_BARS_BEFORE_SCROLL = 6;
const BAR_COLUMN_WIDTH = 90;

interface DealPipelineWidgetProps {
  period: DashboardPeriod;
  from?: string;
  to?: string;
}

const DealPipelineWidget = ({ period, from, to }: DealPipelineWidgetProps) => {
  const { data, isLoading, isError } = useDealPipeline(period, from, to);

  const CustomLabel = (props: CustomLabelProps) => {
    const { x = 0, y = 0, width = 0, index = 0 } = props;
    const item = data[index];
    return (
      <text x={x + width / 2} y={y - 10} fill="#1a1b1d" textAnchor="middle" fontSize="12" fontWeight="600">
        {item?.displayValue ?? ''}
      </text>
    );
  };

  const needsScroll = data.length > MIN_BARS_BEFORE_SCROLL;

  return (
    <div className="card widget-base deal-pipeline-widget">
      <h3 className="widget-title">Deal pipeline</h3>
      {isLoading ? (
        <ChartSkeleton />
      ) : isError ? (
        <div className="widget-status-text">Failed to load deal pipeline</div>
      ) : data.length === 0 ? (
        <div className="widget-status-text">No deal statuses found</div>
      ) : (
        <div style={{ width: '100%', height: '100%', flex: 1, minHeight: 0, overflowX: needsScroll ? 'auto' : 'visible' }}>
          <ResponsiveContainer width={needsScroll ? data.length * BAR_COLUMN_WIDTH : '100%'} height="100%">
            <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={true} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} allowDecimals={false} />
              <Bar dataKey="value" barSize={32} radius={[2, 2, 0, 0]} isAnimationActive={false}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default DealPipelineWidget;
