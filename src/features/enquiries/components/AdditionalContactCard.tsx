import { Trash2 } from 'lucide-react';
import type { ChangeEvent } from 'react';
import { COUNTRY_CODES } from '../../../shared/constants/countryCodes';
import type { ContactType } from '../types';
import ContactUsageFields from './ContactUsageFields';

export interface AdditionalContactCardErrors {
  countryCode?: string | undefined;
  phone?: string | undefined;
  types?: string | undefined;
  remarks?: string | undefined;
}

export interface AdditionalContactCardProps {
  slot: number;
  domId: string;
  countryCode: string;
  phone: string;
  types: ContactType[];
  remarks: string;
  errors: AdditionalContactCardErrors;
  onCountryCodeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onPhoneChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPhoneBlur: () => void;
  onTypesChange: (types: ContactType[]) => void;
  onRemarksChange: (remarks: string) => void;
  onRemove?: (() => void) | undefined;
}

const AdditionalContactCard = ({
  slot,
  domId,
  countryCode,
  phone,
  types,
  remarks,
  errors,
  onCountryCodeChange,
  onPhoneChange,
  onPhoneBlur,
  onTypesChange,
  onRemarksChange,
  onRemove,
}: AdditionalContactCardProps) => (
  <section className="form-group contact-card contact-slot-enter" aria-label={`Contact number ${slot}`}>
    <header className="contact-card__header">
      <label className="contact-card__title" htmlFor={`lead-contact-${domId}-phone`}>
        Contact Number {slot}
      </label>
      {onRemove && (
        <button
          type="button"
          className="contact-card__remove"
          aria-label={`Remove contact number ${slot}`}
          title="Remove"
          onClick={onRemove}
        >
          <Trash2 size={15} />
        </button>
      )}
    </header>

    <div className="phone-field-group">
      <select
        name={`countryCode-${domId}`}
        aria-label={`Contact number ${slot} country code`}
        value={countryCode}
        onChange={onCountryCodeChange}
        className={`phone-country-code${errors.countryCode ? ' error' : ''}`}
      >
        <option value="">Country</option>
        {COUNTRY_CODES.map((c) => (
          <option key={`${c.country}-${c.code}`} value={c.code}>{c.code} {c.country}</option>
        ))}
      </select>
      <input
        type="text"
        inputMode="numeric"
        name={`lead-phone-${domId}-no-autofill`}
        id={`lead-contact-${domId}-phone`}
        autoComplete="do-not-autofill-phone"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        placeholder="Enter phone number"
        value={phone}
        onChange={onPhoneChange}
        onBlur={onPhoneBlur}
        className={errors.phone ? 'error' : ''}
      />
    </div>
    {errors.countryCode && <div className="error-text">{errors.countryCode}</div>}
    {errors.phone && <div className="error-text">{errors.phone}</div>}

    <ContactUsageFields
      idPrefix={`lead-contact-${domId}`}
      numberLabel={`Contact number ${slot}`}
      types={types}
      remarks={remarks}
      typesError={errors.types}
      remarksError={errors.remarks}
      onTypesChange={onTypesChange}
      onRemarksChange={onRemarksChange}
    />
  </section>
);

export default AdditionalContactCard;
