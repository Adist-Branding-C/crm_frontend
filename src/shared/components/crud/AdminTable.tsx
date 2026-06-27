import React, { useState, useCallback } from 'react';
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import ActionDropdownPortal from '../../../components/ActionDropdownPortal';
import { ACTION_EDIT, ACTION_DELETE } from '../../constants/actionLabels';
import { LABEL_SL_NO, LABEL_ACTIONS, LABEL_NO_DATA } from '../../constants/labels';
import type { Column, AdminTableProps } from '../../types/crud';

function AdminTableInner<T extends { id: number | string }>(props: AdminTableProps<T>) {
  const { data, columns, startIndex, dropdownOpen, onToggleDropdown, onEdit, onDelete, renderActions, emptyMessage } = props;
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);

  const handleToggleDropdown = useCallback((e: React.MouseEvent<HTMLButtonElement>, id: T['id']) => {
    setButtonRect(e.currentTarget.getBoundingClientRect());
    onToggleDropdown(dropdownOpen === id ? null : id);
  }, [dropdownOpen, onToggleDropdown]);

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
                        className={`action-btn ${dropdownOpen === item.id ? 'active' : ''}`}
                        onClick={(e) => handleToggleDropdown(e, item.id)}
                      >
                        <MoreHorizontal size={16} />
                      </button>
                      <ActionDropdownPortal
                        isOpen={dropdownOpen === item.id}
                        buttonRect={buttonRect}
                        onClose={() => onToggleDropdown(null)}
                      >
                        <button onClick={() => { onEdit(item); onToggleDropdown(null); }}>
                          <Edit2 size={14} /> {ACTION_EDIT}
                        </button>
                        <button className="delete" onClick={() => { onDelete(item); onToggleDropdown(null); }}>
                          <Trash2 size={14} /> {ACTION_DELETE}
                        </button>
                      </ActionDropdownPortal>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const AdminTable = React.memo(AdminTableInner) as typeof AdminTableInner;
export default AdminTable;
