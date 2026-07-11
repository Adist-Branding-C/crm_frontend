import { Plus, Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import ValidationAlert from '../../../../shared/components/ValidationAlert';
import StaffPricingFields from './StaffPricingFields';
import SubscriptionTotalPreview from './SubscriptionTotalPreview';
import { assignSubscriptionValidationSchema } from '../validations/subscription.validation';
import type { CreateSubscriptionPayload } from '../types/request';

interface AssignSubscriptionFormValues {
  validFrom: string;
  durationInDays: number | '';
  staffCount: number | '';
  perStaffPrice: number | '';
  remark: string;
}

interface Props {
  companyId: string;
  isSaving: boolean;
  error: string;
  onClearError: () => void;
  onSubmit: (payload: CreateSubscriptionPayload) => Promise<boolean>;
}

const INITIAL_VALUES: AssignSubscriptionFormValues = {
  validFrom: new Date().toISOString().slice(0, 10),
  durationInDays: 30,
  staffCount: '',
  perStaffPrice: '',
  remark: '',
};

function addDays(dateStr: string, days: number): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

const AssignSubscriptionForm = ({ companyId, isSaving, error, onClearError, onSubmit }: Props) => {
  const handleSubmit = (values: AssignSubscriptionFormValues) => {
    const durationInDays = Number(values.durationInDays);
    const staffCount = Number(values.staffCount);
    const perStaffPrice = Number(values.perStaffPrice);
    const payload: CreateSubscriptionPayload = {
      companyId,
      validFrom: new Date(values.validFrom).toISOString(),
      validUpto: addDays(values.validFrom, durationInDays),
      durationInDays,
      staffCount,
      perStaffPrice,
      totalPrice: staffCount * perStaffPrice,
    };
    if (values.remark.trim()) payload.remark = values.remark.trim();
    return onSubmit(payload);
  };

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
                <SubscriptionTotalPreview staffCount={values.staffCount} perStaffPrice={values.perStaffPrice} label="Total" />
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
