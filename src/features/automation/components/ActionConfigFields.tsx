import { Field } from 'formik';
import MultiSelect from '../../../shared/components/MultiSelect';
import { ASSIGN_TO_TYPE_OPTIONS, TASK_ASSIGNEE_TYPE_OPTIONS, MINUTES_HINT } from '../constants';
import type { AutomationActionType } from '../types/interface';
import type { LabelValuePair } from '../../../shared/types/common';

interface ActionConfigFieldsProps {
  actionType: AutomationActionType | '';
  config: Record<string, unknown>;
  namePrefix: string; // e.g. "actions[0].config"
  errors: Record<string, unknown> | undefined;
  touched: Record<string, unknown> | undefined;
  setFieldValue: (field: string, value: unknown) => void;
  sourceOptions: LabelValuePair[];
  statusOptions: LabelValuePair[];
  purposeOptions: LabelValuePair[];
  staffOptions: LabelValuePair[];
  departmentOptions: LabelValuePair[];
  campaignOptions: LabelValuePair[];
  optionsLoading: boolean;
}

const fieldError = (errors: Record<string, unknown> | undefined, touched: Record<string, unknown> | undefined, key: string) => {
  const isTouched = touched?.[key];
  const message = errors?.[key];
  return isTouched && typeof message === 'string' ? message : undefined;
};

// One action's config shape depends entirely on its own actionType - a second
// level of conditional rendering nested inside the Actions FieldArray (each
// row picks an actionType, then this component renders that type's fields).
const ActionConfigFields = ({
  actionType,
  config,
  namePrefix,
  errors,
  touched,
  setFieldValue,
  sourceOptions,
  statusOptions,
  purposeOptions,
  staffOptions,
  departmentOptions,
  campaignOptions,
  optionsLoading,
}: ActionConfigFieldsProps) => {
  if (actionType === '') return null;

  const OptionalFilters = () => (
    <>
      {(actionType === 'WEBHOOK' || actionType === 'ASSIGN_LEAD' || actionType === 'ADD_TO_CAMPAIGN') && (
        <div className="form-group">
          <label>Enquiry Source (optional)</label>
          <MultiSelect
            options={sourceOptions}
            selected={(config.sourceIds as string[]) ?? []}
            onChange={(values) => setFieldValue(`${namePrefix}.sourceIds`, values)}
            isLoading={optionsLoading}
            placeholder="Any source"
          />
        </div>
      )}
      {(actionType === 'ASSIGN_LEAD' || actionType === 'ADD_TO_CAMPAIGN') && (
        <div className="form-group">
          <label>Status (optional)</label>
          <MultiSelect
            options={statusOptions}
            selected={(config.statusIds as string[]) ?? []}
            onChange={(values) => setFieldValue(`${namePrefix}.statusIds`, values)}
            isLoading={optionsLoading}
            placeholder="Any status"
          />
        </div>
      )}
      {(actionType === 'WEBHOOK' || actionType === 'ASSIGN_LEAD' || actionType === 'ADD_TO_CAMPAIGN') && (
        <div className="form-group">
          <label>Purpose (optional)</label>
          <MultiSelect
            options={purposeOptions}
            selected={(config.purposeIds as string[]) ?? []}
            onChange={(values) => setFieldValue(`${namePrefix}.purposeIds`, values)}
            isLoading={optionsLoading}
            placeholder="Any purpose"
          />
        </div>
      )}
    </>
  );

  if (actionType === 'WEBHOOK') {
    return (
      <>
        <div className="form-group">
          <label>Webhook URL <span className="text-danger">*</span></label>
          <Field type="text" name={`${namePrefix}.url`} className="form-control" placeholder="https://example.com/webhook" />
          {fieldError(errors, touched, 'url') && <small className="field-error-text">{fieldError(errors, touched, 'url')}</small>}
        </div>
        <OptionalFilters />
      </>
    );
  }

  if (actionType === 'ADD_TASK') {
    return (
      <>
        <div className="form-group">
          <label>Task Name <span className="text-danger">*</span></label>
          <Field type="text" name={`${namePrefix}.taskName`} className="form-control" placeholder="e.g. Call within the hour" />
          {fieldError(errors, touched, 'taskName') && <small className="field-error-text">{fieldError(errors, touched, 'taskName')}</small>}
        </div>
        <div className="form-group">
          <label>Description</label>
          <Field as="textarea" name={`${namePrefix}.description`} className="form-control" rows={2} />
        </div>
        <div className="form-group">
          <label>Priority</label>
          <Field as="select" name={`${namePrefix}.priority`} className="form-control">
            <option value="">Select priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Field>
        </div>
        <div className="form-group">
          <label>Assignee <span className="text-danger">*</span></label>
          <Field as="select" name={`${namePrefix}.assigneeType`} className="form-control">
            <option value="">Select assignee</option>
            {TASK_ASSIGNEE_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Field>
          {config.assigneeType === 'STAFF' && (
            <Field as="select" name={`${namePrefix}.assigneeStaffId`} className="form-control" style={{ marginTop: '0.5rem' }}>
              <option value="">Select staff</option>
              {staffOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </Field>
          )}
        </div>
        <div className="form-group">
          <label>Start After (minutes) <span className="text-danger">*</span></label>
          <Field type="number" name={`${namePrefix}.startAfterMinutes`} className="form-control" placeholder="0" />
          <small className="field-hint">{MINUTES_HINT}</small>
        </div>
        <div className="form-group">
          <label>Deadline After (minutes)</label>
          <Field type="number" name={`${namePrefix}.deadlineAfterMinutes`} className="form-control" />
          <small className="field-hint">{MINUTES_HINT}</small>
        </div>
      </>
    );
  }

  if (actionType === 'ASSIGN_LEAD') {
    return (
      <>
        <div className="form-group">
          <label>Assign To <span className="text-danger">*</span></label>
          <Field as="select" name={`${namePrefix}.assignToType`} className="form-control">
            <option value="">Select target type</option>
            {ASSIGN_TO_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Field>
          {config.assignToType === 'STAFF' && (
            <Field as="select" name={`${namePrefix}.staffId`} className="form-control" style={{ marginTop: '0.5rem' }}>
              <option value="">Select staff</option>
              {staffOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </Field>
          )}
          {config.assignToType === 'DEPARTMENT' && (
            <Field as="select" name={`${namePrefix}.departmentId`} className="form-control" style={{ marginTop: '0.5rem' }}>
              <option value="">Select department</option>
              {departmentOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </Field>
          )}
        </div>
        <OptionalFilters />
      </>
    );
  }

  if (actionType === 'ADD_TO_CAMPAIGN') {
    return (
      <>
        <div className="form-group">
          <label>Campaign <span className="text-danger">*</span></label>
          <Field as="select" name={`${namePrefix}.campaignId`} className="form-control">
            <option value="">Select campaign</option>
            {campaignOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Field>
          {fieldError(errors, touched, 'campaignId') && <small className="field-error-text">{fieldError(errors, touched, 'campaignId')}</small>}
        </div>
        <OptionalFilters />
      </>
    );
  }

  return null;
};

export default ActionConfigFields;
