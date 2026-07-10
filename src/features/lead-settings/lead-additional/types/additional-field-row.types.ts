import type { LeadAdditionalItem } from './interface';

export interface AdditionalFieldRowProps {
  item: LeadAdditionalItem;
  index: number;
  isMenuOpen: boolean;
  onToggleMenu: (open: boolean) => void;
  onEdit: (item: LeadAdditionalItem) => void;
  onDelete: (item: LeadAdditionalItem) => void;
}
