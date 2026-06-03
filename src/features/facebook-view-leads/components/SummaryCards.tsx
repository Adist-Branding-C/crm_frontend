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
        <span className="summary-title">Success Records</span>
        <span className="summary-value">{stats.success}</span>
      </div>
    </div>
    <div className="summary-card red">
      <div className="summary-content">
        <span className="summary-title">Failed Records</span>
        <span className="summary-value">{stats.failed}</span>
      </div>
    </div>
    <div className="summary-card green">
      <div className="summary-content">
        <span className="summary-title">New Records</span>
        <span className="summary-value">{stats.new}</span>
      </div>
    </div>
    <div className="summary-card teal">
      <div className="summary-content">
        <span className="summary-title">Duplicate Records</span>
        <span className="summary-value">{stats.duplicate}</span>
      </div>
    </div>
    <div className="summary-card yellow">
      <div className="summary-content">
        <span className="summary-title">Pending Records</span>
        <span className="summary-value">{stats.pending}</span>
      </div>
    </div>
  </div>
));

SummaryCards.displayName = 'SummaryCards';
export default SummaryCards;
