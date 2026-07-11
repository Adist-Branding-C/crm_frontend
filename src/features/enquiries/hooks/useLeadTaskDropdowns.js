import { useState, useEffect, useRef } from 'react';
import { taskCategoryApiService } from '../../task-settings/task-category/services';
import { staffService } from '../../deal/services/staff.service';
export function useLeadTaskDropdowns(isOpen) {
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [staffOptions, setStaffOptions] = useState([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [isLoadingStaff, setIsLoadingStaff] = useState(false);
    const [categoriesError, setCategoriesError] = useState(null);
    const [staffError, setStaffError] = useState(null);
    const fetchedRef = useRef(false);
    useEffect(() => {
        if (isOpen && !fetchedRef.current) {
            fetchedRef.current = true;
            setIsLoadingCategories(true);
            setCategoriesError(null);
            taskCategoryApiService.fetchAll({ pageNumber: 1, limit: 10 })
                .then((response) => {
                const raw = response.data;
                const items = (raw && 'items' in raw
                    ? raw.items
                    : Array.isArray(response.data)
                        ? response.data
                        : []) || [];
                setCategoryOptions(items.map((item) => ({
                    value: String(item.id),
                    label: item.taskCategory ?? item.category ?? '',
                })));
            })
                .catch(() => setCategoriesError('Failed to load categories'))
                .finally(() => setIsLoadingCategories(false));
            setIsLoadingStaff(true);
            setStaffError(null);
            staffService.getStaff()
                .then((response) => {
                const data = response?.data ?? [];
                const items = Array.isArray(data) ? data : data.items ?? [];
                setStaffOptions((Array.isArray(items) ? items : []).map((s) => ({
                    value: s.staff_id ?? s.id ?? '',
                    label: s.name,
                })));
            })
                .catch(() => setStaffError('Failed to load staff'))
                .finally(() => setIsLoadingStaff(false));
        }
        if (!isOpen) {
            fetchedRef.current = false;
        }
    }, [isOpen]);
    return {
        categoryOptions,
        staffOptions,
        isLoadingCategories,
        isLoadingStaff,
        categoriesError,
        staffError,
    };
}
//# sourceMappingURL=useLeadTaskDropdowns.js.map