/**
 * The list/pagination hook surface every task-type CRUD hook needs: clear the
 * error banner, toggle the loading flag, and refetch after a successful mutation.
 *
 * Used by:
 * - useTaskCrud (common) - previously each sub-module redeclared this identical
 *   shape under its own name (TaskPagination, CallTaskPagination, etc.).
 */
export interface TaskCrudPagination {
  setError: (msg: string) => void;
  setIsLoading: (loading: boolean) => void;
  refresh: () => void;
}
