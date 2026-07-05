import { useState, useEffect, useCallback, useRef } from 'react';

export function useSearchInput(
  externalSearchQuery: string,
  onSearchChange: (value: string) => void,
) {
  const [searchValue, setSearchValue] = useState(externalSearchQuery);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (searchValue !== externalSearchQuery) {
      setSearchValue(externalSearchQuery);
    }
  }, [externalSearchQuery]);

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
