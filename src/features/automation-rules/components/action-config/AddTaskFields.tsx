import { getIn, useFormikContext } from 'formik';
import type { RuleBuilderFormValues } from '../../hooks/useRuleBuilder';
import type { AddTaskActionConfig } from '../../types';
import { useAutomationData } from '../../context/AutomationDataContext';

const AddTaskFields = ({ index }: { index: number }) => {
  const { values, errors, setFieldValue } = useFormikContext<RuleBuilderFormValues>();
  const { staffOptions } = useAutomationData();
  const config = values.actions[index]?.actionConfig as AddTaskActionConfig;
  const basePath = `actions.${index}.actionConfig`;

  return (
    <>
      <div className="automation-field-row">
        <div className="form-group">
          <label>Task Name</label>
          <input className="form-control" value={config.taskName} onChange={(e) => setFieldValue(`${basePath}.taskName`, e.target.value)} />
          {getIn(errors, `${basePath}.taskName`) && <small className="automation-field-error">{getIn(errors, `${basePath}.taskName`)}</small>}
        </div>
        <div className="form-group">
          <label>Priority</label>
          <select className="form-control" value={config.priority} onChange={(e) => setFieldValue(`${basePath}.priority`, e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="form-group">
          <label>Start after (minutes)</label>
          <input
            type="number"
            min={0}
            className="form-control"
            value={config.startAfterMinutes}
            onChange={(e) => setFieldValue(`${basePath}.startAfterMinutes`, e.target.value === '' ? 0 : Number(e.target.value))}
          />
          {getIn(errors, `${basePath}.startAfterMinutes`) && <small className="automation-field-error">{getIn(errors, `${basePath}.startAfterMinutes`)}</small>}
        </div>
      </div>

      <div className="form-group">
        <label>Description (optional)</label>
        <textarea className="form-control" rows={2} value={config.description ?? ''} onChange={(e) => setFieldValue(`${basePath}.description`, e.target.value)} />
      </div>

      <div className="automation-field-row">
        <div className="form-group">
          <label>Assignee</label>
          <div style={{ display: 'flex', gap: '1rem', height: '38px', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 400 }}>
              <input type="radio" checked={config.assigneeType === 'LEAD_OWNER'} onChange={() => setFieldValue(`${basePath}.assigneeType`, 'LEAD_OWNER')} /> Lead Owner
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 400 }}>
              <input type="radio" checked={config.assigneeType === 'STAFF'} onChange={() => setFieldValue(`${basePath}.assigneeType`, 'STAFF')} /> Specific Staff Member
            </label>
          </div>
        </div>
        {config.assigneeType === 'STAFF' && (
          <div className="form-group">
            <label>Staff Member</label>
            <select className="form-control" value={config.assigneeStaffId ?? ''} onChange={(e) => setFieldValue(`${basePath}.assigneeStaffId`, e.target.value)}>
              <option value="">Select staff member</option>
              {staffOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            {getIn(errors, `${basePath}.assigneeStaffId`) && <small className="automation-field-error">{getIn(errors, `${basePath}.assigneeStaffId`)}</small>}
          </div>
        )}
      </div>
    </>
  );
};

export default AddTaskFields;
