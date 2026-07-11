import { X, Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import ValidationAlert from '../../../../shared/components/ValidationAlert';
import { renewalQueueValidationSchema } from '../validations/subscription.validation';
import type { RenewalQueueEntry } from '../types';

export interface RenewalQueueFormValues {
  renewalDate: string;
  validFrom: string;
  durationInDays: number | '';
  staffCount: number | '';
  perStaffPrice: number | '';
  immediate: boolean;
}

interface Props {
  isOpen: boolean;
  editingQueue: RenewalQueueEntry | null;
  isSaving: boolean;
  error: string;
  onClearError: () => void;
  onSubmit: (values: RenewalQueueFormValues) => Promise<boolean>;
  onClose: () => void;
}

const today = () => new Date().toISOString().slice(0, 10);

const RenewalQueueFormModal = ({ isOpen, editingQueue, isSaving, error, onClearError, onSubmit, onClose }: Props) => {
  if (!isOpen) return null;

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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h5>{isEditing ? 'Edit Scheduled Renewal' : 'Schedule Renewal'}</h5>
          <button type="button" className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>
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
                  <label className="checkbox-item">
                    <Field type="checkbox" name="immediate" />
                    Apply immediately instead of waiting for the renewal date
                  </label>
                  <div className="subscription-total-preview">
                    New total: <strong>₹{((Number(values.staffCount) || 0) * (Number(values.perStaffPrice) || 0)).toLocaleString()}</strong>
                  </div>
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
      </div>
    </div>
  );
};

export default RenewalQueueFormModal;
