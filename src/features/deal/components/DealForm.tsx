import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError, useFormikContext } from 'formik';
import { draftService } from '../../../shared/services/draftService';
import type { PreviewSection } from '../../../shared/components/preview/PreviewCanvas';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import { scrollToFirstError } from '../../task-settings/utils/scrollToFirstError';
import { ACTION_SAVE, ACTION_UPDATE, ACTION_CANCEL } from '../../../shared/constants/actionLabels';
import { useDealFormOptions } from '../hooks/useDealFormOptions';
import { useDealAdditionalFieldDefs } from '../hooks/useDealAdditionalFieldDefs';
import DealDynamicAdditionalFields from './DealDynamicAdditionalFields';
import { getTodayDateString } from '../utils/dealDateValidation';
import { COUNTRY_CODES, DEFAULT_COUNTRY_CODE } from '../../../shared/constants/countryCodes';
import SelectSearch from '../../../shared/components/SelectSearch';
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
const AutoSaveForm = ({ draftId, onDraftSaved }: { draftId?: string | null, onDraftSaved?: (id: string) => void }) => {
  const { values, dirty } = useFormikContext<any>();
  
  useEffect(() => {
    if (dirty) {
      const timeout = setTimeout(() => {
        const title = values.dealName ? values.dealName : 'Untitled Deal';
        const subtitle = values.amount ? `$${values.amount}` : 'No amount';
        const id = draftService.saveDraft('deal', values, title, subtitle, draftId || undefined);
        if (id !== draftId) {
          onDraftSaved?.(id);
        }
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [values, dirty, draftId, onDraftSaved]);

  return null;
};

const DealForm = ({
  editingItem,
  draftId,
  initialDraftValues,
  validationSchema,
  initialValues,
  onSubmit,
  onPreviewRequest,
  onDraftSaved,
  isLoading,
  error,
  onCancel,
  scrollContainerRef,
}: DealFormProps) => {
  const prevSubmitCountRef = useRef(0);
  // Once the user manually edits Mobile or Assign Agent, lead-selection auto-fill
  // stops overwriting that field — switching leads again should never clobber an
  // edit the user already made on purpose.
  const mobileEditedRef = useRef(false);
  const agentEditedRef = useRef(false);
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
        initialValues={initialDraftValues || initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, helpers) => {
          if (onPreviewRequest) {
            const sections: PreviewSection[] = [
              {
                title: 'Basic Info',
                fields: [
                  { label: 'Deal Name', value: values.dealName },
                  { label: 'Lead', value: leads.find(l => String(l.value) === String(values.leadId))?.label || '' },
                  { label: 'Mobile', value: values.mobileNumber ? `${values.mobileCountryCode} ${values.mobileNumber}` : '' },
                  { label: 'Amount', value: values.amount },
                ]
              },
              {
                title: 'Details',
                fields: [
                  { label: 'Status', value: statuses.find(s => String(s.value) === String(values.statusId))?.label || '' },
                  { label: 'Type', value: types.find(t => String(t.value) === String(values.typeId))?.label || '' },
                  { label: 'Start Date', value: values.startDate },
                  { label: 'End Date', value: values.endDate },
                  { label: 'Agent', value: staff.find(s => String(s.value) === String(values.agentId))?.label || '' },
                ]
              }
            ];
            onPreviewRequest({ sections, payload: values, formValues: values });
            return;
          }
          await onSubmit(values, helpers);
        }}
      >
        {({ errors, touched, dirty, submitCount, isSubmitting, values, setFieldValue, setFieldTouched, setValues, handleChange, handleBlur }) => {
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
            mobileEditedRef.current = true;
            setFieldValue('mobileNumber', digitsOnly);
          };

          const handleMobileNumberBlur = () => {
            setFieldTouched('mobileNumber', true);
          };

          const handleMobileCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const value = e.target.value;
            mobileEditedRef.current = true;
            setFieldValue('mobileCountryCode', value);
            setFieldTouched('mobileCountryCode', true, false);
            if (values.mobileNumber) {
              setFieldTouched('mobileNumber', true, false);
            }
          };

          // Both the id and the display-name fields are updated together via a single
          // setValues() call (rather than two sequential setFieldValue() calls) so the
          // validation that follows runs against one fully up-to-date snapshot. Two
          // separate setFieldValue() calls each validate against the values captured at
          // the start of this handler, so the second call's validation would see the
          // *stale* (pre-selection) id and could re-flash the "required" error right
          // after a valid selection.
          const handleLeadChange = (e: any) => {
            const value = e.target.value;
            const match = leads.find(l => String(l.value) === String(value));
            setValues(prev => {
              const next = {
                ...prev,
                leadId: match ? match.value : '',
                lead: match?.label ?? '',
              };

              // Convenience pre-fill only — skip a field entirely once the user has
              // manually touched it, so re-selecting a lead never overwrites their edit.
              if (!mobileEditedRef.current) {
                if (match?.phone) {
                  next.mobileNumber = match.phone.replace(/\D/g, '');
                  next.mobileCountryCode = match.countryCode || DEFAULT_COUNTRY_CODE;
                } else {
                  next.mobileNumber = '';
                  next.mobileCountryCode = DEFAULT_COUNTRY_CODE;
                }
              }

              if (!agentEditedRef.current) {
                const agentMatch = match?.agentId
                  ? staff.find(s => String(s.value) === String(match.agentId))
                  : undefined;
                next.agentId = agentMatch ? agentMatch.value : '';
                next.assignAgent = agentMatch?.label ?? '';
              }

              return next;
            });
            setFieldTouched('leadId', true, false);
          };

          const handleAgentChange = (e: any) => {
            const value = e.target.value;
            const match = staff.find(s => String(s.value) === String(value));
            agentEditedRef.current = true;
            setValues(prev => ({
              ...prev,
              agentId: match ? match.value : '',
              assignAgent: match?.label ?? '',
            }));
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
                <SelectSearch
                  name="leadId"
                  value={String(values.leadId || '')}
                  options={leads}
                  disabled={isLoadingLeads || leadsEmpty}
                  placeholder={isLoadingLeads ? 'Loading...' : 'Select a lead'}
                  onChange={handleLeadChange}
                  onBlur={() => setFieldTouched('leadId', true)}
                  className={touched.leadId && errors.leadId ? 'input-error' : ''}
                />
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
                <SelectSearch
                  name="statusId"
                  value={String(values.statusId || '')}
                  options={statuses}
                  disabled={isLoadingStatuses || statusesEmpty}
                  placeholder={isLoadingStatuses ? 'Loading...' : 'Select a status'}
                  onChange={(e: any) => {
                    setFieldValue('statusId', e.target.value);
                    setFieldTouched('statusId', true, false);
                  }}
                  onBlur={() => setFieldTouched('statusId', true)}
                  className={touched.statusId && errors.statusId ? 'input-error' : ''}
                />
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
                <SelectSearch
                  name="typeId"
                  value={String(values.typeId || '')}
                  options={types}
                  disabled={isLoadingTypes || typesEmpty}
                  placeholder={isLoadingTypes ? 'Loading...' : 'Select a type'}
                  onChange={(e: any) => {
                    setFieldValue('typeId', e.target.value);
                    setFieldTouched('typeId', true, false);
                  }}
                  onBlur={() => setFieldTouched('typeId', true)}
                  className={touched.typeId && errors.typeId ? 'input-error' : ''}
                />
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
                <SelectSearch
                  name="agentId"
                  value={String(values.agentId || '')}
                  options={staff}
                  disabled={isLoadingStaff || staffEmpty}
                  placeholder={isLoadingStaff ? 'Loading...' : 'Select a staff member'}
                  onChange={handleAgentChange}
                  onBlur={() => setFieldTouched('agentId', true)}
                  className={touched.agentId && errors.agentId ? 'input-error' : ''}
                />
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

              <AutoSaveForm draftId={draftId} onDraftSaved={onDraftSaved} />

              <div className="drawer-footer">
                <button type="button" className="btn btn-secondary" onClick={onCancel}>{ACTION_CANCEL}</button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading || isSubmitting || (isEditing && !dirty)}
                >
                  {isLoading || isSubmitting ? <Loader2 size={16} className="spin" /> : onPreviewRequest ? 'Preview Deal' : (isEditing ? ACTION_UPDATE : ACTION_SAVE)}
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
