import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Phone, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { useLoginData } from '../hooks/useLoginData';
import { useAuth } from '../hooks/useAuth';
import './Login.css';
import { AUTH_CONTENT_SLIDES, AUTH_ROUTES } from '../constants/auth.constants';

const LoginPage = () => {
  const navigate = useNavigate();
  const loginData = useLoginData();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const CurrentIcon = loginData.currentContent?.icon;

  return (
    <div className="auth-page">
      <div className="auth-slider" ref={loginData.sliderRef} onTouchStart={loginData.onTouchStart} onTouchMove={loginData.onTouchMove} onTouchEnd={loginData.onTouchEnd}>
        <div className="auth-slide auth-visual-panel">
          <div className="visual-content">
            <div className="visual-logo">
              <div className="logo-mark">CRM</div>
              <span className="logo-text">Dashboard</span>
            </div>

            <div className="content-display">
              <div className="content-icon">
                {CurrentIcon && React.createElement(CurrentIcon, { size: 40 })}
              </div>
              <h2>{loginData.currentContent?.title}</h2>
              <p>{loginData.currentContent?.description}</p>
            </div>

            <div className="content-dots">
              {AUTH_CONTENT_SLIDES.map((_, index) => (
                <button
                  key={index}
                  className={`content-dot ${loginData.contentSlide === index ? 'active' : ''}`}
                  onClick={() => loginData.setContentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="visual-pattern"></div>
        </div>

        <div className="auth-slide auth-form-panel">
          <div className="auth-card">
            <div className="auth-header">
              <h1>Sign In</h1>
              <p>Enter your credentials to access your account</p>
            </div>

            <Formik
              initialValues={loginData.initialValues}
              validationSchema={loginData.validationSchema}
              onSubmit={loginData.handleSubmit}
            >
              {({ errors, touched, submitCount }) => {
                const formError = loginData.error || (submitCount > 0 ? Object.values(errors)[0] : '');
                return (
                  <Form className="auth-form">
                    {formError && <div className="auth-error">{formError}</div>}

                    <div className="form-group">
                      <label>Phone Number</label>
                      <div className="input-wrapper-with-icon">
                        <span className="input-icon-left"><Phone size={18} /></span>
                        <Field
                          name="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Password</label>
                      <div className="input-wrapper-with-icon">
                        <span className="input-icon-left"><Lock size={18} /></span>
                        <Field
                          name="password"
                          type={loginData.showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          className="form-input"
                        />
                        <button
                          type="button"
                          className="input-icon-right"
                          onClick={() => loginData.setShowPassword(!loginData.showPassword)}
                        >
                          {loginData.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                        onClick={() => navigate(AUTH_ROUTES.FORGOT_PASSWORD)}
                      >
                        Forgot password?
                      </button>
                    </div>

                    <button type="submit" className="auth-btn" disabled={loginData.isLoading}>
                      {loginData.isLoading ? (
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
          </div>
        </div>
      </div>

      <div className="pagination-dots">
        <button
          className={`dot ${loginData.currentSlide === 0 ? 'active' : ''}`}
          onClick={() => loginData.goToSlide(0)}
          aria-label="Go to form"
        />
        <button
          className={`dot ${loginData.currentSlide === 1 ? 'active' : ''}`}
          onClick={() => loginData.goToSlide(1)}
          aria-label="Go to content"
        />
      </div>
    </div>
  );
};

export default LoginPage;
