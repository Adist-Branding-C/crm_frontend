export type PipelineEntityType = 'lead' | 'deal' | 'task';

export interface CustomPipelineItem {
  id: string;
  name: string;
  entityType: PipelineEntityType;
  groupByField: string;
  isActive: boolean;
}

export interface CustomPipelineApiItem {
  id: string;
  name: string;
  entityType: PipelineEntityType;
  groupByField: string;
  isActive: boolean;
}

export interface CustomPipelineFormData {
  name: string;
  entityType: PipelineEntityType;
  groupByField: string;
  isActive: boolean;
}
