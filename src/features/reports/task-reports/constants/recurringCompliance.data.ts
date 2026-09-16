import type {
  RecurringTaskComplianceStatus,
  RecurringTaskInstanceStatus,
} from '../types';

export const RECURRING_COMPLIANCE_STATUS_OPTIONS = [
  { value: 'healthy', label: 'Healthy' },
  { value: 'at_risk', label: 'At Risk' },
  { value: 'broken', label: 'Broken' },
];

export const RECURRING_STATUS_META: Record<
  RecurringTaskComplianceStatus,
  { label: string; emoji: string; className: string }
> = {
  healthy: { label: 'Healthy', emoji: '\u{1F7E2}', className: 'healthy' },
  at_risk: { label: 'At Risk', emoji: '\u{1F7E1}', className: 'at-risk' },
  broken: { label: 'Broken', emoji: '\u{1F534}', className: 'broken' },
};

export const RECURRING_INSTANCE_STATUS_META: Record<
  RecurringTaskInstanceStatus,
  { label: string; className: string }
> = {
  on_time: { label: 'On-time', className: 'on-time' },
  late: { label: 'Late', className: 'late' },
  missed: { label: 'Missed', className: 'missed' },
  pending: { label: 'Pending', className: 'pending' },
};
