import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Skeleton } from '../../../../shared/components/Skeleton';
import type { StatCardProps, KpiCardProps } from '../../types';
import './Cards.css';

export const StatCard = ({ title, value, isLoading = false }: StatCardProps) => {
  return (
    <div className="card stat-card">
      {isLoading ? (
        <Skeleton className="stat-value-skeleton" width="4rem" height="1.5rem" />
      ) : (
        <div className="stat-value">{value}</div>
      )}
      <div className="stat-footer">
        <span className="stat-title">{title}</span>
        <ChevronRight size={14} className="stat-icon" />
      </div>
    </div>
  );
};

export const KpiCard = ({ title, value, isPrimary = false, isHighlight = false, isLoading = false }: KpiCardProps) => {
  return (
    <div className={`card kpi-card ${isPrimary ? 'primary-outline' : 'secondary-outline'} ${isHighlight ? 'highlighted' : ''}`}>
      {isLoading ? (
        <Skeleton className="kpi-value-skeleton" width="4.5rem" height="1.75rem" />
      ) : (
        <div className="kpi-value">{value}</div>
      )}
      <div className="kpi-footer">
        <span className="kpi-title">{title}</span>
        <ChevronRight size={14} className="kpi-icon" />
      </div>
    </div>
  );
};
