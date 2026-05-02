import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, Users, Target, Megaphone, BarChart3, Calendar, MessageSquare } from 'lucide-react';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [contentSlide, setContentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const sliderRef = useRef(null);

  const minSwipeDistance = 50;

  const contentSlides = [
    {
      icon: <Target size={40} />,
      title: "Track Leads & Deals",
      description: "Monitor your sales pipeline and convert more leads into customers with powerful tracking tools."
    },
    {
      icon: <Megaphone size={40} />,
      title: "Manage Campaigns",
      description: "Launch and manage marketing campaigns across multiple channels from a single dashboard."
    },
    {
      icon: <Users size={40} />,
      title: "Team Collaboration",
      description: "Work together seamlessly with your team. Assign tasks, share updates, and close deals faster."
    },
    {
      icon: <BarChart3 size={40} />,
      title: "Analytics & Reports",
      description: "Get actionable insights with detailed reports and custom dashboards."
    },
    {
      icon: <Calendar size={40} />,
      title: "Schedule Activities",
      description: "Never miss a follow-up. Schedule calls, meetings, and tasks with reminders."
    },
    {
      icon: <MessageSquare size={40} />,
      title: "Communication Hub",
      description: "Connect with customers via WhatsApp, SMS, and email all in one place."
    }
  ];

  const isAuthenticated = localStorage.getItem('crm_token');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.setItem('crm_token', 'demo_token');
    localStorage.setItem('crm_user', JSON.stringify({ name: 'Sharun das', email, role: 'Admin' }));
    navigate('/dashboard');
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && currentSlide === 0) {
      setCurrentSlide(1);
      sliderRef.current?.scrollTo({ left: sliderRef.current.scrollWidth / 2, behavior: 'smooth' });
    } else if (isRightSwipe && currentSlide === 1) {
      setCurrentSlide(0);
      sliderRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    sliderRef.current?.scrollTo({ 
      left: index * (sliderRef.current.scrollWidth / 2), 
      behavior: 'smooth' 
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setContentSlide(prev => (prev + 1) % contentSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [contentSlides.length]);

  const currentContent = contentSlides[contentSlide];

  return (
    <div className="auth-page">
      <div className="auth-slider" ref={sliderRef} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <div className="auth-slide auth-visual-panel">
          <div className="visual-content">
            <div className="visual-logo">
              <div className="logo-mark">CRM</div>
              <span className="logo-text">Dashboard</span>
            </div>
            
            <div className="content-display">
              <div className="content-icon">
                {currentContent.icon}
              </div>
              <h2>{currentContent.title}</h2>
              <p>{currentContent.description}</p>
            </div>
            
            <div className="content-dots">
              {contentSlides.map((_, index) => (
                <button 
                  key={index}
                  className={`content-dot ${contentSlide === index ? 'active' : ''}`}
                  onClick={() => setContentSlide(index)}
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

            <form onSubmit={handleSubmit} className="auth-form">
              {error && <div className="auth-error">{error}</div>}
              
              <div className="form-group">
                <label>Email</label>
                <div className="input-wrapper-with-icon">
                  <span className="input-icon-left"><Mail size={18} /></span>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper-with-icon">
                  <span className="input-icon-left"><Lock size={18} /></span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                  />
                  <button
                    type="button"
                    className="input-icon-right"
                    onClick={() => setShowPassword(!showPassword)}
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
                  onClick={() => navigate('/forgot-password')}
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
            </form>
          </div>
        </div>
      </div>

      <div className="pagination-dots">
        <button 
          className={`dot ${currentSlide === 0 ? 'active' : ''}`}
          onClick={() => goToSlide(0)}
          aria-label="Go to form"
        />
        <button 
          className={`dot ${currentSlide === 1 ? 'active' : ''}`}
          onClick={() => goToSlide(1)}
          aria-label="Go to content"
        />
      </div>
    </div>
  );
};

export default Login;