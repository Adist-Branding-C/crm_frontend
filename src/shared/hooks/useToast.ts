import { useState, useCallback } from 'react';
import type { ToastType } from '../types/toast.types';

/**
 * Generic toast-notification state: message, type, visibility, and auto-dismiss.
 *
 * Used by:
 * - account-settings/agent (AgentPage)
 *
 * Notes:
 * - Auto-dismisses after 3.5s. Pair with the shared ToastNotification component to render it.
 */
export function useToast() {
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = useCallback((message: string, type: ToastType) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  }, []);

  return { toastMessage, toastType, showToast, setShowToast, showToastMessage };
}
