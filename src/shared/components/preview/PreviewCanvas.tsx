import React from 'react';
import { Loader2, ArrowLeft, Check, Edit2, X } from 'lucide-react';
import Drawer from '../drawers/Drawer';
import './PreviewCanvas.css';

export interface PreviewSection {
  title: string;
  fields: { label: string; value: string | React.ReactNode }[];
}

export interface PreviewCanvasProps {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  sections: PreviewSection[];
  isSaving?: boolean;
  error?: string | null;
  onClose: () => void;
  onEdit: () => void;
  onSave: () => void;
}

const PreviewCanvas: React.FC<PreviewCanvasProps> = ({
  isOpen,
  title,
  subtitle,
  sections,
  isSaving = false,
  error,
  onClose,
  onEdit,
  onSave
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      overlayClassName="preview-drawer-overlay"
      panelClassName="preview-drawer-panel"
      animated={true}
    >
      <div className="preview-canvas-content">
        {subtitle && <p className="preview-subtitle">{subtitle}</p>}
        
        <div className="preview-sections">
          {sections.map((section, sIdx) => (
            <div key={`section-${sIdx}`} className="preview-section">
              <h3 className="preview-section-title">{section.title}</h3>
              <div className="preview-grid">
                {section.fields.map((field, fIdx) => (
                  <div key={`field-${sIdx}-${fIdx}`} className="preview-field">
                    <span className="preview-field-label">{field.label}</span>
                    <span className="preview-field-value">
                      {field.value || <span className="preview-field-empty">Not provided</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="preview-canvas-footer">
        <button
          type="button"
          onClick={onEdit}
          disabled={isSaving}
          className="preview-btn-edit"
        >
          <Edit2 className="preview-icon" size={16} />
          Edit
        </button>
        <div className="preview-footer-actions">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="preview-btn-cancel"
          >
            <X className="preview-icon" size={16} />
            Discard
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="preview-btn-save"
          >
            {isSaving ? (
              <>
                <Loader2 className="preview-icon spinning" size={16} />
                Saving...
              </>
            ) : (
              <>
                <Check className="preview-icon" size={16} />
                Confirm & Save
              </>
            )}
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default PreviewCanvas;
