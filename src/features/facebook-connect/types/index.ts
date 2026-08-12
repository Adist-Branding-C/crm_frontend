export interface FacebookConnection {
  id: string;
  facebookBusinessId: string;
  status: 'active' | 'expired' | 'revoked';
  tokenType: 'system_user' | 'user';
  createdAt: string;
}

export interface OAuthCallbackResult {
  connectionId: string;
  facebookBusinessId: string;
  accountName: string;
}

export interface FacebookPageSummary {
  id: string;
  name: string;
}

export interface FacebookFormQuestion {
  key: string;
  label: string;
}

export interface FacebookFormSummary {
  id: string;
  name: string;
  status: string;
  questions: FacebookFormQuestion[];
}

export interface MappingOption {
  id: string;
  name: string;
}

export interface CoreFieldOption {
  key: string;
  label: string;
}

export interface MappingOptions {
  statuses: MappingOption[];
  sources: MappingOption[];
  customFields: MappingOption[];
  coreFields: CoreFieldOption[];
}

export type FacebookFieldCategory = 'core' | 'additional' | 'status' | 'source' | 'purpose' | 'type' | 'agent';

export interface FieldMapping {
  // Only used by the fixed-value categories (status/source/purpose/type/agent).
  facebookField: string | null;
  crmFieldCategory: FacebookFieldCategory;
  crmFieldKey: string;
  // core/additional only: free text that may contain $<facebookQuestionKey>
  // tokens, substituted with that question's real answer per lead.
  valueTemplate?: string | null;
  isRequired: boolean;
}

export type WorkflowStatus = 'active' | 'inactive';

export interface Workflow {
  id: string;
  name: string;
  pageId: string;
  facebookPageId?: string;
  connectionId?: string;
  pageName?: string;
  isSubscribed?: boolean;
  facebookFormId: string;
  facebookFormName: string;
  status: WorkflowStatus;
  deactivationReason: string | null;
  fieldMappings: FieldMapping[];
  createdAt: string;
}

export interface CreateWorkflowPayload {
  name: string;
  connectionId: string;
  facebookPageId: string;
  facebookFormId: string;
  status?: WorkflowStatus;
  fieldMappings: FieldMapping[];
}

export interface UpdateWorkflowPayload {
  name?: string;
  status?: WorkflowStatus;
  fieldMappings?: FieldMapping[];
}

export type FacebookLeadStatus = 'received' | 'processing' | 'processed' | 'failed';

export interface FacebookLeadEvent {
  id: string;
  leadgenId: string;
  companyId: string | null;
  workflowId: string | null;
  pageId: string;
  formId: string;
  status: FacebookLeadStatus;
  leadId: string | null;
  errorCode: string | null;
  errorMessage: string | null;
  rawFieldData: Record<string, string> | null;
  createdAt: string;
}
