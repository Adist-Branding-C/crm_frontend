import { configureStore } from '@reduxjs/toolkit';
import { taskApi } from '../features/task/common/services/taskApi';

/**
 * The app's Redux store. Each module has its own piece of state here.
 *
 * How to add another module (example: Lead):
 *
 * 1. Create the module's API file, copying taskApi.ts:
 *      features/enquiries/services/leadApi.ts
 *        export const leadApi = createApi({
 *          reducerPath: 'leadApi',
 *          baseQuery: axiosBaseQuery,
 *          tagTypes: ['Lead'],
 *          endpoints: (build) => ({ ... }),
 *        });
 *
 * 2. Register it in THIS file, in three places:
 *      - reducer:         [leadApi.reducerPath]: leadApi.reducer,
 *      - middleware:      .concat(taskApi.middleware, leadApi.middleware)
 *      - clearAllApiData: store.dispatch(leadApi.util.resetApiState());
 */
export const store = configureStore({
  reducer: {
    // Task module's cached API data (tasks table, kanban board, recurrence history).
    [taskApi.reducerPath]: taskApi.reducer,
  },
  // Each module's middleware is needed for its caching, refetching and invalidation.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    taskApi.middleware,
  ),
  // Redux DevTools only in development.
  devTools: import.meta.env.DEV,
});

/**
 * Clears every module's cached API data. Called on login and logout so the next
 * user never sees the previous user's data.
 */
export function clearAllApiData() {
  store.dispatch(taskApi.util.resetApiState());
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
