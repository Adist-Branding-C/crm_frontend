import { createPortal } from 'react-dom';
import { Check, X } from 'lucide-react';
import type { ToastNotificationProps } from '../types/toast.types';
import './ToastNotification.css';

const ToastNotification = ({ isVisible, type, message, onDismiss }: ToastNotificationProps) => {
  if (!isVisible) return null;

  return createPortal(
    <div className={`toast-notification toast-${type}`} onClick={onDismiss}>
      {type === 'success' ? <Check size={18} /> : <X size={18} />}
      <span>{message}</span>
    </div>,
    document.body
  );
};

export default ToastNotification;
