import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import './WidgetStyles.css';
import { useCampaignsStatistics } from '../../hooks/useCampaignsStatistics';
import type { CampaignsWidgetProps } from '../../types';
import { CAMPAIGN_STATUS_COLOR_PALETTE, DEFAULT_CAMPAIGN_STATUS_COLOR } from '../../constants/dashboard.constants';
import { getColorForIndex } from '../../../../shared/utils/chartUtils';
import { ChartSkeleton } from './WidgetSkeletons';

const CampaignsWidget = ({ period, from, to }: CampaignsWidgetProps) => {
  const { byStatus, byType, leadProgress, isLoading, isError } = useCampaignsStatistics(period, from, to);

  return (
    <div className="card widget-base campaigns-widget">
      <h3 className="widget-title">Campaigns</h3>
      {isLoading ? (
        <ChartSkeleton />
      ) : isError ? (
        <div className="widget-status-text">Failed to load campaign statistics</div>
      ) : byStatus.length === 0 ? (
        <div className="widget-status-text">No campaigns in this period</div>
      ) : (
        <>
          {leadProgress && (
            <div className="widget-status-text" style={{ marginBottom: '0.5rem' }}>
              {leadProgress.completedLeads} / {leadProgress.totalLeads} leads completed (
              {leadProgress.completedPercent}%)
            </div>
          )}
          {/*
            A fixed pixel height (not flex:1/minHeight:0) so ResponsiveContainer's
            first ResizeObserver measurement never sees width/height of 0 or -1 -
            inside a flex column, a flex:1 child's size isn't resolved yet at the
            point Recharts takes its first measurement, and once Recharts renders
            an empty Pie sector from that bad first read, it never recovers even
            after the container's real size becomes available.
          */}
          <div style={{ width: '100%', height: 170, position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={byStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={60}
                  dataKey="count"
                  nameKey="status"
                  stroke="none"
                  // Recharts renders no arc at all for a single 100% slice: a
                  // full 0-360 sweep degenerates to a zero-length SVG path.
                  // Stopping just short of a full circle keeps the visual
                  // result indistinguishable while avoiding that edge case.
                  startAngle={0}
                  endAngle={359.999}
                  // react-smooth (Recharts' animation dependency) can get
                  // stuck in its pre-animation "inactive" state under React
                  // 19, rendering an empty shape group with no visible path
                  // at all instead of the pie slice. Disabling the entry
                  // animation renders the final shape immediately.
                  isAnimationActive={false}
                >
                  {byStatus.map((entry, index) => (
                    <Cell
                      key={entry.status}
                      fill={getColorForIndex(index, CAMPAIGN_STATUS_COLOR_PALETTE, DEFAULT_CAMPAIGN_STATUS_COLOR)}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {byType.length > 0 && (
            <div className="widget-status-text">
              By type: {byType.map((item) => `${item.type} (${item.count})`).join(', ')}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CampaignsWidget;
