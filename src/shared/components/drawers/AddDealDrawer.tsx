import Drawer from '../Drawer';
import DealForm from '../../../features/deal/components/DealForm';
import { dealValidationSchema } from '../../../features/deal/validations';
import type { AddDealDrawerProps } from '../../types/drawers';

const AddDealDrawer = ({ isOpen, onClose, deal = null, onSave }: AddDealDrawerProps) => (
  <Drawer isOpen={isOpen} onClose={onClose} title={deal ? 'Edit Deal' : 'Add Deal'}>
    <DealForm
      validationSchema={dealValidationSchema}
      initialValues={deal ?? { dealName: '', lead: '', mobile: '', amount: '', status: '', type: '', startDate: '', endDate: '', assignAgent: '' }}
      onSubmit={async (values) => { onSave(values); onClose(); return true; }}
      onCancel={onClose}
    />
  </Drawer>
);

export default AddDealDrawer;
