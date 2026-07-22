import { useFormikContext } from 'formik';
import { UserPlus, RefreshCw, ArrowRightLeft, BellRing } from 'lucide-react';
import type { ComponentType } from 'react';
import type { RuleBuilderFormValues } from '../hooks/useRuleBuilder';
import type { TriggerType } from '../types';
import { TRIGGER_TYPE_META } from '../constants';
import ValueChangeFields from './trigger-config/ValueChangeFields';
import ReassignFields from './trigger-config/ReassignFields';
import NotificationFields from './trigger-config/NotificationFields';

const TRIGGER_ICONS: Record<TriggerType, ComponentType<{ size?: number }>> = {
  NEW_ENQUIRY: UserPlus,
  VALUE_CHANGE: RefreshCw,
  REASSIGN: ArrowRightLeft,
  NOTIFICATION: BellRing,
};

const TRIGGER_ORDER: TriggerType[] = ['NEW_ENQUIRY', 'VALUE_CHANGE', 'REASSIGN', 'NOTIFICATION'];

const TriggerSection = () => {
  const { values, errors, touched, setFieldValue } = useFormikContext<RuleBuilderFormValues>();

  const selectTrigger = (triggerType: TriggerType) => {
    if (values.triggerType === triggerType) return;
    setFieldValue('triggerType', triggerType);
    setFieldValue('triggerConfig', {});
    if (triggerType === 'REASSIGN' || triggerType === 'NOTIFICATION') {
      setFieldValue('actions', []);
    }
  };

  return (
    <div className="automation-builder-section">
      <h3>Trigger</h3>
      <div className="automation-trigger-grid">
        {TRIGGER_ORDER.map((triggerType) => {
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
        })}
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
