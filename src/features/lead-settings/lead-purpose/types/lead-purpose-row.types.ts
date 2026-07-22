import type { LeadPurposeItem } from './interface';

export interface LeadPurposeRowProps {
  item: LeadPurposeItem;
  index: number;
  isMenuOpen: boolean;
  onToggleMenu: (open: boolean) => void;
  onEdit: (item: LeadPurposeItem) => void;
  onDelete: (item: LeadPurposeItem) => void;
}
