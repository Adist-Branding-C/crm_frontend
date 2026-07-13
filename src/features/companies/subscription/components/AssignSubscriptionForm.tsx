import { Plus, Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import ValidationAlert from '../../../../shared/components/ValidationAlert';
import StaffPricingFields from './StaffPricingFields';
import SubscriptionTotalPreview from './SubscriptionTotalPreview';
import { assignSubscriptionValidationSchema } from '../validations/subscription.validation';
import { mapAssignFormToPayload } from '../mappers/subscriptionFormMapper';
import type { AssignSubscriptionFormValues, AssignSubscriptionFormProps } from '../types/component.types';

const INITIAL_VALUES: AssignSubscriptionFormValues = {
  validFrom: new Date().toISOString().slice(0, 10),
  durationInDays: 30,
  staffCount: '',
  perStaffPrice: '',
  remark: '',
};

const AssignSubscriptionForm = ({ companyId, isSaving, error, onClearError, onSubmit }: AssignSubscriptionFormProps) => {
  const handleSubmit = (values: AssignSubscriptionFormValues) => onSubmit(mapAssignFormToPayload(companyId, values));

  return (
    <div className="card subscription-empty-state">
      <div className="card-header">
        <h5>No Subscription Yet</h5>
      </div>
      <div className="card-body">
        <p className="subscription-empty-hint">This company doesn't have a subscription. Assign one to start billing.</p>
        <Formik initialValues={INITIAL_VALUES} validationSchema={assignSubscriptionValidationSchema} onSubmit={handleSubmit}>
          {({ values, errors, touched, isSubmitting, submitForm }) => (
            <>
              <ValidationAlert message={error || null} onClose={onClearError} />
              <Form>
                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date <span className="text-danger">*</span></label>
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
                <div className="form-group">
                  <label>Remark</label>
                  <Field as="textarea" name="remark" className="form-control" rows={2} placeholder="Optional note" />
                </div>
                <SubscriptionTotalPreview staffCount={values.staffCount} perStaffPrice={values.perStaffPrice} durationInDays={values.durationInDays} label="Total" />
                <button type="button" className="btn btn-primary" onClick={submitForm} disabled={isSaving || isSubmitting}>
                  {isSaving || isSubmitting ? <><Loader2 size={16} className="spin" /> Assigning...</> : <><Plus size={16} /> Assign Subscription</>}
                </button>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AssignSubscriptionForm;
