import { useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import DrawerShell from '../../../../shared/components/crud/DrawerShell';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import { scrollToFirstError } from '../../../../shared/utils/scrollToError.util';
import type { AddWorkModeDrawerProps } from '../types/add-work-mode-drawer.types';

const AddWorkModeDrawer = ({ isOpen, onClose, validationSchema, initialValues, onSubmit, isLoading, error, isEditing }: AddWorkModeDrawerProps) => {
  const drawerBodyRef = useRef<HTMLDivElement>(null);
  const prevSubmitCountRef = useRef(0);

  return (
    <DrawerShell isOpen={isOpen} title={isEditing ? 'Edit Work Mode' : 'Add Work Mode'} onClose={onClose} bodyRef={drawerBodyRef}>
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
            <Form noValidate>
              {formError && <ErrorMessage message={formError} />}

              <div className="form-group">
                <label>Work Mode Name <span className="text-danger">*</span></label>
                <Field type="text" name="workModeName" className={fieldClass('workModeName')} placeholder="Enter work mode name" />
                {showError('workModeName') && errors.workModeName && <small className="field-error-text">{errors.workModeName}</small>}
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

export default AddWorkModeDrawer;
