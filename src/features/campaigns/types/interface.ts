export interface CreatedByInfo {
  id: number | null;
  agentId: string | null;
  name: string | null;
}

export type CreatedByDisplay = CreatedByInfo | string;

export interface Campaign {
  id: number;
  slNo: number;
  name: string;
  type: string;
  totalTasks: number;
  completedTasks: number;
  completedPercent: number;
  createdBy: CreatedByDisplay;
  createdAt: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  poolName?: string;
  poolAgents?: PoolAgentInfo[];
  agents?: string[];
}

export interface PoolAgentInfo {
  id: number;
  agentId: string;
  name: string;
}

export interface Agent {
  id: string;
  name: string;
  designation?: string;
  email?: string;
}
