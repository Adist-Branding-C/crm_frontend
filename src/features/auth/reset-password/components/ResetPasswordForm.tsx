import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import type { ResetPasswordFormProps } from '../types/ResetPasswordForm.types';

export const ResetPasswordForm = ({ initialValues, validationSchema, onSubmit, isLoading, error }: ResetPasswordFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
              <label htmlFor="password">New Password</label>
              <div className="input-wrapper">
                <Field
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? (
                <Loader2 size={18} className="spin" />
              ) : (
                <>
                  <span>Reset Password</span>
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
