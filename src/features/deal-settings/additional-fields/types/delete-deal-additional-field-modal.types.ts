import type { DealAdditionalField } from './deal-additional-field.types';

export interface DeleteDealAdditionalFieldModalProps {
  deletingItem: DealAdditionalField;
  onConfirm: () => void;
  onClose: () => void;
}
