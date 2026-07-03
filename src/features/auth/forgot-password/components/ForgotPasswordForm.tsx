import { Formik, Form, Field } from 'formik';
import { Phone, ArrowRight, Loader2 } from 'lucide-react';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import type { ForgotPasswordFormProps } from '../types/ForgotPasswordForm.types';

export const ForgotPasswordForm = ({ initialValues, validationSchema, onSubmit, isLoading, error }: ForgotPasswordFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, submitCount }) => {
        const formError = error || (submitCount > 0 ? Object.values(errors)[0] : '');
        return (
          <Form className="auth-form">
            {formError && <ErrorMessage message={formError} />}

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <div className="input-wrapper-with-icon">
                <span className="input-icon-left"><Phone size={18} /></span>
                <Field
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="form-input"
                />
              </div>
            </div>

            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? (
                <Loader2 size={18} className="spin" />
              ) : (
                <>
                  <span>Send Reset Link</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
