import * as yup from 'yup';
import type { Schema } from 'yup';
import { DURATION_UNITS } from '../constants';
import type { DurationUnit } from '../types/interface';
import type { EscalationRuleFormValues } from '../types/request';

const DURATION_UNIT_VALUES: DurationUnit[] = DURATION_UNITS.map((unit) => unit.value);

/**
 * Per-row validation for an Escalation Rules tier. amount is kept as a string in
 * the form (so SelectSearch/Field stay string-typed) and validated with a numeric
 * pattern test - whole positive numbers only, converted to breachMinutes on save.
 */
export const escalationRuleValidationSchema: Schema<EscalationRuleFormValues> = yup.object({
  amount: yup
    .string()
    .required('Notify after is required')
    .test('whole-number', 'Notify after must be a whole number', (value) =>
      /^\d+$/.test(value ?? ''),
    )
    .test('min-1', 'Notify after must be at least 1', (value) => Number(value ?? 0) >= 1),
  unit: yup
    .mixed<DurationUnit>()
    .oneOf(DURATION_UNIT_VALUES, 'Select a valid unit')
    .required('Select a valid unit'),
  notifyAssignee: yup.boolean().required(),
  notifyAdmin: yup.boolean().required(),
  notifyInApp: yup.boolean().required(),
  notifyEmail: yup.boolean().required(),
});