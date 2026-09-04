import { CHART_PALETTE, CHART_PALETTE_DEFAULT } from '../../../shared/constants/chartPalette';

// These have no backing API yet: no company-agnostic "qualified" status and
// no closed-vs-pipeline flag on lead_statuses - see
// COMPLETE_FEATURE_AND_RELATED_MODULE_INVESTIGATION_REPORT.md.
export const DASHBOARD_KPI_CARDS_HARDCODED = [
  { title: 'Qualified Leads', value: '8', isPrimary: true },
];

export const PIPELINE_LEADS_HARDCODED = { title: 'Pipeline Leads', value: '45', isPrimary: true };

/**
 * Segment colors for the Campaigns widget's "by status" pie chart.
 *
 * Used by: CampaignsWidget (components/widgets/CampaignsWidget.tsx).
 *
 * Notes:
 * - Cycled by index via getColorForIndex (shared/utils/chartUtils.ts), one
 *   color per campaign status entry returned by the statistics API.
 */
export const CAMPAIGN_STATUS_COLOR_PALETTE = CHART_PALETTE;
export const DEFAULT_CAMPAIGN_STATUS_COLOR = CHART_PALETTE_DEFAULT;

/**
 * Activity-type key used to identify logged calls in the activities-by-type
 * statistics response.
 *
 * Used by: DashboardPage (pages/DashboardPage.tsx), to derive the
 * "Calls Today" KPI card value from today's activities statistics.
 */
export const CALL_LOGGED_ACTIVITY_TYPE = 'CALL_LOGGED';

/**
 * Lead-type name used to identify "hot" leads in the lead-overview
 * statistics response.
 *
 * Used by: DashboardPage (pages/DashboardPage.tsx), to derive the
 * "Hot Leads" KPI card value from the lead overview statistics.
 */
export const HOT_LEAD_TYPE_NAME = 'Hot';
