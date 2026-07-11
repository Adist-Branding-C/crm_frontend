import { useState, useCallback, useRef } from 'react';
import { taskService } from '../services/taskService';
export function useCategoryOptions() {
    const [categoryOptions, setCategoryOptions] = useState([]);
    const catLoaded = useRef(false);
    const loadCategories = useCallback(async () => {
        if (catLoaded.current)
            return;
        catLoaded.current = true;
        try {
            const catRes = await taskService.getTaskCategories();
            if (catRes.status && catRes.data?.items) {
                setCategoryOptions(catRes.data.items.map((c) => ({ value: c.id, label: c.taskCategory })));
            }
        }
        catch {
            catLoaded.current = false;
        }
    }, []);
    return { categoryOptions, loadCategories };
}
//# sourceMappingURL=useCategoryOptions.js.map