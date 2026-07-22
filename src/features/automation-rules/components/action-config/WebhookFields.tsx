import { getIn, useFormikContext } from 'formik';
import type { RuleBuilderFormValues } from '../../hooks/useRuleBuilder';
import type { WebhookActionConfig } from '../../types';
import { useAutomationData } from '../../context/AutomationDataContext';
import MultiSelectChips from '../MultiSelectChips';

const WebhookFields = ({ index }: { index: number }) => {
  const { values, errors, setFieldValue } = useFormikContext<RuleBuilderFormValues>();
  const { sourceOptions, purposeOptions } = useAutomationData();
  const config = values.actions[index]?.actionConfig as WebhookActionConfig;
  const basePath = `actions.${index}.actionConfig`;
  const urlError = getIn(errors, `${basePath}.url`);

  return (
    <>
      <div className="form-group">
        <label>Webhook URL</label>
        <input
          type="url"
          className="form-control"
          placeholder="https://example.com/hook"
          value={config.url}
          onChange={(e) => setFieldValue(`${basePath}.url`, e.target.value)}
        />
        {urlError && <small className="automation-field-error">{urlError}</small>}
      </div>
      <div className="automation-field-row">
        <div className="form-group">
          <label>Source filter (optional)</label>
          <MultiSelectChips options={sourceOptions} value={config.sourceIds ?? []} onChange={(value) => setFieldValue(`${basePath}.sourceIds`, value)} />
        </div>
        <div className="form-group">
          <label>Purpose filter (optional)</label>
          <MultiSelectChips options={purposeOptions} value={config.purposeIds ?? []} onChange={(value) => setFieldValue(`${basePath}.purposeIds`, value)} />
        </div>
      </div>
    </>
  );
};

export default WebhookFields;
