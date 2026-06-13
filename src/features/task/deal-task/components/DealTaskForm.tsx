import { Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../constants/dealTaskFormOptions';
import type { DealTaskFormProps } from '../types/deal-task-form.types';
import type { DealOption } from '../types/dealTask.types';

const DealTaskForm = ({
  validationSchema,
  initialValues,
  onSubmit,
  isLoading,
  error,
  isEditing,
  deals,
  dealListLoading,
  staffOptions,
}: DealTaskFormProps) => (
  <Formik
    enableReinitialize
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ errors, submitCount, setFieldValue }) => {
      const formError = error || (submitCount > 0 ? Object.values(errors)[0] : '');
      return (
        <Form>
          {formError && <ErrorMessage message={formError} />}

          <div className="form-group">
            <label>Title <span className="text-danger">*</span></label>
            <Field type="text" name="title" className="form-control" placeholder="Enter deal task title" />
          </div>

          <div className="form-group">
            <label>Description</label>
            <Field as="textarea" name="description" className="form-control" placeholder="Enter description" rows={3} />
          </div>

          <div className="form-group">
            <label>Deal</label>
            {dealListLoading ? (
              <div className="form-control" style={{ color: '#999' }}>Loading deals...</div>
            ) : (
              <Field as="select" name="deal" className="form-control" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const selectedDeal = deals.find((d: DealOption) => d.name === e.target.value);
                setFieldValue('deal', e.target.value);
                if (selectedDeal) {
                  setFieldValue('dealId', String(selectedDeal.id));
                  setFieldValue('amount', String(selectedDeal.amount));
                } else {
                  setFieldValue('dealId', '');
                  setFieldValue('amount', '');
                }
              }}>
                <option value="">Select a deal</option>
                {deals.map(d => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </Field>
            )}
          </div>

          <div className="form-group">
            <label>Amount</label>
            <Field type="text" name="amount" className="form-control" disabled />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Scheduled Date</label>
              <Field type="date" name="scheduledDate" className="form-control" />
            </div>
            <div className="form-group">
              <label>Scheduled Time</label>
              <Field type="time" name="scheduledTime" className="form-control" />
            </div>
          </div>

          <div className="form-group">
            <label>Assigned To</label>
            <Field as="select" name="assignedTo" className="form-control">
              <option value="">Select a staff member</option>
              {staffOptions.map(staff => (
                <option key={staff} value={staff}>{staff}</option>
              ))}
            </Field>
          </div>

          <div className="form-group">
            <label>Priority</label>
            <Field as="select" name="priority" className="form-control">
              <option value="">Select priority</option>
              {PRIORITY_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </Field>
          </div>

          <div className="form-group">
            <label>Status <span className="text-danger">*</span></label>
            <Field as="select" name="status" className="form-control">
              <option value="">Select status</option>
              {STATUS_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </Field>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? <Loader2 size={16} className="spin" /> : isEditing ? 'Update' : 'Save'}
            </button>
          </div>
        </Form>
      );
    }}
  </Formik>
);

export default DealTaskForm;
