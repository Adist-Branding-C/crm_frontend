import type {
  CustomPipelineFormData,
  PipelineEntityType,
} from '../types/interface';
import type {
  FieldErrorMap,
  FieldErrorFallback,
} from '../../../shared/types/formFieldError.types';


export const EMPTY_CUSTOM_PIPELINE_FORM_DATA: CustomPipelineFormData = {
  name: '',
  entityType: 'lead',
  groupByField: 'status',
  isActive: true,
};


export const ADD_CUSTOM_PIPELINE_LABEL = 'Add Pipeline';


export const CUSTOM_PIPELINE_COLUMN_NAME = 'Name';
export const CUSTOM_PIPELINE_COLUMN_ENTITY_TYPE = 'Applies To';
export const CUSTOM_PIPELINE_COLUMN_GROUP_BY = 'Group By';
export const CUSTOM_PIPELINE_COLUMN_STATUS = 'Status';


export const PIPELINE_ENTITY_TYPE_OPTIONS: {
  value: PipelineEntityType;
  label: string;
}[] = [
  { value: 'lead', label: 'Lead' },
  { value: 'deal', label: 'Deal' },
  { value: 'task', label: 'Task' },
];


export const GROUP_BY_FIELD_OPTIONS: { value: string; label: string }[] = [
  { value: 'status', label: 'Status' },
  { value: 'status_id', label: 'Status ID' },
  { value: 'priority', label: 'Priority' },
  { value: 'type', label: 'Type' },
  { value: 'agent_id', label: 'Agent' },
  { value: 'assigned_to', label: 'Assigned To' },
];


export const CUSTOM_PIPELINE_FIELD_MAP: FieldErrorMap = {
  name: 'name',
  entityType: 'entityType',
  groupByField: 'groupByField',
};


export const CUSTOM_PIPELINE_FIELD_ERROR_FALLBACKS: FieldErrorFallback[] = [
  { keyword: 'name', field: 'name' },
  { keyword: 'group', field: 'groupByField' },
];
