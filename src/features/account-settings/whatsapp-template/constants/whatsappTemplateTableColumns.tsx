import { SettingsStatusBadge } from '../../../../shared/components/settings';
import type { Column } from '../../../../shared/types/crud';
import type { WhatsappTemplateItem } from '../types/whatsapp-template.types';

// Cap on how much of a template's message body shows in the table cell before it's truncated with an ellipsis.
const MESSAGE_TRUNCATE_LENGTH = 80;

const truncate = (text: string | undefined | null, maxLength: number): string => {
  if (!text) return '-';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

// Static column config for WhatsappTemplatePage's SettingsTableLayout — has no dependency on props/state, so it lives outside the component (check #8).
export const WHATSAPP_TEMPLATE_TABLE_COLUMNS: Column<WhatsappTemplateItem>[] = [
  { key: 'templateName', label: 'Template Name', render: (item) => item.templateName || item.name || '-' },
  { key: 'message', label: 'Message', render: (item) => truncate(item.message || item.content, MESSAGE_TRUNCATE_LENGTH) },
  { key: 'status', label: 'Status', render: (item) => <SettingsStatusBadge status={item.status} /> },
];
