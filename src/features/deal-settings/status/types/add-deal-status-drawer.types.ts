import type { DealStatusFormData } from './deal-status.types';

export interface AddDealStatusDrawerProps {
  isOpen: boolean;
  formData: DealStatusFormData;
  onChange: (values: DealStatusFormData) => void;
  onSave: () => void;
  onClose: () => void;
  isEditing: boolean;
}
