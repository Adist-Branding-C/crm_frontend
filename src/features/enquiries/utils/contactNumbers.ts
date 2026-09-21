import type { ContactNumberDraft, ContactNumberPayload, ContactType, LeadContactNumber } from '../types';
import { DEFAULT_ADDITIONAL_CONTACT_TYPES, getContactTypeConfig, getContactTypeLabel } from '../constants/contactNumbers.constants';

export const createContactNumberDraft = (overrides: Partial<ContactNumberDraft> = {}): ContactNumberDraft => ({
  id: crypto.randomUUID(),
  countryCode: '',
  phone: '',
  types: [...DEFAULT_ADDITIONAL_CONTACT_TYPES],
  remarks: '',
  ...overrides,
});

export const draftsFromContacts = (contacts: LeadContactNumber[] | undefined): ContactNumberDraft[] =>
  (contacts ?? [])
    .map((contact) => {
      const knownTypes = contact.types.filter((type) => getContactTypeConfig(type));
      return createContactNumberDraft({
        id: `contact-${contact.id}`,
        countryCode: contact.countryCode,
        phone: contact.phone,
        types: knownTypes.length ? knownTypes : [...DEFAULT_ADDITIONAL_CONTACT_TYPES],
        remarks: contact.remarks ?? '',
      });
    });

export const filledDrafts = (drafts: ContactNumberDraft[]): ContactNumberDraft[] =>
  drafts.filter((draft) => draft.phone.trim());

export const toContactPayload = (drafts: ContactNumberDraft[]): ContactNumberPayload[] =>
  filledDrafts(drafts).map((draft) => ({
    countryCode: draft.countryCode.trim(),
    phone: draft.phone.trim(),
    types: draft.types,
    remarks: draft.remarks.trim() || null,
  }));

export const contactsSignature = (drafts: ContactNumberDraft[]): string =>
  JSON.stringify(toContactPayload(drafts));

export const formatContact = (countryCode: string | null | undefined, phone: string): string =>
  countryCode ? `${countryCode} ${phone}` : phone;

export const describeUse = (types: ContactType[], remarks: string): string => {
  const uses = types.map(getContactTypeLabel).join(', ');
  return remarks ? `${uses} - ${remarks}` : uses;
};
