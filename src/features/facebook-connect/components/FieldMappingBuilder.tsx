import { Plus, Trash2 } from 'lucide-react';
import MentionTemplateInput from './MentionTemplateInput';
import type { FacebookFormQuestion, FacebookFormSummary, MappingOptions } from '../types';
import type { MappingRow } from '../hooks/useMappingRows';

// Facebook attaches these to every lead alongside its form answers - not
// part of the form's own questions, so they're added here rather than
// coming back from the Graph API's `questions` field.
const AD_METADATA_QUESTIONS: FacebookFormQuestion[] = [
  { key: 'ad_name', label: 'Ad Name' },
  { key: 'adset_name', label: 'Ad Set Name' },
  { key: 'campaign_name', label: 'Campaign Name' },
];

interface FieldMappingBuilderProps {
  rows: MappingRow[];
  form: FacebookFormSummary | null;
  mappingOptions: MappingOptions | null;
  onAddRow: () => void;
  onUpdateRow: (localId: string, patch: Partial<MappingRow>) => void;
  onRemoveRow: (localId: string) => void;
}

// Every row is built by the admin, from scratch - CRM field on the left,
// value (typed text and/or inserted Facebook fields) on the right, with a
// delete and add button per row.
const FieldMappingBuilder = ({ rows, form, mappingOptions, onAddRow, onUpdateRow, onRemoveRow }: FieldMappingBuilderProps) => {
  const usedTargets = new Set(rows.map((row) => `${row.crmFieldCategory}:${row.crmFieldKey}`));
  const formQuestions = form ? [...form.questions, ...AD_METADATA_QUESTIONS] : [];

  return (
    <div className="mapping-rows">
      {rows.map((row) => (
        <div key={row.localId} className="mapping-row mapping-row--builder">
          <select
            value={row.crmFieldKey ? `${row.crmFieldCategory}:${row.crmFieldKey}` : ''}
            onChange={(e) => {
              const [category, key] = e.target.value.split(':');
              onUpdateRow(row.localId, { crmFieldCategory: category as MappingRow['crmFieldCategory'], crmFieldKey: key ?? '' });
            }}
          >
            <option value="">Select CRM field</option>
            <optgroup label="Core Fields">
              {mappingOptions?.coreFields.map((field) => (
                <option
                  key={field.key}
                  value={`core:${field.key}`}
                  disabled={usedTargets.has(`core:${field.key}`) && !(row.crmFieldCategory === 'core' && row.crmFieldKey === field.key)}
                >
                  {field.label}
                </option>
              ))}
            </optgroup>
            {mappingOptions?.customFields.length ? (
              <optgroup label="Custom Fields">
                {mappingOptions.customFields.map((field) => (
                  <option
                    key={field.id}
                    value={`additional:${field.id}`}
                    disabled={usedTargets.has(`additional:${field.id}`) && !(row.crmFieldCategory === 'additional' && row.crmFieldKey === field.id)}
                  >
                    {field.name}
                  </option>
                ))}
              </optgroup>
            ) : null}
          </select>

          <MentionTemplateInput
            value={row.valueTemplate}
            formQuestions={formQuestions}
            onChange={(valueTemplate) => onUpdateRow(row.localId, { valueTemplate })}
          />

          <button type="button" className="mapping-row-btn mapping-row-btn--delete" onClick={() => onRemoveRow(row.localId)} disabled={rows.length === 1}>
            <Trash2 size={16} />
          </button>
          <button type="button" className="mapping-row-btn mapping-row-btn--add" onClick={onAddRow}>
            <Plus size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FieldMappingBuilder;
