import { buildQueryParams } from '../../../../shared/utils/queryParams.util';
import type { DealAdditionalFieldFormData, DealAdditionalFieldPayload, DealAdditionalFieldQueryParams } from '../types/request';
import type { ApiDealAdditionalField, DealAdditionalField } from '../types/interface';
import type { DealAdditionalFieldListResponse } from '../types/response';

/**
 * Query/entity/request/list-result mapping for deal-settings/additional-fields.
 *
 * Used by:
 * - dealAdditionalField.service.ts (toQueryParams)
 * - useDealAdditionalFieldCrud.ts (toRequest)
 * - useDealAdditionalFieldDrawer.ts (toFormData, via the shared useEditDrawer)
 * - DealAdditionalFieldPage.tsx (toEntity, toListResult, via the page's useTableData fetchFn)
 *
 * Notes:
 * - The API's field/checkbox names (fieldName/fieldType/isRequired/showInList/showInFilter)
 *   differ from the UI's (field/type/required/inList/inFilter); toEntity and toRequest are the
 *   two places that reconcile that in each direction.
 */
export class DealAdditionalFieldMapper {
  static toQueryParams(params: DealAdditionalFieldQueryParams): string {
    return buildQueryParams(params as unknown as Record<string, string | number | undefined>);
  }

  static toEntity(raw: ApiDealAdditionalField): DealAdditionalField {
    return {
      id: raw.id,
      field: raw.fieldName,
      type: raw.fieldType,
      inFilter: raw.showInFilter,
      inList: raw.showInList,
      required: raw.isRequired,
    };
  }

  static toRequest(formData: DealAdditionalFieldFormData): DealAdditionalFieldPayload {
    return {
      fieldName: formData.fieldName,
      fieldType: formData.fieldType,
      isRequired: formData.required,
      showInList: formData.inList,
      showInFilter: formData.inFilter,
    };
  }

  static toFormData(item: DealAdditionalField): DealAdditionalFieldFormData {
    return {
      fieldName: item.field,
      fieldType: item.type,
      inFilter: item.inFilter,
      inList: item.inList,
      required: item.required,
    };
  }

  static toListResult(response: DealAdditionalFieldListResponse): { items: DealAdditionalField[]; total: number } {
    const rawItems = response.data?.items ?? [];
    const items = rawItems.map(DealAdditionalFieldMapper.toEntity);
    return { items, total: response.data?.pagination?.total ?? items.length };
  }
}
