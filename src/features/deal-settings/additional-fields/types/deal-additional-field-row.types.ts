import type { DealAdditionalField } from './interface';

export interface DealAdditionalFieldRowProps {
  item: DealAdditionalField;
  index: number;
  dropdownOpen: string | null;
  onToggleDropdown: (id: string | null) => void;
  onEdit: (item: DealAdditionalField) => void;
  onDelete: (item: DealAdditionalField) => void;
}
