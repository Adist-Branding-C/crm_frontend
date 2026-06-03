import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { useLoginData } from '../hooks/useLoginData';
import './Login.css';
import { AUTH_CONTENT_SLIDES, AUTH_STORAGE_KEYS, AUTH_ROUTES } from '../constants/auth.constants';

const LoginPage = () => {
  const navigate = useNavigate();
  const d = useLoginData();

  const isAuthenticated = localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const CurrentIcon = d.currentContent?.icon;

  return (
    <div className="auth-page">
      <div className="auth-slider" ref={d.sliderRef} onTouchStart={d.onTouchStart} onTouchMove={d.onTouchMove} onTouchEnd={d.onTouchEnd}>
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
              <h2>{d.currentContent?.title}</h2>
              <p>{d.currentContent?.description}</p>
            </div>

            <div className="content-dots">
              {AUTH_CONTENT_SLIDES.map((_, index) => (
                <button
                  key={index}
                  className={`content-dot ${d.contentSlide === index ? 'active' : ''}`}
                  onClick={() => d.setContentSlide(index)}
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

            <form onSubmit={d.handleSubmit} className="auth-form">
              {d.error && <div className="auth-error">{d.error}</div>}

              <div className="form-group">
                <label>Email</label>
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

              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper-with-icon">
                  <span className="input-icon-left"><Lock size={18} /></span>
                  <input
                    type={d.showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={d.password}
                    onChange={(e) => d.setPassword(e.target.value)}
                    className="form-input"
                  />
                  <button
                    type="button"
                    className="input-icon-right"
                    onClick={() => d.setShowPassword(!d.showPassword)}
                  >
                    {d.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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

              <button type="submit" className="auth-btn" disabled={d.isLoading}>
                {d.isLoading ? (
                  <Loader2 size={18} className="spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="pagination-dots">
        <button
          className={`dot ${d.currentSlide === 0 ? 'active' : ''}`}
          onClick={() => d.goToSlide(0)}
          aria-label="Go to form"
        />
        <button
          className={`dot ${d.currentSlide === 1 ? 'active' : ''}`}
          onClick={() => d.goToSlide(1)}
          aria-label="Go to content"
        />
      </div>
    </div>
  );
};

export default LoginPage;
