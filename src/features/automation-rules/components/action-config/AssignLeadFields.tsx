import { getIn, useFormikContext } from 'formik';
import type { RuleBuilderFormValues } from '../../hooks/useRuleBuilder';
import type { AssignLeadActionConfig } from '../../types';
import { useAutomationData } from '../../context/AutomationDataContext';
import MultiSelectChips from '../MultiSelectChips';

const AssignLeadFields = ({ index }: { index: number }) => {
  const { values, errors, setFieldValue } = useFormikContext<RuleBuilderFormValues>();
  const { departmentOptions, purposeOptions, sourceOptions, staffOptions, statusOptions } = useAutomationData();
  const config = values.actions[index]?.actionConfig as AssignLeadActionConfig;
  const basePath = `actions.${index}.actionConfig`;

  return (
    <>
      <div className="automation-field-row">
        <div className="form-group">
          <label>Assign to</label>
          <div style={{ display: 'flex', gap: '1rem', height: '38px', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 400 }}>
              <input type="radio" checked={config.assignToType === 'STAFF'} onChange={() => setFieldValue(`${basePath}.assignToType`, 'STAFF')} /> Staff Member
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 400 }}>
              <input type="radio" checked={config.assignToType === 'DEPARTMENT'} onChange={() => setFieldValue(`${basePath}.assignToType`, 'DEPARTMENT')} /> Department
            </label>
          </div>
        </div>
        <div className="form-group">
          {config.assignToType === 'DEPARTMENT' ? (
            <>
              <label>Department</label>
              <select className="form-control" value={config.departmentId ?? ''} onChange={(e) => setFieldValue(`${basePath}.departmentId`, e.target.value)}>
                <option value="">Select department</option>
                {departmentOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              {getIn(errors, `${basePath}.departmentId`) && <small className="automation-field-error">{getIn(errors, `${basePath}.departmentId`)}</small>}
            </>
          ) : (
            <>
              <label>Staff Member</label>
              <select className="form-control" value={config.staffId ?? ''} onChange={(e) => setFieldValue(`${basePath}.staffId`, e.target.value)}>
                <option value="">Select staff member</option>
                {staffOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              {getIn(errors, `${basePath}.staffId`) && <small className="automation-field-error">{getIn(errors, `${basePath}.staffId`)}</small>}
            </>
          )}
        </div>
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

export default AssignLeadFields;
