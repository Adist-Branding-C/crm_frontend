import { useState, useEffect } from 'react';
import { staffService } from '../services/staff.service';
export function useStaffList() {
    const [staff, setStaff] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        staffService.getStaff()
            .then((response) => {
            const data = response?.data ?? response ?? [];
            const items = Array.isArray(data) ? data : [];
            setStaff(items.map((s) => ({ label: s.name, value: s.id })));
        })
            .catch(() => setStaff([]))
            .finally(() => setIsLoading(false));
    }, []);
    return { staff, isLoading };
}
//# sourceMappingURL=useStaffList.js.map