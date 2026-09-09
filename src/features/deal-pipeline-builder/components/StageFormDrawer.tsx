import { Loader2, Trash2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import type { FormikHelpers } from 'formik';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import { ACTION_SAVE, ACTION_UPDATE, ACTION_CANCEL } from '../../../shared/constants/actionLabels';
import { dealStageValidationSchema } from '../validations/dealStage.validation';
import { DEAL_OUTCOME_OPTIONS, DEFAULT_STAGE_COLOR_BY_OUTCOME } from '../constants/dealPipelineBuilder.constants';
import type { DealStageFormData } from '../types/request';
import type { DealStageItem, DealOutcome } from '../types/interface';

interface StageFormDrawerProps {
  editingItem: DealStageItem | null;
  initialValues: DealStageFormData;
  onSubmit: (values: DealStageFormData, helpers: FormikHelpers<DealStageFormData>) => Promise<void | boolean>;
  onDelete?: (item: DealStageItem) => void;
  error: string;
  onCancel: () => void;
}

function StageFormDrawer({ editingItem, initialValues, onSubmit, onDelete, error, onCancel }: StageFormDrawerProps) {
  const isEditing = !!editingItem;

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={dealStageValidationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, dirty, values, setFieldValue, isSubmitting }) => {
        const fieldClass = (name: keyof DealStageFormData) =>
          `form-control${touched[name] && errors[name] ? ' input-error' : ''}`;

        return (
          <Form>
            {error && <ErrorMessage message={error} />}

            <div className="form-group">
              <label>Name <span className="text-danger">*</span></label>
              <Field type="text" name="name" className={fieldClass('name')} placeholder="e.g. Proposal Sent" />
              <FormikError name="name" component="small" className="field-error-text" />
            </div>

            <div className="form-group">
              <label>Win probability <span className="text-danger">*</span></label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={values.probability}
                  onChange={(e) => setFieldValue('probability', Number(e.target.value))}
                  style={{ flex: 1 }}
                />
                <span style={{ width: '3rem', textAlign: 'right', color: 'var(--text-secondary)' }}>
                  {values.probability}%
                </span>
              </div>
              <FormikError name="probability" component="small" className="field-error-text" />
            </div>

            <div className="form-group">
              <label>Outcome <span className="text-danger">*</span></label>
              <Field
                as="select"
                name="outcome"
                className={fieldClass('outcome')}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const outcome = e.target.value as DealOutcome;
                  setFieldValue('outcome', outcome);
                  if (!isEditing) {
                    setFieldValue('color', DEFAULT_STAGE_COLOR_BY_OUTCOME[outcome] ?? values.color);
                  }
                }}
              >
                {DEAL_OUTCOME_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </Field>
              <FormikError name="outcome" component="small" className="field-error-text" />
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
