import { useState, useMemo, useCallback } from 'react';

export function useSearchFilter<T>(
  data: T[],
  searchFields: (keyof T)[],
  initialQuery = ''
) {
  const [query, setQuery] = useState(initialQuery);

  const filteredData = useMemo(() => {
    if (!query) return data;
    const q = query.toLowerCase();
    return data.filter(item =>
      searchFields.some(field => {
        const value = item[field];
        return String(value ?? '').toLowerCase().includes(q);
      })
    );
  }, [data, query, searchFields]);

  const clearSearch = useCallback(() => setQuery(''), []);

  return { query, setQuery, filteredData, clearSearch };
}
