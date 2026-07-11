import { useState, useCallback } from 'react';
import { callReasonApiService } from '../services';
export function useDeleteCallReason() {
    const [isLoading, setIsLoading] = useState(false);
    const remove = useCallback(async (id) => {
        setIsLoading(true);
        try {
            const response = await callReasonApiService.delete(id);
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
//# sourceMappingURL=useDeleteCallReason.js.map