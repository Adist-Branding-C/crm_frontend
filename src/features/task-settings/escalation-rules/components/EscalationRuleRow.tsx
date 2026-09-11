import { Lock, Loader2 } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import SelectSearch from '../../../../shared/components/SelectSearch';
import type { EscalationRuleItem, DurationUnit } from '../types/interface';
import type { EscalationRuleFormData, EscalationRuleFormValues } from '../types/request';
import { EscalationRulesMapper } from '../mappers/escalationRules.mapper';
import { escalationRuleValidationSchema } from '../validations';
import { DURATION_UNIT_OPTIONS } from '../constants';

interface EscalationRuleRowProps {
  row: EscalationRuleItem;
  isSaving: boolean;
  onSave: (payload: EscalationRuleFormData) => void;
}

/**
 * One editable SLA tier (High / Medium / Low) on the Escalation Rules page - a
 * self-contained Formik form with its own Save button. The breach duration is edited
 * as an amount + unit pair (converted from/to stored breachMinutes via the mapper).
 * The Assignee notification is mandatory and always on, rendered as a locked
 * (checked + disabled) checkbox with a lock cue; the Admin notification is offered
 * only for the High tier. Recipients and Channels each occupy their own grid column.
 */
const EscalationRuleRow = ({ row, isSaving, onSave }: EscalationRuleRowProps) => {
  const initialValues = EscalationRulesMapper.toFormValues(row);
  const priorityClass = row.priority.toLowerCase();

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={escalationRuleValidationSchema}
      onSubmit={(values) => onSave(EscalationRulesMapper.toEscalationRulePayload(values, row.priority))}
    >
      {({ values, errors, touched, dirty, handleChange, handleBlur, setFieldValue, setFieldTouched }) => {
        const fieldClass = (name: keyof EscalationRuleFormValues) =>
          `form-control${touched[name] && errors[name] ? ' input-error' : ''}`;
        const saveIdle = !dirty && !isSaving;

        return (
          <Form className="escalation-rule-row">
            <div className="escalation-rule-row__cell">
              <span className={`escalation-priority-badge escalation-priority-badge--${priorityClass}`}>
                {row.priority}
              </span>
            </div>

            <div className="escalation-rule-row__cell">
              <label className="escalation-rule-row__label" htmlFor={`${row.id}-amount`}>
                Notify After
              </label>
              <div className="escalation-rule-row__duration-controls">
                <input
                  id={`${row.id}-amount`}
                  type="number"
                  name="amount"
                  className={`${fieldClass('amount')} escalation-rule-row__amount`}
                  value={values.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min={1}
                  step={1}
                  placeholder="e.g. 30"
                />
                <SelectSearch
                  name="unit"
                  value={values.unit}
                  options={DURATION_UNIT_OPTIONS}
                  onChange={(e) => {
                    setFieldValue('unit', e.target.value as DurationUnit);
                    setFieldTouched('unit', true, false);
                  }}
                  onBlur={() => setFieldTouched('unit', true, false)}
                  className="escalation-rule-row__unit"
                  placeholder="Select unit"
                />
              </div>
              <FormikError name="amount" component="small" className="field-error-text" />
            </div>

            <div className="escalation-rule-row__cell">
              <div className="escalation-rule-row__group">
                <span className="escalation-rule-row__group-label">Recipients</span>
                <label
                  className="escalation-rule-row__checkbox escalation-rule-row__checkbox--locked"
                  title="Assignee is always notified on escalation"
                >
                  <Field type="checkbox" name="notifyAssignee" disabled />
                  <span className="escalation-rule-row__checkbox-label">
                    <Lock size={12} className="escalation-rule-row__lock-icon" aria-hidden="true" />
                    Assignee
                  </span>
                </label>
                {row.priority === 'High' && (
                  <label className="escalation-rule-row__checkbox">
                    <Field type="checkbox" name="notifyAdmin" />
                    <span>Admin</span>
                  </label>
                )}
              </div>
            </div>

            <div className="escalation-rule-row__cell">
              <div className="escalation-rule-row__group">
                <span className="escalation-rule-row__group-label">Channels</span>
                <label className="escalation-rule-row__checkbox">
                  <Field type="checkbox" name="notifyInApp" />
                  <span>In-App</span>
                </label>
                <label className="escalation-rule-row__checkbox">
                  <Field type="checkbox" name="notifyEmail" />
                  <span>Email</span>
                </label>
              </div>
            </div>

            <div className="escalation-rule-row__cell escalation-rule-row__actions">
              <button
                type="submit"
                className={`btn btn-primary${saveIdle ? ' escalation-rule-row__save--idle' : ''}`}
                disabled={isSaving || !dirty}
                title={saveIdle ? 'Make a change to enable saving' : undefined}
              >
                {isSaving && <Loader2 size={16} className="spin" />}
                {isSaving ? 'Saving' : 'Save'}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EscalationRuleRow;