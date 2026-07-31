import { useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import ErrorMessage from '../../../../shared/components/ErrorMessage';
import { ScrollToFirstError } from '../../../../shared/components/ScrollToFirstError';
import { scrollContainerToTop } from '../../../../shared/utils/scrollToError.util';
import { PRIORITY_OPTIONS } from '../constants/priorityOptions';
import { STATUS_OPTIONS } from '../constants/statusOptions';
import { getFieldClassName } from '../utils/fieldClassName';
import type { GenericTaskFormProps } from '../types/genericTaskForm.types';

const GenericTaskForm = ({
  validationSchema,
  initialValues,
  onSubmit,
  isLoading,
  error,
  isEditing,
  staffOptions,
  staffLoading,
  leadOptions,
  leadLoading,
  associationOptions,
  associationLoading,
  associationFieldName = 'leadId',
  associationLabel = 'Lead',
  associationPlaceholder = 'Select a lead',
  associationLoadingLabel = 'Loading leads...',
  associationEmptyMessage = 'No leads available. Please create a lead first.',
  categoryOptions,
  categoryLoading,
  hideCategory = false,
  children,
}: GenericTaskFormProps) => {
  const staffEmpty = !staffLoading && staffOptions.length === 0;
  const resolvedAssociationOptions = associationOptions ?? leadOptions ?? [];
  const resolvedAssociationLoading = associationLoading ?? leadLoading ?? false;
  const associationEmpty = !resolvedAssociationLoading && resolvedAssociationOptions.length === 0;
  const categoryEmpty = !categoryLoading && (categoryOptions ?? []).length === 0;
  const drawerBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error) {
      scrollContainerToTop(drawerBodyRef.current);
    }
  }, [error]);

  return (
    <div ref={drawerBodyRef}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, dirty, submitCount, isSubmitting }) => {
          const fieldClass = (name: string) => getFieldClassName(
            name,
            touched as Record<string, boolean | undefined>,
            errors as Record<string, string | undefined>,
          );

          return (
            <Form>
              <ScrollToFirstError errors={errors} submitCount={submitCount} containerRef={drawerBodyRef} />
              {error && <ErrorMessage message={error} />}

              <div className="form-group">
                <label>Title <span className="text-danger">*</span></label>
                <Field type="text" name="title" className={fieldClass('title')} placeholder="Enter task title" />
                <FormikError name="title" component="small" className="field-error-text" />
              </div>

              <div className="form-group">
                <label>Description <span className="text-danger">*</span></label>
                <Field as="textarea" name="description" className={fieldClass('description')} placeholder="Enter description" rows={3} />
                <FormikError name="description" component="small" className="field-error-text" />
              </div>

              {!hideCategory && categoryOptions && (
                <div className="form-group">
                  <label>Category <span className="text-danger">*</span></label>
                  <Field
                    as="select"
                    name="categoryId"
                    className={fieldClass('categoryId')}
                    disabled={categoryLoading || categoryEmpty}
                  >
                    <option value="">{categoryLoading ? 'Loading...' : 'Select a category'}</option>
                    {categoryOptions.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </Field>
                  {categoryEmpty ? (
                    <small className="field-error-text">
                      No task categories available. Please create a category first.
                    </small>
                  ) : (
                    <FormikError name="categoryId" component="small" className="field-error-text" />
                  )}
                </div>
              )}

              {children}

              <div className="form-row">
                <div className="form-group">
                  <label>Scheduled Date <span className="text-danger">*</span></label>
                  <Field type="date" name="scheduledDate" className={fieldClass('scheduledDate')} />
                  <FormikError name="scheduledDate" component="small" className="field-error-text" />
                </div>
                <div className="form-group">
                  <label>Scheduled Time <span className="text-danger">*</span></label>
                  <Field type="time" name="scheduledTime" className={fieldClass('scheduledTime')} />
                  <FormikError name="scheduledTime" component="small" className="field-error-text" />
                </div>
              </div>

              <div className="form-group">
                <label>Assigned To <span className="text-danger">*</span></label>
                <Field
                  as="select"
                  name="assignedTo"
                  className={fieldClass('assignedTo')}
                  disabled={staffLoading || staffEmpty}
                >
                  <option value="">{staffLoading ? 'Loading staff...' : 'Select a staff member'}</option>
                  {staffOptions.map(staff => (
                    <option key={staff.value} value={staff.value}>{staff.label}</option>
                  ))}
                </Field>
                {staffEmpty ? (
                  <small className="field-error-text">
                    No staff members available. Please add a staff member first.
                  </small>
                ) : (
                  <FormikError name="assignedTo" component="small" className="field-error-text" />
                )}
              </div>

              <div className="form-group">
                <label>{associationLabel} <span className="text-danger">*</span></label>
                <Field
                  as="select"
                  name={associationFieldName}
                  className={fieldClass(associationFieldName)}
                  disabled={resolvedAssociationLoading || associationEmpty}
                >
                  <option value="">{resolvedAssociationLoading ? associationLoadingLabel : associationPlaceholder}</option>
                  {resolvedAssociationOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </Field>
                {associationEmpty ? (
                  <small className="field-error-text">{associationEmptyMessage}</small>
                ) : (
                  <FormikError name={associationFieldName} component="small" className="field-error-text" />
                )}
              </div>

              <div className="form-group">
                <label>Priority <span className="text-danger">*</span></label>
                <Field as="select" name="priority" className={fieldClass('priority')}>
                  <option value="">Select priority</option>
                  {PRIORITY_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </Field>
                <FormikError name="priority" component="small" className="field-error-text" />
              </div>

              <div className="form-group">
                <label>Status <span className="text-danger">*</span></label>
                <Field as="select" name="status" className={fieldClass('status')}>
                  <option value="">Select status</option>
                  {STATUS_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </Field>
                <FormikError name="status" component="small" className="field-error-text" />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={isLoading || isSubmitting || (isEditing && !dirty)}>
                  {isLoading || isSubmitting ? <Loader2 size={16} className="spin" /> : isEditing ? 'Update' : 'Save'}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default GenericTaskForm;