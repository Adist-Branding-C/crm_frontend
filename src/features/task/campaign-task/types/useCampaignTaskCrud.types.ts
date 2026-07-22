export interface CampaignTaskPagination {
  setError: (msg: string) => void;
  setIsLoading: (loading: boolean) => void;
  refresh: () => void;
}

export interface UseCampaignTaskCrudParams {
  pagination: CampaignTaskPagination;
  showToastMessage: (msg: string, type: 'success' | 'error') => void;
}
