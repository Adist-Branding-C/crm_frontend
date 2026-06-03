import type { SortDirection } from '../constants/enums/sortDirection';

export interface SortConfig {
  key: string | null;
  direction: SortDirection;
}
