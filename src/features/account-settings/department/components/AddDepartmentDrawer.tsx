import { X, Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import type { AddDepartmentDrawerProps } from '../types/add-department-drawer.types';

const AddDepartmentDrawer = ({ isOpen, onClose, validationSchema, initialValues, onSubmit, isLoading, error, isEditing }: AddDepartmentDrawerProps) => {
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer drawer-right" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h5>{isEditing ? 'Edit Department' : 'Add Department'}</h5>
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
                    <label>Department Name <span className="text-danger">*</span></label>
                    <Field type="text" name="departmentName" className="form-control" placeholder="Enter department name" />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <Field as="textarea" name="description" className="form-control" placeholder="Enter description" rows={4} />
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
                      {isLoading ? <Loader2 size={16} className="spin" /> : (isEditing ? 'Update' : 'Save')}
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

export default AddDepartmentDrawer;
