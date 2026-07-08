import { buildQueryParams } from '../../../../shared/utils/queryParams.util';

export class CheckoutNoteMapper {
  static toQueryParams(params: Record<string, string | number | undefined>): string {
    return buildQueryParams(params);
  }
}
