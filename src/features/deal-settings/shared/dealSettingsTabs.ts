import { Tag, Layers, FileText } from 'lucide-react';
import type { TabItem } from '../../../shared/types/layout';

export const dealSettingsTabs: TabItem[] = [
  { id: 'type', title: 'Type', link: '/user/deal-types', icon: Tag },
  { id: 'status', title: 'Status', link: '/user/deal-stages', icon: Layers },
  { id: 'additional', title: 'Additional Fields', link: '/user/additional-fields-deal', icon: FileText },
];
