import type { DealAdditionalField } from './interface';

export interface DealAdditionalFieldRowProps {
  item: DealAdditionalField;
  index: number;
  isMenuOpen: boolean;
  onToggleMenu: (open: boolean) => void;
  onEdit: (item: DealAdditionalField) => void;
  onDelete: (item: DealAdditionalField) => void;
}
