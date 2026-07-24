import Drawer from '../Drawer';
import DealForm from '../../../features/deal/components/DealForm';
import { dealValidationSchema } from '../../../features/deal/validations';
import { combineMobileValue } from '../../../features/deal/utils/mobileFormat';
import { DEFAULT_COUNTRY_CODE } from '../../constants/countryCodes';
import type { AddDealDrawerProps } from '../../types/drawers';

const AddDealDrawer = ({ isOpen, onClose, deal = null, onSave }: AddDealDrawerProps) => (
  <Drawer isOpen={isOpen} onClose={onClose} title={deal ? 'Edit Deal' : 'Add Deal'}>
    <DealForm
      validationSchema={dealValidationSchema}
      initialValues={deal ?? { dealName: '', lead: '', mobile: '', mobileCountryCode: DEFAULT_COUNTRY_CODE, mobileNumber: '', amount: '', status: '', type: '', startDate: '', endDate: '', assignAgent: '' }}
      onSubmit={async (values) => {
        onSave({ ...values, mobile: combineMobileValue(values.mobileCountryCode, values.mobileNumber) });
        onClose();
        return true;
      }}
      onCancel={onClose}
    />
  </Drawer>
);

export default AddDealDrawer;
