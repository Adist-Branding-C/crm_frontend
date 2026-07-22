import { getIn, useFormikContext } from 'formik';
import type { RuleBuilderFormValues } from '../../hooks/useRuleBuilder';
import type { AddToCampaignActionConfig } from '../../types';
import { useAutomationData } from '../../context/AutomationDataContext';
import MultiSelectChips from '../MultiSelectChips';

const AddToCampaignFields = ({ index }: { index: number }) => {
  const { values, errors, setFieldValue } = useFormikContext<RuleBuilderFormValues>();
  const { campaignOptions, purposeOptions, sourceOptions, statusOptions } = useAutomationData();
  const config = values.actions[index]?.actionConfig as AddToCampaignActionConfig;
  const basePath = `actions.${index}.actionConfig`;

  return (
    <>
      <div className="form-group">
        <label>Campaign</label>
        <select className="form-control" value={config.campaignId} onChange={(e) => setFieldValue(`${basePath}.campaignId`, e.target.value)}>
          <option value="">Select campaign</option>
          {campaignOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        {getIn(errors, `${basePath}.campaignId`) && <small className="automation-field-error">{getIn(errors, `${basePath}.campaignId`)}</small>}
      </div>
      <div className="automation-field-row">
        <div className="form-group">
          <label>Source filter (optional)</label>
          <MultiSelectChips options={sourceOptions} value={config.sourceIds ?? []} onChange={(value) => setFieldValue(`${basePath}.sourceIds`, value)} />
        </div>
        <div className="form-group">
          <label>Status filter (optional)</label>
          <MultiSelectChips options={statusOptions} value={config.statusIds ?? []} onChange={(value) => setFieldValue(`${basePath}.statusIds`, value)} />
        </div>
        <div className="form-group">
          <label>Purpose filter (optional)</label>
          <MultiSelectChips options={purposeOptions} value={config.purposeIds ?? []} onChange={(value) => setFieldValue(`${basePath}.purposeIds`, value)} />
        </div>
      </div>
    </>
  );
};

export default AddToCampaignFields;
