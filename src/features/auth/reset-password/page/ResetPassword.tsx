import { useNavigate, Navigate } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useResetPassword } from '../hooks/useResetPassword';
import { useAuth } from '../../hooks/useAuth';
import { ResetPasswordForm } from '../components/ResetPasswordForm';
import './ResetPassword.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const resetPasswordData = useResetPassword();
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

          <ResetPasswordForm
            initialValues={resetPasswordData.initialValues}
            validationSchema={resetPasswordData.validationSchema}
            onSubmit={resetPasswordData.handleSubmit}
            isLoading={resetPasswordData.isLoading}
            error={resetPasswordData.error}
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
