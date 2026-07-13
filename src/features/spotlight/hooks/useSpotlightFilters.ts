import { useState, useCallback } from 'react';
import { INITIAL_FILTERS } from '../constants';
import type { SpotlightFilters } from '../types';

/**
 * Owns the Spotlight filter panel's visibility and field state.
 *
 * Used by:
 * - useSpotlightData.
 */
export function useSpotlightFilters() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SpotlightFilters>(INITIAL_FILTERS);

  const toggleFilters = useCallback(() => setShowFilters((prev) => !prev), []);
  const closeFilters = useCallback(() => setShowFilters(false), []);

  const clearFilters = useCallback(() => {
    setFilters({ ...INITIAL_FILTERS });
  }, []);

  return {
    showFilters,
    toggleFilters,
    closeFilters,
    filters,
    setFilters,
    clearFilters,
  };
}
