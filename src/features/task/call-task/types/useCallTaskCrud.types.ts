export interface CallTaskPagination {
  setError: (msg: string) => void;
  setIsLoading: (loading: boolean) => void;
  refresh: () => void;
}

export interface UseCallTaskCrudParams {
  pagination: CallTaskPagination;
  showToastMessage: (msg: string, type: 'success' | 'error') => void;
}
