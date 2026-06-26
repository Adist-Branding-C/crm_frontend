import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import { ACTION_EDIT, ACTION_DELETE } from '../../constants/actionLabels';
import { LABEL_SL_NO, LABEL_ACTIONS, LABEL_NO_DATA } from '../../constants/labels';
import type { Column, AdminTableProps } from '../../types/crud';

function AdminTableInner<T extends { id: number | string }>(props: AdminTableProps<T>) {
  const { data, columns, startIndex, dropdownOpen, onToggleDropdown, onEdit, onDelete, renderActions, emptyMessage } = props;

  const [dropdownStyle, setDropdownStyle] = useState<{ top?: number; bottom?: number; right: number; openUp: boolean } | null>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dropdownOpen === null) {
      setDropdownStyle(null);
      return;
    }
    const btn = document.querySelector(`[data-action-id="${dropdownOpen}"]`);
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const DROPDOWN_HEIGHT = 200;
    const openUp = spaceBelow < DROPDOWN_HEIGHT && spaceAbove > spaceBelow;
    setDropdownStyle({
      top: openUp ? undefined : rect.bottom + 8,
      bottom: openUp ? window.innerHeight - rect.top + 8 : undefined,
      right: window.innerWidth - rect.right,
      openUp,
    });
  }, [dropdownOpen]);

  useEffect(() => {
    if (dropdownOpen === null) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (portalRef.current && !portalRef.current.contains(e.target as Node)) {
        const target = e.target as HTMLElement;
        if (!target.closest('[data-action-id]')) {
          onToggleDropdown(null);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen, onToggleDropdown]);

  const openItem = dropdownOpen !== null ? data.find(item => item.id === dropdownOpen) ?? null : null;

  return (
    <div className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>
            <th>{LABEL_SL_NO}</th>
            {columns.map(col => (
              <th key={col.key}>{col.label}</th>
            ))}
            <th>{LABEL_ACTIONS}</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 2} className="dataTables_empty">
                {emptyMessage ?? LABEL_NO_DATA}
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr key={item.id}>
                <td>{startIndex + idx + 1}</td>
                {columns.map(col => (
                  <td key={col.key} className={col.className ?? ''}>
                    {col.render ? col.render(item) : String(item[col.key as keyof T] ?? '')}
                  </td>
                ))}
                <td>
                  {renderActions ? (
                    renderActions(item)
                  ) : (
                    <div className="action-menu-container">
                      <button
                        data-action-id={item.id}
                        className={`action-btn ${dropdownOpen === item.id ? 'active' : ''}`}
                        onClick={() => onToggleDropdown(dropdownOpen === item.id ? null : item.id)}
                      >
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {dropdownStyle && openItem && createPortal(
        <div
          ref={portalRef}
          className={`premium-dropdown action-dropdown-portal ${dropdownStyle.openUp ? 'dropup' : ''}`}
          style={{ position: 'fixed', top: dropdownStyle.top, bottom: dropdownStyle.bottom, right: dropdownStyle.right }}
        >
          <button className="dropdown-item" onClick={() => { onEdit(openItem); onToggleDropdown(null); }}>
            <Edit2 size={14} /> {ACTION_EDIT}
          </button>
          <button className="dropdown-item danger" onClick={() => { onDelete(openItem); onToggleDropdown(null); }}>
            <Trash2 size={14} /> {ACTION_DELETE}
          </button>
        </div>,
        document.body
      )}
    </div>
  );
}

const AdminTable = React.memo(AdminTableInner) as typeof AdminTableInner;
export default AdminTable;
