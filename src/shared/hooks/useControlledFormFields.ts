import { useState, useCallback } from 'react';

/**
 * Generic plain-controlled-input form state: current values, a change handler that syncs
 * any input/select (including checkboxes) back into the form object by `name`, and reset.
 *
 * Notes:
 * - For forms that are Formik-owned instead, see useEditDrawer/useAddEditForm.
 * - Reusable across any feature's non-Formik add/edit form; pass the entity's blank-form shape.
 *   Previously reimplemented per-feature (deal-settings/additional-fields, lead-settings/lead-additional
 *   each had an identical local useXFormState hook); this is the shared version.
 */
export function useControlledFormFields<T>(initialValues: T) {
  const [formData, setFormData] = useState<T>(initialValues);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target instanceof HTMLInputElement && target.type === 'checkbox' ? target.checked : target.value;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialValues);
  }, [initialValues]);

  return { formData, setFormData, handleInputChange, resetForm };
}
