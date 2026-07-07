import { buildQueryParams } from '../../../../shared/utils/queryParams.util';

export class DesignationMapper {
  static toQueryParams(params: Record<string, string | number | undefined>): string {
    return buildQueryParams(params);
  }
}
