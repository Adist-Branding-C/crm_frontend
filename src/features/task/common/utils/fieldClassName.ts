export const getFieldClassName = (
  name: string,
  touched: Record<string, boolean | undefined>,
  errors: Record<string, string | undefined>,
): string => `form-control${touched[name] && errors[name] ? ' input-error' : ''}`;
