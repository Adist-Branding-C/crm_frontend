import { QueryMapper } from '../../../shared/mappers/query.mapper';
import type { GetPipelineParams } from '../types/request';


export class PipelineMapper {
  static toQueryParams(
    search: string,
    fromDate: string,
    toDate: string,
    agent: string,
  ): Partial<GetPipelineParams> {
    return QueryMapper.toQuery<GetPipelineParams>({
      search,
      fromDate,
      toDate,
      agent,
    });
  }
}
