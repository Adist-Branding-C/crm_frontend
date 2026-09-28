import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../../../store/axiosBaseQuery';
import type { ApiResponse } from '../../../../shared/types/common';
import { ListResponseMapper } from '../../../../shared/mappers/list-response.mapper';
import { TASK_API_ENDPOINTS } from '../../task/constants/taskApiEndpoints';
import type { RecurrenceChainItem } from '../../task/types';
import { TaskKanbanMapper } from '../../kanban/mappers/taskKanban.mapper';
import type { TaskKanbanResponse, TaskKanbanStage } from '../../kanban/types/kanban.types';
import { UnifiedTaskMapper } from '../mapper/unifiedTaskMapper';
import { buildKanbanTaskQuery, buildUnifiedTaskListQuery } from '../utils/taskViewFilters';
import type { UnifiedTaskItem, UnifiedTaskPayload } from '../types/unifiedTask.types';

/** What the Tasks table passes to getTasks. */
export interface TaskListArgs {
  pageNumber: number;
  limit: number;
  taskType?: string | undefined; // 'ALL' or empty means "no filter"
  search?: string | undefined;
}

/** What the Kanban board passes to getTaskKanban. */
export interface TaskKanbanArgs {
  workflowId: string;
  taskType?: string | undefined;
  search?: string | undefined;
}

/**
 * Task API (Redux Toolkit - RTK Query).
 *
 * What is this file?
 *   Every call the Task module makes to the backend's /tasks API lives here.
 *   RTK Query calls the API for us and keeps the answer in Redux (the "cache"),
 *   so screens share it instead of each one fetching and storing its own copy.
 *
 * Two kinds of endpoints:
 *   build.query     -> READS data (GET).                 Hook name: useXxxQuery
 *   build.mutation  -> CHANGES data (POST/PATCH/DELETE). Hook name: useXxxMutation
 *
 * The parts of an endpoint:
 *   build.query<RESULT, ARGS>({ ... })
 *     RESULT             = what the screen receives (after transformResponse)
 *     ARGS               = what the screen passes in (page number, id, ...)
 *     query              = which URL to call, with which method / params / body
 *     transformResponse  = reshape the backend's answer before storing it
 *     providesTags       = a label on the stored data ("this is Task data")
 *     invalidatesTags    = "Task data is now old" -> every screen showing
 *                          Task data fetches it again automatically
 *
 * Why the 'Task' tag matters:
 *   Example: you add a task while the Kanban board is open.
 *   createTask invalidates 'Task' -> getTaskKanban provides 'Task'
 *   -> the board refetches by itself. No manual "refresh" code anywhere.
 *   (We refetch instead of editing the stored data ourselves because the backend
 *   doesn't send the updated task back, and completing a recurring task creates
 *   a brand-new task on the server.)
 *
 * Where is it connected?
 *   src/store/store.ts registers this file's reducer and middleware.
 */
