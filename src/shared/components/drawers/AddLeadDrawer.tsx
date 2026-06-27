import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import * as yup from 'yup';
import type { AddLeadDrawerProps } from '../../types/drawers';
import { staffService } from '../../../features/deal/services/staff.service';
import { leadPurposeService } from '../../../features/lead-settings/lead-purpose/services';
import { leadTypeService } from '../../../features/lead-settings/lead-types/services';
import { leadStatusService } from '../../../features/lead-settings/lead-status/services';
import { leadSourceService } from '../../../features/lead-settings/lead-source/services';
import { leadDataService } from '../../../features/enquiries/services/leadDataService';
import type { CreateLeadPayload } from '../../../features/enquiries/types';
import './AddLeadDrawer.css';

interface DropdownOption {
  value: string;
  label: string;
}

interface FormValues {
  name: string;
  phone: string;
  email: string;
  agentId: string;
  purposeId: string;
  typeId: string;
  statusId: string;
  sourceId: string;
  nextFollowUp: string;
  notes: string;
  location: string;
  address: string;
}

const INITIAL_VALUES: FormValues = {
  name: '',
  phone: '',
  email: '',
  agentId: '',
  purposeId: '',
  typeId: '',
  statusId: '',
  sourceId: '',
  nextFollowUp: '',
  notes: '',
  location: '',
  address: '',
};

const validationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Name is required'),
  phone: yup
    .string()
    .trim()
    .required('Phone is required'),
  email: yup
    .string()
    .trim(),
  agentId: yup.string(),
  purposeId: yup.string(),
  typeId: yup.string(),
  statusId: yup.string(),
  sourceId: yup.string(),
  nextFollowUp: yup.string(),
  notes: yup.string().trim(),
  location: yup.string().trim(),
  address: yup.string().trim(),
});

const AddLeadDrawer = ({ isOpen, onClose, onSaved }: AddLeadDrawerProps) => {
  const [staffOptions, setStaffOptions] = useState<DropdownOption[]>([]);
  const [purposeOptions, setPurposeOptions] = useState<DropdownOption[]>([]);
  const [typeOptions, setTypeOptions] = useState<DropdownOption[]>([]);
  const [statusOptions, setStatusOptions] = useState<DropdownOption[]>([]);
  const [sourceOptions, setSourceOptions] = useState<DropdownOption[]>([]);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setLoadError('');

    const loadDropdowns = async () => {
      try {
        const [staffRes, purposeRes, typeRes, statusRes, sourceRes] = await Promise.all([
          staffService.getStaff(),
          leadPurposeService.getLeadPurposes(1, 100),
          leadTypeService.getLeadTypes(1, 100),
          leadStatusService.getLeadStatuses(1, 100),
          leadSourceService.getLeadSources(1, 100),
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
      } catch {
        setLoadError('Failed to load form options. Please try again.');
      }
    };

    loadDropdowns();
  }, [isOpen]);

  const handleSubmit = async (values: FormValues) => {
    const trimmed = Object.fromEntries(
      Object.entries(values).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v])
    ) as FormValues;

    const payload: CreateLeadPayload = {
      name: trimmed.name,
      phone: trimmed.phone,
      email: trimmed.email,
      agentId: trimmed.agentId,
      purposeId: trimmed.purposeId,
      typeId: trimmed.typeId,
      statusId: trimmed.statusId,
      sourceId: trimmed.sourceId,
      nextFollowUp: trimmed.nextFollowUp,
      notes: trimmed.notes,
      location: trimmed.location,
      address: trimmed.address,
    };
    await leadDataService.createLead(payload);
    onSaved?.();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2>Add New Lead</h2>
          <button className="drawer-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched, isSubmitting, values, handleChange, handleBlur, submitForm }) => (
            <>
              <div className="drawer-body">
                {loadError && <div className="alert alert-danger">{loadError}</div>}
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
                    <label>Source</label>
                    <Field as="select" name="sourceId" className={errors.sourceId && touched.sourceId ? 'error' : ''}>
                      <option value="">Select</option>
                      {sourceOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </Field>
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
                </Form>
              </div>
              <div className="drawer-footer">
                <button className="btn btn-secondary" type="button" onClick={onClose}>Cancel</button>
                <button className="btn btn-primary" type="button" onClick={submitForm} disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 size={16} className="spin" /> Saving...</> : 'Save Lead'}
                </button>
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddLeadDrawer;
