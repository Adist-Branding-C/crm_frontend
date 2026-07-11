import { useState, useCallback } from 'react';
import { dealAdditionalFieldService } from '../services/dealAdditionalField.service';
export function useDealAdditionalField() {
    const [dealAdditionalFieldList, setDealAdditionalFieldList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const fetchDealAdditionalFields = useCallback(async (currentPage, currentLimit, search) => {
        setIsLoading(true);
        try {
            const response = await dealAdditionalFieldService.getAllDealAdditionalFields({ pageNumber: currentPage, limit: currentLimit, search });
            const body = response && typeof response === 'object' && 'data' in response ? response : null;
            if (body?.status && body.data && typeof body.data === 'object' && 'items' in body.data) {
                const apiData = body.data;
                setDealAdditionalFieldList(apiData.items.map(item => ({
                    id: item.id,
                    field: item.fieldName,
                    type: item.fieldType,
                    inFilter: item.showInFilter,
                    inList: item.showInList,
                    required: item.isRequired,
                })));
            }
        }
        catch {
            // silently fail
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    const handleAddDealAdditionalField = useCallback(async (values) => {
        try {
            await dealAdditionalFieldService.createDealAdditionalField({
                fieldName: values.fieldName,
                fieldType: values.fieldType,
                inFilter: values.inFilter,
                inList: values.inList,
                required: values.required,
            });
            return true;
        }
        catch {
            return false;
        }
    }, []);
    const handleUpdateDealAdditionalField = useCallback(async (id, values) => {
        try {
            await dealAdditionalFieldService.updateDealAdditionalField(id, {
                fieldName: values.fieldName,
                fieldType: values.fieldType,
                isRequired: values.required,
                showInList: values.inList,
                showInFilter: values.inFilter,
            });
            return true;
        }
        catch {
            return false;
        }
    }, []);
    const handleDeleteDealAdditionalField = useCallback(async (id) => {
        try {
            await dealAdditionalFieldService.deleteDealAdditionalField(id);
            return true;
        }
        catch {
            return false;
        }
    }, []);
    return {
        dealAdditionalFieldList, setDealAdditionalFieldList,
        isLoading, fetchDealAdditionalFields,
        handleAddDealAdditionalField, handleUpdateDealAdditionalField, handleDeleteDealAdditionalField,
    };
}
//# sourceMappingURL=useDealAdditionalField.js.map