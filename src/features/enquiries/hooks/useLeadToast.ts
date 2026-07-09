import { useState, useCallback } from 'react';
import type { UseLeadToastReturn } from '../types/hook.types';

export function useLeadToast(): UseLeadToastReturn {
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = useCallback((message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  }, []);

  const clearToast = useCallback(() => {
    setShowToast(false);
    setToastMessage('');
  }, []);

  return {
    toastMessage,
    toastType,
    showToast,
    showToastMessage,
    setShowToast,
    clearToast,
  };
}
