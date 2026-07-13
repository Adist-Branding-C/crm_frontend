import type { LeadSourceItem } from './interface';

export interface LeadSourceRowProps {
  item: LeadSourceItem;
  index: number;
  isMenuOpen: boolean;
  onToggleMenu: (open: boolean) => void;
  onEdit: (item: LeadSourceItem) => void;
  onDelete: (item: LeadSourceItem) => void;
}
