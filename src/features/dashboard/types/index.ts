export interface PipelineDataItem {
  name: string;
  value: number;
  displayValue: string;
  color: string;
}

export interface CustomLabelProps {
  x?: number;
  y?: number;
  width?: number;
  value?: number;
  index?: number;
}

export interface StatCardProps {
  title: string;
  value: string;
  isLoading?: boolean;
}

export interface KpiCardProps {
  title: string;
  value: string;
  isPrimary?: boolean;
  isHighlight?: boolean;
  isLoading?: boolean;
}

export type DashboardPeriod = 'today' | 'week' | 'month' | 'custom';

export interface GetWonDealsParams {
  period: DashboardPeriod;
  from?: string;
  to?: string;
}

export interface WonDealsResponseData {
  count: number;
}

export interface GetLostDealsParams {
  period: DashboardPeriod;
  from?: string;
  to?: string;
}

export interface LostDealsResponseData {
  count: number;
}

export interface GetInProgressDealsParams {
  period: DashboardPeriod;
  from?: string;
  to?: string;
}

export interface InProgressDealsResponseData {
  count: number;
}

export interface GetDealStatisticsParams {
  period: DashboardPeriod;
  from?: string;
  to?: string;
}

// Confirmed shape of GET /deals/statistics/status - `data` is a flat array
// (not wrapped in `items`), keyed by status name, with `count` as a string.
export interface DealStatisticsItem {
  status: string;
  count: string;
}

export type DealStatisticsResponseData = DealStatisticsItem[];

export interface GetDealByStageParams {
  period: DashboardPeriod;
  from?: string;
  to?: string;
}

// Assumed shape of GET /deals/statistics/stage, parallel to the confirmed
// /deals/statistics/status shape - flat array of { stage, count } strings.
// Verify against the backend and adjust field names if they differ.
export interface DealByStageItem {
  stage: string;
  count: string;
}

export type DealByStageResponseData = DealByStageItem[];

export interface DealStageCount {
  stage: string;
  count: number;
  color: string;
}

export interface GetTasksStatisticsParams {
  period: DashboardPeriod;
  from?: string;
  to?: string;
}

export interface TasksStatisticsResponseData {
  total: number;
  pending: number;
  overdue: number;
  completed: number;
}

export interface GetActivitiesStatisticsParams {
  period: DashboardPeriod;
  from?: string;
  to?: string;
}

export interface ActivityTypeCount {
  activityType: string;
  count: number;
}

export interface ActivityEntityCount {
  entityType: string;
  count: number;
}

export interface ActivityTimelinePoint {
  date: string;
  count: number;
}

export interface ActivitiesStatisticsResponseData {
  byType: ActivityTypeCount[];
  byEntity: ActivityEntityCount[];
  timeline: ActivityTimelinePoint[];
}

export interface GetCampaignsStatisticsParams {
  period: DashboardPeriod;
  from?: string;
  to?: string;
}

export interface CampaignStatusCount {
  status: string;
  count: number;
}

export interface CampaignTypeCount {
  type: string;
  count: number;
}

export interface CampaignLeadProgress {
  totalLeads: number;
  completedLeads: number;
  completedPercent: number;
}

export interface CampaignsStatisticsResponseData {
  byStatus: CampaignStatusCount[];
  byType: CampaignTypeCount[];
  leadProgress: CampaignLeadProgress;
}

export interface CampaignsWidgetProps {
  period: DashboardPeriod;
  from?: string;
  to?: string;
}

export interface ActivitiesWidgetProps {
  period: DashboardPeriod;
  from?: string;
  to?: string;
}

export interface GetLeadStatusStatisticsParams {
  period: DashboardPeriod;
  fromDate?: string;
  toDate?: string;
}

export interface LeadStatusCountItem {
  statusId: string;
  status: string;
  count: number;
}

export interface LeadStatusStatisticsResponseData {
  leadsByStatus: LeadStatusCountItem[];
}

export interface LeadStatusWidgetProps {
  period: DashboardPeriod;
  from?: string;
  to?: string;
}

export interface GetLeadSourceStatisticsParams {
  period: DashboardPeriod;
  fromDate?: string;
  toDate?: string;
}

export interface LeadSourceCountItem {
  sourceId: string;
  source: string;
  count: number;
}

export interface LeadSourceStatisticsResponseData {
  leadsBySource: LeadSourceCountItem[];
}

export interface LeadSourceWidgetProps {
  period: DashboardPeriod;
  from?: string;
  to?: string;
}

export interface GetLeadPurposeStatisticsParams {
  period: DashboardPeriod;
  fromDate?: string;
  toDate?: string;
}

export interface LeadPurposeCountItem {
  purposeId: string;
  purpose: string;
  count: number;
}

export interface LeadPurposeStatisticsResponseData {
  leadsByPurpose: LeadPurposeCountItem[];
}

export interface LeadPurposeWidgetProps {
  period: DashboardPeriod;
  from?: string;
  to?: string;
}

// GET /statistics/lead - fromDate/toDate naming matches the sibling Lead
// statistics endpoints (status/source/purpose), not the from/to naming the
// Deals/Tasks/Activities/Campaigns endpoints use.
export interface GetLeadOverviewStatisticsParams {
  period: DashboardPeriod;
  fromDate?: string;
  toDate?: string;
  timezoneOffsetMinutes?: number;
}

export interface LeadOverviewTypeCount {
  typeId: string;
  type: string;
  count: number;
}

export interface LeadOverviewStatisticsResponseData {
  totalLeads: number;
  todayLeads: number;
  leadsThisWeek: number;
  leadsThisMonth: number;
  myLeads: number;
  conversionRate: number;
  leadsByType: LeadOverviewTypeCount[];
}

export interface GetLeadDashboardStatisticsParams {
  period: DashboardPeriod;
  fromDate?: string;
  toDate?: string;
  timezoneOffsetMinutes?: number;
}

export interface LeadDashboardStatisticsResponseData {
  overview: LeadOverviewStatisticsResponseData;
  leadsByStatus: LeadStatusCountItem[];
  leadsBySource: LeadSourceCountItem[];
  leadsByPurpose: LeadPurposeCountItem[];
}

// GET /deals/statistics/pipeline - period/from/to naming matches the other
// Deals statistics endpoints (status/stage).
export interface GetPipelineAmountParams {
  period: DashboardPeriod;
  from?: string;
  to?: string;
}

// GET /followup/leads - only the pagination total is used, for the "Today's
// Followups" KPI card. `limit=1` is passed to avoid fetching the lead rows.
export interface GetFollowupCountParams {
  limit: number;
}

export interface FollowupCountResponseData {
  items: unknown[];
  pagination: {
    total: number;
  };
}

// GET /call-logs - only the pagination total is used, for the "Outbound
// Calls Today" KPI card. `limit=1` is passed to avoid fetching the log rows.
// period/fromDate/toDate mirror the /statistics/lead naming convention.
export interface GetCallLogsCountParams {
  limit: number;
  period?: DashboardPeriod;
  fromDate?: string;
  toDate?: string;
}

export interface CallLogsCountResponseData {
  items: unknown[];
  pagination: {
    total: number;
  };
}

// Flat array, one row per active deal status, with the summed deal amount
// for that status.
export interface PipelineAmountItem {
  statusId: number;
  statusName: string;
  dealStage: string;
  count: number;
  totalAmount: string;
}

export type PipelineAmountResponseData = PipelineAmountItem[];
