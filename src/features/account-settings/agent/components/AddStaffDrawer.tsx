import { X, Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import ErrorMessage from '../../../../shared/components/ErrorMessage';

interface AddStaffFormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  designation: string;
}

interface AddStaffDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<AddStaffFormData>;
  initialValues: AddStaffFormData;
  onSubmit: (values: AddStaffFormData, helpers: FormikHelpers<AddStaffFormData>) => void | Promise<void>;
  isLoading: boolean;
  error: string;
}

const AddStaffDrawer = ({ isOpen, onClose, validationSchema, initialValues, onSubmit, isLoading, error }: AddStaffDrawerProps) => {
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer drawer-right" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h5>Add Staff</h5>
          <button className="drawer-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="drawer-body">
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
                    <label>Name <span className="text-danger">*</span></label>
                    <Field type="text" name="name" className="form-control" placeholder="Enter name" />
                  </div>

                  <div className="form-group">
                    <label>Phone Number <span className="text-danger">*</span></label>
                    <Field type="text" name="phone" className="form-control" placeholder="Enter phone number" />
                  </div>

                  <div className="form-group">
                    <label>Email <span className="text-danger">*</span></label>
                    <Field type="email" name="email" className="form-control" placeholder="Enter email" />
                  </div>

                  <div className="form-group">
                    <label>Password <span className="text-danger">*</span></label>
                    <Field type="password" name="password" className="form-control" placeholder="Enter password" />
                  </div>

                  <div className="form-group">
                    <label>Confirm Password <span className="text-danger">*</span></label>
                    <Field type="password" name="confirmPassword" className="form-control" placeholder="Enter confirm password" />
                  </div>

                  <div className="form-group">
                    <label>Role <span className="text-danger">*</span></label>
                    <Field as="select" name="role" className="form-control">
                      <option value="">Select role</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Staff">Staff</option>
                    </Field>
                  </div>

                  <div className="form-group">
                    <label>Designation</label>
                    <Field type="text" name="designation" className="form-control" placeholder="Enter designation" />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                      {isLoading ? <Loader2 size={16} className="spin" /> : 'Save'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddStaffDrawer;
