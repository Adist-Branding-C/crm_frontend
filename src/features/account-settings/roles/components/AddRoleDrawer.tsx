import { useRef, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import { MODULES, PERMISSIONS, PERMISSION_LABELS, type PermissionKey } from '../../../../shared/constants/modules';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import { hasSelectedPermission } from '../utils/roleFormData.util';
import type { AddRoleDrawerProps } from '../types/add-role-drawer.types';

const scrollToFirstError = (container: HTMLElement | null) => {
  if (!container) return;
  const errorEl = container.querySelector('.input-error');
  if (errorEl) {
    errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    (errorEl as HTMLElement).focus();
  }
};

const AddRoleDrawer = ({ isOpen, onClose, validationSchema, initialValues, onSubmit, isLoading, error, isEditing }: AddRoleDrawerProps) => {
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
          <h5>{isEditing ? 'Edit Role' : 'Add Role'}</h5>
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
            {({ errors, touched, submitCount, isSubmitting, values, setFieldValue }) => {
              if (submitCount > prevSubmitCountRef.current) {
                prevSubmitCountRef.current = submitCount;
                if (Object.keys(errors).length > 0) {
                  requestAnimationFrame(() => scrollToFirstError(drawerBodyRef.current));
                }
              }

              const formError = error;
              const showError = (field: string) => (touched as Record<string, boolean>)[field] || submitCount > 0;
              const fieldClass = (name: string) => `form-control${showError(name) && (errors as Record<string, string>)[name] ? ' input-error' : ''}`;

              const saveDisabled =
                isLoading ||
                isSubmitting ||
                !values.roleName.trim() ||
                !hasSelectedPermission(values.permissions);

              const toggleModuleAll = (moduleKey: string, currentState: Record<string, boolean>) => {
                const allOn = PERMISSIONS.every((permission) => currentState[permission]);
                PERMISSIONS.forEach((permission) => {
                  setFieldValue(`permissions.${moduleKey}.${permission}`, !allOn);
                });
              };

              return (
                <Form noValidate>
                  {formError && <ErrorMessage message={formError} />}

                  <div className="form-group">
                    <label>Role Name <span className="text-danger">*</span></label>
                    <Field type="text" name="roleName" className={fieldClass('roleName')} placeholder="Enter role name" />
                    {showError('roleName') && errors.roleName && <small className="field-error-text">{errors.roleName}</small>}
                  </div>

                  <div className="form-group">
                    <label>Can access web</label>
                    <label className="checkbox-item" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0' }}>
                      <Field type="checkbox" name="canAccessWeb" style={{ width: '16px', height: '16px', flexShrink: 0, accentColor: 'var(--primary)', margin: '0' }} />
                      <span style={{ lineHeight: 1.4 }}>Allow this role to log in to the web app</span>
                    </label>
                  </div>

                  <div className="form-group">
                    <label>Module Permissions <span className="text-danger">*</span></label>
                    <div className="role-permission-table">
                      <div className="role-permission-head">
                        <span className="role-permission-module">Module</span>
                        {PERMISSIONS.map((permission: PermissionKey) => (
                          <span key={permission} className="role-permission-cell">{PERMISSION_LABELS[permission]}</span>
                        ))}
                      </div>
                      {MODULES.map((module) => {
                        const moduleState = values.permissions?.[module.key] ?? {};
                        const allOn = PERMISSIONS.every((permission) => moduleState[permission]);
                        return (
                          <div className="role-permission-row" key={module.key}>
                            <span className="role-permission-module">
                              {module.label}
                              <button
                                type="button"
                                className={`role-select-all${allOn ? ' active' : ''}`}
                                onClick={() => toggleModuleAll(module.key, moduleState)}
                              >
                                {allOn ? 'Deselect all' : 'Select all'}
                              </button>
                            </span>
                            {PERMISSIONS.map((permission: PermissionKey) => (
                              <span className="role-permission-cell" key={permission}>
                                <label className="role-checkbox">
                                  <Field
                                    type="checkbox"
                                    name={`permissions.${module.key}.${permission}`}
                                    className="role-checkbox-input"
                                  />
                                  <span className="role-checkbox-mark" />
                                </label>
                              </span>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="form-actions flex flex-col sm:flex-row gap-3">
                    <button type="submit" className="btn btn-primary" disabled={saveDisabled}>
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

export default AddRoleDrawer;
