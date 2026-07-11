import { Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import Modal from '../../../../shared/components/Modal';
import ValidationAlert from '../../../../shared/components/ValidationAlert';
import StaffPricingFields from './StaffPricingFields';
import SubscriptionTotalPreview from './SubscriptionTotalPreview';
import { renewalQueueValidationSchema } from '../validations/subscription.validation';
import type { RenewalQueueFormValues, RenewalQueueFormModalProps } from '../types/component.types';

const today = () => new Date().toISOString().slice(0, 10);

const RenewalQueueFormModal = ({ isOpen, editingQueue, isSaving, error, onClearError, onSubmit, onClose }: RenewalQueueFormModalProps) => {
  const isEditing = !!editingQueue;
  const initialValues: RenewalQueueFormValues = editingQueue
    ? {
        renewalDate: editingQueue.renewalDate.slice(0, 10),
        validFrom: editingQueue.validFrom.slice(0, 10),
        durationInDays: editingQueue.durationInDays,
        staffCount: editingQueue.staffCount,
        perStaffPrice: editingQueue.perStaffPrice,
        immediate: editingQueue.immediate,
      }
    : {
        renewalDate: today(),
        validFrom: today(),
        durationInDays: 30,
        staffCount: '',
        perStaffPrice: '',
        immediate: false,
      };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Scheduled Renewal' : 'Schedule Renewal'}>
      <Formik enableReinitialize initialValues={initialValues} validationSchema={renewalQueueValidationSchema} onSubmit={onSubmit}>
        {({ values, errors, touched, isSubmitting, submitForm }) => (
          <>
            <div className="modal-body">
              <ValidationAlert message={error || null} onClose={onClearError} />
              <Form>
                <div className="form-group">
                  <label>Renewal Date <span className="text-danger">*</span></label>
                  <Field type="date" name="renewalDate" className="form-control" />
                  {touched.renewalDate && errors.renewalDate && <small className="field-error-text">{errors.renewalDate}</small>}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>New Start Date <span className="text-danger">*</span></label>
                    <Field type="date" name="validFrom" className="form-control" />
                    {touched.validFrom && errors.validFrom && <small className="field-error-text">{errors.validFrom}</small>}
                  </div>
                  <div className="form-group">
                    <label>Duration (days) <span className="text-danger">*</span></label>
                    <Field type="number" name="durationInDays" className="form-control" />
                    {touched.durationInDays && errors.durationInDays && <small className="field-error-text">{errors.durationInDays}</small>}
                  </div>
                </div>
                <StaffPricingFields errors={errors} touched={touched} />
                <label className="checkbox-item">
                  <Field type="checkbox" name="immediate" />
                  Apply immediately instead of waiting for the renewal date
                </label>
                <SubscriptionTotalPreview staffCount={values.staffCount} perStaffPrice={values.perStaffPrice} label="New total" />
              </Form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={submitForm} disabled={isSaving || isSubmitting}>
                {isSaving || isSubmitting ? <><Loader2 size={16} className="spin" /> Saving...</> : isEditing ? 'Save Changes' : 'Schedule Renewal'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            </div>
          </>
        )}
      </Formik>
    </Modal>
  );
};

export default RenewalQueueFormModal;
