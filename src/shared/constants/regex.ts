export const EMAIL_REGEX = /\S+@\S+\.\S+/;

export const PASSWORD_UPPERCASE_REGEX = /[A-Z]/;

export const PASSWORD_DIGIT_REGEX = /[0-9]/;

// Mirrors backend STRONG_PASSWORD_REGEX in crm_backend/src/shared/validators/is-strong-password.validator.ts
export const STRONG_PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[A-Za-z\d@$!%*?&#^()_\-+=]{8,}$/;

export const STRONG_PASSWORD_MESSAGE =
  'Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character';

// Mirrors backend IsValidPhoneNumber validator in crm_backend/src/shared/validators/is-valid-phone-number.validator.ts
export const PHONE_NUMBER_REGEX = /^\d{10,15}$/;

export const PHONE_NUMBER_MESSAGE = 'Phone number must contain 10-15 digits only, no symbols or spaces';

export const CAMEL_CASE_REGEX = /([A-Z])/g;

export const CAPITALIZE_FIRST_REGEX = /^./;

export const WHITESPACE_REGEX = /\s+/g;
