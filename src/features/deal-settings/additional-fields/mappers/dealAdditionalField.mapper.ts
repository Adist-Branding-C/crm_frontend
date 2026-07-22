import { buildQueryParams } from '../../../../shared/utils/queryParams.util';
import { formatAddedBy } from '../../../../shared/utils/addedBy.util';
import { normalizeFieldType, denormalizeFieldType } from '../utils/fieldType';
import type { DealAdditionalFieldFormData, DealAdditionalFieldPayload, DealAdditionalFieldQueryParams } from '../types/request';
import type { ApiDealAdditionalField, DealAdditionalField } from '../types/interface';
import type { DealAdditionalFieldListResponse } from '../types/response';

export class DealAdditionalFieldMapper {
  static toQueryParams(params: DealAdditionalFieldQueryParams): string {
    return buildQueryParams(params as unknown as Record<string, string | number | undefined>);
  }

  static toEntity(raw: ApiDealAdditionalField): DealAdditionalField {
    return {
      id: raw.fieldId,
      addedBy: formatAddedBy(raw.createdByName, raw.createdByType),
      field: raw.fieldName,
      type: raw.fieldType,
      inFilter: raw.showInFilter,
      inList: raw.showInList,
      required: raw.isRequired,
      dropdownValues: raw.values || [],
    };
  }

  static toRequest(formData: DealAdditionalFieldFormData): DealAdditionalFieldPayload {
    return {
      fieldName: formData.fieldName,
      fieldType: normalizeFieldType(formData.fieldType),
      isRequired: formData.required,
      showInList: formData.inList,
      showInFilter: formData.inFilter,
      values: formData.dropdownValues,
    };
  }

  static toFormData(item: DealAdditionalField): DealAdditionalFieldFormData {
    return {
      fieldName: item.field,
      fieldType: denormalizeFieldType(item.type),
      inFilter: item.inFilter,
      inList: item.inList,
      required: item.required,
      dropdownValues: item.dropdownValues ? [...item.dropdownValues] : [],
      currentDropdownValue: '',
    };
  }

  static toListResult(response: DealAdditionalFieldListResponse): { items: DealAdditionalField[]; total: number } {
    const rawItems = response.data?.items ?? [];
    const items = rawItems.map(DealAdditionalFieldMapper.toEntity);
    return { items, total: response.data?.pagination?.total ?? items.length };
  }
}
