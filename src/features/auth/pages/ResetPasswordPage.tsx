import { useNavigate, Navigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Lock, Eye, EyeOff, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { useResetPasswordData } from '../hooks/useResetPasswordData';
import { useAuth } from '../hooks/useAuth';
import './ResetPassword.css';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const resetPasswordData = useResetPasswordData();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  if (!resetPasswordData.token) {
    return <Navigate to="/forgot-password" replace />;
  }

  if (resetPasswordData.isSuccess) {
    return (
      <div className="auth-page">
        <div className="auth-visual-panel">
          <div className="visual-content">
            <div className="visual-logo">
              <div className="logo-mark">CRM</div>
              <span className="logo-text">Dashboard</span>
            </div>
          </div>
          <div className="visual-pattern"></div>
        </div>

        <div className="auth-form-panel">
          <div className="auth-card">
            <div className="success-animation">
              <CheckCircle size={48} />
            </div>
            <h1>Password Reset</h1>
            <p>Your password has been reset successfully.</p>
            <button className="login-link-btn" onClick={() => navigate('/login')}>
              <span>Go to Sign In</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-visual-panel">
        <div className="visual-content">
          <div className="visual-logo">
            <div className="logo-mark">CRM</div>
            <span className="logo-text">Dashboard</span>
          </div>
          <div className="visual-message">
            <h2>Create New Password</h2>
            <p>Enter a strong password to secure your account.</p>
          </div>
        </div>
        <div className="visual-pattern"></div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Create New Password</h1>
            <p>Your new password must be different from previous passwords</p>
          </div>

          <Formik
            initialValues={resetPasswordData.initialValues}
            validationSchema={resetPasswordData.validationSchema}
            onSubmit={resetPasswordData.handleSubmit}
          >
            {({ errors, touched, submitCount }) => {
              const formError = resetPasswordData.error || (submitCount > 0 ? Object.values(errors)[0] : '');
              return (
                <Form className="auth-form">
                  {formError && <div className="auth-error">{formError}</div>}
                  
                  <div className="form-group">
                    <label>New Password</label>
                    <div className="input-wrapper">
                      <Lock size={18} className="input-icon" />
                      <Field
                        name="password"
                        type={resetPasswordData.showPassword ? 'text' : 'password'}
                        placeholder="Enter new password"
                        className="form-input"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => resetPasswordData.setShowPassword(!resetPasswordData.showPassword)}
                      >
                        {resetPasswordData.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Confirm Password</label>
                    <div className="input-wrapper">
                      <Lock size={18} className="input-icon" />
                      <Field
                        name="confirmPassword"
                        type={resetPasswordData.showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm new password"
                        className="form-input"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => resetPasswordData.setShowConfirmPassword(!resetPasswordData.showConfirmPassword)}
                      >
                        {resetPasswordData.showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <button type="submit" className="auth-btn" disabled={resetPasswordData.isLoading}>
                    {resetPasswordData.isLoading ? (
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
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
