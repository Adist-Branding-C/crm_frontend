import type { DealTypeItem } from './deal-type.types';

export interface DealTypeActionMenuProps {
  item: DealTypeItem;
  dropdownOpen: number | null;
  onToggle: (key: number | null) => void;
  onEdit: (item: DealTypeItem) => void;
  onDelete: (item: DealTypeItem) => void;
}
