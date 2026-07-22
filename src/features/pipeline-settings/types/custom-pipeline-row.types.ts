import type { CustomPipelineItem } from './interface';

export interface CustomPipelineRowProps {
  item: CustomPipelineItem;
  index: number;
  isMenuOpen: boolean;
  onToggleMenu: (open: boolean) => void;
  onEdit: (item: CustomPipelineItem) => void;
  onDelete: (item: CustomPipelineItem) => void;
}
