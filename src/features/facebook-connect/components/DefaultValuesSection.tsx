import type { MappingOptions } from '../types';

interface DefaultValuesSectionProps {
  mappingOptions: MappingOptions | null;
  sourceName: string;
  onSourceChange: (value: string) => void;
  statusName: string;
  onStatusChange: (value: string) => void;
  sourceError?: string | undefined;
}

// Every lead this Workflow produces gets these values, unconditionally -
// they're never read from the Facebook answer (Section 6).
const DefaultValuesSection = ({ mappingOptions, sourceName, onSourceChange, statusName, onStatusChange, sourceError }: DefaultValuesSectionProps) => (
  <div className="form-row">
    <div className="form-group">
      <label>Default Source <span className="required">*</span></label>
      <select value={sourceName} onChange={(e) => onSourceChange(e.target.value)} className={sourceError ? 'error' : ''}>
        <option value="">Select Source</option>
        {mappingOptions?.sources.map((source) => (
          <option key={source.id} value={source.name}>{source.name}</option>
        ))}
      </select>
      {sourceError && <span className="error-message">{sourceError}</span>}
    </div>

    <div className="form-group">
      <label>Default Status</label>
      <select value={statusName} onChange={(e) => onStatusChange(e.target.value)}>
        <option value="">None</option>
        {mappingOptions?.statuses.map((status) => (
          <option key={status.id} value={status.name}>{status.name}</option>
        ))}
      </select>
    </div>
  </div>
);

export default DefaultValuesSection;
