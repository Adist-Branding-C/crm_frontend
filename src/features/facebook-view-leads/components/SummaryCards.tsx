import React from 'react';
import type { SummaryCardsProps } from '../types';

const SummaryCards: React.FC<SummaryCardsProps> = React.memo(({ stats }) => (
  <div className="summary-cards">
    <div className="summary-card blue">
      <div className="summary-content">
        <span className="summary-title">Total Records</span>
        <span className="summary-value">{stats.total}</span>
      </div>
    </div>
    <div className="summary-card green">
      <div className="summary-content">
        <span className="summary-title">Processed</span>
        <span className="summary-value">{stats.processed}</span>
      </div>
    </div>
    <div className="summary-card red">
      <div className="summary-content">
        <span className="summary-title">Failed</span>
        <span className="summary-value">{stats.failed}</span>
      </div>
    </div>
    <div className="summary-card yellow">
      <div className="summary-content">
        <span className="summary-title">Processing</span>
        <span className="summary-value">{stats.processing}</span>
      </div>
    </div>
    <div className="summary-card teal">
      <div className="summary-content">
        <span className="summary-title">Received</span>
        <span className="summary-value">{stats.received}</span>
      </div>
    </div>
  </div>
));

SummaryCards.displayName = 'SummaryCards';
export default SummaryCards;
