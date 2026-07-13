import { Field } from 'formik';
import type { StaffPricingFieldsProps } from '../types/component.types';

/**
 * The Staff Count + Per-Staff Price field pair, shared by every form in this module that
 * collects seat pricing (EditStaffCountModal, RenewalQueueFormModal, AssignSubscriptionForm) -
 * all three use these exact Formik field names already, so this is one shape, not three.
 */
const StaffPricingFields = ({ errors, touched }: StaffPricingFieldsProps) => (
  <div className="form-row">
    <div className="form-group">
      <label>Staff Count <span className="text-danger">*</span></label>
      <Field type="number" name="staffCount" className="form-control" />
      {touched.staffCount && errors.staffCount && <small className="field-error-text">{errors.staffCount}</small>}
    </div>
    <div className="form-group">
      <label>Per-Staff Price <span className="text-danger">*</span></label>
      <Field type="number" name="perStaffPrice" className="form-control" />
      {touched.perStaffPrice && errors.perStaffPrice && <small className="field-error-text">{errors.perStaffPrice}</small>}
    </div>
  </div>
);

export default StaffPricingFields;
