import { WHITESPACE_REGEX } from '../constants/regex';

export function badgeClass(value: string): string {
  if (typeof value !== 'string' || !value) return 'unknown';
  return value.toLowerCase().replace(WHITESPACE_REGEX, '-');
}

export function badgeSlug(value: string): string {
  return badgeClass(value);
}

export function renderBadge(value: string, className?: string): string {
  return `badge badge-${className ?? badgeClass(value)}`;
}
