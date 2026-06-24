import { X } from 'lucide-react';

interface ValidationAlertProps {
  message: string | null;
  onClose?: (() => void) | undefined;
}

const ValidationAlert = ({ message, onClose }: ValidationAlertProps) => {
  if (!message) return null;

  const lines = message.split('\n').filter(Boolean);

  return (
    <div
      style={{
        padding: '12px 16px',
        marginBottom: '16px',
        borderRadius: '6px',
        border: '1px solid #fecaca',
        background: '#fef2f2',
        color: '#dc2626',
        fontSize: '14px',
        fontWeight: 500,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '8px',
      }}
      role="alert"
    >
      <div style={{ flex: 1 }}>
        {lines.length > 1 ? (
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {lines.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        ) : (
          <p style={{ margin: 0 }}>{lines[0]}</p>
        )}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#dc2626',
            cursor: 'pointer',
            padding: '2px',
            flexShrink: 0,
            lineHeight: 1,
          }}
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default ValidationAlert;
