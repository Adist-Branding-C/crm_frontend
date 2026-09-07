import type { DealBoardStats } from '../hooks/useDealBoardStats';
import './DealBoardStatsBar.css';

interface DealBoardStatsBarProps {
  stats: DealBoardStats;
  currency?: string;
}

function formatCurrency(value: number, currency: string): string {
  return `${currency} ${Math.round(value).toLocaleString()}`;
}

/**
 * Three-stat summary strip (open deals, total value, weighted forecast)
 * shown above the board. Client-computed from the loaded Kanban data - see
 * useDealBoardStats for the accuracy caveat on large pipelines.
 *
 * Used by:
 * - DealBoardPage
 */
function DealBoardStatsBar({ stats, currency = '$' }: DealBoardStatsBarProps) {
  return (
    <div className="deal-board-stats-bar">
      <div className="deal-board-stat">
        <span className="deal-board-stat__label">Open Deals</span>
        <span className="deal-board-stat__value">{stats.openCount}</span>
      </div>
      <div className="deal-board-stat">
        <span className="deal-board-stat__label">Pipeline Value</span>
        <span className="deal-board-stat__value">{formatCurrency(stats.totalValue, currency)}</span>
      </div>
      <div className="deal-board-stat">
        <span className="deal-board-stat__label">Weighted Forecast</span>
        <span className="deal-board-stat__value">{formatCurrency(stats.weightedForecast, currency)}</span>
      </div>
    </div>
  );
}

export default DealBoardStatsBar;
