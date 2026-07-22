export function normalizeFieldType(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export function denormalizeFieldType(type: string): string {
  return type.charAt(0).toLowerCase() + type.slice(1);
}
