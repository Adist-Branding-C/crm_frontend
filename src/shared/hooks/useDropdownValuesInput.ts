import { useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { FormDataWithDropdownValues } from '../types/formFields.types';

/**
 * Generic dropdown-values list editor: tracks the value currently being typed and lets it be
 * added to (or removed from) a `dropdownValues` list, operating on a `setFormData` the caller
 * already owns so the list stays part of that one form-data object.
 *
 * Notes:
 * - Reusable across any feature's "add a dropdown option" form field; pass whichever setFormData
 *   the form's own state hook (e.g. useControlledFormFields) returned. Previously reimplemented
 *   per-feature (deal-settings/additional-fields, lead-settings/lead-additional each had an
 *   identical local copy of this logic inside a combined form-state hook); this is the shared version.
 */
export function useDropdownValuesInput<T extends FormDataWithDropdownValues>(setFormData: Dispatch<SetStateAction<T>>) {
  const handleDropdownValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, currentDropdownValue: e.target.value }));
  }, [setFormData]);

  const handleAddDropdownValue = useCallback(() => {
    setFormData(prev => {
      const trimmed = prev.currentDropdownValue.trim();
      if (!trimmed) return prev;
      if (prev.dropdownValues.some(v => v.toLowerCase() === trimmed.toLowerCase())) return prev;
      return {
        ...prev,
        dropdownValues: [...prev.dropdownValues, trimmed],
        currentDropdownValue: '',
      };
    });
  }, [setFormData]);

  const handleRemoveDropdownValue = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      dropdownValues: prev.dropdownValues.filter((_, i) => i !== index),
    }));
  }, [setFormData]);

  return { handleDropdownValueChange, handleAddDropdownValue, handleRemoveDropdownValue };
}
