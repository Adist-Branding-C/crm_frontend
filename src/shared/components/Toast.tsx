import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Check, X, AlertTriangle } from 'lucide-react';

export interface ToastProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return createPortal(
    <div className={`toast-notification toast-${type}`} onClick={onClose}>
      {type === 'success' ? <Check size={18} /> : <AlertTriangle size={18} />}
      <span>{message}</span>
    </div>,
    document.body
  );
};

export default Toast;
