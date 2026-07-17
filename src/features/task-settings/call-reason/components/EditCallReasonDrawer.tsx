import { useEffect, useRef } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import { ScrollToFirstError } from '../../../../shared/components/ScrollToFirstError';
import type { EditCallReasonDrawerProps } from '../types/index';

const EditCallReasonDrawer = ({ isOpen, onClose, validationSchema, initialValues, onSubmit, isLoading, error, editingItem, isEditing = true }: EditCallReasonDrawerProps) => {
  const drawerBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error) {
      drawerBodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [error]);

  if (!isOpen || !editingItem) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer drawer-right" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h5>Edit Call Reason</h5>
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
              const fieldClass = (name: keyof typeof initialValues) =>
                `form-control${touched[name] && errors[name] ? ' input-error' : ''}`;

              return (
                <Form>
                  <ScrollToFirstError errors={errors} submitCount={submitCount} containerRef={drawerBodyRef} />
                  {error && <ErrorMessage message={error} />}

                  <div className="form-group">
                    <label>Reason <span className="text-danger">*</span></label>
                    <Field type="text" name="name" className={fieldClass('name')} placeholder="Enter call reason" />
                    <FormikError name="name" component="small" className="field-error-text" />
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

                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={isLoading || isSubmitting || (isEditing && !dirty)}>
                      {isLoading || isSubmitting ? <Loader2 size={16} className="spin" /> : 'Update'}
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

export default EditCallReasonDrawer;
