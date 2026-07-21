import { FieldArray, Field } from 'formik';
import type { FormikErrors, FormikTouched } from 'formik';
import { Plus, Trash2 } from 'lucide-react';
import ActionConfigFields from './ActionConfigFields';
import { TRIGGER_ACTION_MATRIX, AUTOMATION_ACTION_TYPE_OPTIONS } from '../constants';
import type { AutomationFormData, AutomationTriggerType } from '../types/interface';
import type { LabelValuePair } from '../../../shared/types/common';

interface AutomationActionsSectionProps {
  triggerType: AutomationTriggerType | '';
  actions: AutomationFormData['actions'];
  errors: FormikErrors<AutomationFormData>;
  touched: FormikTouched<AutomationFormData>;
  setFieldValue: (field: string, value: unknown) => void;
  sourceOptions: LabelValuePair[];
  statusOptions: LabelValuePair[];
  purposeOptions: LabelValuePair[];
  staffOptions: LabelValuePair[];
  departmentOptions: LabelValuePair[];
  campaignOptions: LabelValuePair[];
  optionsLoading: boolean;
}

// Formik's FieldArray is the idiomatic primitive for "add/remove repeatable
// sub-items" - this is the first use of it in this codebase (confirmed no
// existing repeatable-list pattern anywhere else to model instead), which is
// consistent with the app being Formik+Yup-only everywhere.
const AutomationActionsSection = ({
  triggerType,
  actions,
  errors,
  touched,
  setFieldValue,
  ...optionLists
}: AutomationActionsSectionProps) => {
  // REASSIGN/NOTIFICATION have a built-in action, not user-selectable — hide
  // the whole section rather than showing an empty/disabled action builder.
  if (triggerType === 'REASSIGN' || triggerType === 'NOTIFICATION') {
    return (
      <p className="field-hint">
        This trigger runs its own built-in action automatically — no actions to configure here.
      </p>
    );
  }

  const allowedActionTypes = triggerType ? TRIGGER_ACTION_MATRIX[triggerType] : [];
  const actionTypeOptions = AUTOMATION_ACTION_TYPE_OPTIONS.filter((opt) => allowedActionTypes.includes(opt.value));
  const actionErrors = (errors.actions ?? []) as FormikErrors<AutomationFormData['actions'][number]>[];
  const actionTouched = (touched.actions ?? []) as FormikTouched<AutomationFormData['actions'][number]>[];

  return (
    <FieldArray name="actions">
      {({ push, remove }) => (
        <div className="automation-actions-list">
          {actions.map((action, index) => {
            const rowErrors = (actionErrors[index]?.config ?? {}) as Record<string, unknown>;
            const rowTouched = (actionTouched[index]?.config ?? {}) as Record<string, unknown>;
            const actionTypeError = actionTouched[index]?.actionType && typeof actionErrors[index]?.actionType === 'string'
              ? actionErrors[index]?.actionType
              : undefined;

            return (
              <div key={index} className="automation-action-row">
                <div className="automation-action-row-header">
                  <div className="form-group" style={{ flex: 1 }}>
                    <label>Action Type <span className="text-danger">*</span></label>
                    <Field as="select" name={`actions[${index}].actionType`} className="form-control">
                      <option value="">Select action type</option>
                      {actionTypeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </Field>
                    {actionTypeError && <small className="field-error-text">{actionTypeError}</small>}
                  </div>
                  <button type="button" className="btn btn-secondary automation-action-remove" onClick={() => remove(index)}>
                    <Trash2 size={16} />
                  </button>
                </div>

                <ActionConfigFields
                  actionType={action.actionType}
                  config={action.config}
                  namePrefix={`actions[${index}].config`}
                  errors={rowErrors}
                  touched={rowTouched}
                  setFieldValue={setFieldValue}
                  optionsLoading={optionLists.optionsLoading}
                  sourceOptions={optionLists.sourceOptions}
                  statusOptions={optionLists.statusOptions}
                  purposeOptions={optionLists.purposeOptions}
                  staffOptions={optionLists.staffOptions}
                  departmentOptions={optionLists.departmentOptions}
                  campaignOptions={optionLists.campaignOptions}
                />
              </div>
            );
          })}

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => push({ actionType: '', config: {} })}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Plus size={16} /> Add Action
          </button>
        </div>
      )}
    </FieldArray>
  );
};

export default AutomationActionsSection;
