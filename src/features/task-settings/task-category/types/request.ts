export interface TaskCategoryFormData {
  category: string;
  action: string;
}

export interface FetchTaskCategoriesParams {
  pageNumber: number;
  limit: number;
  search?: string;
  [key: string]: unknown;
}
