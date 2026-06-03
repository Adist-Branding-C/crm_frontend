import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import type { PipelineDataItem, CustomLabelProps } from '../../types';
import './WidgetStyles.css';

const DealPipelineWidget = () => {
  const data: PipelineDataItem[] = [
    { name: 'Open', value: 90000, displayValue: '₹90,000', color: '#fbbf24' },
    { name: 'Won', value: 40000, displayValue: '₹40,000', color: '#3b82f6' },
    { name: 'Lost', value: 112000, displayValue: '₹112,000', color: '#ec4899' },
  ];

  const formatYAxis = (tickItem: number) => {
    return `₹${tickItem}`;
  };

  const CustomLabel = (props: CustomLabelProps) => {
    const { x = 0, y = 0, width = 0, index = 0 } = props;
    const item = data[index];
    return (
      <text x={x + width / 2} y={y - 10} fill="#1a1b1d" textAnchor="middle" fontSize="12" fontWeight="600">
        {item?.displayValue ?? ''}
      </text>
    );
  };

  return (
    <div className="card widget-base deal-pipeline-widget">
      <h3 className="widget-title">Deal pipeline</h3>
      <div style={{ width: '100%', height: '100%', flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={true} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} tickFormatter={formatYAxis} />
            <Bar dataKey="value" barSize={32} radius={[2, 2, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DealPipelineWidget;
