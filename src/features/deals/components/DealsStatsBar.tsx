import React from 'react';
import type { DealsStatsBarProps } from '../types';

const DealsStatsBar: React.FC<DealsStatsBarProps> = React.memo(({ totalAmount, totalCount }) => (
  <div className="deals-stats-row">
    <div className="stat-item">
      <span className="stat-label">Total Deal Amount:</span>
      <span className="stat-value">₹{totalAmount.toLocaleString()}</span>
    </div>
    <div className="stat-item">
      <span className="stat-label">Total Deals Count:</span>
      <span className="stat-value">{totalCount}</span>
    </div>
  </div>
));

DealsStatsBar.displayName = 'DealsStatsBar';
export default DealsStatsBar;
