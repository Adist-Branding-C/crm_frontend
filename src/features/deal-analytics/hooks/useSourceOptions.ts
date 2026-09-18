import { useEffect, useState } from 'react';
import { leadSourceService } from '../../lead-settings/lead-source/services';

export interface SourceSelectOption {
  label: string;
  value: string;
}


export function useSourceOptions() {
  const [sourceOptions, setSourceOptions] = useState<SourceSelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    leadSourceService
      .getLeadSources(1, 100)
      .then((response) => {
        if (cancelled) return;
        const items = response?.data?.items ?? [];
        setSourceOptions(items.map((s: { sourceId: string; source: string }) => ({ value: s.sourceId, label: s.source })));
      })
      .catch(() => {
        if (!cancelled) setSourceOptions([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { sourceOptions, isLoading };
}
