import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../auth/services/AuthService';
import { setAuthTokens } from '../../auth/utils/tokenStorage';
import { AUTH_ROUTES, AUTH_STORAGE_KEYS } from '../../auth/constants/auth.constants';
import type { Company } from '../types';

export function useCompanySwitch() {
  const navigate = useNavigate();
  const [isSwitching, setIsSwitching] = useState(false);
  const [error, setError] = useState('');

  const persistActiveCompany = useCallback((company: { id: string; name: string } | null) => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEYS.USER);
    const user = stored ? JSON.parse(stored) : {};
    if (company) {
      localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify({
        ...user,
        activeCompanyId: company.id,
        activeCompanyName: company.name,
      }));
    } else {
      const { activeCompanyId: _ignoredId, activeCompanyName: _ignoredName, ...rest } = user;
      localStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(rest));
    }
  }, []);

  const switchToCompany = useCallback(async (company: Company) => {
    setError('');
    setIsSwitching(true);
    try {
      const response = await authService.switchCompany(company.companyId);
      if (response.status && response.data) {
        setAuthTokens(response.data.accessToken, response.data.refreshToken);
        persistActiveCompany({ id: company.companyId, name: company.name });
        navigate(AUTH_ROUTES.DASHBOARD);
      } else {
        setError(response.message || 'Failed to switch company');
      }
    } catch {
      setError('Failed to switch company. Please try again.');
    } finally {
      setIsSwitching(false);
    }
  }, [navigate, persistActiveCompany]);

  const switchBackToPlatform = useCallback(async () => {
    setError('');
    setIsSwitching(true);
    try {
      const response = await authService.switchCompany(null);
      if (response.status && response.data) {
        setAuthTokens(response.data.accessToken, response.data.refreshToken);
        persistActiveCompany(null);
        navigate(AUTH_ROUTES.LOGIN);
      } else {
        setError(response.message || 'Failed to switch back');
      }
    } catch {
      setError('Failed to switch back to platform. Please try again.');
    } finally {
      setIsSwitching(false);
    }
  }, [navigate, persistActiveCompany]);

  return { switchToCompany, switchBackToPlatform, isSwitching, error };
}