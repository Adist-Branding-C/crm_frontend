import { Layers, FileText } from 'lucide-react';
import type { TabItem } from '../../../shared/types/layout';

/**
 * Tab config for the Deal Settings sub-navigation (Stage, Additional Fields).
 * "Type" was retired (Phase 5 - Deal Type is now a fixed Existing/New
 * select on the deal form, no admin list to manage).
 *
 * Used by:
 * - DealStatusPage.tsx
 * - DealAdditionalFieldPage.tsx
 */
export const dealSettingsTabs: TabItem[] = [
  { id: 'status', title: 'Stage', link: '/user/deal-stages', icon: Layers },
  { id: 'additional', title: 'Additional Fields', link: '/user/additional-fields-deal', icon: FileText },
];
