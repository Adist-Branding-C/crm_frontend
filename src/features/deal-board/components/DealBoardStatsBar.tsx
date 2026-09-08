import type { DealBoardStats } from '../hooks/useDealBoardStats';
import { CURRENCY_OPTIONS, currencySymbol, DEFAULT_CURRENCY } from '../../../shared/constants/currencies';
import './DealBoardStatsBar.css';

interface DealBoardStatsBarProps {
  stats: DealBoardStats;
  currency: string;
  onCurrencyChange: (currency: string) => void;
}

function formatCurrency(value: number, currency: string): string {
  return `${currencySymbol(currency)}${Math.round(value).toLocaleString()}`;
}

function DealBoardStatsBar({ stats, currency, onCurrencyChange }: DealBoardStatsBarProps) {
  const options = CURRENCY_OPTIONS.filter(
    (c) => c.code === DEFAULT_CURRENCY || c.code === currency || stats.currencies.includes(c.code),
  );

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
      <label className="deal-board-stat deal-board-stat--currency">
        <span className="deal-board-stat__label">Currency</span>
        <select
          className="deal-board-stat__currency-select"
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value)}
        >
          {options.map((c) => (
            <option key={c.code} value={c.code}>{c.code}</option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default DealBoardStatsBar;
