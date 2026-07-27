import type { TaskCategoryItem } from '../types/interface';
import type { TaskCategoryRawItem } from '../types/response';

/**
 * Maps a raw task-category API item onto the frontend's TaskCategoryItem shape.
 *
 * Used by:
 * - useFetchTaskCategories
 *
 * Notes:
 * - The backend has sent the category field under either `category` or `taskCategory`
 *   historically; this mapper is the one place that fallback lives.
 */
export class TaskCategoryMapper {
  static toEntity(raw: TaskCategoryRawItem): TaskCategoryItem {
    return {
      id: raw.id,
      category: raw.category || raw.taskCategory || '',
      status: raw.status || '',
      createdBy: raw.createdBy,
      createdByName: raw.createdByName,
    };
  }
}
