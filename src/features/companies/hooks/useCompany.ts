import { useState, useEffect, useCallback } from 'react';
import { companyDataService } from '../services/companyDataService';
import { mapApiToUI } from '../mappers/companyMapper';
import type { Company } from '../types';

/**
 * Fetches a single company's own details by id - for pages that need just the company record
 * itself (e.g. its name for a page header), without the list/pagination machinery useTableData
 * would bring in.
 *
 * Used by:
 * - CompanySubscriptionPage
 */
export function useCompany(companyId: string | undefined) {
  const [company, setCompany] = useState<Company | null>(null);
  const [error, setError] = useState('');

  const fetchCompany = useCallback(async () => {
    if (!companyId) return;
    setError('');
    try {
      const res = await companyDataService.getCompany(companyId);
      if (res.status && res.data) {
        setCompany(mapApiToUI(res.data));
      } else {
        setError(res.message || 'Company not found');
      }
    } catch {
      setError('Failed to load company');
    }
  }, [companyId]);

  useEffect(() => {
    fetchCompany();
  }, [fetchCompany]);

  return { company, error };
}
