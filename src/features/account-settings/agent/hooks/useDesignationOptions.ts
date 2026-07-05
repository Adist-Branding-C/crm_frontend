import { useState, useCallback, useRef } from 'react';
import { designationApiService } from '../../designations/services';
import type { DesignationOption } from '../types';

export function useDesignationOptions() {
  const [designationOptions, setDesignationOptions] = useState<DesignationOption[]>([]);
  const designationsLoaded = useRef(false);

  const fetchDesignations = useCallback(async (force = false) => {
    if (!force && designationsLoaded.current) return;
    try {
      const response = await designationApiService.fetchAll({ pageNumber: '1', limit: '100' });
      if (response.status) {
        const data = response.data as { items?: Array<{ designationName?: string; name?: string; id: number }> };
        const items = Array.isArray(data?.items) ? data.items : [];
        setDesignationOptions(
          items.map((item) => ({
            label: item.designationName || item.name || '',
            value: String(item.id),
          }))
        );
        designationsLoaded.current = true;
      }
    } catch {
      setDesignationOptions([]);
    }
  }, []);

  return { designationOptions, fetchDesignations };
}
