import { useState, useCallback } from 'react';
import { taskApiService } from '../services/index';
export function useUpdateTask() {
    const [isLoading, setIsLoading] = useState(false);
    const update = useCallback(async (id, data) => {
        setIsLoading(true);
        try {
            const response = await taskApiService.update(id, data);
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
//# sourceMappingURL=useUpdateTask.js.map