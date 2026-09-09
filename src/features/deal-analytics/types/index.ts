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
