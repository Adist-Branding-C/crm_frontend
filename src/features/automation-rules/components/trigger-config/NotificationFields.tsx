import { useFormikContext } from 'formik';
import type { RuleBuilderFormValues } from '../../hooks/useRuleBuilder';
import { useAutomationData } from '../../context/AutomationDataContext';
import MultiSelectChips from '../MultiSelectChips';

const NotificationFields = () => {
  const { values, errors, setFieldValue } = useFormikContext<RuleBuilderFormValues>();
  const { statusOptions } = useAutomationData();
  const { triggerConfig } = values;
  const configErrors = errors.triggerConfig as Record<string, string> | undefined;

  return (
    <div className="automation-config-panel">
      <div className="form-group">
        <label>Apply to leads in these statuses</label>
        <MultiSelectChips
          options={statusOptions}
          value={triggerConfig.statusIds ?? []}
          onChange={(value) => setFieldValue('triggerConfig.statusIds', value)}
        />
        {configErrors?.statusIds && <small className="automation-field-error">{configErrors.statusIds}</small>}
      </div>

      <div className="form-group" style={{ maxWidth: '260px' }}>
        <label>Minimum idle time (minutes)</label>
        <input
          type="number"
          min={1}
          className="form-control"
          value={triggerConfig.minAgeMinutes ?? ''}
          onChange={(e) => setFieldValue('triggerConfig.minAgeMinutes', e.target.value === '' ? undefined : Number(e.target.value))}
        />
        {configErrors?.minAgeMinutes && <small className="automation-field-error">{configErrors.minAgeMinutes}</small>}
      </div>
    </div>
  );
};

export default NotificationFields;
