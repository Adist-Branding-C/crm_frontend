import type { CustomPipelineFormData, PipelineEntityType } from '../types/interface';
import type { FieldErrorMap, FieldErrorFallback } from '../../../shared/types/formFieldError.types';

/**
 * Blank Formik initial state for CustomPipelineForm's "add" mode.
 *
 * Used by:
 * - CustomPipelinePage (useEditDrawer, seeds the drawer in add mode)
 */
export const EMPTY_CUSTOM_PIPELINE_FORM_DATA: CustomPipelineFormData = {
  name: '',
  entityType: 'lead',
  groupByField: 'status',
  isActive: true,
};

/**
 * Toolbar button label for opening the add-custom-pipeline drawer.
 *
 * Used by:
 * - CustomPipelinePage
 */
export const ADD_CUSTOM_PIPELINE_LABEL = 'Add Pipeline';

/**
 * Table column headers for the custom pipelines table.
 *
 * Used by:
 * - CustomPipelinePage
 */
export const CUSTOM_PIPELINE_COLUMN_NAME = 'Name';
export const CUSTOM_PIPELINE_COLUMN_ENTITY_TYPE = 'Applies To';
export const CUSTOM_PIPELINE_COLUMN_GROUP_BY = 'Group By';
export const CUSTOM_PIPELINE_COLUMN_STATUS = 'Status';

/**
 * Entity-type options for CustomPipelineForm's "Applies To" select.
 * Mirrors the backend's PipelineEntity enum (crm_backend/src/pipeline/entities/pipeline.entity.ts).
 *
 * Used by:
 * - CustomPipelineForm
 */
export const PIPELINE_ENTITY_TYPE_OPTIONS: { value: PipelineEntityType; label: string }[] = [
  { value: 'lead', label: 'Lead' },
  { value: 'deal', label: 'Deal' },
  { value: 'task', label: 'Task' },
];

/**
 * Allow-listed columns a custom pipeline can group by, for CustomPipelineForm's
 * "Group By" select. Mirrors the backend's own allow-list exactly
 * (crm_backend/src/pipeline/custom-pipeline/dto/custom-pipeline.dto.ts,
 * ALLOWED_GROUP_BY_FIELDS) so the form never offers a value the backend would reject.
 *
 * Used by:
 * - CustomPipelineForm
 */
export const GROUP_BY_FIELD_OPTIONS: { value: string; label: string }[] = [
  { value: 'status', label: 'Status' },
  { value: 'status_id', label: 'Status ID' },
  { value: 'priority', label: 'Priority' },
  { value: 'type', label: 'Type' },
  { value: 'agent_id', label: 'Agent' },
  { value: 'assigned_to', label: 'Assigned To' },
];

/**
 * Maps backend custom-pipeline field names to frontend Formik field names.
 *
 * Used by:
 * - useCustomPipelineCrud (create/update error handling, via shared applyFieldErrors)
 */
export const CUSTOM_PIPELINE_FIELD_MAP: FieldErrorMap = {
  name: 'name',
  entityType: 'entityType',
  groupByField: 'groupByField',
};

/**
 * Keyword -> field fallback used when the backend returns a plain message with no
 * field-scoped errors. Order matters; first match wins.
 *
 * Used by:
 * - useCustomPipelineCrud (create/update error handling, via shared applyFieldErrors)
 */
export const CUSTOM_PIPELINE_FIELD_ERROR_FALLBACKS: FieldErrorFallback[] = [
  { keyword: 'name', field: 'name' },
  { keyword: 'group', field: 'groupByField' },
];
