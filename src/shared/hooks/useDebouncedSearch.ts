import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Generic debounced search-input state: tracks the raw value the user is typing and only
 * calls `onSearchChange` after the value has settled for `delay` ms.
 *
 * Notes:
 * - Reusable across any search box that drives a server-side fetch (pass the fetch hook's own
 *   search setter, e.g. useTableData's `handleSearchChange`, as `onSearchChange`).
 */
export function useDebouncedSearch(onSearchChange: (value: string) => void, delay = 250) {
  const [searchValue, setSearchValue] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const onSearchChangeRef = useRef(onSearchChange);
  onSearchChangeRef.current = onSearchChange;

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearchChangeRef.current(value);
    }, delay);
  }, [delay]);

  const resetSearch = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSearchValue('');
  }, []);

  useEffect(() => () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
  }, []);

  return { searchValue, handleSearchChange, resetSearch };
}
