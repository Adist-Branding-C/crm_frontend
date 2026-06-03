import { useNavigate, Navigate } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { useForgotPasswordData } from '../hooks/useForgotPasswordData';
import './ForgotPassword.css';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const d = useForgotPasswordData();

  const isAuthenticated = localStorage.getItem('crm_token');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  if (d.isSent) {
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
            <p>We&apos;ve sent a password reset link to</p>
            <p className="email-highlight">{d.email}</p>
            <p className="resend-text">
              Didn&apos;t receive?{' '}
              <button 
                type="button" 
                className="resend-link"
                onClick={() => d.setIsSent(false)}
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
            <p>No worries, we&apos;ll send you instructions to reset your password.</p>
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
            <p>Enter your email and we&apos;ll send you a reset link</p>
          </div>

          <form onSubmit={d.handleSubmit} className="auth-form">
            {d.error && <div className="auth-error">{d.error}</div>}
            
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper-with-icon">
                <span className="input-icon-left"><Mail size={18} /></span>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={d.email}
                  onChange={(e) => d.setEmail(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <button type="submit" className="auth-btn" disabled={d.isLoading}>
              {d.isLoading ? (
                <Loader2 size={18} className="spin" />
              ) : (
                <>
                  <span>Send Reset Link</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
