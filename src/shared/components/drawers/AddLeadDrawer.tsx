import Drawer from './Drawer';
import LeadForm from '../../../features/enquiries/components/LeadForm';
import type { AddLeadDrawerProps } from '../../types/drawers';
import './AddLeadDrawer.css';

const AddLeadDrawer = ({ isOpen, onClose, onSaved, lead }: AddLeadDrawerProps) => {
  const isEditing = !!lead;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Lead' : 'Add New Lead'}
      overlayClassName="drawer-overlay"
      panelClassName="drawer-panel"
    >
      <LeadForm lead={lead} onSaved={onSaved} onClose={onClose} />
    </Drawer>
  );
};

export default AddLeadDrawer;
