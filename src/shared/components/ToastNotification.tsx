import { Check, X } from 'lucide-react';
import type { ToastNotificationProps } from '../types/toast.types';

const ToastNotification = ({ isVisible, type, message, onDismiss }: ToastNotificationProps) => {
  if (!isVisible) return null;

  return (
    <div className={`toast-notification toast-${type}`} onClick={onDismiss}>
      {type === 'success' ? <Check size={18} /> : <X size={18} />}
      <span>{message}</span>
    </div>
  );
};

export default ToastNotification;
