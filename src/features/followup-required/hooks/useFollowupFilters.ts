import { useState } from 'react';
import { INITIAL_FILTERS } from '../constants';
import type { Filters } from '../types';

/**
 * Owns the filter panel's draft-vs-applied state: editing a filter only
 * updates the draft until Apply is pressed, matching the Daily Activity
 * feature's useActivityFilters.
 *
 * Used by:
 * - FollowupRequiredPage (composed alongside fetch/sort/pagination).
 */
export function useFollowupFilters() {
  const [showFilters, setShowFilters] = useState(false);
  const [draftFilters, setDraftFilters] = useState<Filters>(INITIAL_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<Filters>(INITIAL_FILTERS);

  // Returns whether anything actually changed, so the caller can skip an
  // unnecessary refetch/page-reset when Apply is clicked with no edits.
  const applyFilters = (): boolean => {
    const hasChanged =
      JSON.stringify(draftFilters) !== JSON.stringify(appliedFilters);
    if (hasChanged) {
      setAppliedFilters(draftFilters);
    }
    setShowFilters(false);
    return hasChanged;
  };

  const clearFilters = () => {
    setDraftFilters(INITIAL_FILTERS);
    setAppliedFilters(INITIAL_FILTERS);
    setShowFilters(false);
  };

  return {
    showFilters,
    setShowFilters,
    filters: draftFilters,
    setFilters: setDraftFilters,
    appliedFilters,
    applyFilters,
    clearFilters,
  };
}
