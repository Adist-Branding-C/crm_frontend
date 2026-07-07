/**
 * Shape ServiceResponseUtil.normalize() returns.
 *
 * Used by:
 * - shared/utils/serviceResponse.util.ts
 * - every account-settings feature service that calls ServiceResponseUtil.normalize()
 */
export interface ServiceResponseShape<T = unknown> {
  status: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
  field?: string;
}

/**
 * Shape ServiceResponseUtil.normalize() accepts. Optional fields explicitly allow `undefined`
 * (unlike ServiceResponseShape) so call sites can name every source property directly -
 * e.g. `{ data: response.data.data, errors: response.data.errors }` - without the
 * exactOptionalPropertyTypes compiler option rejecting a possibly-undefined value.
 *
 * Used by:
 * - shared/utils/serviceResponse.util.ts
 */
export interface ServiceResponseInput<T = unknown> {
  status: boolean;
  message: string;
  data?: T | undefined;
  errors?: Record<string, string[]> | undefined;
  field?: string | undefined;
}
