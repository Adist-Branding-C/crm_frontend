import { Loader2 } from 'lucide-react';
import { Fragment, useMemo, useState } from 'react';
import type { ContactNumberDraft, ContactNumberPayload, ContactType, LeadContactNumber } from '../types';
import { DEFAULT_PRIMARY_CONTACT_TYPES } from '../constants/contactNumbers.constants';
import { collectContactNumberErrors } from '../validations/addLead.validation';
import type { ContactNumberError } from '../validations/addLead.validation';
import {
  createContactNumberDraft,
  draftsFromContacts,
  formatContact,
  toContactPayload,
} from '../utils/contactNumbers';
import AdditionalContactCard from './AdditionalContactCard';
import ContactNumberCard from './ContactNumberCard';
import AddRowButton from '../../../shared/components/AddRowButton';
import AdminDeleteModal from '../../../shared/components/crud/AdminDeleteModal';

export interface LeadContactNumbersTabProps {
  phone: string;
  countryCode?: string | null | undefined;
  contactNumbers?: LeadContactNumber[] | undefined;
  onSave: (contacts: ContactNumberPayload[]) => Promise<string | null>;
  onAction: (type: ContactType, dialNumber: string) => void;
}

type EditorTarget = { kind: 'new' } | { kind: 'edit'; id: string };

const LeadContactNumbersTab = ({
  phone,
  countryCode,
  contactNumbers = [],
  onSave,
  onAction,
}: LeadContactNumbersTabProps) => {
  const [target, setTarget] = useState<EditorTarget | null>(null);
  const [draft, setDraft] = useState<ContactNumberDraft>(() => createContactNumberDraft());
  const [errors, setErrors] = useState<ContactNumberError[]>([]);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const additional = useMemo(() => draftsFromContacts(contactNumbers), [contactNumbers]);
  const isEditing = target !== null;
  const editIndex = target?.kind === 'edit' ? additional.findIndex((item) => item.id === target.id) : additional.length;

  const fieldError = (field: ContactNumberError['field']) =>
    errors.find((error) => error.field === field)?.message;

  const openEditor = (next: EditorTarget, initial: ContactNumberDraft) => {
    setTarget(next);
    setDraft(initial);
    setErrors([]);
    setSaveError(null);
    setDeletingId(null);
  };

  const closeEditor = () => {
    setTarget(null);
    setErrors([]);
    setSaveError(null);
  };

  const persist = async (next: ContactNumberDraft[]): Promise<boolean> => {
    setIsSaving(true);
    setSaveError(null);
    const message = await onSave(toContactPayload(next));
    setIsSaving(false);
    if (message) setSaveError(message);
    return message === null;
  };

  const handleSaveEditor = async () => {
    const next =
      target?.kind === 'edit'
        ? additional.map((item) => (item.id === target.id ? draft : item))
        : [...additional, draft];
    const found = collectContactNumberErrors(next, { phone, countryCode: countryCode ?? undefined }).filter(
      (error) => error.index === editIndex,
    );
    if (!draft.phone.trim() && !found.some((error) => error.field === 'phone')) {
      found.push({ index: editIndex, field: 'phone', message: 'Enter the phone number' });
    }
    setErrors(found);
    if (found.length > 0) return;
    if (await persist(next)) closeEditor();
  };

  const openDelete = (id: string) => {
    setSaveError(null);
    setDeletingId(id);
  };

  const closeDelete = () => {
    if (isSaving) return;
    setDeletingId(null);
    setSaveError(null);
  };

  const handleConfirmDelete = async () => {
    if (await persist(additional.filter((item) => item.id !== deletingId))) setDeletingId(null);
  };

  const deleteIndex = additional.findIndex((item) => item.id === deletingId);
  const deleteItem = deleteIndex === -1 ? null : additional[deleteIndex]!;

  const renderEditor = () => (
    <li className="leaddrawer-number-editor">
      <AdditionalContactCard
        slot={editIndex + 2}
        domId={draft.id}
        countryCode={draft.countryCode}
        phone={draft.phone}
        types={draft.types}
        remarks={draft.remarks}
        errors={{
          countryCode: fieldError('countryCode'),
          phone: fieldError('phone'),
          types: fieldError('types'),
          remarks: fieldError('remarks'),
        }}
        onCountryCodeChange={(e) => setDraft({ ...draft, countryCode: e.target.value })}
        onPhoneChange={(e) => setDraft({ ...draft, phone: e.target.value.replace(/\D/g, '') })}
        onPhoneBlur={() => undefined}
        onTypesChange={(types) => setDraft({ ...draft, types })}
        onRemarksChange={(remarks) => setDraft({ ...draft, remarks })}
      />
      {saveError && <div className="leaddrawer-number-alert" role="alert">{saveError}</div>}
      <div className="leaddrawer-number-editor-actions">
        <button type="button" className="btn btn-secondary btn-sm" onClick={closeEditor} disabled={isSaving}>Cancel</button>
        <button type="button" className="btn btn-primary btn-sm" onClick={handleSaveEditor} disabled={isSaving}>
          {isSaving ? <><Loader2 size={14} className="spin" /> Saving…</> : 'Save number'}
        </button>
      </div>
    </li>
  );

  return (
    <div>
      <div className="leaddrawer-tab-header leaddrawer-numbers-header">
        <h3 className="leaddrawer-tab-heading">
          Phone Numbers <span className="leaddrawer-count-pill">{additional.length + 1}</span>
        </h3>
      </div>

      <ul className="leaddrawer-numbers">
        <ContactNumberCard
          label="Primary number"
          isPrimary
          display={formatContact(countryCode, phone)}
          dialNumber={`${countryCode ?? ''}${phone}`}
          types={DEFAULT_PRIMARY_CONTACT_TYPES}
          remarks={null}
          isBusy={false}
          onAction={onAction}
        />

        {additional.map((item, index) =>
          target?.kind === 'edit' && target.id === item.id ? (
            <Fragment key={item.id}>{renderEditor()}</Fragment>
          ) : (
            <ContactNumberCard
              key={item.id}
              label={`Contact Number ${index + 2}`}
              isPrimary={false}
              display={formatContact(item.countryCode, item.phone)}
              dialNumber={`${item.countryCode}${item.phone}`}
              types={item.types}
              remarks={item.remarks || null}
              isBusy={isSaving || isEditing}
              onAction={onAction}
              onEdit={() => openEditor({ kind: 'edit', id: item.id }, { ...item })}
              onAskDelete={() => openDelete(item.id)}
            />
          ),
        )}

        {target?.kind === 'new' && renderEditor()}

        {additional.length === 0 && !isEditing && (
          <li className="leaddrawer-numbers-empty">
            <p>No additional numbers yet.</p>
            <span>Add another phone number to reach this lead on more than one line.</span>
          </li>
        )}
      </ul>

      <div className="leaddrawer-numbers-add">
        <AddRowButton
          label="Add number"
          ariaLabel="Add another phone number for this lead"
          disabled={isEditing || isSaving}
          onClick={() => openEditor({ kind: 'new' }, createContactNumberDraft())}
        />
      </div>

      <AdminDeleteModal
        isOpen={deleteItem !== null}
        itemName={deleteItem ? `Contact Number ${deleteIndex + 2} (${formatContact(deleteItem.countryCode, deleteItem.phone)})` : undefined}
        error={saveError}
        onConfirm={handleConfirmDelete}
        onClose={closeDelete}
        isDeleting={isSaving}
      />
    </div>
  );
};

export default LeadContactNumbersTab;
