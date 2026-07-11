import { useState, useCallback } from 'react';
import { dealTaskApiService } from '../services/index';
export function useDeleteDealTask() {
    const [isLoading, setIsLoading] = useState(false);
    const remove = useCallback(async (id) => {
        setIsLoading(true);
        try {
            const response = await dealTaskApiService.delete(id);
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
//# sourceMappingURL=useDeleteDealTask.js.map