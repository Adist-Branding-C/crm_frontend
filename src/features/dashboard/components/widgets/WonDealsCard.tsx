import React from 'react';
import { KpiCard } from './Cards';
import { useWonDeals } from '../../hooks/useWonDeals';
import type { DashboardPeriod } from '../../types';

interface WonDealsCardProps {
  period: DashboardPeriod;
  from?: string;
  to?: string;
}

const WonDealsCard = ({ period, from, to }: WonDealsCardProps) => {
  const { count, isLoading, isError } = useWonDeals(period, from, to);

  const value = isError ? 'No data' : String(count ?? 0);

  return <KpiCard title="Won Deals" value={value} isLoading={isLoading} />;
};

export default WonDealsCard;
