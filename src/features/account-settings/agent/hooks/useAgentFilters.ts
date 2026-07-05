import type { AgentItem } from '../types';

export function useAgentFilters(agentList: AgentItem[]) {
  return {
    filteredData: agentList,
    totalRecords: agentList.length,
  };
}
