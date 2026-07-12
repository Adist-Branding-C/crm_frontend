import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  overlayClassName: string;
  panelClassName: string;
  animated?: boolean;
  exitDuration?: number;
  closeOnEsc?: boolean;
  closeOnBackdropClick?: boolean;
}

/**
 * Pure structural shell: overlay + panel positioning, optional slide-in/out
 * animation timing, optional Esc/backdrop-click-to-close. Renders no business
 * content itself - everything visible beyond the optional generic title bar
 * comes from `children`, so the same shell works for a simple form drawer and
 * a rich multi-tab detail drawer without either knowing about the other.
 *
 * Used by:
 * - AddLeadDrawer (wraps LeadForm), LeadDetailDrawer (wraps LeadDetailContent)
 */
const Drawer = ({
  isOpen,
  onClose,
  children,
  title,
  overlayClassName,
  panelClassName,
  animated = false,
  exitDuration = 300,
  closeOnEsc = false,
  closeOnBackdropClick = true,
}: DrawerProps) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!animated) {
      setIsVisible(isOpen);
      return;
    }
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), exitDuration);
      return () => clearTimeout(timer);
    }
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
      }, exitDuration);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, animated, exitDuration]);

  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeOnEsc, isOpen, onClose]);

  const shouldRender = animated ? isVisible : isOpen;
  if (!shouldRender) return null;

  return (
    <div
      className={`${overlayClassName}${animated && isOpen ? ' visible' : ''}`}
      onClick={closeOnBackdropClick ? onClose : undefined}
    >
      <div
        className={`${panelClassName}${animated && isAnimating ? ' animating' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title !== undefined && (
          <div className="drawer-header">
            <h2>{title}</h2>
            <button className="drawer-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Drawer;
