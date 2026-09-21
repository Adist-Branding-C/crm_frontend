import { MessageCircle, MessageSquare, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export enum ContactType {
  CALL = 'call',
  WHATSAPP = 'whatsapp',
  TEXT = 'text',
}

export interface ContactTypeConfig {
  value: ContactType;
  label: string;
  icon: LucideIcon;
}

export const CONTACT_TYPES: ContactTypeConfig[] = [
  { value: ContactType.CALL, label: 'Call', icon: Phone },
  { value: ContactType.WHATSAPP, label: 'WhatsApp', icon: MessageSquare },
  { value: ContactType.TEXT, label: 'Text', icon: MessageCircle },
];

export const getContactTypeConfig = (type: string): ContactTypeConfig | undefined =>
  CONTACT_TYPES.find((config) => config.value === type);

export const getContactTypeLabel = (type: string): string => getContactTypeConfig(type)?.label ?? type;

export const DEFAULT_PRIMARY_CONTACT_TYPES: ContactType[] = [ContactType.CALL, ContactType.WHATSAPP];
export const DEFAULT_ADDITIONAL_CONTACT_TYPES: ContactType[] = [ContactType.CALL];
export const MAX_CONTACT_REMARKS_LENGTH = 500;
