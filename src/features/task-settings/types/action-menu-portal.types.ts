export interface ActionMenuPortalProps {
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLElement | null>;
  onClose: () => void;
  children: React.ReactNode;
}
