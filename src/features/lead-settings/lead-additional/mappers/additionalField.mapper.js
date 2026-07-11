import { formatAddedBy } from '../../../../shared/utils/addedBy.util';
export function mapApiToUI(item) {
    return {
        id: item.fieldId,
        addedBy: formatAddedBy(item.createdByName, item.createdByType),
        field: item.name,
        fieldKey: item.fieldKey,
        type: item.fieldType,
        inFilter: item.showInFilter,
        inList: item.showInList,
        required: item.isRequired,
        purpose: item.connectWithLeadPurpose,
        purposeName: item.purpose ?? '',
        purposeId: item.purposeId,
        dropdownValues: item.values || [],
    };
}
export function mapPurposeApiToUI(item) {
    return { id: item.purposeId, title: item.purpose };
}
export function mapItemToFormData(item) {
    return {
        name: item.field,
        fieldType: item.type,
        showInFilter: item.inFilter,
        showInList: item.inList,
        isRequired: item.required,
        connectWithLeadPurpose: item.purpose,
        purposeId: item.purposeId || '',
        dropdownValues: item.dropdownValues ? [...item.dropdownValues] : [],
    };
}
//# sourceMappingURL=additionalField.mapper.js.map