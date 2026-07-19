import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Debounced search-box state for the task-settings sub-module pages, kept in sync with an
 * externally-owned search query (e.g. cleared when the page resets filters).
 *
 * Used by:
 * - call-reason, call-status, meeting-outcome, task-category pages
 *
 * Notes:
 * - Builds on the same debounce pattern as the shared `useDebouncedSearch`, but that hook has
 *   no way to resync its internal value when the external query changes elsewhere (e.g. a
 *   "clear filters" action), which every task-settings page relies on.
 */
export function useTableSearch(
  externalSearchQuery: string,
  onSearchChange: (value: string) => void,
) {
  const [searchValue, setSearchValue] = useState(externalSearchQuery);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (searchValue !== externalSearchQuery) {
      setSearchValue(externalSearchQuery);
    }
  }, [externalSearchQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearchInput = useCallback((value: string) => {
    setSearchValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearchChange(value);
    }, 2000);
  }, [onSearchChange]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return { searchValue, handleSearchInput };
}
