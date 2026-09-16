import { useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError, useFormikContext } from 'formik';
import type { FormikHelpers } from 'formik';
import { draftService } from '../../../../shared/services/draftService';
import type { PreviewSection } from '../../../../shared/components/preview/PreviewCanvas';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import { ScrollToFirstError } from '../../../../shared/components/ScrollToFirstError';
import { scrollContainerToTop } from '../../../../shared/utils/scrollToError.util';
import { PRIORITY_OPTIONS } from '../constants/priorityOptions';
import { STATUS_OPTIONS } from '../constants/statusOptions';
import { TASK_TYPE_CONFIG, TASK_TYPE_OPTIONS } from '../constants/taskTypeConfig';
import type { TaskTaskTypeKey } from '../types/taskType.types';
import { getFieldClassName } from '../utils/fieldClassName';
import type { GenericTaskFormProps, GenericTaskFormValues } from '../types/genericTaskForm.types';
import SelectSearch from '../../../../shared/components/SelectSearch';
import RepeatFieldSelector from './RepeatFieldSelector';
import { useTaskWorkflowOptions } from '../hooks/useTaskWorkflowOptions';
import { getRecurrenceLabel } from '../utils/recurrence';
import type { LabelValuePair } from '../../../../shared/types/common';

const getTaskTypeLabel = (taskType: TaskTaskTypeKey | '' | undefined): string =>
  taskType ? TASK_TYPE_CONFIG[taskType].label : '';

/**
 * Draft autosave for the ADD flow only.
 *
 * Notes:
 * - Rendered exclusively when !isEditing: in edit mode a draft is meaningless
 *   (the task already exists) and writing one would flip the page's draftId,
 *   which swaps Formik's initialValues to the draft payload and triggers a
 *   resetForm via enableReinitialize on every debounced save - collapsing dirty
 *   to false and re-disabling the Preview/Update submit button.
 */
