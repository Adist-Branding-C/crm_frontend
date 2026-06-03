import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './WidgetStyles.css';
import { CAMPAIGNS_DATA as data } from '../../constants/dashboard.constants';

const CampaignsWidget = () => {

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
