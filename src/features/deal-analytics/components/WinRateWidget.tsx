import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartSkeleton } from '../../dashboard/components/widgets/WidgetSkeletons';
import { useWinRate } from '../hooks/useWinRate';
import type { AnalyticsPeriod } from '../types';
import '../../dashboard/components/widgets/WidgetStyles.css';

const WON_COLOR = 'var(--success)';
const REMAINING_COLOR = 'var(--chart-grid)';

interface WinRateWidgetProps {
  period: AnalyticsPeriod;
  from?: string;
  to?: string;
}

/**
 * Win rate: won ÷ total deals, scoped to the caller's own visibility -
 * shown as a donut with the exact won/total counts underneath. Follows the
 * dashboard's shared period / custom-range filter.
 */
const WinRateWidget = ({ period, from, to }: WinRateWidgetProps) => {
  const { data, isLoading, isError } = useWinRate(period, from, to);

  const chartData = data
    ? [
        { name: 'Won', value: data.winRate },
        { name: 'Remaining', value: Math.max(0, 100 - data.winRate) },
      ]
    : [];

  return (
    <div className="card widget-base">
      <h3 className="widget-title">Win Rate</h3>
      {isLoading ? (
        <ChartSkeleton />
      ) : isError ? (
        <div className="widget-status-text">Failed to load win rate</div>
      ) : !data || data.total === 0 ? (
        <div className="widget-status-text">No deals yet</div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ width: 140, height: 140, position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} dataKey="value" innerRadius={45} outerRadius={65} startAngle={90} endAngle={-270} isAnimationActive={false}>
                  <Cell fill={WON_COLOR} />
                  <Cell fill={REMAINING_COLOR} />
                </Pie>
                <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>{data.winRate.toFixed(1)}%</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <span style={{ fontWeight: 600, color: WON_COLOR }}>{data.won}</span> won of{' '}
              <span style={{ fontWeight: 600 }}>{data.total}</span> deals
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WinRateWidget;
