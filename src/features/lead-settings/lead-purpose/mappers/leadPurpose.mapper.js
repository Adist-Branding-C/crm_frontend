import { formatAddedBy } from '../../../../shared/utils/addedBy.util';
export function mapApiToUI(item) {
    return {
        id: item.purposeId,
        addedBy: formatAddedBy(item.createdByName, item.createdByType),
        title: item.purpose,
    };
}
export function mapItemToFormData(item) {
    return { title: item.title };
}
//# sourceMappingURL=leadPurpose.mapper.js.map