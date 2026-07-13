import { Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import Modal from '../../../../shared/components/Modal';
import ValidationAlert from '../../../../shared/components/ValidationAlert';
import { updateSubscriptionStatusValidationSchema } from '../validations/subscription.validation';
import { SUBSCRIPTION_STATUS_OPTIONS } from '../constants/subscriptionStatusOptions';
import type { UpdateSubscriptionStatusPayload } from '../types/request';
import type { UpdateSubscriptionStatusModalProps } from '../types/component.types';

const UpdateSubscriptionStatusModal = ({ isOpen, subscription, isSaving, error, onClearError, onSubmit, onClose }: UpdateSubscriptionStatusModalProps) => {
  const initialValues: UpdateSubscriptionStatusPayload = {
    status: subscription.status,
    remark: subscription.remark,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Subscription Status">
      <Formik enableReinitialize initialValues={initialValues} validationSchema={updateSubscriptionStatusValidationSchema} onSubmit={onSubmit}>
        {({ errors, touched, isSubmitting, submitForm }) => (
          <>
            <div className="modal-body">
              <ValidationAlert message={error || null} onClose={onClearError} />
              <Form>
                <div className="form-group">
                  <label>Status <span className="text-danger">*</span></label>
                  <Field as="select" name="status" className="form-control">
                    {SUBSCRIPTION_STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </Field>
                  {touched.status && errors.status && <small className="field-error-text">{errors.status}</small>}
                </div>
                <div className="form-group">
                  <label>Remark</label>
                  <Field as="textarea" name="remark" className="form-control" rows={3} placeholder="Reason for this change (optional)" />
                </div>
              </Form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={submitForm} disabled={isSaving || isSubmitting}>
                {isSaving || isSubmitting ? <><Loader2 size={16} className="spin" /> Saving...</> : 'Update Status'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            </div>
          </>
        )}
      </Formik>
    </Modal>
  );
};

export default UpdateSubscriptionStatusModal;
