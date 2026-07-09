export interface AdditionalFieldDef {
  fieldId: string;
  fieldKey: string;
  name: string;
  fieldType: string;
  values: string[];
  connectWithLeadPurpose: boolean;
  purposeId: string | null;
}
