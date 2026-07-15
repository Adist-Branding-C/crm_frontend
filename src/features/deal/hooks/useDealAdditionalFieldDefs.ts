import { useState, useEffect, useRef } from 'react';
import { dealAdditionalFieldService } from '../../deal-settings/additional-fields/services/dealAdditionalField.service';
import type { DealAdditionalFieldDef } from '../types/additionalField';

let cachedDefs: DealAdditionalFieldDef[] | null = null;

export function useDealAdditionalFieldDefs() {
  const [defs, setDefs] = useState<DealAdditionalFieldDef[]>(cachedDefs ?? []);
  const [isLoading, setIsLoading] = useState(!cachedDefs);
  const hasLoaded = useRef(!!cachedDefs);

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    const load = async () => {
      try {
        const res = await dealAdditionalFieldService.getAllDealAdditionalFields({ limit: 200 });
        const items = (res.data?.items ?? []) as unknown as DealAdditionalFieldDef[];
        cachedDefs = items;
        setDefs(items);
      } catch {
        // silently fail, form/filters will render without additional fields
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return { dealAdditionalFieldDefs: defs, isLoadingAdditionalFieldDefs: isLoading };
}
