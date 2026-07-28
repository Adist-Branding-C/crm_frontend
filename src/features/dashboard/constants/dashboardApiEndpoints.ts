/**
 * Dashboard feature API endpoint paths.
 *
 * Used by:
 * - DashboardService (getWonDeals, getLostDeals, getInProgressDeals, getDealStatistics,
 *   getDealByStage, getTasksStatistics).
 */
export enum DASHBOARD_API_ENDPOINTS {
  WON_DEALS = '/deals/won',
  LOST_DEALS = '/deals/lost',
  IN_PROGRESS_DEALS = '/deals/in-progress',
  // Per-status deal counts for the Deal Pipeline chart, accepts the same period
  // (and from/to for custom) params as the other deal endpoints. Response `data`
  // is a flat array of { status, count } - see DealStatisticsItem.
  DEALS_STATISTICS = '/deals/statistics/status',
  // Per-stage deal counts for the Deal by stage card, accepts the same period
  // (and from/to for custom) params as WON_DEALS/LOST_DEALS/IN_PROGRESS_DEALS.
  DEAL_BY_STAGE = '/deals/statistics/stage',
  // Task totals for the Tasks card, accepts the same period (and from/to for
  // custom) params as the deal endpoints. Response `data` is { total, pending,
  // overdue, completed } - see TasksStatisticsResponseData.
  TASKS_STATISTICS = '/tasks/statistics',
  // Activity counts by type/entity plus a daily timeline, for the Activities
  // statistics widget. Same period/from/to params as the deal endpoints.
  ACTIVITIES_STATISTICS = '/activities/statistics',
  // Campaign counts by status/type plus lead-progress totals, for the
  // Campaigns widget. Same period/from/to params as the deal endpoints.
  CAMPAIGNS_STATISTICS = '/campaigns/statistics',
  // Lead counts by status/source/purpose, for the LeadStatusWidget/
  // LeadSourceWidget/LeadPurposeWidget. Accepts period + fromDate/toDate for
  // custom (this module's query DTO predates the from/to naming the other
  // dashboard endpoints use - see GetLeadStatusStatisticsParams etc.).
  LEAD_STATUS_STATISTICS = '/statistics/status',
  LEAD_SOURCE_STATISTICS = '/statistics/source',
  LEAD_PURPOSE_STATISTICS = '/statistics/purpose',
  // Company-wide lead overview snapshot (today/week/month/total counts, "my
  // leads", and conversion rate) for the top KPI cards. Not period-selector
  // driven - the backend always computes today/week/month/total together.
  LEAD_OVERVIEW_STATISTICS = '/statistics/lead',
  // Per-status deal counts + summed amount for the pipeline amount KPI card.
  // Response `data` is a flat array of { statusId, statusName, dealStage,
  // count, totalAmount } - see PipelineAmountItem.
  DEALS_PIPELINE_AMOUNT = '/deals/statistics/pipeline',
  // Leads whose next_follow_up_date is due (<= now) - the same endpoint the
  // "Followup Required" page uses. For the "Today's Followups" KPI card we
  // only read `data.pagination.total`, so `limit=1` keeps the payload tiny.
  FOLLOWUP_LEADS = '/followup/leads',
  // Logged calls (call_logs table) - the same source the call-logging feature
  // writes to. For the "Outbound Calls Today" KPI card we only read
  // `data.pagination.total`, so `limit=1` keeps the payload tiny.
  CALL_LOGS = '/call-logs',
}
