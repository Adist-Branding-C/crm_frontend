import { AlertTriangle } from 'lucide-react';
import type { RepeatOffenderRow } from '../types';

interface RepeatOffendersCalloutProps {
  repeatOffenders: RepeatOffenderRow[];
}

/**
 * Warning callout listing staff members with 2+ SLA breaches in the filtered
 * range, sorted most-frequent-first by the API.
 *
 * Used by:
 * - TaskSLABreachReport
 */
const RepeatOffendersCallout = ({ repeatOffenders }: RepeatOffendersCalloutProps) => {
  if (repeatOffenders.length === 0) return null;

  return (
    <div className="sla-repeat-offenders-callout">
      <AlertTriangle size={18} className="sla-repeat-offenders-icon" />
      <div className="sla-repeat-offenders-content">
        <p className="sla-repeat-offenders-title">
          {repeatOffenders.length} staff member{repeatOffenders.length > 1 ? 's' : ''} with repeat SLA breaches
        </p>
        <div className="sla-repeat-offenders-list">
          {repeatOffenders.map((offender) => (
            <span key={offender.staffId} className="sla-repeat-offender-pill">
              {offender.staffName ?? `Staff #${offender.staffId}`}: {offender.breachCount} breach
              {offender.breachCount > 1 ? 'es' : ''}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RepeatOffendersCallout;