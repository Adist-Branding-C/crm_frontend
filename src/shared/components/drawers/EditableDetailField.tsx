import { useState } from 'react';
import { Edit2, Check, X, Loader2 } from 'lucide-react';

export interface EditableDetailFieldOption {
  value: string;
  label: string;
}

export interface EditableDetailFieldProps {
  label: string;
  displayValue: string;
  editValue: string | string[];
  type: 'text' | 'date' | 'select' | 'checkbox';
  options?: EditableDetailFieldOption[];
  fullWidth?: boolean;
  onSave: (nextValue: string | string[]) => Promise<boolean>;
}

const valuesEqual = (a: string | string[], b: string | string[]): boolean => {
  if (Array.isArray(a) || Array.isArray(b)) {
    const arrA = Array.isArray(a) ? a : [a];
    const arrB = Array.isArray(b) ? b : [b];
    return arrA.length === arrB.length && arrA.every((v) => arrB.includes(v));
  }
  return a === b;
};

const EditableDetailField = ({ label, displayValue, editValue, type, options = [], fullWidth, onSave }: EditableDetailFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<string | string[]>(editValue);
  const [isSaving, setIsSaving] = useState(false);

  const startEdit = () => {
    setDraft(editValue);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setDraft(editValue);
  };

  const handleSave = async () => {
    if (valuesEqual(draft, editValue)) {
      setIsEditing(false);
      return;
    }
    setIsSaving(true);
    const success = await onSave(draft);
    setIsSaving(false);
    if (success) setIsEditing(false);
  };

  const toggleCheckboxOption = (opt: string) => {
    const current = Array.isArray(draft) ? draft : [];
    setDraft(current.includes(opt) ? current.filter((v) => v !== opt) : [...current, opt]);
  };

  return (
    <div className={`leaddrawer-detail-card${fullWidth ? ' leaddrawer-detail-full' : ''}`}>
      <div className="leaddrawer-detail-label">{label}</div>
      {!isEditing ? (
        <div className="leaddrawer-detail-value" onClick={startEdit}>
          <span>{displayValue || '-'}</span>
          <Edit2 size={12} />
        </div>
      ) : (
        <div className="leaddrawer-edit-field">
          {type === 'text' && (
            <input
              type="text"
              className="leaddrawer-edit-input"
              value={draft as string}
              autoFocus
              onChange={(e) => setDraft(e.target.value)}
              disabled={isSaving}
            />
          )}
          {type === 'date' && (
            <input
              type="date"
              className="leaddrawer-edit-input"
              value={draft as string}
              autoFocus
              onChange={(e) => setDraft(e.target.value)}
              disabled={isSaving}
            />
          )}
          {type === 'select' && (
            <select
              className="leaddrawer-edit-select"
              value={draft as string}
              autoFocus
              onChange={(e) => setDraft(e.target.value)}
              disabled={isSaving}
            >
              <option value="">Select</option>
              {options.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          )}
          {type === 'checkbox' && (
            <div className="checkbox-group">
              {options.map((o) => (
                <label key={o.value} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={Array.isArray(draft) && draft.includes(o.value)}
                    onChange={() => toggleCheckboxOption(o.value)}
                    disabled={isSaving}
                  />
                  {o.label}
                </label>
              ))}
            </div>
          )}
          <div className="leaddrawer-note-edit-actions">
            <button className="leaddrawer-note-action" onClick={handleSave} disabled={isSaving} title="Save">
              {isSaving ? <Loader2 size={14} className="spin" /> : <Check size={14} />}
            </button>
            <button className="leaddrawer-note-action" onClick={cancelEdit} disabled={isSaving} title="Cancel">
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableDetailField;
