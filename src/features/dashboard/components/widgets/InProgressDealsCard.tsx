import React from 'react';
import { KpiCard } from './Cards';
import { useInProgressDeals } from '../../hooks/useInProgressDeals';
import type { DashboardPeriod } from '../../types';

interface InProgressDealsCardProps {
  period: DashboardPeriod;
  from?: string;
  to?: string;
}

const InProgressDealsCard = ({ period, from, to }: InProgressDealsCardProps) => {
  const { count, isLoading, isError } = useInProgressDeals(period, from, to);

  const value = isError ? 'No data' : String(count ?? 0);

  return <KpiCard title="In Progress Deals" value={value} isLoading={isLoading} />;
};

export default InProgressDealsCard;
