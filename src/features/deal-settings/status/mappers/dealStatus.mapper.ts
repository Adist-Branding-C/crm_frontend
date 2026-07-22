import { buildQueryParams } from '../../../../shared/utils/queryParams.util';
import type { DealStatusFormData, DealStatusQueryParams } from '../types/request';
import type { ApiDealStatusItem, DealStatusItem } from '../types/interface';
import type { DealStatusListResponse } from '../types/response';

const STAGE_DISPLAY: Record<string, string> = {
  WIN: 'Win',
  LOSE: 'Lose',
  IN_PROGRESS: 'In Progress',
};

const STAGE_BACKEND: Record<string, string> = {
  Win: 'WIN',
  Lose: 'LOSE',
  'In Progress': 'IN_PROGRESS',
};

/**
 * Query/entity/list-result mapping for deal-settings/status.
 *
 * Used by:
 * - dealStatus.service.ts (toQueryParams, toApiPayload)
 * - DealStatusPage.tsx (toEntity, toListResult, via the page's useTableData fetchFn)
 * - useDealStatusDrawer.ts (toFormData, via mapItemToFormData)
 *
 * Notes:
 * - The API returns/accepts name, stage, and status fields directly.
 * - The API stores status as boolean and stage as uppercase enum (WIN/LOSE/IN_PROGRESS).
 * - Form dropdowns use display labels (Win/Lose/In Progress for stage).
 * - Status is boolean end-to-end: API returns boolean, form stores boolean, mapper passes it through.
 * - This mapper owns all value-format conversions between the API and UI layers.
 */
export class DealStatusMapper {
  static toQueryParams(params: DealStatusQueryParams): string {
    return buildQueryParams(params as unknown as Record<string, string | number | undefined>);
  }

  static toEntity(raw: ApiDealStatusItem): DealStatusItem {
    return {
      id: raw.id,
      name: raw.name,
      stage: raw.stage,
      status: raw.status,
    };
  }

  static toFormData(item: DealStatusItem): DealStatusFormData {
    return {
      name: item.name,
      stage: STAGE_DISPLAY[item.stage] || item.stage,
      status: Boolean(item.status),
    };
  }

  static toApiPayload(data: DealStatusFormData): { name: string; stage: string; status: boolean } {
    return {
      name: data.name,
      stage: STAGE_BACKEND[data.stage] || data.stage,
      status: String(data.status) === 'true',
    };
  }

  static toListResult(response: DealStatusListResponse): { items: DealStatusItem[]; total: number } {
    const rawItems = response.data?.items ?? [];
    const items = rawItems.map(DealStatusMapper.toEntity);
    return { items, total: response.data?.pagination?.total ?? items.length };
  }
}
