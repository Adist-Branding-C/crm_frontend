import { useState, useCallback, useRef } from 'react';

/**
 * Generic lazy-load-once dropdown options: fetches on first call, caches until
 * a manual reload is needed.
 *
 * Notes:
 * - Reusable across any feature's async select dropdown (staff/lead/category/designation/etc.);
 *   pass a fetcher that resolves to the mapped {value,label}-shaped option list.
 *   Previously reimplemented per-feature (task/shared's staff/lead/category option hooks each
 *   hand-rolled this same state+ref+try/catch shape); this is the shared version.
 */
export function useLookupOptions<TOption>(fetchOptions: () => Promise<TOption[]>) {
  const [options, setOptions] = useState<TOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const loaded = useRef(false);

  const load = useCallback(async () => {
    if (loaded.current) return;
    loaded.current = true;
    setIsLoading(true);
    try {
      setOptions(await fetchOptions());
    } catch {
      loaded.current = false;
    } finally {
      setIsLoading(false);
    }
  }, [fetchOptions]);

  return { options, isLoading, load };
}
