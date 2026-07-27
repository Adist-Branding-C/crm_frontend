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
}
