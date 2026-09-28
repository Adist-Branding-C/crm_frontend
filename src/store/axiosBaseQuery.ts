import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import axiosInstance from '../api/axiosInstance';

/** What every endpoint's `query` returns: which URL to call and with what. */
interface RequestArgs {
  url: string;
  method?: AxiosRequestConfig['method'];
  data?: unknown;
  params?: object;
}

/**
 * Error shape returned when a request fails. It mirrors an axios error
 * (`error.response.data.message`), so the app's existing helpers such as
 * getErrorMessage and useSubmitErrorHandler read it without any changes.
 */
export interface ApiError {
  status: number | 'FETCH_ERROR';
  response: {
    status: number | 'FETCH_ERROR';
    data: { message?: string; field?: string; errors?: Record<string, string[]> };
  };
}

/**
 * Sends every RTK Query request through the app's existing axiosInstance,
 * so the login token is attached and expired tokens are refreshed exactly
 * like the old services did. (RTK's own fetchBaseQuery would skip that.)
 *
 * Every module's API uses this as its `baseQuery`, e.g.
 *   createApi({ reducerPath: 'taskApi', baseQuery: axiosBaseQuery, ... })
 */
export const axiosBaseQuery: BaseQueryFn<RequestArgs, unknown, ApiError> = async ({ url, method = 'GET', data, params }) => {
  try {
    const response = await axiosInstance.request({ url, method, data, params });
    return { data: response.data };
  } catch (err) {
    const axiosError = err as AxiosError;

    if (axiosError.response) {
      // The server answered with an error (400, 403, 404, 500...).
      const body = axiosError.response.data;
      const errorData = body && typeof body === 'object' ? body : {};
      return { error: { status: axiosError.response.status, response: { status: axiosError.response.status, data: errorData } } };
    }

    // No answer at all (network down, timeout).
    return { error: { status: 'FETCH_ERROR', response: { status: 'FETCH_ERROR', data: { message: axiosError.message } } } };
  }
};
