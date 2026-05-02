import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './WidgetStyles.css';

const CampaignsWidget = () => {
  const data = [
    { name: 'Group A', value: 45, color: '#fbbf24' },
    { name: 'Group B', value: 55, color: '#e0323e' },
  ];

  return (
    <div className="card widget-base campaigns-widget">
      <h3 className="widget-title">Campaigns</h3>
      <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ResponsiveContainer width="100%" height="80%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={80}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Absolute positioned values to simulate the design labels if needed, or rechart labels */}
      </div>
    </div>
  );
};

export default CampaignsWidget;
