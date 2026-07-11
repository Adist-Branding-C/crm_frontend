import type { CustomPipelineItem, CustomPipelineApiItem, CustomPipelineFormData } from '../types/interface';

export function mapApiToUI(item: CustomPipelineApiItem): CustomPipelineItem {
  return {
    id: item.id,
    name: item.name,
    entityType: item.entityType,
    groupByField: item.groupByField,
    isActive: item.isActive,
  };
}

export function mapItemToFormData(item: CustomPipelineItem): CustomPipelineFormData {
  return {
    name: item.name,
    entityType: item.entityType,
    groupByField: item.groupByField,
    isActive: item.isActive,
  };
}
