import { useFormikContext } from 'formik';
import type { RuleBuilderFormValues } from '../../hooks/useRuleBuilder';
import { useAutomationData } from '../../context/AutomationDataContext';
import MultiSelectChips from '../MultiSelectChips';

const ReassignFields = () => {
  const { values, errors, setFieldValue } = useFormikContext<RuleBuilderFormValues>();
  const { departmentOptions, staffOptions, statusOptions } = useAutomationData();
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

      <div className="automation-field-row">
        <div className="form-group">
          <label>After how many minutes of inactivity</label>
          <input
            type="number"
            min={1}
            className="form-control"
            value={triggerConfig.durationMinutes ?? ''}
            onChange={(e) => setFieldValue('triggerConfig.durationMinutes', e.target.value === '' ? undefined : Number(e.target.value))}
          />
          {configErrors?.durationMinutes && <small className="automation-field-error">{configErrors.durationMinutes}</small>}
        </div>

        <div className="form-group">
          <label>Reassign to</label>
          <div style={{ display: 'flex', gap: '1rem', height: '38px', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 400 }}>
              <input type="radio" checked={triggerConfig.reassignToType === 'STAFF'} onChange={() => setFieldValue('triggerConfig.reassignToType', 'STAFF')} /> Staff Member
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 400 }}>
              <input type="radio" checked={triggerConfig.reassignToType === 'DEPARTMENT'} onChange={() => setFieldValue('triggerConfig.reassignToType', 'DEPARTMENT')} /> Department
            </label>
          </div>
          {configErrors?.reassignToType && <small className="automation-field-error">{configErrors.reassignToType}</small>}
        </div>

        <div className="form-group">
          {triggerConfig.reassignToType === 'DEPARTMENT' ? (
            <>
              <label>Department</label>
              <select className="form-control" value={triggerConfig.reassignToDepartmentId ?? ''} onChange={(e) => setFieldValue('triggerConfig.reassignToDepartmentId', e.target.value)}>
                <option value="">Select department</option>
                {departmentOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              {configErrors?.reassignToDepartmentId && <small className="automation-field-error">{configErrors.reassignToDepartmentId}</small>}
            </>
          ) : (
            <>
              <label>Staff Member</label>
              <select className="form-control" value={triggerConfig.reassignToStaffId ?? ''} onChange={(e) => setFieldValue('triggerConfig.reassignToStaffId', e.target.value)}>
                <option value="">Select staff member</option>
                {staffOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              {configErrors?.reassignToStaffId && <small className="automation-field-error">{configErrors.reassignToStaffId}</small>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReassignFields;
