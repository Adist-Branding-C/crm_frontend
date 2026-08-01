import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { AUTH_STORAGE_KEYS } from '../../../auth/constants/auth.constants';
import { agentService } from '../services/agent.service';
import type { StaffProfile } from '../types/agent.types';

function readStoredProfile(): StaffProfile | null {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEYS.STAFF_PROFILE);
    return stored ? JSON.parse(stored) : null;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEYS.STAFF_PROFILE);
    return null;
  }
}

export function useCurrentStaff() {
  const [currentStaff, setCurrentStaff] = useState<StaffProfile | null>(() => readStoredProfile());
  const [isLoading, setIsLoading] = useState(() => !readStoredProfile());

  const refetchCurrentStaff = useCallback(async () => {
    if (!Cookies.get(AUTH_STORAGE_KEYS.ACCESS_TOKEN)) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const response = await agentService.getMe();
      if (response.data) {
        localStorage.setItem(AUTH_STORAGE_KEYS.STAFF_PROFILE, JSON.stringify(response.data));
        setCurrentStaff(response.data);
      }
    } catch {
      // Best-effort; dropdown keeps its fallback state until the next successful fetch.
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (readStoredProfile()) {
      setIsLoading(false);
      return;
    }
    refetchCurrentStaff();
  }, [refetchCurrentStaff]);

  const clearCurrentStaff = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEYS.STAFF_PROFILE);
    setCurrentStaff(null);
  }, []);

  return { currentStaff, isLoading, refetchCurrentStaff, clearCurrentStaff };
}
