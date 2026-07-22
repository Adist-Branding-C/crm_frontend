const extractMessage = (error: unknown): string | undefined => {
  const data = (error as { response?: { data?: { message?: unknown } } })?.response?.data;
  if (!data) return undefined;

  const msg = data.message;

  if (Array.isArray(msg)) {
    return msg.join('\n');
  }

  if (typeof msg === 'string') {
    return msg;
  }

  return undefined;
};

export const getErrorMessage = (
  error: unknown,
  fallback: string,
): string => {
  return extractMessage(error) || (error instanceof Error ? error.message : fallback);
};
