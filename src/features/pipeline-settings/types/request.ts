import type { PipelineEntityType } from './interface';

export interface CreateCustomPipelinePayload {
  name: string;
  entityType: PipelineEntityType;
  groupByField: string;
}

export interface UpdateCustomPipelinePayload {
  name?: string;
  groupByField?: string;
  isActive?: boolean;
}
