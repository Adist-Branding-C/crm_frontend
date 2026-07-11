import { useState, useCallback } from 'react';
import { callReasonApiService } from '../services';
export function useUpdateCallReason() {
    const [isLoading, setIsLoading] = useState(false);
    const update = useCallback(async (id, data) => {
        setIsLoading(true);
        try {
            const response = await callReasonApiService.update(id, data);
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
//# sourceMappingURL=useUpdateCallReason.js.map