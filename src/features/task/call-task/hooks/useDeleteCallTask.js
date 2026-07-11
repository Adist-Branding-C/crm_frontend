import { useState, useCallback } from 'react';
import { callTaskApiService } from '../services/index';
export function useDeleteCallTask() {
    const [isLoading, setIsLoading] = useState(false);
    const remove = useCallback(async (id) => {
        setIsLoading(true);
        try {
            const response = await callTaskApiService.delete(id);
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
//# sourceMappingURL=useDeleteCallTask.js.map