import { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import { scrollToFirstError } from '../../task-settings/utils/scrollToFirstError';
import { ACTION_SAVE, ACTION_UPDATE, ACTION_CANCEL } from '../../../shared/constants/actionLabels';
import { useDealFormOptions } from '../hooks/useDealFormOptions';
import { useDealAdditionalFieldDefs } from '../hooks/useDealAdditionalFieldDefs';
import DealDynamicAdditionalFields from './DealDynamicAdditionalFields';
import type { DealFormProps } from '../types';
import '../../../shared/components/drawers/AddLeadDrawer.css';

/**
 * Deal add/edit form content — follows the exact same Formik + Yup pattern
 * as CampaignForm.
 *
 * Key behaviours (mirroring CampaignForm):
 * - Formik manages all form state, touched tracking, and Yup validation.
 * - `enableReinitialize` so the form resets when switching between add/edit.
 * - `prevSubmitCountRef` + `scrollToFirstError` on failed submit.
 * - `input-error` class on fields that are both touched and invalid.
 * - `text-danger` asterisk on required labels.
 * - `Loader2` spinner while saving; submit disabled when pristine in edit mode.
 */
const DealForm = ({
  editingItem,
  validationSchema,
  initialValues,
  onSubmit,
  isLoading,
  error,
  onCancel,
  scrollContainerRef,
}: DealFormProps) => {
  const prevSubmitCountRef = useRef(0);
  const {
    leads, staff, statuses, types,
    isLoadingLeads, isLoadingStaff, isLoadingStatuses, isLoadingTypes,
  } = useDealFormOptions();
  const { dealAdditionalFieldDefs } = useDealAdditionalFieldDefs();
  const isEditing = !!editingItem;

  useEffect(() => {
    if (error) {
      scrollContainerRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [error, scrollContainerRef]);

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, dirty, submitCount, isSubmitting, values, setFieldValue, setFieldTouched, handleChange, handleBlur }) => {
          if (submitCount > prevSubmitCountRef.current) {
            prevSubmitCountRef.current = submitCount;
            if (Object.keys(errors).length > 0) {
              requestAnimationFrame(() => scrollToFirstError(scrollContainerRef?.current ?? null));
            }
          }

          const fieldClass = (name: string) =>
            `form-control${touched[name as keyof typeof touched] && errors[name as keyof typeof errors] ? ' input-error' : ''}`;

          const handleLeadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const value = e.target.value;
            const match = leads.find(l => String(l.value) === String(value));
            setFieldValue('leadId', match ? match.value : '');
            setFieldValue('lead', match?.label ?? '');
            setFieldTouched('leadId', true, false);
          };

          const handleAgentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const value = e.target.value;
            const match = staff.find(s => String(s.value) === String(value));
            setFieldValue('agentId', match ? match.value : '');
            setFieldValue('assignAgent', match?.label ?? '');
            setFieldTouched('agentId', true, false);
          };

          return (
            <Form>
              {error && <ErrorMessage message={error} />}

              <div className="form-section-title">Deal Information</div>

              <div className="form-group">
                <label>Deal Name <span className="text-danger">*</span></label>
                <Field
                  type="text"
                  name="dealName"
                  className={fieldClass('dealName')}
                  placeholder="Enter deal name"
                />
                <FormikError name="dealName" component="small" className="field-error-text" />
              </div>

              <div className="form-group">
                <label>Lead <span className="text-danger">*</span></label>
                <Field
                  as="select"
                  name="leadId"
                  className={fieldClass('leadId')}
                  onChange={handleLeadChange}
                  disabled={isLoadingLeads}
                >
                  <option value="">{isLoadingLeads ? 'Loading...' : 'Select'}</option>
                  {leads.map(l => (
                    <option key={l.value} value={l.value}>{l.label}</option>
                  ))}
                </Field>
                <FormikError name="leadId" component="small" className="field-error-text" />
              </div>

              <div className="form-group">
                <label>Mobile</label>
                <Field
                  type="tel"
                  name="mobile"
                  className={fieldClass('mobile')}
                  placeholder="Enter mobile number"
                />
                <FormikError name="mobile" component="small" className="field-error-text" />
              </div>

              <div className="form-group">
                <label>Amount (₹) <span className="text-danger">*</span></label>
                <Field
                  type="number"
                  name="amount"
                  className={fieldClass('amount')}
                  placeholder="Enter amount"
                />
                <FormikError name="amount" component="small" className="field-error-text" />
              </div>

              <div className="form-group">
                <label>Status <span className="text-danger">*</span></label>
                <Field
                  as="select"
                  name="statusId"
                  className={fieldClass('statusId')}
                  disabled={isLoadingStatuses}
                >
                  <option value="">{isLoadingStatuses ? 'Loading...' : 'Select'}</option>
                  {statuses.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </Field>
                <FormikError name="statusId" component="small" className="field-error-text" />
              </div>

              <div className="form-group">
                <label>Type <span className="text-danger">*</span></label>
                <Field
                  as="select"
                  name="typeId"
                  className={fieldClass('typeId')}
                  disabled={isLoadingTypes}
                >
                  <option value="">{isLoadingTypes ? 'Loading...' : 'Select'}</option>
                  {types.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </Field>
                <FormikError name="typeId" component="small" className="field-error-text" />
              </div>

              <div className="form-group">
                <label>Start Date</label>
                <Field
                  type="date"
                  name="startDate"
                  className={fieldClass('startDate')}
                />
                <FormikError name="startDate" component="small" className="field-error-text" />
              </div>

              <div className="form-group">
                <label>End Date</label>
                <Field
                  type="date"
                  name="endDate"
                  className={fieldClass('endDate')}
                />
                <FormikError name="endDate" component="small" className="field-error-text" />
              </div>

              <div className="form-group">
                <label>Assign Agent <span className="text-danger">*</span></label>
                <Field
                  as="select"
                  name="agentId"
                  className={fieldClass('agentId')}
                  onChange={handleAgentChange}
                  disabled={isLoadingStaff}
                >
                  <option value="">{isLoadingStaff ? 'Loading...' : 'Select'}</option>
                  {staff.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </Field>
                <FormikError name="agentId" component="small" className="field-error-text" />
              </div>

              <DealDynamicAdditionalFields
                fields={dealAdditionalFieldDefs}
                values={values as unknown as Record<string, unknown>}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />

              <div className="drawer-footer">
                <button type="button" className="btn btn-secondary" onClick={onCancel}>{ACTION_CANCEL}</button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading || isSubmitting || (isEditing && !dirty)}
                >
                  {isLoading || isSubmitting ? <Loader2 size={16} className="spin" /> : (isEditing ? ACTION_UPDATE : ACTION_SAVE)}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default DealForm;
