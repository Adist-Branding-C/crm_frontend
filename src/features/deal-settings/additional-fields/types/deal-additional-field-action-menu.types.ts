import type { DealAdditionalField } from './deal-additional-field.types';

export interface DealAdditionalFieldActionMenuProps {
  item: DealAdditionalField;
  dropdownOpen: string | null;
  onToggle: (key: string | null) => void;
  dropdownDirection: 'down' | 'up';
  onDirectionChange: (dir: 'down' | 'up') => void;
  onEdit: (item: DealAdditionalField) => void;
  onDelete: (item: DealAdditionalField) => void;
}
