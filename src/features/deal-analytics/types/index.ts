export interface ForecastByPipeline {
  pipelineId: number;
  pipelineName: string;
  openCount: number;
  openAmount: string;
  weightedAmount: string;
}

export interface ForecastData {
  openAmount: number;
  weightedAmount: number;
  openCount: number;
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

export interface OwnerLeaderboardRow {
  agentId: number;
  agentName: string;
  totalDeals: number;
  wonDeals: number;
  lostDeals: number;
  totalAmount: string;
  wonAmount: string;
  winRate: number;
}

export type AnalyticsPeriod = 'today' | 'week' | 'month' | 'custom';
