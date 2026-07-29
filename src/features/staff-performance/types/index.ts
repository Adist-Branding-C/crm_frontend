export interface StaffPerformanceItem {
  staffId: string;
  name: string;
  designation: string | null;
  totalLeadsAssigned: number;
  convertedLeads: number;
  conversionRate: number;
}

export interface StaffDetailViewProps {
  staff: StaffPerformanceItem;
}

export interface KpiCardProps {
  title: string;
  value: string | number;
}
