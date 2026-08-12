import { Check, X } from 'lucide-react';
import '../../../shared/components/ToastNotification.css';

interface ToastNotificationProps {
  message: string;
  type: 'success' | 'error';
  visible: boolean;
  onClose: () => void;
}

const ToastNotification = ({ message, type, visible, onClose }: ToastNotificationProps) => {
  if (!visible) return null;

  return (
    <div className={`toast-notification toast-${type}`} onClick={onClose}>
      {type === 'success' ? <Check size={18} /> : <X size={18} />}
      <span>{message}</span>
    </div>
  );
};

export default ToastNotification;
