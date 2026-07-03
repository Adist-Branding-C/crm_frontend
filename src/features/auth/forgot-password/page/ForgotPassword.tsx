import { useNavigate, Navigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useForgotPassword } from '../hooks/useForgotPassword';
import { useAuth } from '../../hooks/useAuth';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const forgotPasswordData = useForgotPassword();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  if (forgotPasswordData.isSent) {
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
            <h1>Check Your Email</h1>
            <p>If an account exists with that phone number, we&apos;ve sent a password reset link to the registered email address.</p>
            <p className="resend-text">
              Didn&apos;t receive an email?{' '}
              <button
                type="button"
                className="resend-link"
                onClick={() => forgotPasswordData.setIsSent(false)}
              >
                Resend
              </button>
            </p>
            <button className="back-btn" onClick={() => navigate('/login')}>
              <ArrowLeft size={18} />
              <span>Back to Sign In</span>
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
            <h2>Reset Your Password</h2>
            <p>No worries, we&apos;ll send you a link to reset your password.</p>
          </div>
        </div>
        <div className="visual-pattern"></div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-card">
          <button className="back-link" onClick={() => navigate('/login')}>
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>

          <div className="auth-header">
            <h1>Forgot Password?</h1>
            <p>Enter your phone number to receive a reset link</p>
          </div>

          <ForgotPasswordForm
            initialValues={forgotPasswordData.initialValues}
            validationSchema={forgotPasswordData.validationSchema}
            onSubmit={forgotPasswordData.handleSubmit}
            isLoading={forgotPasswordData.isLoading}
            error={forgotPasswordData.error}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
