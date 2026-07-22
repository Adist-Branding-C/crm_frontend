import { useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import ValidationAlert from '../../../../shared/components/ValidationAlert';
import { scrollToFirstError } from '../../../../shared/utils/scrollToError.util';
import { ACTION_SAVE, ACTION_UPDATE, ACTION_CANCEL } from '../../../../shared/constants/actionLabels';
import { LEAD_PURPOSE_FIELD_LABEL, LEAD_PURPOSE_FIELD_PLACEHOLDER } from '../constants';
import type { LeadPurposeFormProps } from '../types/lead-purpose-form.types';

const LeadPurposeForm = ({ form, status }: LeadPurposeFormProps) => {
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
                <label>{LEAD_PURPOSE_FIELD_LABEL} <span className="text-danger">*</span></label>
                <Field type="text" name="title" className={fieldClass('title')} placeholder={LEAD_PURPOSE_FIELD_PLACEHOLDER} />
                {showError('title') && errors.title && <small className="field-error-text">{errors.title}</small>}
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

export default LeadPurposeForm;
