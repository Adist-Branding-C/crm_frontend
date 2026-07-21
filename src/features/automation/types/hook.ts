import type { AutomationRule } from './interface';

// Add/edit submit handling lives in useAutomationBuilderSubmit (the
// standalone builder page) - this config only covers what the list page
// itself still does inline: delete-with-confirm and the row toggle.
export interface SubmitHandlerConfig {
  onDeleteSuccess: () => void;
  deletingItem: AutomationRule | null;
}

export interface FetchHandlers {
  setError: (msg: string) => void;
  setIsLoading: (loading: boolean) => void;
  setPageNumber: (page: number) => void;
  setSearchQuery: (q: string) => void;
  refresh: () => void;
  automationList: AutomationRule[];
}

export interface ToastHandlers {
  showToastMessage: (msg: string, type: 'success' | 'error') => void;
}
