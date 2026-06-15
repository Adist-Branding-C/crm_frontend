import { X } from 'lucide-react';
import type { CampaignDrawerProps } from '../types/campaign-drawer.types';

const CampaignDrawer = ({ isOpen, onClose, title, children }: CampaignDrawerProps) => {
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2>{title}</h2>
          <button className="drawer-close" onClick={onClose}><X size={20} /></button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default CampaignDrawer;
