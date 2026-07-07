import type { ServiceResponseShape, ServiceResponseInput } from '../types/serviceResponse.types';

// Centralizes the axios response.data -> service return shape mapping so every
// account-settings service builds its response the same way (crm-frontend-coding-standerd check #4).
// Keys are only set when defined so the result stays assignable to callers' response
// types under exactOptionalPropertyTypes (no explicit `undefined` writes).
export class ServiceResponseUtil {
  static normalize<T>(payload: ServiceResponseInput<T>): ServiceResponseShape<T> {
    const result: ServiceResponseShape<T> = { status: payload.status, message: payload.message };
    if (payload.data !== undefined) result.data = payload.data;
    if (payload.errors !== undefined) result.errors = payload.errors;
    if (payload.field !== undefined) result.field = payload.field;
    return result;
  }
}
