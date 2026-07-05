export interface ParsedApiError {
  message: string;
  errors?: Record<string, string[]>;
  field?: string;
  statusCode?: number;
}
