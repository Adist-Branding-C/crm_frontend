import { Loader2 } from 'lucide-react';
import { Formik, Form } from 'formik';
import Modal from '../../../../shared/components/Modal';
import ValidationAlert from '../../../../shared/components/ValidationAlert';
import StaffPricingFields from './StaffPricingFields';
import SubscriptionTotalPreview from './SubscriptionTotalPreview';
import { editStaffCountValidationSchema } from '../validations/subscription.validation';
import type { UpdateStaffCountPayload } from '../types/request';
import type { EditStaffCountModalProps } from '../types/component.types';

const EditStaffCountModal = ({ isOpen, subscription, isSaving, error, onClearError, onSubmit, onClose }: EditStaffCountModalProps) => {
  const initialValues: UpdateStaffCountPayload = {
    staffCount: subscription.staffCount,
    perStaffPrice: subscription.perStaffPrice,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Staff Count">
      <Formik enableReinitialize initialValues={initialValues} validationSchema={editStaffCountValidationSchema} onSubmit={onSubmit}>
        {({ values, errors, touched, isSubmitting, submitForm }) => (
          <>
            <div className="modal-body">
              <ValidationAlert message={error || null} onClose={onClearError} />
              <Form>
                <StaffPricingFields errors={errors} touched={touched} />
                <SubscriptionTotalPreview staffCount={values.staffCount} perStaffPrice={values.perStaffPrice} durationInDays={subscription.durationInDays} label="New total" />
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
    </Modal>
  );
};

export default EditStaffCountModal;
