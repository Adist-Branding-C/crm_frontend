import { buildQueryParams } from '../../../../shared/utils/queryParams.util';

export class WhatsappTemplateMapper {
  static toQueryParams(params: Record<string, string | number | undefined>): string {
    return buildQueryParams(params);
  }
}
