import { useState, useEffect, useRef } from 'react';
import { dealAdditionalFieldService } from '../../deal-settings/additional-fields/services/dealAdditionalField.service';
import { parseErrorMessage } from '../utils/parseErrorMessage';
import type { DealAdditionalFieldDef } from '../types/interface';

let cachedDefs: DealAdditionalFieldDef[] | null = null;

export function useDealAdditionalFieldDefs() {
  const [defs, setDefs] = useState<DealAdditionalFieldDef[]>(cachedDefs ?? []);
  const [isLoading, setIsLoading] = useState(!cachedDefs);
  const [error, setError] = useState('');
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
      } catch (err) {
        // Previously swallowed entirely - a permission/network failure here left the Deal
        // form and Filter panel silently missing every additional field, with no way to tell
        // why. Surface it so it shows up in the console and can be surfaced in the UI.
        const message = parseErrorMessage(err, 'Failed to load additional field definitions');
        console.error('useDealAdditionalFieldDefs: failed to load additional field definitions', err);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return { dealAdditionalFieldDefs: defs, isLoadingAdditionalFieldDefs: isLoading, additionalFieldDefsError: error };
}
