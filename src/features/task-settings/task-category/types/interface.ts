export interface TaskCategoryItem {
  id: number;
  category: string;
  status: string;
  createdBy?: string | null | undefined;
  createdByName?: string | null | undefined;
}
