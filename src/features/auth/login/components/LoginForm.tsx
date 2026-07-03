import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Phone, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import type { LoginFormProps } from '../types/LoginForm.types';

export const LoginForm = ({ initialValues, validationSchema, onSubmit, isLoading, error, onForgotPasswordClick }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

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

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper-with-icon">
                <span className="input-icon-left"><Lock size={18} /></span>
                <Field
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="form-input"
                />
                <button
                  type="button"
                  className="input-icon-right"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="forgot-link"
                onClick={onForgotPasswordClick}
              >
                Forgot password?
              </button>
            </div>

            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? (
                <Loader2 size={18} className="spin" />
              ) : (
                <>
                  <span>Sign In</span>
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
