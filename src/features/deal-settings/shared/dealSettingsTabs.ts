import { Kanban, FileText } from 'lucide-react';
import type { TabItem } from '../../../shared/types/layout';

/**
 * Tab config for the Deal Settings sub-navigation (Deal Pipelines,
 * Additional Fields). "Type" was retired (Phase 5 - Deal Type is now a
 * fixed Existing/New select on the deal form, no admin list to manage).
 * "Stage" was retired here too - stage design now lives in the per-pipeline
 * canvas builder (deal-pipeline-builder), not this flat, non-pipeline-scoped
 * list, so it points there instead of /user/deal-stages.
 *
 * Used by:
 * - DealPipelineListPage.tsx
 * - DealAdditionalFieldPage.tsx
 */
export const dealSettingsTabs: TabItem[] = [
  { id: 'deal-pipelines', title: 'Deal Pipelines', link: '/settings/deal-pipelines', icon: Kanban },
  { id: 'additional', title: 'Additional Fields', link: '/user/additional-fields-deal', icon: FileText },
];
