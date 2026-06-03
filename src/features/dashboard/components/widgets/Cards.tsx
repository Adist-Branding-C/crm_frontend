import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { StatCardProps, KpiCardProps } from '../../types';
import './Cards.css';

export const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <div className="card stat-card">
      <div className="stat-value">{value}</div>
      <div className="stat-footer">
        <span className="stat-title">{title}</span>
        <ChevronRight size={14} className="stat-icon" />
      </div>
    </div>
  );
};

export const KpiCard = ({ title, value, isPrimary = false, isHighlight = false }: KpiCardProps) => {
  return (
    <div className={`card kpi-card ${isPrimary ? 'primary-outline' : 'secondary-outline'} ${isHighlight ? 'highlighted' : ''}`}>
      <div className="kpi-value">{value}</div>
      <div className="kpi-footer">
        <span className="kpi-title">{title}</span>
        <ChevronRight size={14} className="kpi-icon" />
      </div>
    </div>
  );
};
