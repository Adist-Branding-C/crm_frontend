import { useState, useCallback } from 'react';
import { campaignTaskApiService } from '../services/index';
export function useDeleteCampaignTask() {
    const [isLoading, setIsLoading] = useState(false);
    const remove = useCallback(async (id) => {
        setIsLoading(true);
        try {
            const response = await campaignTaskApiService.delete(id);
            return response;
        }
        catch {
            return null;
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    return { remove, isLoading };
}
//# sourceMappingURL=useDeleteCampaignTask.js.map