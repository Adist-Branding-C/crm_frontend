import { useState, useCallback } from 'react';
import { callStatusApiService } from '../services';
export function useUpdateCallStatus() {
    const [isLoading, setIsLoading] = useState(false);
    const update = useCallback(async (id, data) => {
        setIsLoading(true);
        try {
            const response = await callStatusApiService.update(id, data);
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
//# sourceMappingURL=useUpdateCallStatus.js.map