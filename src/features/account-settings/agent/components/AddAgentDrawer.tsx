import { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import DrawerShell from '../../../../shared/components/crud/DrawerShell';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import { sanitizePhoneDigits } from '../../../../shared/utils/phone.util';
import { scrollToFirstError } from '../../../../shared/utils/scrollToError.util';
import type { AddAgentDrawerProps } from '../types/add-agent-drawer.types';

const AddAgentDrawer = ({ visibility, form, status, designation, department }: AddAgentDrawerProps) => {
  const { isOpen, onClose } = visibility;
  const { validationSchema, initialValues, onSubmit, isEditing } = form;
  const { isLoading, error } = status;
  const { options: designationOptions, onFetch: onFetchDesignations } = designation;
  const { options: departmentOptions, onFetch: onFetchDepartments } = department;
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

  return (
    <DrawerShell isOpen={isOpen} title={isEditing ? 'Edit Staff' : 'Add Staff'} onClose={onClose} bodyRef={drawerBodyRef}>
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

          const formError = error;
          const showError = (field: string) => (touched as Record<string, boolean>)[field] || submitCount > 0;
          const fieldClass = (name: string) => `form-control${showError(name) && (errors as Record<string, string>)[name] ? ' input-error' : ''}`;

          return (
            <Form noValidate>
              {formError && <ErrorMessage message={formError} />}

              <div className="form-group">
                <label>Name <span className="text-danger">*</span></label>
                <Field type="text" name="fullName" className={fieldClass('fullName')} placeholder="Enter name" />
                {showError('fullName') && errors.fullName && <small className="field-error-text">{errors.fullName}</small>}
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
                        const sanitized = sanitizePhoneDigits(e.target.value);
                        setFieldValue('phone', sanitized);
                      }}
                      onBlur={(e) => {
                        const sanitized = sanitizePhoneDigits(e.target.value);
                        setFieldValue('phone', sanitized);
                        setFieldTouched('phone', true);
                      }}
                    />
                  )}
                </Field>
                {showError('phone') && errors.phone && <small className="field-error-text">{errors.phone}</small>}
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
                {showError('email') && errors.email && <small className="field-error-text">{errors.email}</small>}
              </div>

              {!isEditing && (
                <>
                  <div className="form-group">
                    <label>Password <span className="text-danger">*</span></label>
                    <Field type="password" name="password" className={fieldClass('password')} placeholder="Enter password" />
                    {showError('password') && errors.password && <small className="field-error-text">{errors.password}</small>}
                  </div>
                  <div className="form-group">
                    <label>Confirm Password <span className="text-danger">*</span></label>
                    <Field type="password" name="confirmPassword" className={fieldClass('confirmPassword')} placeholder="Enter confirm password" />
                    {showError('confirmPassword') && errors.confirmPassword && <small className="field-error-text">{errors.confirmPassword}</small>}
                  </div>
                </>
              )}

              {!isEditing && (
                <div className="checkbox-group">
                  <label className="checkbox-item">
                    <Field type="checkbox" name="isAdmin" />
                    <span>Make this staff member an Admin</span>
                  </label>
                </div>
              )}

              <div className="form-group">
                <label>Designation <span className="text-danger">*</span></label>
                <Field as="select" name="designationId" className={fieldClass('designationId')}>
                  <option value="">Select designation</option>
                  {designationOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </Field>
                {showError('designationId') && errors.designationId && <small className="field-error-text">{errors.designationId}</small>}
              </div>

              <div className="form-group">
                <label>Department <span className="text-danger">*</span></label>
                <Field as="select" name="departmentId" className={fieldClass('departmentId')}>
                  <option value="">Select department</option>
                  {departmentOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </Field>
                {showError('departmentId') && errors.departmentId && <small className="field-error-text">{errors.departmentId}</small>}
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
                  {isLoading || isSubmitting ? <Loader2 size={16} className="spin" /> : 'Save'}
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

export default AddAgentDrawer;
