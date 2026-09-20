import { Loader2, Trash2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import type { FormikHelpers } from 'formik';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import { ACTION_SAVE, ACTION_UPDATE, ACTION_CANCEL } from '../../../../shared/constants/actionLabels';
import { stageValidationSchema } from '../validations/index';
import type { TaskStageFormData } from '../types/request';
import type { TaskWorkflowStage } from '../types/interface';

interface StageFormDrawerProps {
  editingItem: TaskWorkflowStage | null;
  initialValues: TaskStageFormData;
  otherCompletedStageName?: string | null;
  onSubmit: (values: TaskStageFormData, helpers: FormikHelpers<TaskStageFormData>) => Promise<void | boolean>;
  onDelete?: (item: TaskWorkflowStage) => void;
  error: string;
  onCancel: () => void;
}

function StageFormDrawer({ editingItem, initialValues, otherCompletedStageName, onSubmit, onDelete, error, onCancel }: StageFormDrawerProps) {
  const isEditing = !!editingItem;

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={stageValidationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, dirty, values, setFieldValue, isSubmitting }) => {
        const fieldClass = (name: keyof TaskStageFormData) =>
          `form-control${touched[name] && errors[name] ? ' input-error' : ''}`;

        const completedStageWarning =
          !!otherCompletedStageName &&
          values.isCompletedStage &&
          !(editingItem && editingItem.isCompletedStage);

        return (
          <Form>
            {error && <ErrorMessage message={error} />}

            <div className="form-group">
              <label>Name <span className="text-danger">*</span></label>
              <Field type="text" name="name" className={fieldClass('name')} placeholder="e.g. To Do" />
              <FormikError name="name" component="small" className="field-error-text" />
            </div>

            <div className="form-group">
              <label>Color</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <input
                  type="color"
                  value={values.color}
                  onChange={(e) => setFieldValue('color', e.target.value)}
                  style={{ width: '2.5rem', height: '2.5rem', padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
                />
                <Field type="text" name="color" className={fieldClass('color')} style={{ flex: 1 }} />
              </div>
              <FormikError name="color" component="small" className="field-error-text" />
            </div>

            <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
              <label
                htmlFor="isCompletedStage"
                style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}
              >
                <Field
                  id="isCompletedStage"
                  type="checkbox"
                  name="isCompletedStage"
                  style={{ width: '1.125rem', height: '1.125rem', flex: '0 0 auto', margin: 0 }}
                />
                <span style={{ lineHeight: '1', userSelect: 'none' }}>Mark as completed stage</span>
              </label>
              {completedStageWarning && (
                <small className="field-error-text" style={{ display: 'block', marginTop: 'var(--space-2)' }}>
                  Another stage ('{otherCompletedStageName}') is already marked as completed. Marking this one will unmark that one.
                </small>
              )}
            </div>

            <div className="form-actions" style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting || (isEditing && !dirty)}>
                  {isSubmitting ? <Loader2 size={16} className="spin" /> : (isEditing ? 'Update' : 'Save')}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
              </div>
              {isEditing && onDelete && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ color: 'var(--danger-text)', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}
                  onClick={() => onDelete(editingItem)}
                >
                  <Trash2 size={16} /> Delete
                </button>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default StageFormDrawer;
