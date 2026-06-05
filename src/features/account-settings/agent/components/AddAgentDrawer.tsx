import { useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import type { AgentFormData, DesignationOption } from '../types/agent.types';

interface AddAgentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: AgentFormData;
  onSubmit: (values: AgentFormData, helpers: FormikHelpers<AgentFormData>) => void | Promise<void>;
  isLoading: boolean;
  error: string;
  isEditing: boolean;
  designationOptions: DesignationOption[];
  onFetchDesignations: () => void;
}

const AddAgentDrawer = ({ isOpen, onClose, validationSchema, initialValues, onSubmit, isLoading, error, isEditing, designationOptions, onFetchDesignations }: AddAgentDrawerProps) => {
  useEffect(() => {
    if (isOpen) {
      onFetchDesignations();
    }
  }, [isOpen, onFetchDesignations]);

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer drawer-right" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h5>{isEditing ? 'Edit Staff' : 'Add Staff'}</h5>
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
                    <Field type="text" name="fullName" className="form-control" placeholder="Enter name" />
                  </div>

                  <div className="form-group">
                    <label>Phone Number <span className="text-danger">*</span></label>
                    <Field type="text" name="phone" className="form-control" placeholder="Enter phone number" />
                  </div>

                  <div className="form-group">
                    <label>Email <span className="text-danger">*</span></label>
                    <Field type="email" name="email" className="form-control" placeholder="Enter email" />
                  </div>

                  {!isEditing && (
                    <>
                      <div className="form-group">
                        <label>Password <span className="text-danger">*</span></label>
                        <Field type="password" name="password" className="form-control" placeholder="Enter password" />
                      </div>
                      <div className="form-group">
                        <label>Confirm Password <span className="text-danger">*</span></label>
                        <Field type="password" name="confirmPassword" className="form-control" placeholder="Enter confirm password" />
                      </div>
                    </>
                  )}

                  <div className="form-group">
                    <label>Designation</label>
                    <Field as="select" name="designationId" className="form-control">
                      <option value="">Select designation</option>
                      {designationOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </Field>
                  </div>

                  <div className="form-group">
                    <label>Status <span className="text-danger">*</span></label>
                    <Field as="select" name="status" className="form-control">
                      <option value="">Select status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Field>
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

export default AddAgentDrawer;
