import type { LeadStatusItem } from './interface';

export interface LeadStatusRowProps {
  item: LeadStatusItem;
  index: number;
  isMenuOpen: boolean;
  onToggleMenu: (open: boolean) => void;
  onEdit: (item: LeadStatusItem) => void;
  onDelete: (item: LeadStatusItem) => void;
}
