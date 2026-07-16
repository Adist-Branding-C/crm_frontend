import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import { ScrollToFirstError } from '../../../../shared/components/ScrollToFirstError';
import type { CallStatusFormProps } from '../types/index';

const CallStatusForm = ({ validationSchema, initialValues, onSubmit, onCancel, isLoading, error, isEditing, bodyRef }: CallStatusFormProps) => {
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
        const fieldClass = (name: keyof typeof initialValues) =>
          `form-control${touched[name] && errors[name] ? ' input-error' : ''}`;

        return (
          <Form>
            <ScrollToFirstError errors={errors} submitCount={submitCount} containerRef={bodyRef} />
            {error && <ErrorMessage message={error} />}

            <div className="form-group">
              <label>Name <span className="text-danger">*</span></label>
              <Field type="text" name="name" className={fieldClass('name')} placeholder="Enter call status name" />
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

export default CallStatusForm;
