import { useCallback } from 'react';
import { campaignApiService } from '../services';
export function useCampaignApi() {
    const create = useCallback(async (payload) => {
        try {
            return await campaignApiService.create(payload);
        }
        catch {
            return null;
        }
    }, []);
    const update = useCallback(async (id, payload) => {
        try {
            return await campaignApiService.update(id, payload);
        }
        catch {
            return null;
        }
    }, []);
    const remove = useCallback(async (id) => {
        try {
            return await campaignApiService.delete(id);
        }
        catch {
            return null;
        }
    }, []);
    return { create, update, remove };
}
//# sourceMappingURL=useCampaignApi.js.map