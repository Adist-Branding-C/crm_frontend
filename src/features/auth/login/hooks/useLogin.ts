import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import type { FormikHelpers } from 'formik';
import { AUTH_ROUTES, AUTH_STORAGE_KEYS } from '../../constants/auth.constants';
import { authService } from '../../services/AuthService';
import type { LoginFormData } from '../types/login.types';
import { loginValidationSchema } from '../validations/index';
import { LOGIN_INITIAL_VALUES } from '../constants/index';

export function useLogin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = useCallback(async (
    values: LoginFormData,
    { setSubmitting }: FormikHelpers<LoginFormData>,
  ) => {
    setError('');
    setIsLoading(true);

    try {
      const response = await authService.login(values);

      if (response.status && response.data) {
        Cookies.set(AUTH_STORAGE_KEYS.ACCESS_TOKEN, response.data.accessToken, { sameSite: 'strict' });
        Cookies.set(AUTH_STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken, { sameSite: 'strict' });
        localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify({
          id: response.data.id,
          name: response.data.name,
          phone: response.data.phone,
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
  }, [navigate]);

  return {
    isLoading, error,
    handleSubmit,
    validationSchema: loginValidationSchema as any,
    initialValues: LOGIN_INITIAL_VALUES,
  };
}
