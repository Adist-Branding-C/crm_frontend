import axiosInstance from '../../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import { ESCALATION_RULES_API_ENDPOINTS } from '../constants';
import { EscalationRulesMapper } from '../mappers/escalationRules.mapper';
import type { ApiResponse } from '../../../../shared/types/common';
import type { EscalationRuleItem } from '../types/interface';
import type { EscalationRuleFormData } from '../types/request';
import type { EscalationRuleListResponse, EscalationRuleUpdateResponse } from '../types/response';

/**
 * API service for the task SLA escalation configuration - fetches all priority
 * tiers via GET /task-sla-config and updates one tier via PATCH /task-sla-config/:id.
 *
 * Used by:
 * - useEscalationRules hook.
 *
 * Notes:
 * - The GET endpoint returns a bare array (exactly 3 rows: High/Medium/Low); raw
 *   items are normalized through the mapper so the UI can rely on typed booleans.
 */
export class EscalationRulesService {
  async fetchAll(): Promise<ApiResponse<EscalationRuleListResponse>> {
    const response = await axiosInstance.get<ApiResponse<unknown[]>>(
      ESCALATION_RULES_API_ENDPOINTS.GET_ALL,
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: (response.data.data ?? []).map((item) => EscalationRulesMapper.toEscalationRuleItem(item)),
    });
  }

  async update(id: number, data: EscalationRuleFormData): Promise<ApiResponse<EscalationRuleUpdateResponse>> {
    const response = await axiosInstance.patch<ApiResponse<EscalationRuleUpdateResponse>>(
      ESCALATION_RULES_API_ENDPOINTS.UPDATE(id),
      data,
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data:
        response.data.data != null
          ? EscalationRulesMapper.toEscalationRuleItem(response.data.data)
          : undefined,
    });
  }
}