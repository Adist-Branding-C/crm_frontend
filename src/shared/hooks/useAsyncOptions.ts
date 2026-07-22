import { useState, useEffect } from 'react';

/**
 * Generic fetch-once-on-mount lookup list for a dropdown/select field, mapped to UI options.
 *
 * Notes:
 * - Reusable across any form that needs a reference-data dropdown (e.g. a list of purposes,
 *   statuses, categories) sourced from another entity's API. Pass the raw fetch call and the
 *   item->option mapper; both run once on mount.
 * - Best-effort: a failed fetch silently leaves options empty rather than surfacing an error,
 *   since these lists are typically non-critical to the form's primary function.
 */
export function useAsyncOptions<TApiItem, TOption>(
  fetchItems: () => Promise<TApiItem[]>,
  mapToOption: (item: TApiItem) => TOption,
) {
  const [options, setOptions] = useState<TOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    fetchItems()
      .then((items) => {
        if (!cancelled) setOptions(items.map(mapToOption));
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { options, isLoading };
}
