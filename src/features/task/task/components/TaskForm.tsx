import { Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../constants/taskFormOptions';
import type { TaskFormProps } from '../types/task-form.types';

const TaskForm = ({
  validationSchema,
  initialValues,
  onSubmit,
  isLoading,
  error,
  isEditing,
  categoryOptions,
  staffOptions,
}: TaskFormProps) => (
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
            <Field type="text" name="title" className="form-control" placeholder="Enter task title" />
          </div>

          <div className="form-group">
            <label>Description</label>
            <Field as="textarea" name="description" className="form-control" placeholder="Enter description" rows={3} />
          </div>

          <div className="form-group">
            <label>Category</label>
            <Field as="select" name="category" className="form-control">
              <option value="">Select a category</option>
              {categoryOptions.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Field>
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

export default TaskForm;
