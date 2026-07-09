export interface ServiceResponseInput<T> {
  status: boolean | number;
  message: string;
  data?: T | undefined;
}
