import { useState, useCallback } from 'react';
import { callStatusApiService } from '../services';
export function useCreateCallStatus() {
    const [isLoading, setIsLoading] = useState(false);
    const create = useCallback(async (data) => {
        setIsLoading(true);
        try {
            const response = await callStatusApiService.create(data);
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
//# sourceMappingURL=useCreateCallStatus.js.map