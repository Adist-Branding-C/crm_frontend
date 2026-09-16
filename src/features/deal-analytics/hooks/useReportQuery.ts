import { useCallback, useEffect, useState } from 'react';
import { getErrorMessage } from '../../../shared/utils/error';
import { humanizeReportError } from '../utils/humanizeReportError';
import type { ApiResponse } from '../../../shared/types/common';

export interface UseReportQueryResult<TData> {
  data: TData | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  refetch: () => void;
}

export function useReportQuery<TData>(
  fetcher: () => Promise<ApiResponse<TData>>,
  deps: unknown[],
  options?: { fallbackMessage?: string; hookName?: string; skip?: boolean },
): UseReportQueryResult<TData> {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(!options?.skip);
  const [error, setError] = useState<string | null>(null);
  const [retryTick, setRetryTick] = useState(0);
  const fallbackMessage = options?.fallbackMessage ?? 'Failed to load this report';
  const hookName = options?.hookName ?? 'useReportQuery';
  const skip = options?.skip ?? false;
  const refetch = useCallback(() => setRetryTick((n) => n + 1), []);

  useEffect(() => {
    if (skip) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    (async () => {
      try {
        const response = await fetcher();
        if (cancelled) return;
        if (!response.status || !response.data) {
          setError(humanizeReportError(response.message?.trim() || fallbackMessage));
          return;
        }
        setData(response.data);
      } catch (err) {
        if (!cancelled) {
          console.error(`${hookName}: failed to load`, err);
          setError(humanizeReportError(getErrorMessage(err, fallbackMessage)));
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, retryTick, skip]);

  return { data, isLoading, isError: error !== null, error, refetch };
}
