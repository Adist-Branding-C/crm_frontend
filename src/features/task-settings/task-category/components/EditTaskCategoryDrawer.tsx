import { useEffect, useRef } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import type { EditTaskCategoryDrawerProps } from '../types/index';

const scrollToFirstError = (container: HTMLElement | null) => {
  if (!container) return;
  const errorEl = container.querySelector('.input-error');
  if (errorEl) {
    errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    (errorEl as HTMLElement).focus();
  }
};

const EditTaskCategoryDrawer = ({ isOpen, onClose, validationSchema, initialValues, onSubmit, isLoading, error, editingItem, isEditing = true }: EditTaskCategoryDrawerProps) => {
  const drawerBodyRef = useRef<HTMLDivElement>(null);
  const prevSubmitCountRef = useRef(0);

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
          <h5>Edit Task Category</h5>
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

              const formError = error;
              const showError = (field: string) => (touched as Record<string, boolean>)[field] || submitCount > 0;
              const fieldClass = (name: string) => `form-control${showError(name) && (errors as Record<string, string>)[name] ? ' input-error' : ''}`;

              return (
                <Form>
                  {formError && <ErrorMessage message={formError} />}

                  <div className="form-group">
                    <label>Category <span className="text-danger">*</span></label>
                    <Field type="text" name="category" className={fieldClass('category')} placeholder="Enter category" />
                    {showError('category') && errors.category && <small className="field-error-text">{errors.category}</small>}
                  </div>

                  <div className="form-group">
                    <label>Action <span className="text-danger">*</span></label>
                    <Field type="text" name="action" className={fieldClass('action')} placeholder="Enter action" />
                    {showError('action') && errors.action && <small className="field-error-text">{errors.action}</small>}
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

export default EditTaskCategoryDrawer;
