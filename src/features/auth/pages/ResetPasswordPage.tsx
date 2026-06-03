import { useNavigate, Navigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { useResetPasswordData } from '../hooks/useResetPasswordData';
import './ResetPassword.css';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const d = useResetPasswordData();

  const isAuthenticated = localStorage.getItem('crm_token');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  if (!d.token) {
    return <Navigate to="/forgot-password" replace />;
  }

  if (d.isSuccess) {
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

          <form onSubmit={d.handleSubmit} className="auth-form">
            {d.error && <div className="auth-error">{d.error}</div>}
            
            <div className="form-group">
              <label>New Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type={d.showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  value={d.password}
                  onChange={(e) => d.setPassword(e.target.value)}
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => d.setShowPassword(!d.showPassword)}
                >
                  {d.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type={d.showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  value={d.confirmPassword}
                  onChange={(e) => d.setConfirmPassword(e.target.value)}
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => d.setShowConfirmPassword(!d.showConfirmPassword)}
                >
                  {d.showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="auth-btn" disabled={d.isLoading}>
              {d.isLoading ? (
                <Loader2 size={18} className="spin" />
              ) : (
                <>
                  <span>Reset Password</span>
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

export default ResetPasswordPage;
