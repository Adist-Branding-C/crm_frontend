import type { WhatsappTemplateItem } from './whatsapp-template.types';

export interface WhatsappTemplateActionMenuProps {
  item: WhatsappTemplateItem;
  dropdownOpen: number | null;
  onToggleDropdown: (id: number | null) => void;
  onEdit: (item: WhatsappTemplateItem) => void;
  onDelete: (item: WhatsappTemplateItem) => void;
}
