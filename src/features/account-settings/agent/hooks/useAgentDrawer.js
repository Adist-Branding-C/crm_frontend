import { useEditDrawer } from '../../../../shared/hooks/useEditDrawer';
import { mapAgentToFormData } from '../utils/mapAgentToFormData';
import { ADD_AGENT_INITIAL_VALUES } from '../constants/agent.constants';
/**
 * Add/edit drawer state for the account-settings/agent ("Staff") tab.
 *
 * Notes:
 * - Thin wrapper around the shared useEditDrawer, configured with the agent item->form mapper.
 */
export function useAgentDrawer() {
    return useEditDrawer({
        mapItemToFormData: mapAgentToFormData,
        emptyFormData: ADD_AGENT_INITIAL_VALUES,
    });
}
//# sourceMappingURL=useAgentDrawer.js.map