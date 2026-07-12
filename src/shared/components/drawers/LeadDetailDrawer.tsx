import Drawer from './Drawer';
import LeadDetailContent from '../../../features/enquiries/components/LeadDetailContent';
import type { LeadDetailDrawerProps } from '../../types/drawers';
import './LeadDetailDrawer.css';

const LeadDetailDrawer = ({ lead, isOpen, onClose, onLeadUpdated = () => {}, onDeleteLead }: LeadDetailDrawerProps) => {
  if (!lead) return null;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      animated
      exitDuration={350}
      closeOnEsc
      overlayClassName="leaddrawer-overlay"
      panelClassName="leaddrawer-panel"
    >
      <LeadDetailContent lead={lead} onClose={onClose} onLeadUpdated={onLeadUpdated} onDeleteLead={onDeleteLead} />
    </Drawer>
  );
};

export default LeadDetailDrawer;
