export interface PipelineDataItem {
  name: string;
  value: number;
  displayValue: string;
  color: string;
}

export interface CustomLabelProps {
  x?: number;
  y?: number;
  width?: number;
  value?: number;
  index?: number;
}

export interface StatCardProps {
  title: string;
  value: string;
}

export interface KpiCardProps {
  title: string;
  value: string;
  isPrimary?: boolean;
  isHighlight?: boolean;
}
