import { formatAddedBy } from '../../../../shared/utils/addedBy.util';
export function mapApiToUI(item) {
    return {
        id: item.sourceId,
        source: item.source,
        addedBy: formatAddedBy(item.createdByName, item.createdByType),
    };
}
export function mapItemToFormData(item) {
    return { source: item.source };
}
//# sourceMappingURL=leadSource.mapper.js.map