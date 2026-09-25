import { Loader2, Trash2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import type { FormikHelpers } from 'formik';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import { ACTION_SAVE, ACTION_UPDATE, ACTION_CANCEL } from '../../../shared/constants/actionLabels';
import { leadStageValidationSchema } from '../validations/leadStage.validation';
import type { LeadStageFormData } from '../types/request';
import type { LeadStageItem } from '../types/interface';

interface StageFormDrawerProps {
  editingItem: LeadStageItem | null;
  initialValues: LeadStageFormData;
  onSubmit: (values: LeadStageFormData, helpers: FormikHelpers<LeadStageFormData>) => Promise<void | boolean>;
  onDelete?: (item: LeadStageItem) => void;
  error: string;
  onCancel: () => void;
}


function StageFormDrawer({ editingItem, initialValues, onSubmit, onDelete, error, onCancel }: StageFormDrawerProps) {
  const isEditing = !!editingItem;

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={leadStageValidationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, dirty, isSubmitting }) => {
        const fieldClass = (name: keyof LeadStageFormData) =>
          `form-control${touched[name] && errors[name] ? ' input-error' : ''}`;

        return (
          <Form>
            {error && <ErrorMessage message={error} />}

            <div className="form-group">
              <label>Stage name <span className="text-danger">*</span></label>
              <Field type="text" name="status" className={fieldClass('status')} placeholder="e.g. Qualified" />
              <FormikError name="status" component="small" className="field-error-text" />
            </div>

            <div className="form-group">
              <label>Color</label>
              <Field type="color" name="color" className="form-control form-control-color color-input" />
              <FormikError name="color" component="small" className="field-error-text" />
            </div>

            <div className="form-group switch-field">
              <label className="toggle-switch">
                <Field type="checkbox" name="conversion" />
                <span className="toggle-slider"></span>
              </label>
              <label>Use for Conversion Metrics</label>
            </div>

            <div className="form-actions" style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting || (isEditing && !dirty)}>
                  {isSubmitting ? <Loader2 size={16} className="spin" /> : (isEditing ? ACTION_UPDATE : ACTION_SAVE)}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>{ACTION_CANCEL}</button>
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
