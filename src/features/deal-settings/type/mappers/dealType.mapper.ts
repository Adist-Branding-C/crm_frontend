import { buildQueryParams } from '../../../../shared/utils/queryParams.util';
import type { DealTypeQueryParams } from '../types/request';
import type { ApiDealTypeItem, DealTypeItem } from '../types/interface';
import type { DealTypeListResponse } from '../types/response';

/**
 * Query/entity/list-result mapping for deal-settings/type.
 *
 * Used by:
 * - dealType.service.ts (toQueryParams)
 * - DealTypePage.tsx (toEntity, toListResult, via the page's useTableData fetchFn)
 *
 * Notes:
 * - The API returns each row's display name under `dealType`; toEntity is the one place
 *   that reconciles that with the UI-facing `name` field.
 */
export class DealTypeMapper {
  static toQueryParams(params: DealTypeQueryParams): string {
    return buildQueryParams(params as unknown as Record<string, string | number | undefined>);
  }

  static toEntity(raw: ApiDealTypeItem): DealTypeItem {
    return {
      id: raw.id,
      name: raw.dealType || raw.name || '',
      status: raw.status,
    };
  }

  static toListResult(response: DealTypeListResponse): { items: DealTypeItem[]; total: number } {
    const rawItems = response.data?.items ?? [];
    const items = rawItems.map(DealTypeMapper.toEntity);
    return { items, total: response.data?.pagination?.total ?? items.length };
  }
}
