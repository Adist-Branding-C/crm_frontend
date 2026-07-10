import type { ParsedApiError } from '../types/hook';

export function parseApiError(err: unknown): ParsedApiError {
  if (err && typeof err === 'object' && 'response' in err) {
    const axiosErr = err as { response?: { data?: { errors?: Record<string, string[]>; message?: string; field?: string } } };
    const data = axiosErr.response?.data;
    return {
      message: data?.message || 'Network error. Please try again.',
      ...(data?.errors ? { errors: data.errors } : {}),
      ...(data?.field ? { field: data.field } : {}),
    };
  }

  if (err && typeof err === 'object' && 'message' in err) {
    return { message: (err as { message: string }).message };
  }

  return { message: 'Network error. Please try again.' };
}
