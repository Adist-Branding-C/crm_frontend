import type { ReactNode } from 'react';

export interface ActionMenuPortalProps {
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLElement | null>;
  onClose: () => void;
  children: ReactNode;
}
