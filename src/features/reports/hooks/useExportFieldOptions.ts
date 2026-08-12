import { useState, useEffect, useRef } from 'react';
import { leadAdditionalService } from '../../lead-settings/lead-additional/services/leadAdditionalService';
import { STANDARD_EXPORT_FIELDS } from '../constants/leadExport.data';
import type { FieldOption } from '../constants/leadExport.data';

const ADDITIONAL_FIELDS_PAGE_LIMIT = 200;

let cachedFields: FieldOption[] | null = null;

/**
 * Combined, flat list of every exportable lead field for the Lead Export page's
 * field checklist: the app's standard lead fields plus every active additional
 * (custom) field, fetched via the existing lead-additional-fields API.
 */
export function useExportFieldOptions() {
  const [fields, setFields] = useState<FieldOption[]>(cachedFields ?? []);
  const [isLoading, setIsLoading] = useState(!cachedFields);
  const [error, setError] = useState<string | null>(null);
  const hasLoaded = useRef(!!cachedFields);

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    const load = async () => {
      try {
        setError(null);
        const response = await leadAdditionalService.getAll(1, ADDITIONAL_FIELDS_PAGE_LIMIT);
        const additionalFields: FieldOption[] = (response?.data?.items ?? []).map((f) => ({
          key: f.fieldId,
          label: f.name,
        }));

        const combined = [...STANDARD_EXPORT_FIELDS, ...additionalFields];
        cachedFields = combined;
        setFields(combined);
      } catch {
        setError('Failed to load export fields');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return { fields, isLoading, error };
}
