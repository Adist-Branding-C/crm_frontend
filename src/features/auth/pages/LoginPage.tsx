import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import './Login.css';
import { AUTH_CONTENT_SLIDES, AUTH_ROUTES, AUTH_STORAGE_KEYS } from '../constants/auth.constants';


const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [contentSlide, setContentSlide] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    // const sliderRef = useRef(null);
    const sliderRef = useRef<HTMLDivElement | null>(null);


    const minSwipeDistance = 50;



    const isAuthenticated = localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please enter email and password');
            return;
        }

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, 'demo_token');
        localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify({ name: 'Sharun das', email, role: 'Admin' }));
        navigate(AUTH_ROUTES.DASHBOARD);
    };

    const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0]?.clientX ?? 0);
    };

    const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        setTouchEnd(e.targetTouches[0]?.clientX ?? 0);
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

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        sliderRef.current?.scrollTo({
            left: index * (sliderRef.current.scrollWidth / 2),
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setContentSlide(prev => (prev + 1) % AUTH_CONTENT_SLIDES.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [AUTH_CONTENT_SLIDES.length]);

    const currentContent = AUTH_CONTENT_SLIDES[contentSlide] ?? AUTH_CONTENT_SLIDES[0];
const CurrentIcon = currentContent?.icon;
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
                                {CurrentIcon && React.createElement(CurrentIcon, { size: 40 })}
                            </div>
                            <h2>{currentContent?.title}</h2>
                            <p>{currentContent?.description}</p>
                        </div>

                        <div className="content-dots">
                            {AUTH_CONTENT_SLIDES.map((_, index) => (
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
                                    onClick={() => navigate(AUTH_ROUTES.FORGOT_PASSWORD)}
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

export default LoginPage;