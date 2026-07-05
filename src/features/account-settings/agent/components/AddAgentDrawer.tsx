import { useEffect, useRef, useCallback } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import { scrollToFirstError } from '../../../task-settings/utils/scrollToFirstError';
import type { AddAgentDrawerProps } from '../types';

const AddAgentDrawer = ({ isOpen, onClose, validationSchema, initialValues, onSubmit, isLoading, error, isEditing, designationOptions, onFetchDesignations, departmentOptions, onFetchDepartments }: AddAgentDrawerProps) => {
  const drawerBodyRef = useRef<HTMLDivElement>(null);
  const prevSubmitCountRef = useRef(0);

  useEffect(() => {
    if (isOpen) {
      onFetchDesignations();
      onFetchDepartments();
    }
  }, [isOpen, onFetchDesignations, onFetchDepartments]);

  useEffect(() => {
    if (error) {
      drawerBodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [error]);

  const sanitizePhone = useCallback((raw: string) => raw.replace(/\D/g, '').slice(0, 10), []);

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
        <div className="drawer-body" ref={drawerBodyRef}>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched, dirty, submitCount, isSubmitting, setFieldValue, setFieldTouched }) => {
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
                    <label>Name <span className="text-danger">*</span></label>
                    <Field type="text" name="fullName" className={fieldClass('fullName')} placeholder="Enter name" />
                    <FormikError name="fullName" component="small" className="field-error-text" />
                  </div>

                  <div className="form-group">
                    <label>Phone Number <span className="text-danger">*</span></label>
                    <Field name="phone">
                      {({ field }: { field: any }) => (
                        <input
                          {...field}
                          type="text"
                          maxLength={10}
                          className={fieldClass('phone')}
                          placeholder="Enter phone number"
                          onChange={(e) => {
                            const sanitized = sanitizePhone(e.target.value);
                            setFieldValue('phone', sanitized);
                          }}
                          onBlur={(e) => {
                            const sanitized = sanitizePhone(e.target.value);
                            setFieldValue('phone', sanitized);
                            setFieldTouched('phone', true);
                          }}
                        />
                      )}
                    </Field>
                    <FormikError name="phone" component="small" className="field-error-text" />
                  </div>

                  <div className="form-group">
                    <label>Email <span className="text-danger">*</span></label>
                    <Field name="email">
                      {({ field }: { field: any }) => (
                        <input
                          {...field}
                          type="email"
                          className={fieldClass('email')}
                          placeholder="Enter email"
                          onChange={(e) => {
                            setFieldValue('email', e.target.value.trimStart());
                          }}
                          onBlur={(e) => {
                            setFieldValue('email', e.target.value.trim());
                            setFieldTouched('email', true);
                          }}
                        />
                      )}
                    </Field>
                    <FormikError name="email" component="small" className="field-error-text" />
                  </div>

                  {!isEditing && (
                    <>
                      <div className="form-group">
                        <label>Password <span className="text-danger">*</span></label>
                        <Field type="password" name="password" className={fieldClass('password')} placeholder="Enter password" />
                        <FormikError name="password" component="small" className="field-error-text" />
                      </div>
                      <div className="form-group">
                        <label>Confirm Password <span className="text-danger">*</span></label>
                        <Field type="password" name="confirmPassword" className={fieldClass('confirmPassword')} placeholder="Enter confirm password" />
                        <FormikError name="confirmPassword" component="small" className="field-error-text" />
                      </div>
                    </>
                  )}

                  <div className="form-group">
                    <label>Designation <span className="text-danger">*</span></label>
                    <Field as="select" name="designationId" className={fieldClass('designationId')}>
                      <option value="">Select designation</option>
                      {designationOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </Field>
                    <FormikError name="designationId" component="small" className="field-error-text" />
                  </div>

                  <div className="form-group">
                    <label>Department <span className="text-danger">*</span></label>
                    <Field as="select" name="departmentId" className={fieldClass('departmentId')}>
                      <option value="">Select department</option>
                      {departmentOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </Field>
                    <FormikError name="departmentId" component="small" className="field-error-text" />
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
                      {isLoading || isSubmitting ? <Loader2 size={16} className="spin" /> : 'Save'}
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
