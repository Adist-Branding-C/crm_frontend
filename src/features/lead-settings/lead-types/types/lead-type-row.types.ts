import type { LeadTypeItem } from './interface';

export interface LeadTypeRowProps {
  item: LeadTypeItem;
  index: number;
  isMenuOpen: boolean;
  onToggleMenu: (open: boolean) => void;
  onEdit: (item: LeadTypeItem) => void;
  onDelete: (item: LeadTypeItem) => void;
}
