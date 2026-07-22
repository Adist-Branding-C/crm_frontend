import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormikHelpers } from 'formik';
import { AUTH_CONTENT_SLIDES, AUTH_ROUTES, AUTH_STORAGE_KEYS, MIN_SWIPE_DISTANCE } from '../constants/auth.constants';
import { authService } from '../services/AuthService';
import type { LoginFormData } from '../types/auth.types';
import { loginValidationSchema } from '../validations/login.schema';
import { setAuthTokens } from '../utils/tokenStorage';

const loginInitialValues: LoginFormData = { phone: '', password: '' };

export function useLoginData() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [contentSlide, setContentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const currentContent = AUTH_CONTENT_SLIDES[contentSlide] ?? AUTH_CONTENT_SLIDES[0];

  const handleSubmit = useCallback(async (
    values: LoginFormData,
    { setSubmitting }: FormikHelpers<LoginFormData>,
  ) => {
    setError('');
    setIsLoading(true);

    try {
      const response = await authService.login(values);

      if (response.status && response.data) {
        setAuthTokens(response.data.accessToken, response.data.refreshToken, rememberMe);
        localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify({
          id: response.data.id,
          name: response.data.name,
          phone: response.data.phone,
          staffId: response.data.staffId,
          companyId: response.data.companyId,
          isAdmin: response.data.isAdmin,
        }));
        navigate(AUTH_ROUTES.DASHBOARD);
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Invalid credentials');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  }, [navigate, rememberMe]);

  const onTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0]?.clientX ?? 0);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0]?.clientX ?? 0);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distance < -MIN_SWIPE_DISTANCE;

    if (isLeftSwipe && currentSlide === 0) {
      setCurrentSlide(1);
      sliderRef.current?.scrollTo({ left: sliderRef.current.scrollWidth / 2, behavior: 'smooth' });
    } else if (isRightSwipe && currentSlide === 1) {
      setCurrentSlide(0);
      sliderRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [touchStart, touchEnd, currentSlide]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    sliderRef.current?.scrollTo({
      left: index * (sliderRef.current.scrollWidth / 2),
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setContentSlide(prev => (prev + 1) % AUTH_CONTENT_SLIDES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return {
    showPassword, setShowPassword,
    rememberMe, setRememberMe,
    isLoading, error,
    currentSlide, contentSlide, setContentSlide,
    touchStart, touchEnd, sliderRef,
    handleSubmit, onTouchStart, onTouchMove, onTouchEnd, goToSlide,
    currentContent,
    validationSchema: loginValidationSchema as any,
    initialValues: loginInitialValues,
  };
}
