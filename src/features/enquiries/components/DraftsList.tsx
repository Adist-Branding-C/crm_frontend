import React, { useEffect, useState } from 'react';
import { Clock, FileText, Trash2, ArrowRight } from 'lucide-react';
import { draftService, Draft } from '../../../shared/services/draftService';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';
import './DraftsList.css';

interface DraftsListProps {
  type: 'lead' | 'deal' | 'task';
  onResumeDraft: (draftId: string) => void;
}

const DraftsList: React.FC<DraftsListProps> = ({ type, onResumeDraft }) => {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [deletingDraftId, setDeletingDraftId] = useState<string | null>(null);

  const loadDrafts = () => {
    setDrafts(draftService.getDrafts(type));
  };

  useEffect(() => {
    loadDrafts();
    
    // Listen for custom event when drafts change in other components/tabs
    const handleUpdate = () => loadDrafts();
    window.addEventListener('drafts_updated', handleUpdate);
    
    return () => {
      window.removeEventListener('drafts_updated', handleUpdate);
    };
  }, [type]);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDeletingDraftId(id);
  };

  const confirmDelete = () => {
    if (deletingDraftId) {
      draftService.deleteDraft(deletingDraftId);
      setDeletingDraftId(null);
    }
  };

  if (drafts.length === 0) {
    return (
      <div className="drafts-empty-state">
        <div className="drafts-empty-icon">
          <FileText size={48} />
        </div>
        <h3>No Drafts Found</h3>
        <p>Any unfinished {type}s you start will be saved here automatically.</p>
      </div>
    );
  }

  return (
    <div className="drafts-list-container">
      <div className="drafts-header">
        <h2>Your Saved Drafts</h2>
        <p>Pick up where you left off. Drafts are saved locally on your device.</p>
      </div>
      
      <div className="drafts-grid">
        {drafts.map((draft) => (
          <div 
            key={draft.id} 
            className="draft-card"
            onClick={() => onResumeDraft(draft.id)}
          >
            <div className="draft-card-header">
              <h3 className="draft-title">{draft.title}</h3>
              <button 
                className="draft-delete-btn"
                onClick={(e) => handleDelete(e, draft.id)}
                title="Delete Draft"
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <p className="draft-subtitle">{draft.subtitle || 'No details provided'}</p>
            
            <div className="draft-card-footer">
              <span className="draft-time">
                <Clock size={14} />
                Last edited {new Date(draft.updatedAt).toLocaleDateString()} at {new Date(draft.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </span>
              <span className="draft-resume">
                Resume <ArrowRight size={14} />
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <AdminDeleteModal
        isOpen={!!deletingDraftId}
        itemName="draft"
        onConfirm={confirmDelete}
        onClose={() => setDeletingDraftId(null)}
      />
    </div>
  );
};

export default DraftsList;
