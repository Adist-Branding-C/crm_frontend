import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { CHART_AXIS_LABEL, CHART_GRID_STROKE } from '../../../shared/constants/chartPalette';
import { ChartSkeleton } from '../../dashboard/components/widgets/WidgetSkeletons';
import { useStageFunnel } from '../hooks/useStageFunnel';
import type { StageFunnelStage } from '../types';
import '../../dashboard/components/widgets/WidgetStyles.css';

const OUTCOME_COLOR: Record<StageFunnelStage['outcome'], string> = {
  OPEN: 'var(--chart-2)',
  WON: 'var(--success)',
  LOST: 'var(--danger)',
};

/**
 * Stage funnel: every stage of a pipeline in board order, showing how many
 * deals currently sit in each - the visual drop-off from stage to stage.
 */
const StageFunnelWidget = ({ pipelineId }: { pipelineId?: number | undefined }) => {
  const { data, isLoading, isError } = useStageFunnel(pipelineId);

  const chartData = (data?.stages ?? []).map((s) => ({
    name: s.stageName,
    count: s.count,
    amount: Number(s.amount),
    outcome: s.outcome,
  }));

  return (
    <div className="card widget-base">
      <h3 className="widget-title">Stage Funnel</h3>
      {isLoading ? (
        <ChartSkeleton />
      ) : isError ? (
        <div className="widget-status-text">Failed to load stage funnel</div>
      ) : chartData.length === 0 ? (
        <div className="widget-status-text">No stages found</div>
      ) : (
        <div style={{ width: '100%', height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={CHART_GRID_STROKE} />
              <XAxis type="number" allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: CHART_AXIS_LABEL }} />
              <YAxis type="category" dataKey="name" width={110} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: CHART_AXIS_LABEL }} />
              <Tooltip formatter={(value, name) => (name === 'count' ? `${value} deals` : String(value))} />
              <Bar dataKey="count" name="count" barSize={22} radius={[0, 2, 2, 0]} isAnimationActive={false}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={OUTCOME_COLOR[entry.outcome]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default StageFunnelWidget;
