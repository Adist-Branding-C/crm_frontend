import { Field } from 'formik';
import type { FormikErrors, FormikTouched } from 'formik';
import MultiSelect from '../../../shared/components/MultiSelect';
import { VALUE_CHANGE_FIELD_OPTIONS, ASSIGN_TO_TYPE_OPTIONS, MINUTES_HINT } from '../constants';
import type { AutomationFormData, AutomationTriggerType } from '../types/interface';
import type { LabelValuePair } from '../../../shared/types/common';

const fieldError = (errors: Record<string, unknown>, touched: Record<string, unknown>, key: string): string | undefined => {
  const isTouched = touched[key];
  const message = errors[key];
  return isTouched && typeof message === 'string' ? message : undefined;
};

interface TriggerConfigFieldsProps {
  triggerType: AutomationTriggerType | '';
  triggerConfig: Record<string, unknown>;
  errors: FormikErrors<AutomationFormData>;
  touched: FormikTouched<AutomationFormData>;
  setFieldValue: (field: string, value: unknown) => void;
  statusOptions: LabelValuePair[];
  staffOptions: LabelValuePair[];
  departmentOptions: LabelValuePair[];
  optionsLoading: boolean;
}

// Trigger config's shape entirely depends on triggerType - this component
// branches directly on it, same "no separate step components" convention as
// the rest of this form (CampaignForm.tsx branches on values.type the same
// way). Kept as its own component purely so AutomationBuilderPage doesn't
// have to render all four variants' JSX inline.
const TriggerConfigFields = ({
  triggerType,
  triggerConfig,
  errors,
  touched,
  setFieldValue,
  statusOptions,
  staffOptions,
  departmentOptions,
  optionsLoading,
}: TriggerConfigFieldsProps) => {
  const triggerConfigErrors = (errors.triggerConfig ?? {}) as Record<string, unknown>;
  const triggerConfigTouched = (touched.triggerConfig ?? {}) as Record<string, unknown>;

  if (triggerType === 'NEW_ENQUIRY' || triggerType === '') {
    return triggerType === 'NEW_ENQUIRY' ? (
      <p className="field-hint">This trigger fires whenever a new lead is created — no additional configuration needed.</p>
    ) : null;
  }

  if (triggerType === 'VALUE_CHANGE') {
    return (
      <>
        <div className="form-group">
          <label>Field to Monitor <span className="text-danger">*</span></label>
          <Field as="select" name="triggerConfig.field" className="form-control">
            <option value="">Select a field</option>
            {VALUE_CHANGE_FIELD_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Field>
          {fieldError(triggerConfigErrors, triggerConfigTouched, 'field') && (
            <small className="field-error-text">{fieldError(triggerConfigErrors, triggerConfigTouched, 'field')}</small>
          )}
        </div>
        <div className="form-group">
          <label>From Value (optional)</label>
          <Field type="text" name="triggerConfig.fromValue" className="form-control" placeholder="Leave blank to match any previous value" />
        </div>
        <div className="form-group">
          <label>To Value (optional)</label>
          <Field type="text" name="triggerConfig.toValue" className="form-control" placeholder="Leave blank to match any new value" />
        </div>
      </>
    );
  }

  if (triggerType === 'REASSIGN' || triggerType === 'NOTIFICATION') {
    const reassignTo = (triggerConfig.reassignTo as Record<string, unknown>) ?? {};
    return (
      <>
        <div className="form-group">
          <label>Status <span className="text-danger">*</span></label>
          <MultiSelect
            options={statusOptions}
            selected={(triggerConfig.statusIds as string[]) ?? []}
            onChange={(values) => setFieldValue('triggerConfig.statusIds', values)}
            isLoading={optionsLoading}
            placeholder="Select statuses..."
          />
          {fieldError(triggerConfigErrors, triggerConfigTouched, 'statusIds') && (
            <small className="field-error-text">{fieldError(triggerConfigErrors, triggerConfigTouched, 'statusIds')}</small>
          )}
        </div>

        <div className="form-group">
          <label>{triggerType === 'REASSIGN' ? 'Time Duration (minutes)' : 'Minimum Age (minutes)'} <span className="text-danger">*</span></label>
          <Field
            type="number"
            name={triggerType === 'REASSIGN' ? 'triggerConfig.durationMinutes' : 'triggerConfig.minAgeMinutes'}
            className="form-control"
            placeholder="e.g. 2880"
          />
          <small className="field-hint">{MINUTES_HINT}</small>
        </div>

        {triggerType === 'REASSIGN' && (
          <div className="form-group">
            <label>Reassign To <span className="text-danger">*</span></label>
            <Field as="select" name="triggerConfig.reassignTo.type" className="form-control">
              <option value="">Select target type</option>
              {ASSIGN_TO_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </Field>
            {reassignTo.type === 'STAFF' && (
              <Field as="select" name="triggerConfig.reassignTo.staffId" className="form-control" style={{ marginTop: '0.5rem' }}>
                <option value="">Select staff</option>
                {staffOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </Field>
            )}
            {reassignTo.type === 'DEPARTMENT' && (
              <Field as="select" name="triggerConfig.reassignTo.departmentId" className="form-control" style={{ marginTop: '0.5rem' }}>
                <option value="">Select department</option>
                {departmentOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </Field>
            )}
          </div>
        )}
      </>
    );
  }

  return null;
};

export default TriggerConfigFields;
