import { useState, useEffect, useCallback, useRef } from 'react';

export function useTaskSettingsSearch(
  externalSearchQuery: string,
  onSearchChange: (value: string) => void,
) {
  const [searchValue, setSearchValue] = useState(externalSearchQuery);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

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
