import { useState, useCallback } from 'react';
import { dealTaskApiService } from '../services/index';
export function useUpdateDealTask() {
    const [isLoading, setIsLoading] = useState(false);
    const update = useCallback(async (id, data) => {
        setIsLoading(true);
        try {
            const response = await dealTaskApiService.update(id, data);
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
//# sourceMappingURL=useUpdateDealTask.js.map