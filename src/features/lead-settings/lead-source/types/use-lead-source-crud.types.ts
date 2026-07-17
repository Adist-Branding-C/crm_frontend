export interface UseLeadSourceCrudParams {
  table: {
    setError: (message: string) => void;
    setIsLoading: (value: boolean) => void;
    setPageNumber: (page: number) => void;
    refresh: () => void;
  };
}
