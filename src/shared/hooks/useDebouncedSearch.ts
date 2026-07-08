import { useState, useEffect, useCallback, useRef } from 'react';

export function useDebouncedSearch(
  externalSearchQuery: string,
  onSearchChange: (value: string) => void,
  debounceMs = 2000,
) {
  const [searchValue, setSearchValue] = useState(externalSearchQuery);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (searchValue !== externalSearchQuery) {
      setSearchValue(externalSearchQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalSearchQuery]);

  const handleSearchInput = useCallback((value: string) => {
    setSearchValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearchChange(value);
    }, debounceMs);
  }, [onSearchChange, debounceMs]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return { searchValue, handleSearchInput };
}
