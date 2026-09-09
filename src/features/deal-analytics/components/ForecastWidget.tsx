import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CHART_AXIS_LABEL, CHART_GRID_STROKE, CHART_PALETTE } from '../../../shared/constants/chartPalette';
import { currencySymbol, DEFAULT_CURRENCY } from '../../../shared/constants/currencies';
import { ChartSkeleton } from '../../dashboard/components/widgets/WidgetSkeletons';
import { useDealForecast } from '../hooks/useDealForecast';
import type { ForecastCurrencyTotal } from '../types';
import '../../dashboard/components/widgets/WidgetStyles.css';

const EMPTY_TOTAL: Omit<ForecastCurrencyTotal, 'currency'> = {
  openAmount: 0,
  weightedAmount: 0,
  openCount: 0,
};

/** Prefer INR, else the first currency the company actually has open deals in. */
function resolveActiveCurrency(currencies: string[], picked: string | null): string {
  if (picked && currencies.includes(picked)) return picked;
  if (currencies.includes(DEFAULT_CURRENCY)) return DEFAULT_CURRENCY;
  return currencies[0] ?? DEFAULT_CURRENCY;
}

/**
 * Weighted forecast: for every pipeline, the raw OPEN pipeline value next to
 * the probability-discounted (amount * stage.probability / 100) figure - the
 * number a sales lead actually forecasts against.
 *
 * Deal amounts in different currencies are never added together: the widget
 * shows one currency at a time (toggle appears when the company has open
 * deals in more than one), mirroring the deal board's summary bar.
 */
const ForecastWidget = () => {
  const { data, isLoading, isError } = useDealForecast();
  const [pickedCurrency, setPickedCurrency] = useState<string | null>(null);

  const pipelineRows = data?.byPipeline ?? [];

  // Prefer the server's per-currency roll-up, but fall back to deriving it
  // from the pipeline rows so an older API response (no `currencies` /
  // `byCurrency`) degrades instead of throwing.
  const currencies =
    data?.currencies ??
    [...new Set(pipelineRows.map((row) => row.currency || DEFAULT_CURRENCY))].sort();
  const activeCurrency = resolveActiveCurrency(currencies, pickedCurrency);

  const totals =
    data?.byCurrency?.find((c) => c.currency === activeCurrency) ??
    pipelineRows
      .filter((row) => (row.currency || DEFAULT_CURRENCY) === activeCurrency)
      .reduce(
        (acc, row) => ({
          openAmount: acc.openAmount + Number(row.openAmount),
          weightedAmount: acc.weightedAmount + Number(row.weightedAmount),
          openCount: acc.openCount + row.openCount,
        }),
        { ...EMPTY_TOTAL },
      );

  const chartData = pipelineRows
    .filter((row) => (row.currency || DEFAULT_CURRENCY) === activeCurrency)
    .map((row) => ({
      name: row.pipelineName,
      openAmount: Number(row.openAmount),
      weightedAmount: Number(row.weightedAmount),
    }));

  const formatAmount = (value: number) =>
    `${currencySymbol(activeCurrency)}${Math.round(value).toLocaleString()}`;

  return (
    <div className="card widget-base">
      <div className="widget-header">
        <h3 className="widget-title">Weighted Forecast</h3>
        {currencies.length > 1 && (
          <select
            className="widget-inline-select"
            value={activeCurrency}
            onChange={(e) => setPickedCurrency(e.target.value)}
            aria-label="Forecast currency"
          >
            {currencies.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        )}
      </div>

      {isLoading ? (
        <ChartSkeleton />
      ) : isError ? (
        <div className="widget-status-text">Failed to load forecast</div>
      ) : !data || pipelineRows.length === 0 ? (
        <div className="widget-status-text">No open deals</div>
      ) : (
        <>
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Open Pipeline Value</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{formatAmount(totals.openAmount)}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Weighted Forecast</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: CHART_PALETTE[0] }}>{formatAmount(totals.weightedAmount)}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Open Deals</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{totals.openCount}</div>
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
