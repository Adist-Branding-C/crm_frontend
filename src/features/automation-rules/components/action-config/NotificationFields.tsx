import { getIn, useFormikContext } from 'formik';
import type { RuleBuilderFormValues } from '../../hooks/useRuleBuilder';
import type { NotificationActionConfig } from '../../types';
import { useAutomationData } from '../../context/AutomationDataContext';
import { NOTIFICATION_PLACEHOLDERS } from '../../constants';

const NotificationFields = ({ index }: { index: number }) => {
  const { values, errors, setFieldValue } = useFormikContext<RuleBuilderFormValues>();
  const { staffOptions } = useAutomationData();
  const config = values.actions[index]?.actionConfig as NotificationActionConfig;
  const basePath = `actions.${index}.actionConfig`;

  return (
    <>
      <div className="form-group">
        <label>Recipient</label>
        <div style={{ display: 'flex', gap: '1rem', height: '38px', alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 400 }}>
            <input
              type="radio"
              checked={config.recipient === 'LEAD_OWNER'}
              onChange={() => {
                setFieldValue(`${basePath}.recipient`, 'LEAD_OWNER');
                setFieldValue(`${basePath}.userId`, '');
              }}
            />{' '}
            Lead Owner
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 400 }}>
            <input
              type="radio"
              checked={config.recipient === 'SPECIFIC_USER'}
              onChange={() => setFieldValue(`${basePath}.recipient`, 'SPECIFIC_USER')}
            />{' '}
            Specific User
          </label>
        </div>
        {getIn(errors, `${basePath}.recipient`) && <small className="automation-field-error">{getIn(errors, `${basePath}.recipient`)}</small>}
      </div>

      {config.recipient === 'SPECIFIC_USER' && (
        <div className="form-group">
          <label>User</label>
          <select className="form-control" value={config.userId ?? ''} onChange={(e) => setFieldValue(`${basePath}.userId`, e.target.value)}>
            <option value="">Select user</option>
            {staffOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          {getIn(errors, `${basePath}.userId`) && <small className="automation-field-error">{getIn(errors, `${basePath}.userId`)}</small>}
        </div>
      )}

      <div className="form-group">
        <label>Title</label>
        <input className="form-control" value={config.title} onChange={(e) => setFieldValue(`${basePath}.title`, e.target.value)} />
        {getIn(errors, `${basePath}.title`) && <small className="automation-field-error">{getIn(errors, `${basePath}.title`)}</small>}
      </div>

      <div className="form-group">
        <label>Message</label>
        <textarea className="form-control" rows={3} value={config.message} onChange={(e) => setFieldValue(`${basePath}.message`, e.target.value)} />
        {getIn(errors, `${basePath}.message`) && <small className="automation-field-error">{getIn(errors, `${basePath}.message`)}</small>}
      </div>

      <p className="automation-action-hint">
        Available placeholders: {NOTIFICATION_PLACEHOLDERS.join(', ')}
      </p>
    </>
  );
};

export default NotificationFields;
