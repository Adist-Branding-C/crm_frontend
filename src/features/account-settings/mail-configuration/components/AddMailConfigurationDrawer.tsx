import { useRef, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import { scrollToFirstError } from '../../../task-settings/utils/scrollToFirstError';
import { MAIL_DRIVER_OPTIONS, ENCRYPTION_OPTIONS } from '../constants';
import type { AddMailConfigurationDrawerProps } from '../types';

const AddMailConfigurationDrawer = ({ isOpen, onClose, validationSchema, initialValues, onSubmit, isLoading, error, isEditing }: AddMailConfigurationDrawerProps) => {
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
          <h5>{isEditing ? 'Edit Mail Config' : 'Add Mail Config'}</h5>
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
                    <label>Mail Driver <span className="text-danger">*</span></label>
                    <Field as="select" name="driver" className={fieldClass('driver')}>
                      <option value="">Select Driver</option>
                      {MAIL_DRIVER_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </Field>
                    <FormikError name="driver" component="small" className="field-error-text" />
                  </div>

                  <div className="form-group">
                    <label>SMTP Host <span className="text-danger">*</span></label>
                    <Field type="text" name="host" className={fieldClass('host')} placeholder="mail.example.com" />
                    <FormikError name="host" component="small" className="field-error-text" />
                  </div>

                  <div className="form-group">
                    <label>Port <span className="text-danger">*</span></label>
                    <Field type="text" name="port" className={fieldClass('port')} placeholder="587" />
                    <FormikError name="port" component="small" className="field-error-text" />
                  </div>

                  <div className="form-group">
                    <label>Encryption <span className="text-danger">*</span></label>
                    <Field as="select" name="encryption" className={fieldClass('encryption')}>
                      <option value="">Select</option>
                      {ENCRYPTION_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </Field>
                    <FormikError name="encryption" component="small" className="field-error-text" />
                  </div>

                  <div className="form-group">
                    <label>Username</label>
                    <Field type="text" name="username" className={fieldClass('username')} placeholder="username" />
                    <FormikError name="username" component="small" className="field-error-text" />
                  </div>

                  {!isEditing && (
                    <div className="form-group">
                      <label>Password <span className="text-danger">*</span></label>
                      <Field type="password" name="password" className={fieldClass('password')} placeholder="password" />
                      <FormikError name="password" component="small" className="field-error-text" />
                    </div>
                  )}

                  <div className="form-group">
                    <label>From Email</label>
                    <Field type="email" name="fromEmail" className={fieldClass('fromEmail')} placeholder="noreply@example.com" />
                    <FormikError name="fromEmail" component="small" className="field-error-text" />
                  </div>

                  <div className="form-group">
                    <label>From Name</label>
                    <Field type="text" name="fromName" className={fieldClass('fromName')} placeholder="Company Name" />
                    <FormikError name="fromName" component="small" className="field-error-text" />
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

export default AddMailConfigurationDrawer;
