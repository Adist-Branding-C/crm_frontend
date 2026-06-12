import type { DealStatusItem } from './deal-status.types';

export interface DealStatusActionMenuProps {
  item: DealStatusItem;
  dropdownOpen: number | null;
  onToggle: (key: number | null) => void;
  onEdit: (item: DealStatusItem) => void;
  onDelete: (item: DealStatusItem) => void;
}
