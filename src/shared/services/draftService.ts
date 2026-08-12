export type DraftType = 'lead' | 'deal' | 'task' | 'deal-task';

export interface Draft<T = any> {
  id: string; // The draft UUID
  type: DraftType;
  title: string;
  subtitle?: string;
  createdAt: number;
  updatedAt: number;
  payload: T; // The form values or partial entity
}

const STORAGE_KEY = 'crm_drafts';

class DraftService {
  private getStorageDrafts(): Record<string, Draft> {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading drafts from localStorage', e);
    }
    return {};
  }

  private saveStorageDrafts(drafts: Record<string, Draft>) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
    } catch (e) {
      console.error('Error saving drafts to localStorage', e);
    }
  }

  public saveDraft<T>(type: DraftType, payload: T, title: string, subtitle?: string, existingId?: string): string {
    const drafts = this.getStorageDrafts();
    const id = existingId || crypto.randomUUID();
    const now = Date.now();
    
    drafts[id] = {
      id,
      type,
      title,
      subtitle,
      createdAt: existingId && drafts[id] ? drafts[id].createdAt : now,
      updatedAt: now,
      payload
    };

    this.saveStorageDrafts(drafts);
    
    // Dispatch a custom event so other tabs/components can react to local storage changes
    window.dispatchEvent(new CustomEvent('drafts_updated'));
    
    return id;
  }

  public getDrafts(type?: DraftType): Draft[] {
    const drafts = this.getStorageDrafts();
    let draftList = Object.values(drafts);
    
    if (type) {
      draftList = draftList.filter(d => d.type === type);
    }
    
    // Sort by most recently updated
    return draftList.sort((a, b) => b.updatedAt - a.updatedAt);
  }

  public getDraft<T>(id: string): Draft<T> | null {
    const drafts = this.getStorageDrafts();
    return (drafts[id] as Draft<T>) || null;
  }

  public deleteDraft(id: string): void {
    const drafts = this.getStorageDrafts();
    if (drafts[id]) {
      delete drafts[id];
      this.saveStorageDrafts(drafts);
      window.dispatchEvent(new CustomEvent('drafts_updated'));
    }
  }
}

export const draftService = new DraftService();
