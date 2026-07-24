import { useFormikContext } from 'formik';
import type { RuleBuilderFormValues } from '../../hooks/useRuleBuilder';
import { VALUE_CHANGE_FIELD_OPTIONS } from '../../constants/options';
import { useAutomationData } from '../../context/AutomationDataContext';
import type { SelectOption } from '../../types';

const ValueChangeFields = () => {
  const { values, errors, setFieldValue } = useFormikContext<RuleBuilderFormValues>();
  const { statusOptions, sourceOptions, purposeOptions, staffOptions } = useAutomationData();
  const { triggerConfig } = values;
  const fieldValueOptions: Record<string, SelectOption[]> = {
    statusId: statusOptions,
    sourceId: sourceOptions,
    purposeId: purposeOptions,
    agentId: staffOptions,
  };
  const valueOptions = triggerConfig.fieldName ? fieldValueOptions[triggerConfig.fieldName] : undefined;
  const configErrors = errors.triggerConfig as Record<string, string> | undefined;

  return (
    <div className="automation-config-panel">
      <div className="automation-field-row">
        <div className="form-group">
          <label>Field</label>
          <select
            className="form-control"
            value={triggerConfig.fieldName ?? ''}
            onChange={(e) => {
              setFieldValue('triggerConfig.fieldName', e.target.value);
              setFieldValue('triggerConfig.fromValue', '');
              setFieldValue('triggerConfig.toValue', '');
            }}
          >
            <option value="">Select field</option>
            {VALUE_CHANGE_FIELD_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          {configErrors?.fieldName && <small className="automation-field-error">{configErrors.fieldName}</small>}
        </div>

        <div className="form-group">
          <label>From value (optional)</label>
          {valueOptions ? (
            <select className="form-control" value={triggerConfig.fromValue ?? ''} onChange={(e) => setFieldValue('triggerConfig.fromValue', e.target.value)}>
              <option value="">Any value</option>
              {valueOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          ) : (
            <input className="form-control" value={triggerConfig.fromValue ?? ''} onChange={(e) => setFieldValue('triggerConfig.fromValue', e.target.value)} placeholder="Select a field first" disabled={!triggerConfig.fieldName} />
          )}
        </div>

        <div className="form-group">
          <label>To value (optional)</label>
          {valueOptions ? (
            <select className="form-control" value={triggerConfig.toValue ?? ''} onChange={(e) => setFieldValue('triggerConfig.toValue', e.target.value)}>
              <option value="">Any value</option>
              {valueOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          ) : (
            <input className="form-control" value={triggerConfig.toValue ?? ''} onChange={(e) => setFieldValue('triggerConfig.toValue', e.target.value)} placeholder="Select a field first" disabled={!triggerConfig.fieldName} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ValueChangeFields;
