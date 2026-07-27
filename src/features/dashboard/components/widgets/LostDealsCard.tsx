import React from 'react';
import { KpiCard } from './Cards';
import { useLostDeals } from '../../hooks/useLostDeals';
import type { DashboardPeriod } from '../../types';

interface LostDealsCardProps {
  period: DashboardPeriod;
  from?: string;
  to?: string;
}

const LostDealsCard = ({ period, from, to }: LostDealsCardProps) => {
  const { count, isLoading, isError } = useLostDeals(period, from, to);

  const value = isLoading ? 'Loading...' : isError ? 'No data' : String(count ?? 0);

  return <KpiCard title="Lost Deals" value={value} />;
};

export default LostDealsCard;
