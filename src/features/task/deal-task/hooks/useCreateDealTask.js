import { useState, useCallback } from 'react';
import { dealTaskApiService } from '../services/index';
export function useCreateDealTask() {
    const [isLoading, setIsLoading] = useState(false);
    const create = useCallback(async (data) => {
        setIsLoading(true);
        try {
            const response = await dealTaskApiService.create(data);
            return response;
        }
        catch {
            return null;
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    return { create, isLoading };
}
//# sourceMappingURL=useCreateDealTask.js.map