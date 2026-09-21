import { CONTACT_TYPES, MAX_CONTACT_REMARKS_LENGTH } from '../constants/contactNumbers.constants';
import type { ContactType } from '../types';

export interface ContactUsageFieldsProps {
  idPrefix: string;
  numberLabel: string;
  types: ContactType[];
  remarks: string;
  typesError?: string | undefined;
  remarksError?: string | undefined;
  onTypesChange: (types: ContactType[]) => void;
  onRemarksChange: (remarks: string) => void;
}

const ContactUsageFields = ({
  idPrefix,
  numberLabel,
  types,
  remarks,
  typesError,
  remarksError,
  onTypesChange,
  onRemarksChange,
}: ContactUsageFieldsProps) => {
  const toggle = (type: ContactType) => {
    onTypesChange(types.includes(type) ? types.filter((item) => item !== type) : [...types, type]);
  };

  return (
    <div className="contact-usage">
      <div className="contact-usage__types" role="group" aria-label={`${numberLabel} used for`}>
        <span className="contact-usage__caption">Used for</span>
        {CONTACT_TYPES.map((option) => (
          <label key={option.value} className={`contact-usage__chip${types.includes(option.value) ? ' is-selected' : ''}`}>
            <input
              type="checkbox"
              checked={types.includes(option.value)}
              onChange={() => toggle(option.value)}
            />
            <option.icon size={13} />
            {option.label}
          </label>
        ))}
      </div>
      {typesError && <div className="error-text">{typesError}</div>}
      <input
        type="text"
        id={`${idPrefix}-remarks`}
        aria-label={`${numberLabel} remarks`}
        placeholder="Remarks (optional)"
        maxLength={MAX_CONTACT_REMARKS_LENGTH}
        value={remarks}
        onChange={(e) => onRemarksChange(e.target.value)}
        className={remarksError ? 'error' : ''}
      />
      {remarksError && <div className="error-text">{remarksError}</div>}
    </div>
  );
};

export default ContactUsageFields;
