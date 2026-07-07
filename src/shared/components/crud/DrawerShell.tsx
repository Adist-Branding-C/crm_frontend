import { X } from 'lucide-react';
import type { DrawerShellProps } from '../../types/crud';

const DrawerShell = ({ isOpen, title, onClose, bodyRef, children }: DrawerShellProps) => {
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer drawer-right" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h5>{title}</h5>
          <button className="drawer-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="drawer-body" ref={bodyRef}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DrawerShell;
