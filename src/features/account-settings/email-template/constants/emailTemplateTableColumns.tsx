import { SettingsStatusBadge } from '../../../../shared/components/settings';
import type { Column } from '../../../../shared/types/crud';
import type { EmailTemplateItem } from '../types/emailTemplate.types';

// Static column config for EmailTemplatePage's SettingsTableLayout — has no dependency on props/state, so it lives outside the component (check #8).
export const EMAIL_TEMPLATE_TABLE_COLUMNS: Column<EmailTemplateItem>[] = [
  { key: 'title', label: 'Template Name', render: (item) => item.title || item.templateName || '-' },
  { key: 'subject', label: 'Subject', render: (item) => item.subject || '-' },
  {
    key: 'htmlContent',
    label: 'Content',
    render: (item) => {
      const content = item.htmlContent || item.content || '';
      return content.length > 50 ? content.substring(0, 50) + '...' : content || '-';
    },
  },
  { key: 'status', label: 'Status', render: (item) => <SettingsStatusBadge status={item.status} /> },
];
