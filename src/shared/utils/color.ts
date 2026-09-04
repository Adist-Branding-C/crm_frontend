/**
 * Build a translucent fill from a solid color, for tinted badge / icon
 * backgrounds. Replaces the old hex-suffix concatenation trick, which only
 * worked for 6-digit hex and produced an invalid value for var(--token) colors.
 *
 * `color-mix` accepts both hex and `var(--token)`, so callers can pass a theme
 * token and the tint follows the active theme.
 */
export const tint = (color: string, percent = 14): string =>
  `color-mix(in srgb, ${color} ${percent}%, transparent)`;
