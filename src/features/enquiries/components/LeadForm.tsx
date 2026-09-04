import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Loader2, Save } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError, useFormikContext } from 'formik';
import { draftService } from '../../../shared/services/draftService';
import type { PreviewSection } from '../../../shared/components/preview/PreviewCanvas';
import { staffService } from '../../deal/services/staff.service';
import { leadPurposeService } from '../../lead-settings/lead-purpose/services';
import { leadTypeService } from '../../lead-settings/lead-types/services';
import { leadStatusService } from '../../lead-settings/lead-status/services';
import { leadSourceService } from '../../lead-settings/lead-source/services';
import { leadDataService } from '../services/leadDataService';
import { leadAdditionalService } from '../../lead-settings/lead-additional/services/leadAdditionalService';
import type { LeadAdditionalApiItem } from '../../lead-settings/lead-additional/types';
import type { CreateLeadPayload, UpdateLeadPayload, Lead } from '../types';
import { getErrorMessage } from '../../../shared/utils/error';
import { getFieldKey, getInitialValues, buildAdditionalFieldsPayload } from '../utils/additionalFields';
import { getAddLeadValidationSchema } from '../validations/addLead.validation';
import { BASE_INITIAL_VALUES } from '../constants/addLead.constants';
import { ERROR_MESSAGES } from '../constants/messages';
import { COUNTRY_CODES, DEFAULT_COUNTRY_CODE } from '../../../shared/constants/countryCodes';
import DynamicAdditionalFields from '../../../shared/components/drawers/DynamicAdditionalFields';
import type { LabelValuePair } from '../../../shared/types/common';
import type { AddLeadFormValues } from '../../../shared/types/drawers';
import SelectSearch from '../../../shared/components/SelectSearch';

export interface PreviewData {
  sections: PreviewSection[];
  payload: CreateLeadPayload & UpdateLeadPayload;
  formValues: AddLeadFormValues;
}

export interface LeadFormProps {
  lead?: Lead | null | undefined;
  draftId?: string | null;
  initialDraftValues?: any;
  onDraftSaved?: (id: string) => void;
  onSaved?: ((action: 'created' | 'updated') => void) | undefined;
  onPreviewRequest?: (previewData: PreviewData) => void;
  onClose: () => void;
}

const AutoSaveForm = ({ draftId, onDraftSaved }: { draftId: string | null | undefined; onDraftSaved: ((id: string) => void) | undefined }) => {
  const { values, dirty } = useFormikContext<any>();

  const persistDraft = useCallback(
    (formValues: Record<string, unknown>, existingId: string | null | undefined) => {
      const name = typeof formValues.name === 'string' ? formValues.name : '';
      const phone = typeof formValues.phone === 'string' ? formValues.phone : '';
      const countryCode = typeof formValues.countryCode === 'string' ? formValues.countryCode : '';
      const title = name || 'Untitled Lead';
      const subtitle = phone ? `${countryCode || DEFAULT_COUNTRY_CODE} ${phone}` : 'No phone';
      const id = draftService.saveDraft('lead', formValues, title, subtitle, existingId || undefined);
      if (id !== existingId) {
        onDraftSaved?.(id);
      }
    },
    [onDraftSaved],
  );

  // Debounced autosave while the form is open and being edited.
  useEffect(() => {
    if (!dirty) return;
    const timeout = setTimeout(() => persistDraft(values, draftId), 1000);
    return () => clearTimeout(timeout);
  }, [values, dirty, draftId, persistDraft]);


  const flushRef = useRef<() => void>(() => { });
  flushRef.current = () => {
    if (dirty) persistDraft(values, draftId);
  };
  useEffect(() => () => flushRef.current(), []);

  return null;
};

/**
 * All lead create/edit form content: field layout, dropdown-option loading,
 * validation, and submit. Knows nothing about being inside a drawer - mounts
 * fresh each time its parent renders it (the drawer shell controls that), so
 * "on mount" here is equivalent to "the form just opened."
 *
 * Used by:
 * - AddLeadDrawer (composed inside the shared Drawer shell)
 */
