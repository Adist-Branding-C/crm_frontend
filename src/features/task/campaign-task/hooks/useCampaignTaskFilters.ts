import type { CampaignTaskItem } from '../types/campaignTask.types';

export function useCampaignTaskFilters(campaignTaskList: CampaignTaskItem[]) {
  return {
    filteredData: campaignTaskList,
    totalRecords: campaignTaskList.length,
  };
}
