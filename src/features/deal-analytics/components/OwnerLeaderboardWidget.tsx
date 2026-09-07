import { ListRowsSkeleton } from '../../dashboard/components/widgets/WidgetSkeletons';
import { useOwnerLeaderboard } from '../hooks/useOwnerLeaderboard';
import type { AnalyticsPeriod } from '../types';
import '../../dashboard/components/widgets/WidgetStyles.css';

const formatAmount = (value: string | number) => `₹${Math.round(Number(value)).toLocaleString()}`;

interface OwnerLeaderboardWidgetProps {
  period: AnalyticsPeriod;
}

/**
 * Owner leaderboard: per-agent deal count/amount/win-rate, ranked by won
 * value - scoped the same way the rest of this dashboard is, so a
 * restricted caller only ever sees the agents inside their own visibility.
 */
const OwnerLeaderboardWidget = ({ period }: OwnerLeaderboardWidgetProps) => {
  const { data, isLoading, isError } = useOwnerLeaderboard(period);

  return (
    <div className="card widget-base">
      <h3 className="widget-title">Owner Leaderboard</h3>
      {isLoading ? (
        <ListRowsSkeleton rows={5} />
      ) : isError ? (
        <div className="widget-status-text">Failed to load owner leaderboard</div>
      ) : data.length === 0 ? (
        <div className="widget-status-text">No deals yet</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>
                <th style={{ padding: '0.5rem 0.75rem' }}>Owner</th>
                <th style={{ padding: '0.5rem 0.75rem', textAlign: 'right' }}>Deals</th>
                <th style={{ padding: '0.5rem 0.75rem', textAlign: 'right' }}>Won</th>
                <th style={{ padding: '0.5rem 0.75rem', textAlign: 'right' }}>Win Rate</th>
                <th style={{ padding: '0.5rem 0.75rem', textAlign: 'right' }}>Won Value</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.agentId} style={{ borderTop: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.5rem 0.75rem', fontWeight: 600 }}>{row.agentName}</td>
                  <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right' }}>{row.totalDeals}</td>
                  <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right' }}>{row.wonDeals}</td>
                  <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right' }}>{row.winRate.toFixed(1)}%</td>
                  <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', fontWeight: 600, color: 'var(--success)' }}>
                    {formatAmount(row.wonAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OwnerLeaderboardWidget;