const LeadForm = ({ lead, draftId, initialDraftValues, onDraftSaved, onSaved, onPreviewRequest, onClose }: LeadFormProps) => {
  const [staffOptions, setStaffOptions] = useState<LabelValuePair[]>([]);
  const [purposeOptions, setPurposeOptions] = useState<LabelValuePair[]>([]);
  const [typeOptions, setTypeOptions] = useState<LabelValuePair[]>([]);
  const [statusOptions, setStatusOptions] = useState<LabelValuePair[]>([]);
  const [sourceOptions, setSourceOptions] = useState<LabelValuePair[]>([]);
  const [additionalFieldDefs, setAdditionalFieldDefs] = useState<LeadAdditionalApiItem[]>([]);
  const [loadError, setLoadError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [activePurposeId, setActivePurposeId] = useState('');
  const isEditing = !!lead;
  const originalValuesRef = useRef<Record<string, unknown> | null>(null);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    const loadDropdowns = async () => {
      try {
        const [staffRes, purposeRes, typeRes, statusRes, sourceRes, additionalFieldsRes] = await Promise.all([
          staffService.getStaff(),
          leadPurposeService.getLeadPurposes(1, 100),
          leadTypeService.getLeadTypes(1, 100),
          leadStatusService.getLeadStatuses(1, 100),
          leadSourceService.getLeadSources(1, 100),
          leadAdditionalService.getAll(1, 200),
        ]);

        const staffRaw = staffRes?.data;
        const staffData = Array.isArray(staffRaw) ? staffRaw : staffRaw?.items ?? [];
        setStaffOptions(staffData.map((s: { name: string; staff_id?: string; id?: string }) => ({
          value: s.staff_id ?? s.id ?? '',
          label: s.name,
        })));

        const purposeRaw = purposeRes?.data;
        const purposeData = Array.isArray(purposeRaw) ? purposeRaw : purposeRaw?.items ?? [];
        setPurposeOptions(purposeData.map((p: { purposeId?: string; id?: number; purpose: string }) => ({
          value: p.purposeId ?? '',
          label: p.purpose,
        })));

        const typeData = typeRes?.data?.items ?? [];
        setTypeOptions(typeData.map((t: { typeId: string; type: string }) => ({
          value: t.typeId,
          label: t.type,
        })));

        const statusData = statusRes?.data?.items ?? [];
        setStatusOptions(statusData.map((s: { statusId: string; status: string }) => ({
          value: s.statusId,
          label: s.status,
        })));

        const sourceData = sourceRes?.data?.items ?? [];
        setSourceOptions(sourceData.map((s: { sourceId: string; source: string }) => ({
          value: s.sourceId,
          label: s.source,
        })));

        const addFieldsData = additionalFieldsRes?.data?.items ?? [];
        setAdditionalFieldDefs(addFieldsData);
        hasLoadedRef.current = true;
      } catch {
        setLoadError(ERROR_MESSAGES.LOAD_FORM_OPTIONS);
      }
    };

    loadDropdowns();
  }, []);

  // Guards against a background lead-list refresh swapping in a new `lead`
  // object reference while this form is still open and mid-edit - without
  // this, hasChanges would keep comparing against a now-stale baseline.
  useEffect(() => {
    originalValuesRef.current = null;
    hasLoadedRef.current = false;
  }, [lead]);

  const handleSubmit = async (
    values: AddLeadFormValues & Record<string, string | string[]>,
    formikHelpers: any
  ) => {
    setSubmitError('');
    const trimmed = Object.fromEntries(
      Object.entries(values).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v])
    ) as AddLeadFormValues & Record<string, string | string[]>;

    const visibleFieldDefs = additionalFieldDefs.filter((f) => {
      if (!f.connectWithLeadPurpose || !f.purposeId) return true;
      return f.purposeId === trimmed.purposeId;
    });

    const additionalFields = buildAdditionalFieldsPayload(trimmed, visibleFieldDefs);

    const payload: CreateLeadPayload & UpdateLeadPayload = {
      name: trimmed.name,
      phone: trimmed.phone,
      countryCode: trimmed.countryCode,
      sourceId: trimmed.sourceId,
    };
    if (trimmed.email) payload.email = trimmed.email;
    if (trimmed.agentId) payload.agentId = trimmed.agentId;
    if (trimmed.purposeId) payload.purposeId = trimmed.purposeId;
    if (trimmed.typeId) payload.typeId = trimmed.typeId;
    if (trimmed.statusId) payload.statusId = trimmed.statusId;
    if (trimmed.nextFollowUp) {
      payload.nextFollowUp = trimmed.nextFollowUp;
    } else if (isEditing) {
      payload.nextFollowUp = null;
    }
    if (trimmed.notes) payload.notes = trimmed.notes;
    if (trimmed.location) payload.location = trimmed.location;
    if (trimmed.address) payload.address = trimmed.address;
    if (additionalFields.length > 0) {
      payload.additionalFields = additionalFields;
    }

    if (onPreviewRequest) {
      const sections: PreviewSection[] = [
        {
          title: 'Basic Info',
          fields: [
            { label: 'Name', value: trimmed.name },
            { label: 'Phone', value: trimmed.phone ? `${trimmed.countryCode} ${trimmed.phone}` : '' },
            { label: 'Email', value: trimmed.email || '' },
            { label: 'Assigned To', value: staffOptions.find(o => o.value === trimmed.agentId)?.label || '' }
          ]
        },
        {
          title: 'Lead Details',
          fields: [
            { label: 'Purpose', value: purposeOptions.find(o => o.value === trimmed.purposeId)?.label || '' },
            { label: 'Type', value: typeOptions.find(o => o.value === trimmed.typeId)?.label || '' },
            { label: 'Status', value: statusOptions.find(o => o.value === trimmed.statusId)?.label || '' },
            { label: 'Source', value: sourceOptions.find(o => o.value === trimmed.sourceId)?.label || '' },
            { label: 'Next Follow Up', value: trimmed.nextFollowUp || '' }
          ]
        },
        {
          title: 'Location & Notes',
          fields: [
            { label: 'Location', value: trimmed.location || '' },
            { label: 'Address', value: trimmed.address || '' },
            { label: 'Notes', value: trimmed.notes || '' }
          ]
        }
      ];

      if (additionalFields.length > 0) {
        sections.push({
          title: 'Additional Info',
          fields: additionalFields.map(af => ({
            label: visibleFieldDefs.find(f => f.fieldId === af.fieldId)?.name || af.fieldId,
            value: af.value || ''
          }))
        });
      }

      onPreviewRequest({ sections, payload, formValues: trimmed });
      return;
    }

    try {
      if (isEditing && lead) {
        await leadDataService.updateLead(lead.leadId, payload);
      } else {
        await leadDataService.createLead(payload);
      }

      if (draftId) draftService.deleteDraft(draftId);
      onSaved?.(isEditing ? 'updated' : 'created');
      onClose();
    } catch (err: unknown) {
      const msg = getErrorMessage(err, 'An unexpected error occurred');
      const messages = msg.split(';').map(s => s.trim());
      let hasFieldError = false;

      messages.forEach(m => {
        const lowerM = m.toLowerCase();
        if (lowerM.includes('phone') || lowerM.includes('mobile')) {
          formikHelpers.setFieldError('phone', m);
          formikHelpers.setFieldTouched('phone', true, false);
          hasFieldError = true;
        } else if (lowerM.includes('email')) {
          formikHelpers.setFieldError('email', m);
          formikHelpers.setFieldTouched('email', true, false);
          hasFieldError = true;
        } else if (lowerM.includes('name')) {
          formikHelpers.setFieldError('name', m);
          formikHelpers.setFieldTouched('name', true, false);
          hasFieldError = true;
        }
      });

      if (!hasFieldError) {
        setSubmitError(msg);
      }
    }
  };

  const mergedInitialValues = useMemo(() => {
    const base = { ...BASE_INITIAL_VALUES, ...getInitialValues(additionalFieldDefs) };

    if (initialDraftValues) {
      return { ...base, ...initialDraftValues };
    }

    if (!lead) return base;

    const findId = (options: LabelValuePair[], label: string | null | undefined): string => {
      if (!label) return '';
      const match = options.find(o => o.label === label);
      return match ? match.value : '';
    };

    // <input type="date"> only accepts YYYY-MM-DD; the API returns a full ISO
    // datetime string, which the input silently rejects (renders blank).
    const toDateInputValue = (value: string | null | undefined): string =>
      value ? value.slice(0, 10) : '';

    const leadAddFields: Record<string, string | string[]> = {};
    for (const af of lead.additionalFields || []) {
      const def = additionalFieldDefs.find(d => d.name === af.name);
      if (def) {
        const key = getFieldKey(def.fieldKey);
        if (def.fieldType?.toLowerCase() === 'checkbox') {
          leadAddFields[key] = af.value ? af.value.split(',').map(v => v.trim()) : [];
        } else {
          leadAddFields[key] = af.value || '';
        }
      }
    }

    return {
      ...base,
      name: lead.name || '',
      phone: lead.phone || '',
      countryCode: lead.countryCode || DEFAULT_COUNTRY_CODE,
      email: lead.email || '',
      agentId: findId(staffOptions, lead.assignedTo),
      purposeId: findId(purposeOptions, lead.purpose),
      typeId: findId(typeOptions, lead.type),
      statusId: findId(statusOptions, lead.status),
      sourceId: findId(sourceOptions, lead.source),
      nextFollowUp: toDateInputValue(lead.nextFollowUp),
      location: lead.location || '',
      address: lead.address || '',
      ...leadAddFields,
    };
  }, [lead, staffOptions, purposeOptions, typeOptions, statusOptions, sourceOptions, additionalFieldDefs, initialDraftValues]);

  useEffect(() => {
    setActivePurposeId(mergedInitialValues.purposeId || '');
  }, [mergedInitialValues.purposeId]);

  useEffect(() => {
    if (!isEditing || !lead || originalValuesRef.current) return;
    if (hasLoadedRef.current) {
      originalValuesRef.current = { ...mergedInitialValues };
    }
  }, [mergedInitialValues, isEditing, lead]);

  const validationSchema = useMemo(() => {
    const filtered = additionalFieldDefs.filter((f) => {
      if (!f.connectWithLeadPurpose || !f.purposeId) return true;
      return f.purposeId === activePurposeId;
    });
    return getAddLeadValidationSchema(filtered);
  }, [additionalFieldDefs, activePurposeId]);

  return (
    <Formik
      initialValues={mergedInitialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ errors, touched, isSubmitting, values, handleChange, handleBlur, submitForm, setFieldValue, setFieldTouched }) => {
        const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const digitsOnly = e.target.value.replace(/\D/g, '');
          setFieldValue('phone', digitsOnly);
        };

        const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
          const value = e.target.value;
          setFieldValue('countryCode', value);
          setFieldTouched('countryCode', true, false);
          if (values.phone) {
            setFieldTouched('phone', true, false);
          }
        };

        const filteredFieldDefs = additionalFieldDefs.filter((f) => {
          if (!f.connectWithLeadPurpose || !f.purposeId) return true;
          return f.purposeId === activePurposeId;
        });
        const hasChanges = (() => {
          if (!isEditing) return true;
          const orig = originalValuesRef.current;
          if (!orig) return true;
          if (values.name !== orig.name) return true;
          if (values.phone !== orig.phone) return true;
          if (values.countryCode !== orig.countryCode) return true;
          if (values.email !== orig.email) return true;
          if (values.agentId !== orig.agentId) return true;
          if (values.purposeId !== orig.purposeId) return true;
          if (values.typeId !== orig.typeId) return true;
          if (values.statusId !== orig.statusId) return true;
          if (values.sourceId !== orig.sourceId) return true;
          if (values.nextFollowUp !== orig.nextFollowUp) return true;
          if (values.notes !== orig.notes) return true;
          if (values.location !== orig.location) return true;
          if (values.address !== orig.address) return true;
          const formValues = values as unknown as Record<string, unknown>;
          for (const def of additionalFieldDefs) {
            const key = getFieldKey(def.fieldKey);
            if (JSON.stringify(formValues[key]) !== JSON.stringify(orig[key])) return true;
          }
          return false;
        })();
        return (
          <>
            <div className="drawer-body">
              {loadError && <div className="alert alert-danger">{loadError}</div>}
              {submitError && <div className="alert alert-danger">{submitError}</div>}
              <Form className="lead-form">
                <div className="form-group">
                  <label>Name <span className="required">*</span></label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.name && touched.name ? 'error' : ''}
                  />
                  {errors.name && touched.name && <div className="error-text">{errors.name}</div>}
                </div>
                <div className="form-group">
                  <label>Phone <span className="required">*</span></label>
                  <div className="phone-field-group">
                    <select
                      name="countryCode"
                      value={values.countryCode}
                      onChange={handleCountryCodeChange}
                      onBlur={handleBlur}
                      className={`phone-country-code${errors.countryCode && touched.countryCode ? ' error' : ''}`}
                    >
                      {COUNTRY_CODES.map(c => (
                        <option key={`${c.country}-${c.code}`} value={c.code}>{c.code} {c.country}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      inputMode="numeric"
                      name="lead-phone-field-no-autofill"
                      id="lead-phone-field-no-autofill"
                      autoComplete="do-not-autofill-phone"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      placeholder="Enter phone number"
                      value={values.phone}
                      onChange={handlePhoneChange}
                      onBlur={handleBlur}
                      className={errors.phone && touched.phone ? 'error' : ''}
                    />
                  </div>
                  {errors.countryCode && touched.countryCode && <div className="error-text">{errors.countryCode}</div>}
                  {errors.phone && touched.phone && <div className="error-text">{errors.phone}</div>}
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.email && touched.email ? 'error' : ''}
                  />
                  {errors.email && touched.email && <div className="error-text">{errors.email}</div>}
                </div>
                <div className="form-group">
                  <label>Assigned To</label>
                  <SelectSearch
                    name="agentId"
                    value={values.agentId}
                    options={staffOptions}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldTouched('agentId', true, false);
                    }}
                    onBlur={handleBlur}
                    className={errors.agentId && touched.agentId ? 'error' : ''}
                  />
                  <FormikError name="agentId" component="div" className="error-text" />
                </div>
                <div className="form-group">
                  <label>Purpose</label>
                  <SelectSearch
                    name="purposeId"
                    value={values.purposeId}
                    options={purposeOptions}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldTouched('purposeId', true, false);
                      setActivePurposeId(e.target.value);
                    }}
                    onBlur={handleBlur}
                    className={errors.purposeId && touched.purposeId ? 'error' : ''}
                  />
                  <FormikError name="purposeId" component="div" className="error-text" />
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <SelectSearch
                    name="typeId"
                    value={values.typeId}
                    options={typeOptions}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldTouched('typeId', true, false);
                    }}
                    onBlur={handleBlur}
                    className={errors.typeId && touched.typeId ? 'error' : ''}
                  />
                  <FormikError name="typeId" component="div" className="error-text" />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <SelectSearch
                    name="statusId"
                    value={values.statusId}
                    options={statusOptions}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldTouched('statusId', true, false);
                    }}
                    onBlur={handleBlur}
                    className={errors.statusId && touched.statusId ? 'error' : ''}
                  />
                  <FormikError name="statusId" component="div" className="error-text" />
                </div>
                <div className="form-group">
                  <label>Source <span className="required">*</span></label>
                  <SelectSearch
                    name="sourceId"
                    value={values.sourceId}
                    options={sourceOptions}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldTouched('sourceId', true, false);
                    }}
                    onBlur={handleBlur}
                    className={errors.sourceId && touched.sourceId ? 'error' : ''}
                  />
                  <FormikError name="sourceId" component="div" className="error-text" />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter location"
                    value={values.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.location && touched.location ? 'error' : ''}
                  />
                  {errors.location && touched.location && <div className="error-text">{errors.location}</div>}
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.address && touched.address ? 'error' : ''}
                  />
                  {errors.address && touched.address && <div className="error-text">{errors.address}</div>}
                </div>
                <div className="form-group">
                  <label>Next Follow Up</label>
                  <input
                    type="date"
                    name="nextFollowUp"
                    value={values.nextFollowUp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.nextFollowUp && touched.nextFollowUp ? 'error' : ''}
                  />
                  {errors.nextFollowUp && touched.nextFollowUp && <div className="error-text">{errors.nextFollowUp}</div>}
                </div>
                <div className="form-group">
                  <label>Notes</label>
                  <textarea
                    name="notes"
                    placeholder="Enter notes"
                    rows={4}
                    value={values.notes}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.notes && touched.notes ? 'error' : ''}
                  />
                  {errors.notes && touched.notes && <div className="error-text">{errors.notes}</div>}
                </div>

                <DynamicAdditionalFields
                  fields={filteredFieldDefs}
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                />
                {!isEditing && <AutoSaveForm draftId={draftId} onDraftSaved={onDraftSaved} />}
              </Form>
            </div>
            <div className="drawer-footer">
              <button className="btn btn-secondary" type="button" onClick={onClose}>Cancel</button>
              <button className="btn btn-primary" type="button" onClick={submitForm} disabled={isSubmitting || (isEditing && !hasChanges)}>
                {isSubmitting ? <><Loader2 size={16} className="spin" /> {onPreviewRequest ? 'Preparing Preview...' : isEditing ? 'Updating...' : 'Saving...'}</> : onPreviewRequest ? (isEditing ? 'Preview Edit' : 'Preview Lead') : isEditing ? 'Update Lead' : 'Save Lead'}
              </button>
            </div>
          </>
        );
      }}
    </Formik>
  );
};

export default LeadForm;
