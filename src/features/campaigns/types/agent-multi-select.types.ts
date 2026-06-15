import type { Agent } from './campaign.types';

export interface AgentMultiSelectProps {
  agents: Agent[];
  selected: string[];
  onChange: (selected: string[]) => void;
  isLoading?: boolean;
}
