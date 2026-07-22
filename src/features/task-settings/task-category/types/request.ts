export interface TaskCategoryFormData {
  category: string;
  status: string;
}

export interface FetchTaskCategoriesParams {
  pageNumber: number;
  limit: number;
  search?: string;
}
