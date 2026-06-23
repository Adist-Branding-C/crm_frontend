import type { DealTypeFormData } from './deal-type.types';

export interface AddDealTypeDrawerProps {
  isOpen: boolean;
  formData: DealTypeFormData;
  onChange: (values: DealTypeFormData) => void;
  onSave: () => void;
  onClose: () => void;
  isEditing: boolean;
}
