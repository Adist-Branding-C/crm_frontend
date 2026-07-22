interface RuleToggleSwitchProps {
  checked: boolean;
  loading: boolean;
  onChange: () => void;
}

const RuleToggleSwitch = ({ checked, loading, onChange }: RuleToggleSwitchProps) => (
  <label className={`automation-toggle ${loading ? 'loading' : ''}`}>
    <input type="checkbox" checked={checked} disabled={loading} onChange={onChange} />
    <span className="automation-toggle-slider" />
  </label>
);

export default RuleToggleSwitch;
