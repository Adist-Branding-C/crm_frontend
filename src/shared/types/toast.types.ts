export type ToastType = 'success' | 'error';

export interface ToastNotificationProps {
  isVisible: boolean;
  type: ToastType;
  message: string;
  onDismiss: () => void;
}
