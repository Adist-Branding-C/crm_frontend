import type { DealAdditionalField } from './interface';

export interface DeleteDealAdditionalFieldModalProps {
  deletingItem: DealAdditionalField;
  onConfirm: () => void;
  onClose: () => void;
}
