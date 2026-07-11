import { formatAddedBy } from '../../../../shared/utils/addedBy.util';
export function mapApiToUI(item) {
    return {
        id: item.typeId,
        addedBy: formatAddedBy(item.createdByName, item.createdByType),
        type: item.type,
    };
}
export function mapItemToFormData(item) {
    return { type: item.type };
}
//# sourceMappingURL=leadType.mapper.js.map