import type { CheckoutNoteItem } from './checkoutNote.types';

export interface CheckoutNoteActionMenuProps {
  item: CheckoutNoteItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: CheckoutNoteItem) => void;
  onDelete: (item: CheckoutNoteItem) => void;
}
