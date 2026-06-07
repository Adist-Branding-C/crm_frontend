import type { EmailTemplateItem } from './emailTemplate.types';

export interface EmailTemplateActionMenuProps {
  item: EmailTemplateItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: EmailTemplateItem) => void;
  onDelete: (item: EmailTemplateItem) => void;
}