const AutoSaveForm = ({ draftId, onDraftSaved }: { draftId?: string | null, onDraftSaved?: (id: string) => void }) => {
  const { values, dirty } = useFormikContext<any>();
  
  useEffect(() => {
    if (dirty) {
      const timeout = setTimeout(() => {
        const title = values.title ? values.title : 'Untitled Task';
        const subtitle = values.scheduledDate ? `Due ${values.scheduledDate}` : 'No due date';
        const id = draftService.saveDraft('task', values, title, subtitle, draftId || undefined);
        if (id !== draftId) {
          onDraftSaved?.(id);
        }
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [values, dirty, draftId, onDraftSaved]);

  return null;
};

interface WorkflowStageSyncProps {
  isLoading: boolean;
  defaultWorkflowId: string;
  workflowOptions: LabelValuePair[];
  loadStages: (workflowId: string) => void;
  stageOptions: LabelValuePair[];
  isLoadingStages: boolean;
}

/**
 * Orchestrates the dependent Workflow/Stage selection - applies the default
 * workflow only while the form's current workflowId is blank or no longer exists
 * in the workflow list (so an edited task keeps its own workflow), fetches the
 * selected workflow's stages whenever that workflowId changes (covering both the
 * initial default selection and manual changes), and keeps stageId pre-selected
 * to the workflow's first stage once its stages arrive.
 */
const WorkflowStageSync = ({
  isLoading,
  defaultWorkflowId,
  workflowOptions,
  loadStages,
  stageOptions,
  isLoadingStages,
}: WorkflowStageSyncProps) => {
  const { values, setValues } = useFormikContext<any>();

  useEffect(() => {
    if (isLoading || defaultWorkflowId === '') return;
    setValues((prev: any) => {
      const currentWorkflowId = prev.workflowId ? String(prev.workflowId) : '';
      const isKnownWorkflow = workflowOptions.some((o) => String(o.value) === currentWorkflowId);
      if (isKnownWorkflow) return prev;
      return { ...prev, workflowId: defaultWorkflowId, stageId: '' };
    });
  }, [isLoading, defaultWorkflowId, workflowOptions, setValues]);

  useEffect(() => {
    const workflowId = values.workflowId ? String(values.workflowId) : '';
    if (!workflowId) return;
    loadStages(workflowId);
  }, [values.workflowId, loadStages]);

  useEffect(() => {
    if (isLoadingStages || stageOptions.length === 0) return;
    setValues((prev: any) => {
      const currentStageId = prev.stageId ? String(prev.stageId) : '';
      const isKnownStage = stageOptions.some((o) => String(o.value) === currentStageId);
      if (isKnownStage) return prev;
      const firstStageId = stageOptions[0]?.value;
      if (firstStageId == null) return prev;
      return { ...prev, stageId: String(firstStageId) };
    });
  }, [isLoadingStages, stageOptions, setValues]);

  return null;
};

const GenericTaskForm = ({
  validationSchema,
  initialValues,
  onSubmit,
  isLoading,
  error,
  isEditing,
  draftId,
  onDraftSaved,
  onPreviewRequest,
  staffOptions,
  staffLoading,
  leadOptions,
  leadLoading,
  associationOptions,
  associationLoading,
  associationFieldName = 'leadId',
  associationLabel = 'Lead',
  associationPlaceholder = 'Select a lead',
  associationLoadingLabel = 'Loading leads...',
  associationEmptyMessage = 'No leads available. Please create a lead first.',
  categoryOptions,
  categoryLoading,
  hideCategory = false,
  unifiedMode = false,
  campaignOptions,
  campaignLoading,
  dealOptions,
  dealLoading,
  children,
}: GenericTaskFormProps) => {
  const staffEmpty = !staffLoading && staffOptions.length === 0;
  const resolvedAssociationOptions = associationOptions ?? leadOptions ?? [];
  const resolvedAssociationLoading = associationLoading ?? leadLoading ?? false;
  const associationEmpty = !resolvedAssociationLoading && resolvedAssociationOptions.length === 0;
  const categoryEmpty = !categoryLoading && (categoryOptions ?? []).length === 0;
  const drawerBodyRef = useRef<HTMLDivElement>(null);
  const workflowOptions = useTaskWorkflowOptions();

  const associationSetByType: Record<TaskTaskTypeKey, { options: LabelValuePair[]; loading: boolean }> = {
    GENERAL: { options: categoryOptions ?? [], loading: categoryLoading ?? false },
    CALL: { options: leadOptions ?? [], loading: leadLoading ?? false },
    CAMPAIGN: { options: campaignOptions ?? [], loading: campaignLoading ?? false },
    DEAL: { options: dealOptions ?? [], loading: dealLoading ?? false },
  };

  const handleTaskTypeChange = (e: any, helpers: any) => {
    const next = e.target.value as TaskTaskTypeKey | '';
    helpers.setFieldValue('taskType', next);
    helpers.setFieldTouched('taskType', true, false);
    if (!next) return;
    ['categoryId', 'leadId', 'campaignId', 'dealId'].forEach((field) => helpers.setFieldValue(field, ''));
  };

  useEffect(() => {
    if (error) {
      scrollContainerToTop(drawerBodyRef.current);
    }
  }, [error]);

  return (
    <div ref={drawerBodyRef}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, helpers) => {
          if (onPreviewRequest) {
            const activeType = (values.taskType as TaskTaskTypeKey | '' | undefined);
            const activeConfig = unifiedMode && activeType ? TASK_TYPE_CONFIG[activeType] : undefined;
            const previewAssociationField = activeConfig?.associationFieldName ?? associationFieldName;
            const previewAssociationLabel = activeConfig?.associationLabel ?? associationLabel;
            const previewAssociationOptions = activeConfig
              ? associationSetByType[activeType as TaskTaskTypeKey]?.options ?? []
              : resolvedAssociationOptions;

            const sections: PreviewSection[] = [
              {
                title: 'Task Info',
                fields: [
                  unifiedMode ? { label: 'Task Type', value: getTaskTypeLabel(activeType) } : null,
                  { label: 'Title', value: values.title },
                  { label: 'Description', value: values.description },
                  !hideCategory && !unifiedMode ? { label: 'Category', value: categoryOptions?.find(c => String(c.value) === String(values.categoryId))?.label || '' } : null,
                  { label: 'Workflow', value: workflowOptions.workflowOptions.find(o => String(o.value) === String(values.workflowId))?.label || '' },
                  { label: 'Stage', value: workflowOptions.stageOptions.find(o => String(o.value) === String(values.stageId))?.label || '' },
                  { label: previewAssociationLabel, value: previewAssociationOptions.find(o => String(o.value) === String(values[previewAssociationField as keyof typeof values]))?.label || '' },
                ].filter(Boolean) as any
              },
              {
                title: 'Schedule & Assignment',
                fields: [
                  { label: 'Date', value: values.scheduledDate },
                  { label: 'Time', value: values.scheduledTime },
                  { label: 'Repeat', value: getRecurrenceLabel(values.repeatType, values.repeatConfig) },
                  { label: 'Assigned To', value: staffOptions.find(s => String(s.value) === String(values.assignedTo))?.label || '' },
                  { label: 'Priority', value: values.priority },
                  { label: 'Status', value: values.status },
                ]
              }
            ];
            onPreviewRequest({ sections, payload: values as unknown as Record<string, unknown>, formValues: values as unknown as Record<string, unknown> });
            return;
          }
          await onSubmit(values as unknown as Record<string, unknown>, helpers as unknown as FormikHelpers<Record<string, unknown>>);
        }}
      >
        {(helpers) => {
          const { values, errors, touched, dirty, submitCount, isSubmitting } = helpers;
          const {
            workflowOptions: workflows,
            isLoading: workflowsLoading,
            defaultWorkflowId,
            stageOptions,
            isLoadingStages,
            loadStages,
          } = workflowOptions;
          const workflowsEmpty = !workflowsLoading && workflows.length === 0;

          const handleWorkflowChange = (e: any) => {
            const nextWorkflowId = String(e.target.value ?? '');
            if (!nextWorkflowId) return;
            helpers.setFieldValue('workflowId', nextWorkflowId);
            helpers.setFieldTouched('workflowId', true, false);
            helpers.setFieldValue('stageId', '');
          };

          const handleStageChange = (e: any) => {
            const nextStageId = String(e.target.value ?? '');
            if (!nextStageId) return;
            helpers.setFieldValue('stageId', nextStageId);
            helpers.setFieldTouched('stageId', true, false);
          };

          const fieldClass = (name: string) => getFieldClassName(
            name,
            touched as Record<string, boolean | undefined>,
            errors as Record<string, string | undefined>,
          );

          const fieldsDisabled = unifiedMode && !values.taskType;

          return (
            <Form>
              <ScrollToFirstError errors={errors} submitCount={submitCount} containerRef={drawerBodyRef} />
              {error && <ErrorMessage message={error} />}

              {unifiedMode && (
                <div className="form-group">
                  <label>Task Type <span className="text-danger">*</span></label>
                  <Field as="select" name="taskType" className={fieldClass('taskType')} onChange={(e: any) => handleTaskTypeChange(e, helpers)}>
                    {TASK_TYPE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </Field>
                  <FormikError name="taskType" component="small" className="field-error-text" />
                </div>
              )}

              <div className="form-group">
                <label>Title <span className="text-danger">*</span></label>
                <Field type="text" name="title" className={fieldClass('title')} placeholder="Enter task title" disabled={fieldsDisabled} />
                <FormikError name="title" component="small" className="field-error-text" />
              </div>

              <div className="form-group">
                <label>Description <span className="text-danger">*</span></label>
                <Field as="textarea" name="description" className={fieldClass('description')} placeholder="Enter description" rows={3} disabled={fieldsDisabled} />
                <FormikError name="description" component="small" className="field-error-text" />
              </div>

              {children}

              <div className="form-group">
                <label>Workflow</label>
                <SelectSearch
                  name="workflowId"
                  value={values.workflowId ? String(values.workflowId) : ''}
                  options={workflows}
                  onChange={handleWorkflowChange}
                  onBlur={() => helpers.setFieldTouched('workflowId', true, false)}
                  className={fieldClass('workflowId')}
                  disabled={fieldsDisabled || workflowsLoading || workflowsEmpty}
                  placeholder={workflowsLoading ? 'Loading...' : 'Select a workflow'}
                />
                {workflowsEmpty ? (
                  <small className="field-error-text">
                    No workflows available. Please create a workflow in Settings.
                  </small>
                ) : (
                  <FormikError name="workflowId" component="small" className="field-error-text" />
                )}
              </div>

              <div className="form-group">
                <label>Stage</label>
                <SelectSearch
                  name="stageId"
                  value={values.stageId ? String(values.stageId) : ''}
                  options={stageOptions}
                  onChange={handleStageChange}
                  onBlur={() => helpers.setFieldTouched('stageId', true, false)}
                  className={fieldClass('stageId')}
                  disabled={fieldsDisabled || workflowsLoading || workflowsEmpty || !values.workflowId || isLoadingStages}
                  placeholder={
                    workflowsLoading ? 'Loading...'
                    : isLoadingStages ? 'Loading stages...'
                    : !values.workflowId ? 'Select a workflow first'
                    : 'Select a stage'
                  }
                />
                {!values.workflowId && !workflowsLoading ? (
                  <small className="field-error-text">Select a workflow first</small>
                ) : values.workflowId && stageOptions.length === 0 && !isLoadingStages ? (
                  <small className="field-error-text">No stages in this workflow yet.</small>
                ) : (
                  <FormikError name="stageId" component="small" className="field-error-text" />
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Scheduled Date <span className="text-danger">*</span></label>
                  <Field type="date" name="scheduledDate" className={fieldClass('scheduledDate')} disabled={fieldsDisabled} />
                  <FormikError name="scheduledDate" component="small" className="field-error-text" />
                </div>
                <div className="form-group">
                  <label>Scheduled Time <span className="text-danger">*</span></label>
                  <Field type="time" name="scheduledTime" className={fieldClass('scheduledTime')} disabled={fieldsDisabled} />
                  <FormikError name="scheduledTime" component="small" className="field-error-text" />
                </div>
              </div>

              <RepeatFieldSelector getFieldClass={fieldClass} disabled={fieldsDisabled} />

              <div className="form-group">
                <label>Assigned To <span className="text-danger">*</span></label>
                <SelectSearch
                  name="assignedTo"
                  value={values.assignedTo}
                  options={staffOptions}
                  onChange={(e) => {
                    helpers.setFieldValue('assignedTo', e.target.value);
                    helpers.setFieldTouched('assignedTo', true, false);
                  }}
                  onBlur={() => helpers.setFieldTouched('assignedTo', true, false)}
                  className={fieldClass('assignedTo')}
                  disabled={fieldsDisabled || staffLoading || staffEmpty}
                  placeholder={staffLoading ? 'Loading staff...' : 'Select a staff member'}
                />
                {staffEmpty ? (
                  <small className="field-error-text">
                    No staff members available. Please add a staff member first.
                  </small>
                ) : (
                  <FormikError name="assignedTo" component="small" className="field-error-text" />
                )}
              </div>

              {!hideCategory && !unifiedMode && categoryOptions && (
                <div className="form-group">
                  <label>Category <span className="text-danger">*</span></label>
                  <SelectSearch
                    name="categoryId"
                    value={values.categoryId ?? ''}
                    options={categoryOptions}
                    onChange={(e) => {
                      helpers.setFieldValue('categoryId', e.target.value);
                      helpers.setFieldTouched('categoryId', true, false);
                    }}
                    onBlur={() => helpers.setFieldTouched('categoryId', true, false)}
                    className={fieldClass('categoryId')}
                    disabled={categoryLoading || categoryEmpty}
                    placeholder={categoryLoading ? 'Loading...' : 'Select a category'}
                  />
                  {categoryEmpty ? (
                    <small className="field-error-text">
                      No task categories available. Please create a category first.
                    </small>
                  ) : (
                    <FormikError name="categoryId" component="small" className="field-error-text" />
                  )}
                </div>
              )}

              {unifiedMode ? (
                values.taskType ? (
                  (() => {
                    const activeType = values.taskType as TaskTaskTypeKey;
                    const config = TASK_TYPE_CONFIG[activeType];
                    const associationSet = associationSetByType[activeType];
                    const associationEmpty = !associationSet.loading && associationSet.options.length === 0;
                    return (
                      <div className="form-group">
                        <label>{config.associationLabel} <span className="text-danger">*</span></label>
                        <SelectSearch
                          name={config.associationFieldName}
                          value={String(values[config.associationFieldName as keyof GenericTaskFormValues] ?? '')}
                          options={associationSet.options}
                          onChange={(e) => {
                            helpers.setFieldValue(config.associationFieldName, e.target.value);
                            helpers.setFieldTouched(config.associationFieldName, true, false);
                          }}
                          onBlur={() => helpers.setFieldTouched(config.associationFieldName, true, false)}
                          className={fieldClass(config.associationFieldName)}
                          disabled={associationSet.loading || associationEmpty}
                          placeholder={associationSet.loading ? config.associationLoadingLabel : config.associationPlaceholder}
                        />
                        {associationEmpty ? (
                          <small className="field-error-text">{config.associationEmptyMessage}</small>
                        ) : (
                          <FormikError name={config.associationFieldName} component="small" className="field-error-text" />
                        )}
                      </div>
                    );
                  })()
                ) : null
              ) : (
                <div className="form-group">
                  <label>{associationLabel} <span className="text-danger">*</span></label>
                  <SelectSearch
                    name={associationFieldName}
                    value={String(values[associationFieldName as keyof GenericTaskFormValues] ?? '')}
                    options={resolvedAssociationOptions}
                    onChange={(e) => {
                      helpers.setFieldValue(associationFieldName, e.target.value);
                      helpers.setFieldTouched(associationFieldName, true, false);
                    }}
                    onBlur={() => helpers.setFieldTouched(associationFieldName, true, false)}
                    className={fieldClass(associationFieldName)}
                    disabled={resolvedAssociationLoading || associationEmpty}
                    placeholder={resolvedAssociationLoading ? associationLoadingLabel : associationPlaceholder}
                  />
                  {associationEmpty ? (
                    <small className="field-error-text">{associationEmptyMessage}</small>
                  ) : (
                    <FormikError name={associationFieldName} component="small" className="field-error-text" />
                  )}
                </div>
              )}

              <div className="form-group">
                <label>Priority <span className="text-danger">*</span></label>
                <Field as="select" name="priority" className={fieldClass('priority')} disabled={fieldsDisabled}>
                  <option value="">Select priority</option>
                  {PRIORITY_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </Field>
                <FormikError name="priority" component="small" className="field-error-text" />
              </div>

              <div className="form-group">
                <label>Status <span className="text-danger">*</span></label>
                <Field as="select" name="status" className={fieldClass('status')} disabled={fieldsDisabled}>
                  <option value="">Select status</option>
                  {STATUS_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </Field>
                <FormikError name="status" component="small" className="field-error-text" />
              </div>

              <WorkflowStageSync
                isLoading={workflowsLoading}
                defaultWorkflowId={defaultWorkflowId}
                workflowOptions={workflows}
                loadStages={loadStages}
                stageOptions={stageOptions}
                isLoadingStages={isLoadingStages}
              />

              {!isEditing && (
                <AutoSaveForm draftId={draftId ?? null} {...(onDraftSaved ? { onDraftSaved } : {})} />
              )}

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={isLoading || isSubmitting || (isEditing && !dirty)}>
                  {isLoading || isSubmitting ? <Loader2 size={16} className="spin" /> : onPreviewRequest ? 'Preview Task' : (isEditing ? 'Update' : 'Save')}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default GenericTaskForm;