export interface Integration {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  description: string;
  icon: string;
  configFields: string[];
  hasViewLeads?: boolean;
}
