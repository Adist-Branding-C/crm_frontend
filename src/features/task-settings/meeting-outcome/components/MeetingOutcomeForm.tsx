import { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import { scrollToFirstError } from '../../utils/scrollToFirstError';
import type { MeetingOutcomeFormProps } from '../types/index';

const MeetingOutcomeForm = ({ validationSchema, initialValues, onSubmit, onCancel, isLoading, error, isEditing, bodyRef }: MeetingOutcomeFormProps) => {
  const prevSubmitCountRef = useRef(0);

  useEffect(() => {
    if (error) {
      bodyRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [error, bodyRef]);

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
            requestAnimationFrame(() => scrollToFirstError(bodyRef?.current ?? null));
          }
        }

        const fieldClass = (name: keyof typeof initialValues) =>
          `form-control${touched[name] && errors[name] ? ' input-error' : ''}`;

        return (
          <Form>
            {error && <ErrorMessage message={error} />}

            <div className="form-group">
              <label>Outcome <span className="text-danger">*</span></label>
              <Field type="text" name="name" className={fieldClass('name')} placeholder="Enter meeting outcome" />
              <FormikError name="name" component="small" className="field-error-text" />
            </div>

            <div className="form-group">
              <label>Status <span className="text-danger">*</span></label>
              <Field as="select" name="status" className={fieldClass('status')}>
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Field>
              <FormikError name="status" component="small" className="field-error-text" />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={isLoading || isSubmitting || (isEditing && !dirty)}>
                {isLoading || isSubmitting ? <Loader2 size={16} className="spin" /> : (isEditing ? 'Update' : 'Save')}
              </button>
              <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default MeetingOutcomeForm;
