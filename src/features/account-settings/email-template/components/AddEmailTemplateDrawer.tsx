import { useEffect, useRef } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import type { AddEmailTemplateDrawerProps } from '../types/add-email-template-drawer.types';

const scrollToFirstError = (container: HTMLElement | null) => {
  if (!container) return;
  const errorEl = container.querySelector('.input-error');
  if (errorEl) {
    errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    (errorEl as HTMLElement).focus();
  }
};

const AddEmailTemplateDrawer = ({ isOpen, onClose, validationSchema, initialValues, onSubmit, isLoading, error, isEditing }: AddEmailTemplateDrawerProps) => {
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
          <h5>{isEditing ? 'Edit Email Template' : 'Add Email Template'}</h5>
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
                    <label>Template Name <span className="text-danger">*</span></label>
                    <Field type="text" name="templateName" className={fieldClass('templateName')} placeholder="Enter template name" />
                    {showError('templateName') && errors.templateName && <small className="field-error-text">{errors.templateName}</small>}
                  </div>

                  <div className="form-group">
                    <label>Subject <span className="text-danger">*</span></label>
                    <Field type="text" name="subject" className={fieldClass('subject')} placeholder="Enter email subject" />
                    {showError('subject') && errors.subject && <small className="field-error-text">{errors.subject}</small>}
                  </div>

                  <div className="form-group">
                    <label>Content <span className="text-danger">*</span></label>
                    <Field as="textarea" name="content" className={fieldClass('content')} placeholder="Enter template content" rows={6} />
                    {showError('content') && errors.content && <small className="field-error-text">{errors.content}</small>}
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
        </div>
      </div>
    </div>
  );
};

export default AddEmailTemplateDrawer;
