import { Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import { STATUS_OPTIONS } from '../constants/callTaskFormOptions';
import type { CallTaskFormProps } from '../types/call-task-form.types';

const CallTaskForm = ({
  validationSchema,
  initialValues,
  onSubmit,
  isLoading,
  error,
  isEditing,
  staffOptions,
}: CallTaskFormProps) => (
  <Formik
    enableReinitialize
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ errors, submitCount }) => {
      const formError = error || (submitCount > 0 ? Object.values(errors)[0] : '');
      return (
        <Form>
          {formError && <ErrorMessage message={formError} />}

          <div className="form-group">
            <label>Title <span className="text-danger">*</span></label>
            <Field type="text" name="title" className="form-control" placeholder="Enter call task title" />
          </div>

          <div className="form-group">
            <label>Description</label>
            <Field as="textarea" name="description" className="form-control" placeholder="Enter description" rows={3} />
          </div>

          <div className="form-group">
            <label>Contact Name</label>
            <Field type="text" name="contactName" className="form-control" placeholder="Enter contact name" />
          </div>

          <div className="form-group">
            <label>Contact Phone</label>
            <Field type="text" name="contactPhone" className="form-control" placeholder="Enter contact phone" />
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
            <label>Duration</label>
            <Field type="text" name="duration" className="form-control" placeholder="e.g. 30 min" />
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

export default CallTaskForm;
