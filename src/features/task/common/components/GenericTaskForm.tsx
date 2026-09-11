import { useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError, useFormikContext } from 'formik';
import { draftService } from '../../../../shared/services/draftService';
import type { PreviewSection } from '../../../../shared/components/preview/PreviewCanvas';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import { ScrollToFirstError } from '../../../../shared/components/ScrollToFirstError';
import { scrollContainerToTop } from '../../../../shared/utils/scrollToError.util';
import { PRIORITY_OPTIONS } from '../constants/priorityOptions';
import { STATUS_OPTIONS } from '../constants/statusOptions';
import { getFieldClassName } from '../utils/fieldClassName';
import type { GenericTaskFormProps } from '../types/genericTaskForm.types';
import SelectSearch from '../../../../shared/components/SelectSearch';
import RepeatFieldSelector from './RepeatFieldSelector';
import { useTaskWorkflowOptions } from '../hooks/useTaskWorkflowOptions';
import { getRecurrenceLabel } from '../utils/recurrence';
import type { LabelValuePair } from '../../../../shared/types/common';

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
  children,
}: GenericTaskFormProps) => {
  const staffEmpty = !staffLoading && staffOptions.length === 0;
  const resolvedAssociationOptions = associationOptions ?? leadOptions ?? [];
  const resolvedAssociationLoading = associationLoading ?? leadLoading ?? false;
  const associationEmpty = !resolvedAssociationLoading && resolvedAssociationOptions.length === 0;
  const categoryEmpty = !categoryLoading && (categoryOptions ?? []).length === 0;
  const drawerBodyRef = useRef<HTMLDivElement>(null);
  const workflowOptions = useTaskWorkflowOptions();

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
            const sections: PreviewSection[] = [
              {
                title: 'Task Info',
                fields: [
                  { label: 'Title', value: values.title },
                  { label: 'Description', value: values.description },
                  !hideCategory ? { label: 'Category', value: categoryOptions?.find(c => String(c.value) === String(values.categoryId))?.label || '' } : null,
                  { label: 'Workflow', value: workflowOptions.workflowOptions.find(o => String(o.value) === String(values.workflowId))?.label || '' },
                  { label: 'Stage', value: workflowOptions.stageOptions.find(o => String(o.value) === String(values.stageId))?.label || '' },
                  { label: associationLabel, value: resolvedAssociationOptions.find(o => String(o.value) === String(values[associationFieldName]))?.label || '' },
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
            onPreviewRequest({ sections, payload: values, formValues: values });
            return;
          }
          await onSubmit(values, helpers);
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

          return (
            <Form>
              <ScrollToFirstError errors={errors} submitCount={submitCount} containerRef={drawerBodyRef} />
              {error && <ErrorMessage message={error} />}

              <div className="form-group">
                <label>Title <span className="text-danger">*</span></label>
                <Field type="text" name="title" className={fieldClass('title')} placeholder="Enter task title" />
                <FormikError name="title" component="small" className="field-error-text" />
              </div>

              <div className="form-group">
                <label>Description <span className="text-danger">*</span></label>
                <Field as="textarea" name="description" className={fieldClass('description')} placeholder="Enter description" rows={3} />
                <FormikError name="description" component="small" className="field-error-text" />
              </div>

              {!hideCategory && categoryOptions && (
                <div className="form-group">
                  <label>Category <span className="text-danger">*</span></label>
                  <SelectSearch
                    name="categoryId"
                    value={values.categoryId}
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
                  disabled={workflowsLoading || workflowsEmpty}
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
                  disabled={workflowsLoading || workflowsEmpty || !values.workflowId || isLoadingStages}
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
                  <Field type="date" name="scheduledDate" className={fieldClass('scheduledDate')} />
                  <FormikError name="scheduledDate" component="small" className="field-error-text" />
                </div>
                <div className="form-group">
                  <label>Scheduled Time <span className="text-danger">*</span></label>
                  <Field type="time" name="scheduledTime" className={fieldClass('scheduledTime')} />
                  <FormikError name="scheduledTime" component="small" className="field-error-text" />
                </div>
              </div>

              <RepeatFieldSelector getFieldClass={fieldClass} />

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
                  disabled={staffLoading || staffEmpty}
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

              <div className="form-group">
                <label>{associationLabel} <span className="text-danger">*</span></label>
                <SelectSearch
                  name={associationFieldName}
                  value={values[associationFieldName]}
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

              <div className="form-group">
                <label>Priority <span className="text-danger">*</span></label>
                <Field as="select" name="priority" className={fieldClass('priority')}>
                  <option value="">Select priority</option>
                  {PRIORITY_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </Field>
                <FormikError name="priority" component="small" className="field-error-text" />
              </div>

              <div className="form-group">
                <label>Status <span className="text-danger">*</span></label>
                <Field as="select" name="status" className={fieldClass('status')}>
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

              <AutoSaveForm draftId={draftId} onDraftSaved={onDraftSaved} />

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