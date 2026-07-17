import type { DealStatusFormData } from './request';

export interface AddDealStatusDrawerProps {
  isOpen: boolean;
  formData: DealStatusFormData;
  onChange: (values: DealStatusFormData) => void;
  onSave: () => void;
  onClose: () => void;
  isEditing: boolean;
}
