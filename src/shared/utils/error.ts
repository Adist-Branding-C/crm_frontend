export const getErrorMessage = (
  error: unknown,
  fallback: string,
): string => {
  return (
    (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
    (error instanceof Error ? error.message : fallback)
  );
};
