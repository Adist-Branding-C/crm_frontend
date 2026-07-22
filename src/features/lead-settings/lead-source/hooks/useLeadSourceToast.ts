import { useState, useCallback } from 'react';

export function useLeadSourceToast() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const showSuccessToast = useCallback((message: string) => {
    setToastMessage(message);
    setToastType('success');
    setShowToast(true);
  }, []);

  const clearToast = useCallback(() => setShowToast(false), []);

  return { showToast, toastMessage, toastType, showSuccessToast, clearToast };
}
