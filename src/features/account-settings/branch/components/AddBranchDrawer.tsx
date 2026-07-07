import { useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import DrawerShell from '../../../../shared/components/crud/DrawerShell';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import { scrollToFirstError } from '../../../../shared/utils/scrollToError.util';
import type { AddBranchDrawerProps } from '../types/add-branch-drawer.types';

const AddBranchDrawer = ({ visibility, form, status }: AddBranchDrawerProps) => {
  const { isOpen, onClose } = visibility;
  const { validationSchema, initialValues, onSubmit, isEditing } = form;
  const { isLoading, error } = status;
  const drawerBodyRef = useRef<HTMLDivElement>(null);
  const prevSubmitCountRef = useRef(0);

  return (
    <DrawerShell isOpen={isOpen} title={isEditing ? 'Edit Branch' : 'Add Branch'} onClose={onClose} bodyRef={drawerBodyRef}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, dirty, submitCount, isSubmitting }) => {
          if (submitCount > prevSubmitCountRef.current) {
            prevSubmitCountRef.current = submitCount;
            if (Object.keys(errors).length > 0) {
              requestAnimationFrame(() => scrollToFirstError(drawerBodyRef.current));
            }
          }

          const formError = error;
          const showError = (field: string) => (touched as Record<string, boolean>)[field] || submitCount > 0;
          const fieldClass = (name: string) => `form-control${showError(name) && (errors as Record<string, string>)[name] ? ' input-error' : ''}`;

          return (
            <Form>
              {formError && <ErrorMessage message={formError} />}

              <div className="form-group">
                <label>Branch Name <span className="text-danger">*</span></label>
                <Field type="text" name="name" className={fieldClass('name')} placeholder="Enter branch name" />
                {showError('name') && errors.name && <small className="field-error-text">{errors.name}</small>}
              </div>

              <div className="form-group">
                <label>Description</label>
                <Field as="textarea" name="description" className={fieldClass('description')} placeholder="Enter description" rows={4} />
                {showError('description') && errors.description && <small className="field-error-text">{errors.description}</small>}
              </div>

              <div className="form-group">
                <label>Status <span className="text-danger">*</span></label>
                <Field as="select" name="status" className={fieldClass('status')}>
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Field>
                {showError('status') && errors.status && <small className="field-error-text">{errors.status}</small>}
              </div>

              <div className="form-actions flex flex-col sm:flex-row gap-3">
                <button type="submit" className="btn btn-primary" disabled={isLoading || isSubmitting || (isEditing && !dirty)}>
                  {isLoading || isSubmitting ? <Loader2 size={16} className="spin" /> : (isEditing ? 'Update' : 'Save')}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </DrawerShell>
  );
};

export default AddBranchDrawer;
