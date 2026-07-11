import { useState, useCallback } from 'react';
import { callStatusApiService } from '../services';
export function useDeleteCallStatus() {
    const [isLoading, setIsLoading] = useState(false);
    const remove = useCallback(async (id) => {
        setIsLoading(true);
        try {
            const response = await callStatusApiService.delete(id);
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
//# sourceMappingURL=useDeleteCallStatus.js.map