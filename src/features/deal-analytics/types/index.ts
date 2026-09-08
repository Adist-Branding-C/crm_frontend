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
