import { useFormikContext } from 'formik';
import { UserPlus, RefreshCw, ArrowRightLeft, BellRing, FilePlus2, PencilLine, GitBranch, ListPlus, ClipboardPen, KanbanSquare } from 'lucide-react';
import type { ComponentType } from 'react';
import type { RuleBuilderFormValues } from '../hooks/useRuleBuilder';
import type { TriggerType } from '../types';
import { DEAL_TRIGGER_TYPES, LEAD_TRIGGER_TYPES, TASK_TRIGGER_TYPES, TRIGGER_TYPE_META, isWebhookOnlyTrigger } from '../constants';
import { sanitizeWebhookOnlyActions } from '../utils/webhookOnlyActions';
import ValueChangeFields from './trigger-config/ValueChangeFields';
import ReassignFields from './trigger-config/ReassignFields';
import NotificationFields from './trigger-config/NotificationFields';

const TRIGGER_ICONS: Record<TriggerType, ComponentType<{ size?: number }>> = {
  NEW_ENQUIRY: UserPlus,
  VALUE_CHANGE: RefreshCw,
  REASSIGN: ArrowRightLeft,
  NOTIFICATION: BellRing,
  DEAL_CREATED: FilePlus2,
  DEAL_UPDATED: PencilLine,
  DEAL_STAGE_CHANGED: GitBranch,
  TASK_CREATED: ListPlus,
  TASK_UPDATED: ClipboardPen,
  TASK_STAGE_CHANGED: KanbanSquare,
};

const TriggerSection = () => {
  const { values, errors, touched, setFieldValue } = useFormikContext<RuleBuilderFormValues>();

  const selectTrigger = (triggerType: TriggerType) => {
    if (values.triggerType === triggerType) return;
    setFieldValue('triggerType', triggerType);
    setFieldValue('triggerConfig', {});
    if (triggerType === 'REASSIGN' || triggerType === 'NOTIFICATION') {
      setFieldValue('actions', []);
    } else if (isWebhookOnlyTrigger(triggerType)) {
      // Drop incompatible actions/filters so a Deal/Task rule can never carry a lead-only payload.
      setFieldValue('actions', sanitizeWebhookOnlyActions(values.actions));
    }
  };

  const renderTriggerCard = (triggerType: TriggerType) => {
    const meta = TRIGGER_TYPE_META[triggerType];
    const Icon = TRIGGER_ICONS[triggerType];
    const selected = values.triggerType === triggerType;
    return (
      <button
        type="button"
        key={triggerType}
        className={`automation-trigger-card ${selected ? 'selected' : ''}`}
        onClick={() => selectTrigger(triggerType)}
      >
        <span className="automation-trigger-card-icon"><Icon size={18} /></span>
        <span>
          <div className="automation-trigger-card-title">{meta.label}</div>
          <div className="automation-trigger-card-desc">{meta.description}</div>
        </span>
      </button>
    );
  };

  return (
    <div className="automation-builder-section">
      <h3>Trigger</h3>
      <div className="automation-trigger-group">
        <div className="automation-trigger-group-label">Lead triggers</div>
        <div className="automation-trigger-grid">
          {LEAD_TRIGGER_TYPES.map(renderTriggerCard)}
        </div>
      </div>
      <div className="automation-trigger-group">
        <div className="automation-trigger-group-label">Deal triggers</div>
        <div className="automation-trigger-grid">
          {DEAL_TRIGGER_TYPES.map(renderTriggerCard)}
        </div>
      </div>
      <div className="automation-trigger-group">
        <div className="automation-trigger-group-label">Task triggers</div>
        <div className="automation-trigger-grid">
          {TASK_TRIGGER_TYPES.map(renderTriggerCard)}
        </div>
      </div>
      {touched.triggerType && errors.triggerType && (
        <small className="automation-field-error">{errors.triggerType}</small>
      )}

      {values.triggerType === 'VALUE_CHANGE' && <ValueChangeFields />}
      {values.triggerType === 'REASSIGN' && <ReassignFields />}
      {values.triggerType === 'NOTIFICATION' && <NotificationFields />}
    </div>
  );
};

export default TriggerSection;
