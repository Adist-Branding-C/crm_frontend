import type { ReactNode, Ref } from 'react';

interface DropdownProps {
  isOpen: boolean;
  isClosing?: boolean;
  dropdownRef?: Ref<HTMLDivElement>;
  trigger: ReactNode;
  children: ReactNode;
  panelClassName?: string;
}

const Dropdown = ({ isOpen, isClosing, dropdownRef, trigger, children, panelClassName = '' }: DropdownProps) => (
  <div className="dropdown-container" ref={dropdownRef}>
    {trigger}
    {isOpen && (
      <div className={`premium-dropdown ${panelClassName} ${isClosing ? 'closing' : ''}`.trim()}>
        {children}
      </div>
    )}
  </div>
);

export default Dropdown;
