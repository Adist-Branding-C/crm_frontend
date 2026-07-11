import { useState, useCallback } from 'react';
import { taskApiService } from '../services/index';
export function useCreateTask() {
    const [isLoading, setIsLoading] = useState(false);
    const create = useCallback(async (data) => {
        setIsLoading(true);
        try {
            const response = await taskApiService.create(data);
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
//# sourceMappingURL=useCreateTask.js.map