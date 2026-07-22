export interface DealTaskPagination {
  setError: (msg: string) => void;
  setIsLoading: (loading: boolean) => void;
  refresh: () => void;
}

export interface UseDealTaskCrudParams {
  pagination: DealTaskPagination;
  showToastMessage: (msg: string, type: 'success' | 'error') => void;
}
