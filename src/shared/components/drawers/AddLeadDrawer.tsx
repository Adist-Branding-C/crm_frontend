import React, { useState, useEffect, useMemo, useRef } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import type { AddLeadDrawerProps, AddLeadFormValues } from '../../types/drawers';
import type { LabelValuePair } from '../../types/common';
import { staffService } from '../../../features/deal/services/staff.service';
import { leadPurposeService } from '../../../features/lead-settings/lead-purpose/services';
import { leadTypeService } from '../../../features/lead-settings/lead-types/services';
import { leadStatusService } from '../../../features/lead-settings/lead-status/services';
import { leadSourceService } from '../../../features/lead-settings/lead-source/services';
import { leadDataService } from '../../../features/enquiries/services/leadDataService';
import { leadAdditionalService } from '../../../features/lead-settings/lead-additional/services/leadAdditionalService';
import type { LeadAdditionalApiItem } from '../../../features/lead-settings/lead-additional/types';
import type { CreateLeadPayload, UpdateLeadPayload } from '../../../features/enquiries/types';
import { getErrorMessage } from '../../../shared/utils/error';
import {
  getFieldKey,
  getInitialValues,
  buildAdditionalFieldsPayload,
} from '../../../features/enquiries/utils/additionalFields';
import { getAddLeadValidationSchema } from '../../../features/enquiries/validations/addLead.validation';
import { BASE_INITIAL_VALUES } from '../../../features/enquiries/constants/addLead.constants';
import { ERROR_MESSAGES } from '../../../features/enquiries/constants/messages';
import DynamicAdditionalFields from './DynamicAdditionalFields';
import './AddLeadDrawer.css';

const AddLeadDrawer = ({ isOpen, onClose, onSaved, lead }: AddLeadDrawerProps) => {
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
    if (!isOpen) return;
    hasLoadedRef.current = false;
    setLoadError('');
    setSubmitError('');

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
  }, [isOpen]);

  useEffect(() => {
    originalValuesRef.current = null;
    hasLoadedRef.current = false;
  }, [lead]);

  const handleSubmit = async (values: AddLeadFormValues & Record<string, string | string[]>) => {
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
      email: trimmed.email,
      sourceId: trimmed.sourceId,
    };
    if (trimmed.agentId) payload.agentId = trimmed.agentId;
    if (trimmed.purposeId) payload.purposeId = trimmed.purposeId;
    if (trimmed.typeId) payload.typeId = trimmed.typeId;
    if (trimmed.statusId) payload.statusId = trimmed.statusId;
    if (trimmed.nextFollowUp) payload.nextFollowUp = trimmed.nextFollowUp;
    if (trimmed.notes) payload.notes = trimmed.notes;
    if (trimmed.location) payload.location = trimmed.location;
    if (trimmed.address) payload.address = trimmed.address;
    if (additionalFields.length > 0) {
      payload.additionalFields = additionalFields;
    }

    try {
      if (isEditing && lead) {
        await leadDataService.updateLead(lead.leadId, payload);
      } else {
        await leadDataService.createLead(payload);
      }
      onSaved?.(isEditing ? 'updated' : 'created');
      onClose();
    } catch (err: unknown) {
      setSubmitError(getErrorMessage(err, 'An unexpected error occurred'));
    }
  };

  const mergedInitialValues = useMemo(() => {
    const base = { ...BASE_INITIAL_VALUES, ...getInitialValues(additionalFieldDefs) };

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
  }, [lead, staffOptions, purposeOptions, typeOptions, statusOptions, sourceOptions, additionalFieldDefs]);

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

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2>{isEditing ? 'Edit Lead' : 'Add New Lead'}</h2>
          <button className="drawer-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <Formik
          initialValues={mergedInitialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched, isSubmitting, values, handleChange, handleBlur, submitForm, setFieldValue }) => {
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
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter phone number"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.phone && touched.phone ? 'error' : ''}
                      />
                      {errors.phone && touched.phone && <div className="error-text">{errors.phone}</div>}
                    </div>
                    <div className="form-group">
                      <label>Email <span className="required">*</span></label>
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
                      <label>Assigned To <span className="required">*</span></label>
                      <Field as="select" name="agentId" className={errors.agentId && touched.agentId ? 'error' : ''}>
                        <option value="">Select</option>
                        {staffOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </Field>
                      <FormikError name="agentId" component="div" className="error-text" />
                    </div>
                    <div className="form-group">
                      <label>Purpose</label>
                      <Field as="select" name="purposeId" className={errors.purposeId && touched.purposeId ? 'error' : ''}>
                        <option value="">Select</option>
                        {purposeOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </Field>
                      <FormikError name="purposeId" component="div" className="error-text" />
                    </div>
                    <div className="form-group">
                      <label>Type</label>
                      <Field as="select" name="typeId" className={errors.typeId && touched.typeId ? 'error' : ''}>
                        <option value="">Select</option>
                        {typeOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </Field>
                      <FormikError name="typeId" component="div" className="error-text" />
                    </div>
                    <div className="form-group">
                      <label>Status</label>
                      <Field as="select" name="statusId" className={errors.statusId && touched.statusId ? 'error' : ''}>
                        <option value="">Select</option>
                        {statusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </Field>
                      <FormikError name="statusId" component="div" className="error-text" />
                    </div>
                    <div className="form-group">
                      <label>Source <span className="required">*</span></label>
                      <Field as="select" name="sourceId" className={errors.sourceId && touched.sourceId ? 'error' : ''}>
                        <option value="">Select</option>
                        {sourceOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </Field>
                      <FormikError name="sourceId" component="div" className="error-text" />
                    </div>
                    <div className="form-group">
                      <label>Location <span className="required">*</span></label>
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
                      <label>Address <span className="required">*</span></label>
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
                      <label>Next Follow Up <span className="required">*</span></label>
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
                  </Form>
                </div>
                <div className="drawer-footer">
                  <button className="btn btn-secondary" type="button" onClick={onClose}>Cancel</button>
                   <button className="btn btn-primary" type="button" onClick={submitForm} disabled={isSubmitting || (isEditing && !hasChanges)}>
                    {isSubmitting ? <><Loader2 size={16} className="spin" /> {isEditing ? 'Updating...' : 'Saving...'}</> : isEditing ? 'Update Lead' : 'Save Lead'}
                  </button>
                </div>
              </>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddLeadDrawer;
