import Drawer from '../Drawer';
import DealForm from '../../../features/deal/components/DealForm';
import type { AddDealDrawerProps } from '../../types/drawers';

const AddDealDrawer = ({ isOpen, onClose, deal = null, onSave }: AddDealDrawerProps) => (
  <Drawer isOpen={isOpen} onClose={onClose} title={deal ? 'Edit Deal' : 'Add Deal'}>
    <DealForm
      initialValues={deal}
      onSave={(data) => { onSave(data); onClose(); }}
      onCancel={onClose}
    />
  </Drawer>
);

export default AddDealDrawer;
