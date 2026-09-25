import { createPortal } from 'react-dom';
import type { CSSProperties } from 'react';
import { useTruncatedTooltip } from '../hooks/useTruncatedTooltip';
import './TruncatedText.css';

interface TruncatedTextProps {
  text: string;
  className?: string | undefined;
}

const MEASURING_STYLE: CSSProperties = { top: 0, left: 0, visibility: 'hidden' };

const TruncatedText = ({ text, className }: TruncatedTextProps) => {
  const { anchorRef, tooltipRef, tooltipId, isTruncated, isOpen, position, open, close } =
    useTruncatedTooltip<HTMLSpanElement>(text);

  return (
    <>
      <span
        ref={anchorRef}
        className={`truncated-text${className ? ` ${className}` : ''}`}
        tabIndex={isTruncated ? 0 : undefined}
        aria-describedby={isOpen ? tooltipId : undefined}
        onMouseEnter={open}
        onMouseLeave={close}
        onFocus={open}
        onBlur={close}
        onClick={open}
      >
        {text}
      </span>
      {isOpen &&
        createPortal(
          <div ref={tooltipRef} id={tooltipId} role="tooltip" className="truncated-tooltip" style={position ?? MEASURING_STYLE}>
            {text}
          </div>,
          document.body,
        )}
    </>
  );
};

export default TruncatedText;
