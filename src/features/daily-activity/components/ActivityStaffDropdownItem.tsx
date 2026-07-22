import { memo } from 'react';
import type { ActivityStaffDropdownItemProps } from '../types';

const ActivityStaffDropdownItem = memo(({ staff, isSelected, onSelect }: ActivityStaffDropdownItemProps) => (
  <div
    className={`dropdown-item ${isSelected ? 'selected' : ''}`}
    onClick={onSelect}
  >
    {staff.name}
  </div>
));

ActivityStaffDropdownItem.displayName = 'ActivityStaffDropdownItem';

export default ActivityStaffDropdownItem;
