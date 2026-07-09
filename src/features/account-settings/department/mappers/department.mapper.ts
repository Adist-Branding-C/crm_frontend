import { buildQueryParams } from '../../../../shared/utils/queryParams.util';
import type { DepartmentQueryParams } from '../types/department.types';

export class DepartmentMapper {
  static toQueryParams(params: DepartmentQueryParams): string {
    return buildQueryParams(params);
  }
}
