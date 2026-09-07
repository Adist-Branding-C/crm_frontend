import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CHART_AXIS_LABEL, CHART_GRID_STROKE, CHART_PALETTE } from '../../../shared/constants/chartPalette';
import { ChartSkeleton } from '../../dashboard/components/widgets/WidgetSkeletons';
import { useDealForecast } from '../hooks/useDealForecast';
import '../../dashboard/components/widgets/WidgetStyles.css';

const formatAmount = (value: number) => `₹${Math.round(value).toLocaleString()}`;

/**
 * Weighted forecast: for every pipeline, the raw OPEN pipeline value next to
 * the probability-discounted (amount * stage.probability / 100) figure -
 * the number a sales lead actually forecasts against.
 */
const ForecastWidget = () => {
  const { data, isLoading, isError } = useDealForecast();

  const chartData = (data?.byPipeline ?? []).map((row) => ({
    name: row.pipelineName,
    openAmount: Number(row.openAmount),
    weightedAmount: Number(row.weightedAmount),
  }));

  return (
    <div className="card widget-base">
      <h3 className="widget-title">Weighted Forecast</h3>
      {isLoading ? (
        <ChartSkeleton />
      ) : isError ? (
        <div className="widget-status-text">Failed to load forecast</div>
      ) : !data || data.byPipeline.length === 0 ? (
        <div className="widget-status-text">No open deals</div>
      ) : (
        <>
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Open Pipeline Value</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{formatAmount(data.openAmount)}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Weighted Forecast</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: CHART_PALETTE[0] }}>{formatAmount(data.weightedAmount)}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Open Deals</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{data.openCount}</div>
            </div>
          </div>
          <div style={{ width: '100%', height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={CHART_GRID_STROKE} />
                <XAxis dataKey="name" axisLine tickLine={false} tick={{ fontSize: 12, fill: CHART_AXIS_LABEL }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: CHART_AXIS_LABEL }} />
                <Tooltip formatter={(value) => formatAmount(Number(value))} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="openAmount" name="Open Value" fill={CHART_PALETTE[1]} radius={[2, 2, 0, 0]} isAnimationActive={false} />
                <Bar dataKey="weightedAmount" name="Weighted" fill={CHART_PALETTE[0]} radius={[2, 2, 0, 0]} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default ForecastWidget;
