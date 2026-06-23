export interface LeadCampaignFieldsProps {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  errors: Record<string, string>;
  onChange: (name: string, value: string) => void;
}
