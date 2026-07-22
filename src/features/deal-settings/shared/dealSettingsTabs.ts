import { Tag, Layers, FileText } from 'lucide-react';
import type { TabItem } from '../../../shared/types/layout';

/**
 * Tab config for the Deal Settings sub-navigation (Type, Status, Additional Fields).
 *
 * Used by:
 * - DealStatusPage.tsx
 * - DealTypePage.tsx
 * - DealAdditionalFieldPage.tsx
 */
export const dealSettingsTabs: TabItem[] = [
  { id: 'type', title: 'Type', link: '/user/deal-types', icon: Tag },
  { id: 'status', title: 'Status', link: '/user/deal-stages', icon: Layers },
  { id: 'additional', title: 'Additional Fields', link: '/user/additional-fields-deal', icon: FileText },
];
