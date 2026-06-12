import type { DealAdditionalField, DealAdditionalFieldFormData } from './deal-additional-field.types';

export interface AddDealAdditionalFieldFormPanelProps {
  formData: DealAdditionalFieldFormData;
  editingItem: DealAdditionalField | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}
