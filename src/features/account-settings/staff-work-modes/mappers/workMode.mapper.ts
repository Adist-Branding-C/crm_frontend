import { buildQueryParams } from '../../../../shared/utils/queryParams.util';

export class WorkModeMapper {
  static toQueryParams(params: Record<string, string | number | undefined>): string {
    return buildQueryParams(params);
  }
}
