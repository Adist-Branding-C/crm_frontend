import { useRef, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import { scrollToFirstError } from '../../../task-settings/utils/scrollToFirstError';
import type { AddCheckoutNoteDrawerProps } from '../types';

const AddCheckoutNoteDrawer = ({ isOpen, onClose, validationSchema, initialValues, onSubmit, isLoading, error, isEditing }: AddCheckoutNoteDrawerProps) => {
  const drawerBodyRef = useRef<HTMLDivElement>(null);
  const prevSubmitCountRef = useRef(0);

  useEffect(() => {
    if (error) {
      drawerBodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [error]);

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer drawer-right" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h5>{isEditing ? 'Edit Checkout Note' : 'Add Checkout Note'}</h5>
          <button className="drawer-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="drawer-body" ref={drawerBodyRef}>
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

              const fieldClass = (name: keyof typeof initialValues) => `form-control${touched[name] && errors[name] ? ' input-error' : ''}`;

              return (
                <Form>
                  {error && <ErrorMessage message={error} />}

                  <div className="form-group">
                    <label>Title <span className="text-danger">*</span></label>
                    <Field type="text" name="title" className={fieldClass('title')} placeholder="Enter title" />
                    <FormikError name="title" component="small" className="field-error-text" />
                  </div>

                  <div className="form-group">
                    <label>Note <span className="text-danger">*</span></label>
                    <Field as="textarea" name="note" className={fieldClass('note')} placeholder="Enter checkout note" rows={4} />
                    <FormikError name="note" component="small" className="field-error-text" />
                  </div>

                  <div className="form-group">
                    <label>Status <span className="text-danger">*</span></label>
                    <Field as="select" name="status" className={fieldClass('status')}>
                      <option value="">Select status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Field>
                    <FormikError name="status" component="small" className="field-error-text" />
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
        </div>
      </div>
    </div>
  );
};

export default AddCheckoutNoteDrawer;
