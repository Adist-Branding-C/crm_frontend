export interface ForecastByPipeline {
  pipelineId: number;
  pipelineName: string;
  currency: string;
  openCount: number;
  openAmount: string;
  weightedAmount: string;
}

export interface ForecastCurrencyTotal {
  currency: string;
  openAmount: number;
  weightedAmount: number;
  openCount: number;
}

export interface ForecastData {
  /** Distinct currencies present across open deals, for the widget's toggle. */
  currencies: string[];
  /** Per-currency roll-up - amounts are never summed across currencies. */
  byCurrency: ForecastCurrencyTotal[];
  byPipeline: ForecastByPipeline[];
}

export interface WinRateData {
  winRate: number;
  total: number;
  won: number;
}

export interface StageFunnelStage {
  stageId: number;
  stageName: string;
  outcome: 'OPEN' | 'WON' | 'LOST';
  probability: number;
  sortOrder: number;
  count: number;
  amount: string;
}

export interface StageFunnelData {
  pipelineId: number;
  stages: StageFunnelStage[];
}

export type AnalyticsPeriod = 'today' | 'week' | 'month' | 'custom';



export type ReportPeriod = 'this_month' | 'next_month' | 'this_quarter' | 'next_quarter' | 'custom';

export interface UnscheduledDealsSummary {
  currency: string;
  count: number;
  amount: string;
}

export interface ForecastByPeriodData {
  period: ReportPeriod;
  from: string;
  to: string;
  currencies: string[];
  byCurrency: ForecastCurrencyTotal[];
  byPipeline: ForecastByPipeline[];
  unscheduled: UnscheduledDealsSummary[];
}

export interface VelocityStage {
  stageId: number;
  stageName: string;
  sortOrder: number;
  avgDurationSeconds: number;
  occupancyCount: number;
}

export interface VelocityCycleTime {
  outcome: 'WON' | 'LOST';
  avgCycleSeconds: number;
  dealCount: number;
}

export interface VelocityData {
  stages: VelocityStage[];
  cycleTime: VelocityCycleTime[];
}

export interface WinLossReasonRow {
  reason: string;
  count: number;
  amount: string;
  percentOfLost: number;
}

export interface WinLossOutcomeSummary {
  count: number;
  amount: string;
  percentOfTotal: number;
}

export interface WinLossReasonsData {
  won: WinLossOutcomeSummary;
  lost: WinLossOutcomeSummary;
  lostReasons: WinLossReasonRow[];
}

export interface SourceConversionRow {
  sourceId: string | null;
  sourceName: string;
  total: number;
  won: number;
  lost: number;
  totalAmount: string;
  wonAmount: string;
  conversionRate: number;
  avgDealValue: number;
}

export interface AgingDealItem {
  id: number;
  dealName: string;
  amount: string;
  currency: string;
  closeDate: string | null;
  agentId: number | null;
  agentName: string | null;
  stageId: number;
  stageName: string;
  stageEnteredAt: string;
  daysInCurrentStage: number;
  daysUntilOrPastCloseDate: number | null;
}

export interface AgingDealsData {
  items: AgingDealItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_previous: boolean;
  };
}

export interface AgingDealsFilters {
  noActivityDays?: number | undefined;
  inStageDays?: number | undefined;
  closeDateExceeded?: boolean | undefined;
  pipelineId?: number | undefined;
  agentId?: number | undefined;
  pageNumber?: number | undefined;
  limit?: number | undefined;
}

export interface SizeDistributionTier {
  tier: 'SMALL' | 'MEDIUM' | 'ENTERPRISE';
  count: number;
  wonCount: number;
  totalAmount: string;
  wonAmount: string;
  avgAmount: string;
  percentOfTotal: number;
  winRate: number;
}

export interface SizeDistributionData {
  currency: string;
  tiers: SizeDistributionTier[];
}

export interface OwnerLeaderboardRow {
  agentId: number;
  agentName: string;
  totalDeals: number;
  wonDeals: number;
  lostDeals: number;
  totalAmount: string;
  wonAmount: string;
  winRate: number;
  avgSalesCycleSeconds: number | null;
}



export interface DeletedDealsData {
  items: import('../../deal/types/response').DealApiItem[];
  pagination: PaginationMeta;
}

export interface DeletedDealsFilters {
  dateFrom?: string | undefined;
  dateTo?: string | undefined;
  dateFilterBy?: string | undefined;
  statusId?: string | undefined;
  type?: string | undefined;
  deletedBy?: string | undefined;
  agentId?: number | undefined;
  sourceId?: string | undefined;
  search?: string | undefined;
  pageNumber?: number | undefined;
  limit?: number | undefined;
}

export type DealExportStatus = 'pending' | 'processing' | 'success' | 'failed';

export interface DealExportHistoryItem {
  exportId: string;
  exportType?: 'deal';
  fileName: string;
  totalRows: number;
  status: DealExportStatus;
  attemptCount?: number;
  lastError?: string | null;
  completedAt: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface DealExportHistoryData {
  items: DealExportHistoryItem[];
  pagination: PaginationMeta;
}

export interface DealExportHistoryFilters {
  search?: string | undefined;
  pageNumber?: number | undefined;
  limit?: number | undefined;
}



export interface CreateDealExportPayload {
  columns: string[];
  fileName?: string | undefined;
  search?: string | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
  dateFilterBy?: string | undefined;
  pipelineId?: string | undefined;
  statusId?: string | undefined;
  type?: string | undefined;
  assignedTo?: string | undefined;
}

export interface CreateDealExportResult {
  exportId: string;
  totalRows: number;
  status: DealExportStatus;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}
