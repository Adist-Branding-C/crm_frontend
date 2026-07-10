/**
 * Converts an explicitly-typed params object into a query-params object suitable
 * for an axios `{ params }` config, dropping undefined/empty values.
 *
 * Used by:
 * - Feature API service `getAll`-style methods that currently build query params
 *   by hand (e.g. CampaignApiService.getAll).
 *
 * Notes:
 * - Generic over the caller's own named-field params type (e.g. GetCampaignsParams) -
 *   callers must pass an explicitly-typed object, never a bare `Record<string, unknown>`.
 * - Structurally identical across entities, so this is the one shared place this
 *   transformation should live rather than being reimplemented per feature.
 */
export class QueryMapper {
  static toQuery<T extends object>(params: T): Partial<T> {
    const query = {} as Partial<T>;
    (Object.keys(params) as Array<keyof T>).forEach((key) => {
      const value = params[key];
      if (value !== undefined && value !== '') {
        query[key] = value;
      }
    });
    return query;
  }
}
