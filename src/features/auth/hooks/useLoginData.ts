import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_CONTENT_SLIDES, AUTH_ROUTES, AUTH_STORAGE_KEYS, MIN_SWIPE_DISTANCE } from '../constants/auth.constants';

export function useLoginData() {
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
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const currentContent = AUTH_CONTENT_SLIDES[contentSlide] ?? AUTH_CONTENT_SLIDES[0];

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
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
  }, [email, password, navigate]);

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
    email, setEmail, password, setPassword, showPassword, setShowPassword,
    isLoading, error, currentSlide, contentSlide, setContentSlide,
    touchStart, touchEnd, sliderRef,
    handleSubmit, onTouchStart, onTouchMove, onTouchEnd, goToSlide,
    currentContent,
  };
}
