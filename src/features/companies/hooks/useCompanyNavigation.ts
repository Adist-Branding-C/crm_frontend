import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Company } from '../types';

/**
 * Route-navigation actions for the company module - currently just jumping to a company's
 * subscription management page. Kept as its own hook so CompaniesPage never authors a
 * navigation handler itself.
 *
 * Used by:
 * - CompaniesPage
 */
export function useCompanyNavigation() {
  const navigate = useNavigate();

  const goToSubscription = useCallback((company: Company) => {
    navigate(`/companies/${company.companyId}/subscription`);
  }, [navigate]);

  return { goToSubscription };
}
