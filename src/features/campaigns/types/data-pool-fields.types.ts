import type { Agent } from './campaign.types';

export interface DataPoolFieldsProps {
  poolName: string;
  poolAgents: string[];
  filterBy: string;
  sortBy: string;
  errors: Record<string, string>;
  agents: Agent[];
  isLoadingAgents: boolean;
  onChange: (name: string, value: string) => void;
  onAgentChange: (selected: string[]) => void;
}
