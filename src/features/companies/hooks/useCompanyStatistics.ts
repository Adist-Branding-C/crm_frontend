import { useState, useEffect, useCallback } from 'react';
import { companyDataService } from '../services/companyDataService';
import type { CompanyStats } from '../types';

const EMPTY_STATS: CompanyStats = {
  totalCompanies: 0,
  expiredCustomers: 0,
  soonExpire: 0,
  totalStaff: 0,
  totalRevenue: 0,
};

/**
 * Fetches the aggregate company statistics (GET /companies/statistics) shown in
 * the stats grid at the top of the Company Management page.
 *
 * Used by:
 * - CompaniesPage
 */
export function useCompanyStatistics() {
  const [stats, setStats] = useState<CompanyStats>(EMPTY_STATS);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStatistics = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await companyDataService.getCompanyStatistics({});
      const statistics = response.data?.statistics;
      if (response.status && statistics) {
        setStats({
          totalCompanies: statistics.totalCompanies,
          expiredCustomers: statistics.expired,
          soonExpire: statistics.soonExpired,
          totalStaff: statistics.totalStaff,
          totalRevenue: statistics.totalRevenue,
        });
      } else {
        setStats(EMPTY_STATS);
      }
    } catch (err) {
      console.error('Failed to fetch company statistics', err);
      setStats(EMPTY_STATS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  return { stats, isLoading, refreshStatistics: fetchStatistics };
}
