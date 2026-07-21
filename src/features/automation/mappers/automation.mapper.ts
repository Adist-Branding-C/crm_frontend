import { ADD_AUTOMATION_INITIAL_VALUES } from '../constants';
import { computeSlNo } from '../utils/automation.utils';
import type { AutomationRule, AutomationFormData, AutomationActionType } from '../types/interface';
import type { CreateAutomationPayload, UpdateAutomationPayload } from '../types/request';

/**
 * Explicit shape transformations between the Automation API/entity form and the
 * automation form's local representation.
 *
 * Used by:
 * - useFetchAutomations (API list response -> AutomationRule entities with computed slNo)
 * - useAutomationSubmitHandlers (AutomationFormData -> create/update request payload)
 * - AutomationPage (AutomationRule entity -> edit-drawer initial form values)
 */
export class AutomationMapper {
  static toEntityList(items: AutomationRule[], pageNumber: number, limit: number): AutomationRule[] {
    return items.map((item, index) => ({
      ...item,
      slNo: computeSlNo(index, pageNumber, limit),
    }));
  }

  static toRequest(formData: AutomationFormData): CreateAutomationPayload | UpdateAutomationPayload {
    return {
      name: formData.name,
      triggerType: formData.triggerType as CreateAutomationPayload['triggerType'],
      isActive: formData.isActive,
      triggerConfig: formData.triggerConfig,
      // Actions are only meaningful for NEW_ENQUIRY/VALUE_CHANGE - REASSIGN/NOTIFICATION
      // always submit an empty array since their action is built-in, not user-configured.
      actions: formData.actions
        .filter((a) => a.actionType !== '')
        .map((a) => ({ actionType: a.actionType as AutomationActionType, config: a.config })),
    };
  }

  static toFormValues(item: AutomationRule | null): AutomationFormData {
    if (!item) return ADD_AUTOMATION_INITIAL_VALUES;
    return {
      name: item.name,
      triggerType: item.triggerType,
      isActive: item.isActive,
      triggerConfig: item.triggerConfig ?? {},
      actions: (item.actions ?? []).map((a) => ({ actionType: a.actionType, config: a.config })),
    };
  }
}
