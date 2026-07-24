/**
 * The list/pagination hook surface every task-type CRUD hook needs: clear the
 * error banner, toggle the loading flag, and refetch after a successful mutation.
 *
 * Used by:
 * - useTaskCrud (common), and each sub-module's UseXTaskCrudParams (task, call-task,
 *   campaign-task, deal-task) - previously each sub-module redeclared this identical
 *   shape under its own name (TaskPagination, CallTaskPagination, etc.).
 */
export interface TaskCrudPagination {
  setError: (msg: string) => void;
  setIsLoading: (loading: boolean) => void;
  refresh: () => void;
}
