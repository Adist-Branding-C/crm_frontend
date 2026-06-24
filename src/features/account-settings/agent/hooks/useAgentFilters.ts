import type { AgentItem } from '../types/agent.types';

export function useAgentFilters(agentList: AgentItem[]) {
  return {
    filteredData: agentList,
    totalRecords: agentList.length,
  };
}
