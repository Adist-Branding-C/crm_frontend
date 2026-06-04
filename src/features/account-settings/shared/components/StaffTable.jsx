import { Search, MoreHorizontal, Edit2, Trash2, MapPin } from 'lucide-react';

const StaffTable = ({
  data,
  searchQuery,
  onSearchChange,
  rowsPerPage,
  onRowsPerPageChange,
  dropdownOpen,
  onToggleDropdown,
  onEdit,
  onDelete
}) => {
  return (
    <div className="table-container">
      <div className="table-header-controls">
        <div className="entries-select">
          <label>Show
            <select value={rowsPerPage} onChange={(e) => onRowsPerPageChange(Number(e.target.value))}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            entries
          </label>
        </div>
        <div className="search-input">
          <Search size={16} />
          <input type="search" placeholder="Search" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} />
        </div>
      </div>
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Role</th>
              <th>Designation</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>{item.designation}</td>
                <td>
                  <span className={'status-badge status-' + item.status.toLowerCase()}>
                    {item.status}
                  </span>
                </td>
                <td>
                  {item.role === 'Admin' ? (
                    <span className="status-badge status-admin">Admin</span>
                  ) : (
                    <div className="dropdown-container">
                      <button className="dropdown-toggle" onClick={() => onToggleDropdown(dropdownOpen === item.id ? null : item.id)}>
                        <MoreHorizontal size={16} />
                      </button>
                      {dropdownOpen === item.id && (
                        <div className="dropdown-menu">
                          <a href="#" className="dropdown-item">Deactivate</a>
                          <a className="dropdown-item" onClick={() => onEdit(item)}><Edit2 size={14} /> Edit</a>
                          <a className="dropdown-item" onClick={() => onDelete(item)}><Trash2 size={14} /> Delete</a>
                          <a href={'/user/staff-location-history/' + item.id} className="dropdown-item"><MapPin size={14} /> History</a>
                        </div>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        <div className="table-footer-left">
          <span className="limit-text">Limit: {data.length}/{data.length}</span>
        </div>
        <div className="table-info">
          Showing 1 to {Math.min(rowsPerPage, data.length)} of {data.length} entries
        </div>
      </div>
    </div>
  );
};

export default StaffTable;
