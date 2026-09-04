/**
 * Categorical chart palette, as CSS custom-property references.
 *
 * Recharts forwards these strings straight to SVG presentation attributes
 * (`fill`, `stroke`, tick `fill`), and every current browser resolves `var()`
 * there — so the palette follows the active light/dark theme with no JS. The
 * token values live in `shared/styles/tokens.css` (`--chart-1..7`).
 *
 * Use with `getColorForIndex` (shared/utils/chartUtils.ts) for index-cycled
 * segments. Prefer this over per-widget palettes.
 */
export const CHART_PALETTE = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
  'var(--chart-6)',
  'var(--chart-7)',
] as const;

export const CHART_PALETTE_DEFAULT = 'var(--chart-1)';

/** Gridlines and axis tick labels. */
export const CHART_GRID_STROKE = 'var(--chart-grid)';
export const CHART_AXIS_LABEL = 'var(--chart-label)';
