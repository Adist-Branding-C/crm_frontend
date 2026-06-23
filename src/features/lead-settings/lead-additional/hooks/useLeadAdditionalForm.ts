import { useState, useCallback } from 'react';
import { INITIAL_FORM_DATA } from '../constants/form.constants';
import type { LeadAdditionalItem } from '../types';

export function useLeadAdditionalForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target instanceof HTMLInputElement && target.type === 'checkbox' ? target.checked : target.value;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleDropdownValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, currentDropdownValue: e.target.value }));
  }, []);

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
  }, []);

  const handleRemoveDropdownValue = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      dropdownValues: prev.dropdownValues.filter((_, i) => i !== index),
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
  }, []);

  const populateForm = useCallback((item: LeadAdditionalItem) => {
    setFormData({
      name: item.field,
      fieldType: item.type.toLowerCase(),
      showInFilter: item.inFilter,
      showInList: item.inList,
      isRequired: item.required,
      connectWithLeadPurpose: item.purpose,
      purposeId: item.purposeId || '',
      dropdownValues: item.dropdownValues ? [...item.dropdownValues] : [],
      currentDropdownValue: '',
    });
  }, []);

  return {
    formData,
    setFormData,
    handleInputChange,
    handleDropdownValueChange,
    handleAddDropdownValue,
    handleRemoveDropdownValue,
    resetForm,
    populateForm,
  };
}
