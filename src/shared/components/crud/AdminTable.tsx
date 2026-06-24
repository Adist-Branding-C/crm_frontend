import React from 'react';
import { MoreHorizontal, Edit2, Trash2 } from 'lucide-react';
import { ACTION_EDIT, ACTION_DELETE } from '../../constants/actionLabels';
import { LABEL_SL_NO, LABEL_ACTIONS, LABEL_NO_DATA } from '../../constants/labels';
import type { Column, AdminTableProps } from '../../types/crud';

function AdminTableInner<T extends { id: number | string }>(props: AdminTableProps<T>) {
  const { data, columns, startIndex, dropdownOpen, onToggleDropdown, onEdit, onDelete, renderActions, emptyMessage } = props;

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
                    <div className="action-menu-container" style={{ position: 'relative' }}>
                      <button
                        className={`action-btn ${dropdownOpen === item.id ? 'active' : ''}`}
                        onClick={() => onToggleDropdown(dropdownOpen === item.id ? null : item.id)}
                      >
                        <MoreHorizontal size={16} />
                      </button>
                      {dropdownOpen === item.id && (
                        <div className="premium-dropdown action-dropdown">
                          <button className="dropdown-item" onClick={() => { onEdit(item); onToggleDropdown(null); }}>
                            <Edit2 size={14} /> {ACTION_EDIT}
                          </button>
                          <button className="dropdown-item danger" onClick={() => { onDelete(item); onToggleDropdown(null); }}>
                            <Trash2 size={14} /> {ACTION_DELETE}
                          </button>
                        </div>
                      )}
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
