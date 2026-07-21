import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import { scrollToFirstError } from '../../task-settings/utils/scrollToFirstError';
import { ACTION_SAVE, ACTION_UPDATE, ACTION_CANCEL } from '../../../shared/constants/actionLabels';
import { useDealFormOptions } from '../hooks/useDealFormOptions';
import { useDealAdditionalFieldDefs } from '../hooks/useDealAdditionalFieldDefs';
import DealDynamicAdditionalFields from './DealDynamicAdditionalFields';
import { getTodayDateString } from '../utils/dealDateValidation';
import { COUNTRY_CODES } from '../../../shared/constants/countryCodes';
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

          const leadsEmpty = !isLoadingLeads && leads.length === 0;
          const statusesEmpty = !isLoadingStatuses && statuses.length === 0;
          const typesEmpty = !isLoadingTypes && types.length === 0;
          const staffEmpty = !isLoadingStaff && staff.length === 0;

          const todayStr = getTodayDateString();
          const endDateMin = values.startDate && values.startDate > todayStr ? values.startDate : todayStr;

          const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setFieldValue('startDate', value);
            setFieldTouched('startDate', true, false);
            if (values.endDate && value && values.endDate < value) {
              setFieldValue('endDate', '');
              setFieldTouched('endDate', true, false);
            }
          };

          // Formik's <Field name="mobile"> rendered a DOM `name`/`id` of "mobile",
          // which Chrome's autofill heuristic matches to phone-number suggestions
          // even with autoComplete="off". Binding the number input manually lets
          // the DOM name/id stay unrecognizable to Chrome while values.mobileNumber /
          // errors.mobileNumber / touched.mobileNumber keep working as expected.
          const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const digitsOnly = e.target.value.replace(/\D/g, '');
            setFieldValue('mobileNumber', digitsOnly);
          };

          const handleMobileNumberBlur = () => {
            setFieldTouched('mobileNumber', true);
          };

          const handleMobileCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const value = e.target.value;
            setFieldValue('mobileCountryCode', value);
            setFieldTouched('mobileCountryCode', true, false);
            if (values.mobileNumber) {
              setFieldTouched('mobileNumber', true, false);
            }
          };

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
            <Form noValidate>
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
                  disabled={isLoadingLeads || leadsEmpty}
                >
                  <option value="">{isLoadingLeads ? 'Loading...' : 'Select'}</option>
                  {leads.map(l => (
                    <option key={l.value} value={l.value}>{l.label}</option>
                  ))}
                </Field>
                {leadsEmpty ? (
                  <small className="field-error-text">
                    No leads found. Please add a lead first. <Link to="/leads">+ Add Lead</Link>
                  </small>
                ) : (
                  <FormikError name="leadId" component="small" className="field-error-text" />
                )}
              </div>

              <div className="form-group">
                <label>Mobile</label>
                <div className="phone-field-group">
                  <select
                    name="mobileCountryCode"
                    value={values.mobileCountryCode}
                    onChange={handleMobileCountryCodeChange}
                    onBlur={handleBlur}
                    className={`phone-country-code${errors.mobileCountryCode && touched.mobileCountryCode ? ' input-error' : ''}`}
                  >
                    {COUNTRY_CODES.map(c => (
                      <option key={`${c.country}-${c.code}`} value={c.code}>{c.code} {c.country}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    inputMode="numeric"
                    name="deal-mobile-field-no-autofill"
                    id="deal-mobile-field-no-autofill"
                    autoComplete="do-not-autofill-mobile"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    value={values.mobileNumber}
                    onChange={handleMobileNumberChange}
                    onBlur={handleMobileNumberBlur}
                    className={fieldClass('mobileNumber')}
                    placeholder="Enter mobile number"
                  />
                </div>
                <FormikError name="mobileCountryCode" component="small" className="field-error-text" />
                <FormikError name="mobileNumber" component="small" className="field-error-text" />
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
                  disabled={isLoadingStatuses || statusesEmpty}
                >
                  <option value="">{isLoadingStatuses ? 'Loading...' : 'Select'}</option>
                  {statuses.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </Field>
                {statusesEmpty ? (
                  <small className="field-error-text">
                    No statuses found. Please add a status first. <Link to="/user/deal-stages">+ Add Status</Link>
                  </small>
                ) : (
                  <FormikError name="statusId" component="small" className="field-error-text" />
                )}
              </div>

              <div className="form-group">
                <label>Type <span className="text-danger">*</span></label>
                <Field
                  as="select"
                  name="typeId"
                  className={fieldClass('typeId')}
                  disabled={isLoadingTypes || typesEmpty}
                >
                  <option value="">{isLoadingTypes ? 'Loading...' : 'Select'}</option>
                  {types.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </Field>
                {typesEmpty ? (
                  <small className="field-error-text">
                    No deal types found. Please add a type first. <Link to="/user/deal-types">+ Add Type</Link>
                  </small>
                ) : (
                  <FormikError name="typeId" component="small" className="field-error-text" />
                )}
              </div>

              <div className="form-group">
                <label>Start Date <span className="text-danger">*</span></label>
                <Field
                  type="date"
                  name="startDate"
                  min={todayStr}
                  className={fieldClass('startDate')}
                  onChange={handleStartDateChange}
                />
                <FormikError name="startDate" component="small" className="field-error-text" />
              </div>

              <div className="form-group">
                <label>End Date <span className="text-danger">*</span></label>
                <Field
                  type="date"
                  name="endDate"
                  min={endDateMin}
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
                  disabled={isLoadingStaff || staffEmpty}
                >
                  <option value="">{isLoadingStaff ? 'Loading...' : 'Select'}</option>
                  {staff.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </Field>
                {staffEmpty ? (
                  <small className="field-error-text">
                    No agents/staff found. Please add a staff member first.
                  </small>
                ) : (
                  <FormikError name="agentId" component="small" className="field-error-text" />
                )}
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
