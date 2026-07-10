export function formatAddedBy(name: string | null | undefined, type: string | null | undefined): string {
  if (!type) return name || '-';
  const label = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  return type.toLowerCase() === 'staff' && name ? `Staff ${name}` : label;
}
