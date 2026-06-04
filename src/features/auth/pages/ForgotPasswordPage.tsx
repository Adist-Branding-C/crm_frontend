import { useNavigate, Navigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Phone, ArrowLeft, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { useForgotPasswordData } from '../hooks/useForgotPasswordData';
import { useAuth } from '../hooks/useAuth';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import './ForgotPassword.css';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const forgotPasswordData = useForgotPasswordData();
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
            <h1>Check Your Phone</h1>
            <p>Reset link sent to</p>
            <p className="phone-highlight">{forgotPasswordData.submittedPhone}</p>
            <p className="resend-text">
              Didn&apos;t receive?{' '}
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

          <Formik
            initialValues={forgotPasswordData.initialValues}
            validationSchema={forgotPasswordData.validationSchema}
            onSubmit={forgotPasswordData.handleSubmit}
          >
            {({ errors, touched, submitCount }) => {
              const formError = forgotPasswordData.error || (submitCount > 0 ? Object.values(errors)[0] : '');
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

                  <button type="submit" className="auth-btn" disabled={forgotPasswordData.isLoading}>
                    {forgotPasswordData.isLoading ? (
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
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
