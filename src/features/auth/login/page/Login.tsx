import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { useLoginSlideShow } from '../hooks/useLoginSlideShow';
import { useAuth } from '../../hooks/useAuth';
import { LoginForm } from '../components/LoginForm';
import { AUTH_CONTENT_SLIDES, AUTH_ROUTES } from '../../constants/auth.constants';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const login = useLogin();
  const slideShow = useLoginSlideShow();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const CurrentIcon = slideShow.currentContent?.icon;

  return (
    <div className="auth-page">
      <div className="auth-slider" ref={slideShow.sliderRef} onTouchStart={slideShow.onTouchStart} onTouchMove={slideShow.onTouchMove} onTouchEnd={slideShow.onTouchEnd}>
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
              <h2>{slideShow.currentContent?.title}</h2>
              <p>{slideShow.currentContent?.description}</p>
            </div>

            <div className="content-dots">
              {AUTH_CONTENT_SLIDES.map((_, index) => (
                <button
                  key={index}
                  className={`content-dot ${slideShow.contentSlide === index ? 'active' : ''}`}
                  onClick={() => slideShow.setContentSlide(index)}
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

            <LoginForm
              initialValues={login.initialValues}
              validationSchema={login.validationSchema}
              onSubmit={login.handleSubmit}
              isLoading={login.isLoading}
              error={login.error}
              onForgotPasswordClick={() => navigate(AUTH_ROUTES.FORGOT_PASSWORD)}
            />
          </div>
        </div>
      </div>

      <div className="pagination-dots">
        <button
          className={`dot ${slideShow.currentSlide === 0 ? 'active' : ''}`}
          onClick={() => slideShow.goToSlide(0)}
          aria-label="Go to form"
        />
        <button
          className={`dot ${slideShow.currentSlide === 1 ? 'active' : ''}`}
          onClick={() => slideShow.goToSlide(1)}
          aria-label="Go to content"
        />
      </div>
    </div>
  );
};

export default Login;
