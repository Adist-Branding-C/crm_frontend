import { useState, useRef, useCallback } from 'react';
import { EMPTY_COMPANY_FILTERS } from '../constants';
import type { CompanyFilters } from '../types';

/**
 * Owns the company-list filter panel's visibility and the currently-applied filter values -
 * a single "filtering" responsibility, separate from the list/pagination state useTableData
 * owns. The panel itself (CompaniesFilters) owns the draft values via its own Formik instance;
 * this hook only tracks what's actually been applied and reacts to apply/clear.
 *
 * Used by:
 * - CompaniesPage
 */
export function useCompanyFilters(resetToFirstPage: () => void) {
  const [showFilters, setShowFilters] = useState(false);
  const appliedFiltersRef = useRef<CompanyFilters>(EMPTY_COMPANY_FILTERS);

  const toggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);

  const applyFilters = useCallback((values: CompanyFilters) => {
    appliedFiltersRef.current = values;
    setShowFilters(false);
    resetToFirstPage();
  }, [resetToFirstPage]);

  const clearFilters = useCallback(() => {
    appliedFiltersRef.current = EMPTY_COMPANY_FILTERS;
    setShowFilters(false);
    resetToFirstPage();
  }, [resetToFirstPage]);

  return { showFilters, toggleFilters, appliedFiltersRef, applyFilters, clearFilters };
}
