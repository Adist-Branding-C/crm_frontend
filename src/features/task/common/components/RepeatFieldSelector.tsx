import { useFormikContext } from 'formik';
import { REPEAT_TYPE_OPTIONS, WEEK_DAY_OPTIONS, MONTHLY_LAST_DAY_VALUE } from '../constants/repeatOptions';
import { getFieldClassName } from '../utils/fieldClassName';
import './RepeatFieldSelector.css';

function getConfigError(errors: Record<string, unknown>): string | undefined {
  const raw = errors.repeatConfig;
  if (typeof raw === 'string') return raw;
  if (raw && typeof raw === 'object' && 'required' in raw) return String((raw as { required: string }).required);
  return undefined;
}

interface RepeatFieldSelectorProps {
  getFieldClass: (name: string) => string;
}

const RepeatFieldSelector = ({ getFieldClass }: RepeatFieldSelectorProps) => {
  const { values, errors, touched, setFieldValue, setFieldTouched } = useFormikContext<any>();

  const repeatType = values.repeatType || 'Never';
  const configError = getConfigError(errors);

  const handleRepeatTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value;
    setFieldValue('repeatType', next);
    setFieldTouched('repeatType', true, false);
    if (next === 'Never' || next === 'Daily') {
      setFieldValue('repeatConfig', undefined);
    } else {
      setFieldValue('repeatConfig', {});
    }
  };

  const handleDayOfWeekChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = Number(e.target.value);
    setFieldValue('repeatConfig', { ...(values.repeatConfig || {}), dayOfWeek: next });
    setFieldTouched('repeatConfig', true, false);
  };

  const handleDayOfMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let next: number | 'last' | undefined = Number(e.target.value);
    if (!Number.isNaN(next) && next >= 1 && next <= 31) {
      setFieldValue('repeatConfig', { ...(values.repeatConfig || {}), dayOfMonth: next });
    } else {
      setFieldValue('repeatConfig', { ...(values.repeatConfig || {}), dayOfMonth: undefined });
    }
    setFieldTouched('repeatConfig', true, false);
  };

  const handleLastDayToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setFieldValue('repeatConfig', { ...(values.repeatConfig || {}), dayOfMonth: MONTHLY_LAST_DAY_VALUE });
    } else {
      setFieldValue('repeatConfig', { ...(values.repeatConfig || {}), dayOfMonth: undefined });
    }
    setFieldTouched('repeatConfig', true, false);
  };

  const isLastDayOff =
    values.repeatConfig?.dayOfMonth === MONTHLY_LAST_DAY_VALUE;

  return (
    <div className="form-group">
      <label>Repeat</label>
      <select
        name="repeatType"
        value={repeatType}
        onChange={handleRepeatTypeChange}
        onBlur={() => setFieldTouched('repeatType', true, false)}
        className={getFieldClass('repeatType')}
      >
        {REPEAT_TYPE_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {touched.repeatType && errors.repeatType && (
        <small className="field-error-text">{String(errors.repeatType)}</small>
      )}

      {repeatType === 'Weekly' && (
        <div className="repeat-field">
          <label>Repeat on
            <select
              name="repeatConfig.dayOfWeek"
              value={values.repeatConfig?.dayOfWeek ?? ''}
              onChange={handleDayOfWeekChange}
              onBlur={() => setFieldTouched('repeatConfig', true, false)}
              className={getFieldClass('repeatConfig')}
            >
              <option value="">Select a day</option>
              {WEEK_DAY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </label>
        </div>
      )}

      {repeatType === 'Monthly' && (
        <div className="repeat-field">
          <label>Repeat on day</label>
          <input
            type="number"
            name="repeatConfig.dayOfMonth"
            min={1}
            max={31}
            value={
              isLastDayOff || values.repeatConfig?.dayOfMonth === undefined
                ? ''
                : typeof values.repeatConfig?.dayOfMonth === 'number'
                  ? values.repeatConfig.dayOfMonth
                  : ''
            }
            onChange={handleDayOfMonthChange}
            onBlur={() => setFieldTouched('repeatConfig', true, false)}
            className={getFieldClass('repeatConfig')}
            placeholder="1-31"
          />
          <label className="repeat-last-day">
            <input
              type="checkbox"
              checked={isLastDayOff}
              onChange={handleLastDayToggle}
            />
            Last day of month
          </label>
        </div>
      )}

      {(repeatType === 'Weekly' || repeatType === 'Monthly') && configError && (
        <small className="field-error-text">{configError}</small>
      )}
    </div>
  );
};

export default RepeatFieldSelector;