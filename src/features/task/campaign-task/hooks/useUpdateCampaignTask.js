import { useState, useCallback } from 'react';
import { campaignTaskApiService } from '../services/index';
export function useUpdateCampaignTask() {
    const [isLoading, setIsLoading] = useState(false);
    const update = useCallback(async (id, data) => {
        setIsLoading(true);
        try {
            const response = await campaignTaskApiService.update(id, data);
            return response;
        }
        catch {
            return null;
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    return { update, isLoading };
}
//# sourceMappingURL=useUpdateCampaignTask.js.map