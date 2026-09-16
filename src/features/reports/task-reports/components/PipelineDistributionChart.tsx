import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CHART_AXIS_LABEL, CHART_GRID_STROKE, CHART_PALETTE_DEFAULT } from '../../../../shared/constants/chartPalette';
import { formatTaskDuration } from '../utils/formatTaskDuration';
import type { TaskPipelineStageView } from '../types';

interface PipelineDistributionChartProps {
  stages: TaskPipelineStageView[];
}

const DEFAULT_BAR_HEIGHT = 220;
const BOTTLENECK_EDGE_WIDTH = 2;

interface PipelineChartDatum {
  name: string;
  taskCount: number;
  color: string;
  avgAgeLabel: string;
  isBottleneck: boolean;
}

function toChartData(stages: TaskPipelineStageView[]): PipelineChartDatum[] {
  return stages.map((stage) => ({
    name: stage.stageName,
    taskCount: stage.taskCount,
    color: stage.color ?? CHART_PALETTE_DEFAULT,
    avgAgeLabel: formatTaskDuration(stage.avgAgeInStageHours),
    isBottleneck: stage.isBottleneck,
  }));
}

/**
 * Horizontal bar breakdown of one workflow's task count per stage, one bar per
 * stage in board order (first stage of the workflow on top), colored with the
 * stage's own color and outlined when flagged as a bottleneck.
 *
 * Recharts renders a vertical-layout bar chart top-to-bottom in data order
 * (selectChartDirection = 'top-to-bottom' when the Y axis is not reversed), so
 * ascending sortOrder input shows the first pipeline stage at the top.
 *
 * Used by:
 * - TaskPipelineDistributionReport
 */
const PipelineDistributionChart = ({ stages }: PipelineDistributionChartProps) => {
  const chartData = toChartData(stages);

  return (
    <div className="pipeline-chart-canvas">
      <ResponsiveContainer width="100%" height={DEFAULT_BAR_HEIGHT}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={CHART_GRID_STROKE} />
          <XAxis
            type="number"
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: CHART_AXIS_LABEL }}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={110}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: CHART_AXIS_LABEL }}
          />
          <Tooltip
            formatter={(value, name) =>
              name === 'taskCount' ? `${value} tasks` : String(value)
            }
            labelFormatter={(label, payload) => {
              const avgAge = payload?.[0]?.payload?.avgAgeLabel;
              return avgAge ? `${label} (avg. age ${avgAge})` : String(label);
            }}
          />
          <Bar
            dataKey="taskCount"
            name="taskCount"
            barSize={22}
            radius={[0, 2, 2, 0]}
            isAnimationActive={false}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}-${index}`}
                fill={entry.color}
                {...(entry.isBottleneck
                  ? { stroke: 'var(--warning-text)', strokeWidth: BOTTLENECK_EDGE_WIDTH }
                  : { strokeWidth: 0 })}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PipelineDistributionChart;