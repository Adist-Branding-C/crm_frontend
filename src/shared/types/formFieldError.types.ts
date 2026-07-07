export type FieldErrorMap = Record<string, string>;

export interface FieldErrorFallback {
  keyword: string;
  field: string;
}
