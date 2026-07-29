import { useEffect, useState } from 'react';
import { leadDataService } from '../services/leadDataService';
import type { LeadSearchApiItem } from '../types/response';

const MIN_QUERY_LENGTH = 2;

// Powers the global search dropdown in TopNav. Takes an already-debounced
// query (the caller is expected to debounce keystrokes, e.g. via the
// existing useDebouncedSearch hook) - this hook itself just fetches
// whenever that settled query changes.
export function useGlobalLeadSearch(query: string) {
  const [results, setResults] = useState<LeadSearchApiItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (query.trim().length < MIN_QUERY_LENGTH) {
      setResults([]);
      setIsLoading(false);
      setIsError(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setIsError(false);

    (async () => {
      try {
        const response = await leadDataService.searchLeads(query.trim());
        if (cancelled) return;

        if (!response.status || !response.data) {
          setIsError(true);
          return;
        }

        setResults(response.data.items);
      } catch (error) {
        if (!cancelled) {
          console.error('useGlobalLeadSearch: failed to search leads', error);
          setIsError(true);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [query]);

  return { results, isLoading, isError };
}
