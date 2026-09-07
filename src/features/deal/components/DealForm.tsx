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
import { CURRENCY_OPTIONS, currencySymbol } from '../../../shared/constants/currencies';
import SelectSearch from '../../../shared/components/SelectSearch';
import type { DealFormProps } from '../types';
import { DEAL_LOST_REASON_OPTIONS } from '../constants/dealLostReasons';
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
        const subtitle = values.amount ? `${currencySymbol(values.currency)}${values.amount}` : 'No amount';
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
    leads, staff, statuses, pipelines,
    isLoadingLeads, isLoadingStaff, isLoadingStatuses, isLoadingPipelines,
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
                  { label: 'Amount', value: values.amount ? `${currencySymbol(values.currency as string)}${values.amount}` : '' },
                ]
              },
              {
                title: 'Details',
                fields: [
                  { label: 'Pipeline', value: pipelines.find(p => String(p.id) === String(values.pipelineId))?.name || '' },
                  { label: 'Stage', value: statuses.find(s => String(s.value) === String(values.stageId))?.label || '' },
                  { label: 'Priority', value: values.priority },
                  { label: 'Type', value: values.type },
                  ...((values as any).lostReason ? [{ label: 'Lost Reason', value: (values as any).lostReason }] : []),
                  { label: 'Start Date', value: values.startDate },
                  { label: 'Close Date', value: values.closeDate },
                  { label: 'Deal Owner', value: staff.find(s => String(s.value) === String(values.agentId))?.label || '' },
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
          const pipelinesEmpty = !isLoadingPipelines && pipelines.length === 0;
          // Stage options are scoped to whichever pipeline is currently
          // selected - the same company-wide list backs every pipeline's
          // picker, filtered client-side by each stage's own pipelineId.
          const stagesForPipeline = statuses.filter(
            (s) => !values.pipelineId || String(s.pipelineId) === String(values.pipelineId),
          );
          const statusesEmpty = !isLoadingStatuses && stagesForPipeline.length === 0;
          const staffEmpty = !isLoadingStaff && staff.length === 0;
          // Lost Reason is only asked for when the selected stage's outcome
          // is LOST - the backend requires it in that case (see
          // deals.service.ts's LOST_REASON_REQUIRED guard).
          const selectedStageIsLost = stagesForPipeline.find(
            (s) => String(s.value) === String(values.stageId),
          )?.outcome === 'LOST';

          const todayStr = getTodayDateString();
          const closeDateMin = values.startDate && values.startDate > todayStr ? values.startDate : todayStr;

          const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setFieldValue('startDate', value);
            setFieldTouched('startDate', true, false);
            if (values.closeDate && value && values.closeDate < value) {
              setFieldValue('closeDate', '');
              setFieldTouched('closeDate', true, false);
            }
          };

          // Changing pipeline invalidates whatever stage was picked (stages
          // belong to exactly one pipeline) - reset it rather than leave a
          // stale, now-mismatched stageId selected.
          const handlePipelineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const value = e.target.value;
            setFieldValue('pipelineId', value);
            setFieldValue('stageId', '');
            setFieldTouched('pipelineId', true, false);
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
                <label>Amount ({currencySymbol(values.currency as string)}) <span className="text-danger">*</span></label>
                <div className="phone-field-group">
                  <select
                    name="currency"
                    value={values.currency as string}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`phone-country-code${errors.currency && touched.currency ? ' input-error' : ''}`}
                  >
                    {CURRENCY_OPTIONS.map((c) => (
                      <option key={c.code} value={c.code}>{c.code} {c.symbol}</option>
                    ))}
                  </select>
                  <Field
                    type="number"
                    name="amount"
                    className={fieldClass('amount')}
                    placeholder="Enter amount"
                  />
                </div>
                <FormikError name="currency" component="small" className="field-error-text" />
                <FormikError name="amount" component="small" className="field-error-text" />
              </div>

              <div className="form-group">
                <label>Pipeline <span className="text-danger">*</span></label>
                <select
                  name="pipelineId"
                  value={String(values.pipelineId || '')}
                  disabled={isLoadingPipelines || pipelinesEmpty}
                  onChange={handlePipelineChange}
                  onBlur={() => setFieldTouched('pipelineId', true)}
                  className={fieldClass('pipelineId')}
                >
                  <option value="">{isLoadingPipelines ? 'Loading...' : 'Select a pipeline'}</option>
                  {pipelines.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}{p.isDefault ? ' (Default)' : ''}</option>
                  ))}
                </select>
                {pipelinesEmpty ? (
                  <small className="field-error-text">
                    No pipelines found. Please create one first. <Link to="/settings/deal-pipelines">+ Create Pipeline</Link>
                  </small>
                ) : (
                  <FormikError name="pipelineId" component="small" className="field-error-text" />
                )}
              </div>

              <div className="form-group">
                <label>Stage <span className="text-danger">*</span></label>
                <SelectSearch
                  name="stageId"
                  value={String(values.stageId || '')}
                  options={stagesForPipeline}
                  disabled={isLoadingStatuses || statusesEmpty || !values.pipelineId}
                  placeholder={!values.pipelineId ? 'Select a pipeline first' : isLoadingStatuses ? 'Loading...' : 'Select a stage'}
                  onChange={(e: any) => {
                    setFieldValue('stageId', e.target.value);
                    setFieldTouched('stageId', true, false);
                  }}
                  onBlur={() => setFieldTouched('stageId', true)}
                  className={touched.stageId && errors.stageId ? 'input-error' : ''}
                />
                {statusesEmpty && values.pipelineId ? (
                  <small className="field-error-text">
                    No stages in this pipeline yet. <Link to="/settings/deal-pipelines">+ Add a stage</Link>
                  </small>
                ) : (
                  <FormikError name="stageId" component="small" className="field-error-text" />
                )}
              </div>

              {selectedStageIsLost && (
                <div className="form-group">
                  <label>Lost Reason <span className="text-danger">*</span></label>
                  <select
                    name="lostReason"
                    value={(values as any).lostReason || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={fieldClass('lostReason')}
                  >
                    <option value="">Select a reason</option>
                    {DEAL_LOST_REASON_OPTIONS.map((reason) => (
                      <option key={reason} value={reason}>{reason}</option>
                    ))}
                  </select>
                  <FormikError name="lostReason" component="small" className="field-error-text" />
                </div>
              )}

              <div className="form-group">
                <label>Priority <span className="text-danger">*</span></label>
                <select
                  name="priority"
                  value={(values as any).priority || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={fieldClass('priority')}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <FormikError name="priority" component="small" className="field-error-text" />
              </div>

              <div className="form-group">
                <label>Type <span className="text-danger">*</span></label>
                <select
                  name="type"
                  value={(values as any).type || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={fieldClass('type')}
                >
                  <option value="New">New</option>
                  <option value="Existing">Existing</option>
                </select>
                <FormikError name="type" component="small" className="field-error-text" />
              </div>

              <div className="form-group">
                <label>Start Date</label>
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
                <label>Close Date <span className="text-danger">*</span></label>
                <Field
                  type="date"
                  name="closeDate"
                  min={closeDateMin}
                  className={fieldClass('closeDate')}
                />
                <FormikError name="closeDate" component="small" className="field-error-text" />
              </div>

              <div className="form-group">
                <label>Deal Owner <span className="text-danger">*</span></label>
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
