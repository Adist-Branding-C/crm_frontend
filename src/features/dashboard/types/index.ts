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
}

export interface KpiCardProps {
  title: string;
  value: string;
  isPrimary?: boolean;
  isHighlight?: boolean;
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
