import { X, Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import ValidationAlert from '../../../../shared/components/ValidationAlert';
import { editStaffCountValidationSchema } from '../validations/subscription.validation';
import type { SubscriptionDetail } from '../types';
import type { UpdateStaffCountPayload } from '../types/request';

interface Props {
  isOpen: boolean;
  subscription: SubscriptionDetail;
  isSaving: boolean;
  error: string;
  onClearError: () => void;
  onSubmit: (values: UpdateStaffCountPayload) => Promise<boolean>;
  onClose: () => void;
}

const EditStaffCountModal = ({ isOpen, subscription, isSaving, error, onClearError, onSubmit, onClose }: Props) => {
  if (!isOpen) return null;

  const initialValues: UpdateStaffCountPayload = {
    staffCount: subscription.staffCount,
    perStaffPrice: subscription.perStaffPrice,
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h5>Edit Staff Count</h5>
          <button type="button" className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>
        <Formik enableReinitialize initialValues={initialValues} validationSchema={editStaffCountValidationSchema} onSubmit={onSubmit}>
          {({ values, errors, touched, isSubmitting, submitForm }) => (
            <>
              <div className="modal-body">
                <ValidationAlert message={error || null} onClose={onClearError} />
                <Form>
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
                  <div className="subscription-total-preview">
                    New total: <strong>₹{((Number(values.staffCount) || 0) * (Number(values.perStaffPrice) || 0)).toLocaleString()}</strong>
                  </div>
                </Form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={submitForm} disabled={isSaving || isSubmitting}>
                  {isSaving || isSubmitting ? <><Loader2 size={16} className="spin" /> Saving...</> : 'Save Changes'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditStaffCountModal;
