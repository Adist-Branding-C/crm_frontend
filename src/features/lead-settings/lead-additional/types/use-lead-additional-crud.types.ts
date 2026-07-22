export interface UseLeadAdditionalCrudParams {
  table: {
    setPageNumber: (page: number) => void;
    refresh: () => void;
  };
}
