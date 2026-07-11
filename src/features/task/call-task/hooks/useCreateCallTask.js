import { useState, useCallback } from 'react';
import { callTaskApiService } from '../services/index';
export function useCreateCallTask() {
    const [isLoading, setIsLoading] = useState(false);
    const create = useCallback(async (data) => {
        setIsLoading(true);
        try {
            const response = await callTaskApiService.create(data);
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
//# sourceMappingURL=useCreateCallTask.js.map