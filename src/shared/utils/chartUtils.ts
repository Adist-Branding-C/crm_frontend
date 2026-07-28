/**
 * Picks a color for a chart segment by cycling through a palette by index.
 *
 * Used by: dashboard statistic widgets that render pie/legend segments
 * (e.g. CampaignsWidget) where each segment needs a stable, repeatable
 * color keyed to its position in the data array.
 *
 * Notes:
 * - Wraps the index with modulo so any palette length works for any data length.
 * - Falls back to `defaultColor` if the computed index is somehow out of bounds.
 */
export function getColorForIndex(index: number, palette: readonly string[], defaultColor: string): string {
  return palette[index % palette.length] ?? defaultColor;
}
