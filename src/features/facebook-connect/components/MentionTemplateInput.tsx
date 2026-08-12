import { useEffect, useRef, useState } from 'react';
import { parseTemplate } from '../utils/templateParser';
import type { FacebookFormQuestion } from '../types';

interface MentionTemplateInputProps {
  value: string;
  formQuestions: FacebookFormQuestion[];
  onChange: (newValue: string) => void;
}

// A single continuous text field that can hold both typed text and inline
// "chips" referencing a Facebook question - built as an uncontrolled
// contentEditable div (DOM is the source of truth while editing) rather than
// a controlled React value, since re-rendering HTML into a contentEditable on
// every keystroke fights the browser over cursor position. External `value`
// changes (e.g. loading an existing row) are only synced in when they didn't
// originate from this component's own onChange.
const MentionTemplateInput = ({ value, formQuestions, onChange }: MentionTemplateInputProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const lastEmitted = useRef<string | null>(null);
  const [focused, setFocused] = useState(false);

  const buildChip = (key: string): HTMLSpanElement => {
    const chip = document.createElement('span');
    chip.contentEditable = 'false';
    chip.className = 'mention-chip';
    chip.dataset.key = key;
    // Built with createElement/createTextNode only, never innerHTML - a typed
    // question label can never be reinterpreted as markup this way.
    chip.appendChild(document.createTextNode(formQuestions.find((q) => q.key === key)?.label ?? key));
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'mention-chip__remove';
    removeBtn.setAttribute('aria-label', 'Remove field');
    removeBtn.appendChild(document.createTextNode('×'));
    removeBtn.addEventListener('mousedown', (e) => e.preventDefault());
    removeBtn.addEventListener('click', () => {
      chip.remove();
      emitChange();
    });
    chip.appendChild(removeBtn);
    return chip;
  };

  const serialize = (): string => {
    const el = editorRef.current;
    if (!el) return '';
    let result = '';
    el.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        result += node.textContent ?? '';
      } else if (node instanceof HTMLElement && node.dataset.key) {
        result += `$${node.dataset.key}`;
      }
    });
    return result;
  };

  const emitChange = () => {
    const serialized = serialize();
    lastEmitted.current = serialized;
    onChange(serialized);
  };

  useEffect(() => {
    const el = editorRef.current;
    if (!el || value === lastEmitted.current) return;

    el.innerHTML = '';
    for (const segment of parseTemplate(value)) {
      el.appendChild(segment.type === 'text' ? document.createTextNode(segment.value) : buildChip(segment.key));
    }
    lastEmitted.current = value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const insertField = (key: string) => {
    const el = editorRef.current;
    if (!el) return;
    el.focus();

    const selection = window.getSelection();
    let range: Range;
    if (selection && selection.rangeCount > 0 && el.contains(selection.anchorNode)) {
      range = selection.getRangeAt(0);
    } else {
      range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
    }
    range.deleteContents();

    const chip = buildChip(key);
    range.insertNode(chip);
    range.setStartAfter(chip);
    range.collapse(true);
    selection?.removeAllRanges();
    selection?.addRange(range);

    emitChange();
  };

  return (
    <div className="mention-template-input">
      <div
        ref={editorRef}
        className="mention-template-input__editor"
        contentEditable
        suppressContentEditableWarning
        onInput={emitChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        data-placeholder="Type text, or pick a field below"
      />
      {focused && formQuestions.length > 0 && (
        <div className="mention-template-input__suggestions">
          {formQuestions.map((question) => (
            <div
              key={question.key}
              className="mention-template-input__suggestion"
              onMouseDown={(e) => {
                e.preventDefault();
                insertField(question.key);
              }}
            >
              {question.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MentionTemplateInput;