export const taskApi = createApi({
  // Name of the Task module's data inside the Redux store (state.taskApi).
  reducerPath: 'taskApi',

  // How requests are sent: through the app's axiosInstance, so the login
  // token is attached and expired tokens are refreshed (see axiosBaseQuery.ts).
  baseQuery: axiosBaseQuery,

  // Every label (tag) this module uses. We only need one.
  tagTypes: ['Task'],

  endpoints: (build) => ({
    // READS (queries)

    // GET /tasks - rows for the Tasks table.
    // Used by: useTaskList -> TaskPage (table view)
    getTasks: build.query<{ items: UnifiedTaskItem[]; total: number }, TaskListArgs>({
      query: ({ pageNumber, limit, taskType, search }) => ({
        url: TASK_API_ENDPOINTS.GET_ALL,
        params: buildUnifiedTaskListQuery({ taskType, search }, pageNumber, limit),
      }),
      // Backend sends { data: { items, pagination: { total } } } -> we keep { items, total }.
      transformResponse: (response: ApiResponse<UnifiedTaskItem[]>) => ListResponseMapper.toPagedResult(response),
      providesTags: ['Task'],
    }),

    // GET /tasks/:id - full details of one task, loaded when the edit drawer opens.
    // Used by: useUnifiedTaskDrawer
    // No providesTags: it's fetched fresh each time the drawer opens.
    getTaskById: build.query<UnifiedTaskItem | null, number>({
      query: (id) => ({ url: TASK_API_ENDPOINTS.GET_BY_ID(id) }),
      transformResponse: (response: ApiResponse<UnifiedTaskItem>) => response.data ?? null,
    }),

    // GET /tasks/:id/recurrence-chain - "Recurrence History" list in the edit drawer.
    // Used by: RecurrenceHistoryList
    getRecurrenceChain: build.query<RecurrenceChainItem[], number>({
      query: (id) => ({ url: TASK_API_ENDPOINTS.RECURRENCE_CHAIN(id) }),
      transformResponse: (response: ApiResponse<RecurrenceChainItem[]>) => ListResponseMapper.toPagedResult(response).items,
      providesTags: ['Task'],
    }),

    // GET /tasks/kanban - the Kanban board (first page of cards in every column).
    // Used by: useTaskKanban (board) and useTaskStageCounts (workflow canvas counts)
    getTaskKanban: build.query<TaskKanbanStage[], TaskKanbanArgs>({
      query: ({ workflowId, taskType, search }) => ({
        url: TASK_API_ENDPOINTS.KANBAN,
        params: buildKanbanTaskQuery({ taskType, search }, workflowId),
      }),
      // Backend sends { data: { stages: [...] } } -> we keep the list of columns.
      transformResponse: (response: TaskKanbanResponse) => TaskKanbanMapper.toStages(response?.data?.stages),
      providesTags: ['Task'],
    }),

    // GET /tasks/kanban?pageNumber=N - the next page of cards for a column's "load more".
    // Used by: useTaskKanban.loadMore, which adds the new cards to the board above.
    getTaskKanbanPage: build.query<TaskKanbanStage[], TaskKanbanArgs & { pageNumber: number; limit: number }>({
      query: ({ workflowId, taskType, search, pageNumber, limit }) => ({
        url: TASK_API_ENDPOINTS.KANBAN,
        params: { ...buildKanbanTaskQuery({ taskType, search }, workflowId), pageNumber, limit },
      }),
      transformResponse: (response: TaskKanbanResponse) => TaskKanbanMapper.toStages(response?.data?.stages),
    }),

    // CHANGES (mutations)
    // Each one says invalidatesTags: ['Task'], so after it succeeds every task
    // screen that is open (table, board, history) reloads by itself.

    // POST /tasks - "Add Task" drawer.
    // Used by: useTaskMutationService -> useTaskCrud -> TaskPage
    createTask: build.mutation<ApiResponse<{ id: number }>, UnifiedTaskPayload>({
      query: (values) => ({
        url: TASK_API_ENDPOINTS.CREATE,
        method: 'POST',
        // Removes empty fields and converts ids to numbers before sending.
        data: UnifiedTaskMapper.toRequestPayload(values),
      }),
      invalidatesTags: ['Task'],
    }),

    // PATCH /tasks/:id - "Edit Task" drawer save.
    // Used by: useTaskMutationService -> useTaskCrud -> TaskPage
    updateTask: build.mutation<ApiResponse<null>, { id: number; values: UnifiedTaskPayload }>({
      query: ({ id, values }) => ({
        url: TASK_API_ENDPOINTS.UPDATE(id),
        method: 'PATCH',
        data: UnifiedTaskMapper.toRequestPayload(values),
      }),
      invalidatesTags: ['Task'],
    }),

    // PATCH /tasks/:id - editing one cell directly in the table (e.g. Assigned To, Status).
    // Used by: TaskPage.handleFieldSave. The value comes straight from a dropdown,
    // so it's sent as-is.
    updateTaskFields: build.mutation<ApiResponse<null>, { id: number; payload: Partial<UnifiedTaskPayload> }>({
      query: ({ id, payload }) => ({
        url: TASK_API_ENDPOINTS.UPDATE(id),
        method: 'PATCH',
        data: payload,
      }),
      invalidatesTags: ['Task'],
    }),

    // DELETE /tasks/:id - delete confirmation modal.
    // Used by: useTaskMutationService -> useTaskCrud -> TaskPage
    deleteTask: build.mutation<ApiResponse<null>, number>({
      query: (id) => ({ url: TASK_API_ENDPOINTS.DELETE(id), method: 'DELETE' }),
      invalidatesTags: ['Task'],
    }),

    // PATCH /tasks/:id/stage - dragging a card to another Kanban column.
    // Used by: useTaskKanban.handleDragEnd
    // No invalidatesTags on purpose: useTaskKanban already moved the card on
    // screen, and reloading the board would throw away "load more" pages.
    moveTaskStage: build.mutation<ApiResponse<null>, { taskId: number; stageId: string }>({
      query: ({ taskId, stageId }) => ({
        url: TASK_API_ENDPOINTS.MOVE_STAGE(taskId),
        method: 'PATCH',
        data: { stageId },
      }),
    }),
  }),
});

/**
 * RTK Query creates a React hook for every endpoint above, named after it:
 *   getTasks      -> useGetTasksQuery        (runs automatically when the screen shows)
 *   getTaskById   -> useLazyGetTaskByIdQuery (runs only when you call it, e.g. on "Edit" click)
 *   createTask    -> useCreateTaskMutation   (returns a function you call on "Save")
 */
export const {
  useGetTasksQuery,
  useLazyGetTaskByIdQuery,
  useGetRecurrenceChainQuery,
  useGetTaskKanbanQuery,
  useLazyGetTaskKanbanPageQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useUpdateTaskFieldsMutation,
  useDeleteTaskMutation,
  useMoveTaskStageMutation,
} = taskApi;
