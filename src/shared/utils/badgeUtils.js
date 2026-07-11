import { WHITESPACE_REGEX } from '../constants/regex';
export function badgeClass(value) {
    return value.toLowerCase().replace(WHITESPACE_REGEX, '-');
}
export function badgeSlug(value) {
    return badgeClass(value);
}
export function renderBadge(value, className) {
    return `badge badge-${className ?? badgeClass(value)}`;
}
//# sourceMappingURL=badgeUtils.js.map