import { useState, useCallback, useRef } from 'react';
import { designationService } from '../../designations/services/designation.service';
/**
 * Fetches and caches designation dropdown options for the Add/Edit Staff drawer.
 *
 * Used by:
 * - AgentPage (passed through to AddAgentDrawer)
 *
 * Notes:
 * - Loads once per session; pass force=true to bypass the cache.
 */
export function useAgentDesignationOptions() {
    const [designationOptions, setDesignationOptions] = useState([]);
    const designationsLoaded = useRef(false);
    const fetchDesignations = useCallback(async (force = false) => {
        if (!force && designationsLoaded.current)
            return;
        try {
            const response = await designationService.getAllDesignations({ pageNumber: '1', limit: '100' });
            if (response.status) {
                const data = response.data;
                const items = Array.isArray(data?.items) ? data.items : [];
                setDesignationOptions(items.map((item) => ({
                    label: item.designationName || item.name || '',
                    value: String(item.id),
                })));
                designationsLoaded.current = true;
            }
        }
        catch {
            setDesignationOptions([]);
        }
    }, []);
    return { designationOptions, fetchDesignations };
}
//# sourceMappingURL=useAgentDesignationOptions.js.map