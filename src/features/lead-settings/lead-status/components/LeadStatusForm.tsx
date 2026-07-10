import { useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import ValidationAlert from '../../../../shared/components/ValidationAlert';
import { scrollToFirstError } from '../../../../shared/utils/scrollToError.util';
import { ACTION_SAVE, ACTION_UPDATE, ACTION_CANCEL } from '../../../../shared/constants/actionLabels';
import {
  LEAD_STATUS_FIELD_LABEL,
  LEAD_STATUS_FIELD_PLACEHOLDER,
  LEAD_STATUS_COLOR_FIELD_LABEL,
  LEAD_STATUS_CONVERSION_FIELD_LABEL,
} from '../constants';
import type { LeadStatusFormProps } from '../types/lead-status-form.types';

const LeadStatusForm = ({ form, status }: LeadStatusFormProps) => {
  const { validationSchema, initialValues, onSubmit, onCancel, isEditing } = form;
  const { isLoading, error, onClearError } = status;
  const formBodyRef = useRef<HTMLDivElement>(null);
  const prevSubmitCountRef = useRef(0);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, dirty, submitCount, isSubmitting }) => {
        if (submitCount > prevSubmitCountRef.current) {
          prevSubmitCountRef.current = submitCount;
          if (Object.keys(errors).length > 0) {
            requestAnimationFrame(() => scrollToFirstError(formBodyRef.current));
          }
        }

        const showError = (field: string) => (touched as Record<string, boolean>)[field] || submitCount > 0;
        const fieldClass = (name: string) => `form-control${showError(name) && (errors as Record<string, string>)[name] ? ' input-error' : ''}`;

        return (
          <div ref={formBodyRef}>
            <Form>
              <ValidationAlert message={error || null} onClose={onClearError} />

              <div className="form-group">
                <label>{LEAD_STATUS_FIELD_LABEL} <span className="text-danger">*</span></label>
                <Field type="text" name="status" className={fieldClass('status')} placeholder={LEAD_STATUS_FIELD_PLACEHOLDER} />
                {showError('status') && errors.status && <small className="field-error-text">{errors.status}</small>}
              </div>

              <div className="form-group">
                <label>{LEAD_STATUS_COLOR_FIELD_LABEL}</label>
                <Field type="color" name="color" className="form-control form-control-color color-input" />
                {showError('color') && errors.color && <small className="field-error-text">{errors.color}</small>}
              </div>

              <div className="form-group switch-field">
                <label className="toggle-switch">
                  <Field type="checkbox" name="useForConversion" />
                  <span className="toggle-slider"></span>
                </label>
                <label>{LEAD_STATUS_CONVERSION_FIELD_LABEL}</label>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={isLoading || isSubmitting || (isEditing && !dirty)}>
                  {isLoading || isSubmitting ? <Loader2 size={16} className="spin" /> : (isEditing ? ACTION_UPDATE : ACTION_SAVE)}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>{ACTION_CANCEL}</button>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default LeadStatusForm;
