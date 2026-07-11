import { useState, useCallback } from 'react';
import { callReasonApiService } from '../services';
export function useCreateCallReason() {
    const [isLoading, setIsLoading] = useState(false);
    const create = useCallback(async (data) => {
        setIsLoading(true);
        try {
            const response = await callReasonApiService.create(data);
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
//# sourceMappingURL=useCreateCallReason.js.map