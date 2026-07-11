import { formatAddedBy } from '../../../../shared/utils/addedBy.util';
export function mapApiToUI(item) {
    return {
        id: item.statusId,
        addedBy: formatAddedBy(item.createdByName, item.createdByType),
        status: item.status,
        color: item.color,
        useForConversion: item.conversion,
    };
}
export function mapItemToFormData(item) {
    return {
        status: item.status,
        color: item.color,
        useForConversion: item.useForConversion,
    };
}
//# sourceMappingURL=leadStatus.mapper.js.map