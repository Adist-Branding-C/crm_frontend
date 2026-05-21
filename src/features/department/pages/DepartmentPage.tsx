import { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Edit2, Trash2, X, Plus, Search } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import SettingsTabs from '../../../shared/components/SettingsTabs';
import '../../../pages/Account.css';

interface Department {
  id: number;
  name: string;
  description: string;
  agents: string[];
}

interface Agent {
  id: number;
  name: string;
}

const departmentData: Department[] = [
  { id: 1, name: 'core', description: '', agents: ['Fida Fathima', 'Nandana K', 'Rameesa', 'Aysha', 'Nesri', 'Rahmath', 'Lana'] },
  { id: 2, name: 'Tamil', description: '', agents: ['Dilshana'] },
];

const agentsList: Agent[] = [
  { id: 7774, name: 'Dr Expert Edulinks' },
  { id: 7775, name: 'Fida Fathima' },
  { id: 7776, name: 'Nandana K' },
  { id: 7777, name: 'Rameesa' },
  { id: 7778, name: 'Aysha' },
  { id: 7779, name: 'Nesri' },
  { id: 7789, name: 'Dilshana' },
  { id: 8473, name: 'Rahmath' },
  { id: 8640, name: 'Lana' },
];

const DepartmentPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [deletingDepartment, setDeletingDepartment] = useState<Department | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [selectedAgents, setSelectedAgents] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ vertical: 'bottom', horizontal: 'right' });
  const [showAgentDropdown, setShowAgentDropdown] = useState(false);
  const actionMenuRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isClickInside = Object.values(actionMenuRefs.current).some(ref => ref && ref.contains(event.target as Node));
      if (!isClickInside) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const calculateDropdownPosition = (buttonRef: HTMLButtonElement | null) => {
    if (!buttonRef) return { vertical: 'bottom', horizontal: 'right' };
    const rect = buttonRef.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const dropdownHeight = 150;
    const dropdownWidth = 140;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    const spaceRight = viewportWidth - rect.right;
    let vertical = 'bottom';
    let horizontal = 'right';
    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
      vertical = 'top';
    }
    if (spaceRight < dropdownWidth && spaceRight < 100) {
      horizontal = 'left';
    }
    return { vertical, horizontal };
  };

  const filteredDepartments = departmentData.filter(dept =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleAgent = (agent: Agent) => {
    setSelectedAgents(prev => {
      if (prev.includes(agent.id)) {
        return prev.filter(id => id !== agent.id);
      }
      return [...prev, agent.id];
    });
  };

  const handleAddClick = () => {
    setShowForm(true);
    setEditingDepartment(null);
    setFormData({ name: '', description: '' });
    setSelectedAgents([]);
  };

  const handleEditClick = (dept: Department) => {
    setShowForm(true);
    setEditingDepartment(dept);
    setFormData({ name: dept.name, description: dept.description || '' });
    const agentIds = dept.agents.map(name => {
      const agent = agentsList.find(a => a.name === name);
      return agent ? agent.id : null;
    }).filter((id): id is number => id !== null);
    setSelectedAgents(agentIds);
    setDropdownOpen(null);
  };

  const handleDeleteClick = (dept: Department) => {
    setDeletingDepartment(dept);
    setDropdownOpen(null);
  };

  const handleConfirmDelete = () => {
    setDeletingDepartment(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingDepartment(null);
    setFormData({ name: '', description: '' });
    setSelectedAgents([]);
  };

  return (
    <div className="account-page">
      <div className="account-layout">
        <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
          <PageHeader
            title="Departments"
            description="Create and manage departments for your organization"
            action={
              <button className="btn btn-primary" onClick={handleAddClick}>
                <Plus size={16} /> Add Department
              </button>
            }
          />

          <SettingsTabs />

          <div className="table-container">
            <div className="table-header-controls">
              <div className="entries-select">
                <label>Show
                  <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
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
                <input
                  type="search"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Department</th>
                    <th>Description</th>
                    <th>Agents</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDepartments.slice(0, rowsPerPage).map((dept, index) => (
                    <tr key={dept.id}>
                      <td>{index + 1}</td>
                      <td>{dept.name}</td>
                      <td>{dept.description || '-'}</td>
                      <td>{dept.agents.join(', ')}</td>
                      <td>
                        <div className="action-menu-container" style={{ position: 'relative' }}>
                          <button
                            className={`action-btn ${dropdownOpen === dept.id ? 'active' : ''}`}
                            ref={(el) => { actionMenuRefs.current[dept.id] = el; }}
                            onClick={() => {
                              if (dropdownOpen === dept.id) {
                                setDropdownOpen(null);
                              } else {
                                const pos = calculateDropdownPosition(actionMenuRefs.current[dept.id] ?? null);
                                setDropdownPosition(pos);
                                setDropdownOpen(dept.id);
                              }
                            }}
                          >
                            <MoreHorizontal size={16} />
                          </button>
                          {dropdownOpen === dept.id && (
                            <div className={`premium-dropdown action-dropdown ${dropdownPosition.vertical === 'top' ? 'dropup' : ''} ${dropdownPosition.horizontal === 'left' ? 'dropleft' : ''}`}>
                              <button className="dropdown-item" onClick={() => handleEditClick(dept)}>
                                <Edit2 size={14} /> Edit
                              </button>
                              <button className="dropdown-item danger" onClick={() => handleDeleteClick(dept)}>
                                <Trash2 size={14} /> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-footer">
              <div className="table-info">
                Showing 1 to {Math.min(rowsPerPage, filteredDepartments.length)} of {filteredDepartments.length} entries
              </div>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="drawer-overlay" onClick={handleCloseForm}>
          <div className="drawer drawer-right" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h5>{editingDepartment ? 'Edit Department' : 'Add Department'}</h5>
              <button className="drawer-close" onClick={handleCloseForm}>
                <X size={20} />
              </button>
            </div>
            <div className="drawer-body">
              <form>
                <div className="form-group">
                  <label>Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter department name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    placeholder="Enter description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Agents</label>
                  <div className="multi-select-wrapper">
                    <div
                      className="multi-select-trigger"
                      onClick={() => setShowAgentDropdown(!showAgentDropdown)}
                    >
                      <span>
                        {selectedAgents.length > 0
                          ? `${selectedAgents.length} agents selected`
                          : 'Select Agents'
                        }
                      </span>
                    </div>
                    {showAgentDropdown && (
                      <div className="multi-select-dropdown">
                        {agentsList.map(agent => (
                          <label key={agent.id} className="multi-select-option">
                            <input
                              type="checkbox"
                              checked={selectedAgents.includes(agent.id)}
                              onChange={() => toggleAgent(agent)}
                            />
                            <span>{agent.name}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  {selectedAgents.length > 0 && (
                    <div className="selected-agents-tags">
                      {selectedAgents.map(id => {
                        const agent = agentsList.find(a => a.id === id);
                        return (
                          <span key={id} className="agent-tag">
                            {agent?.name}
                            <X
                              size={12}
                              onClick={() => agent && toggleAgent(agent)}
                            />
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    {editingDepartment ? 'Update' : 'Save'}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={handleCloseForm}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {deletingDepartment && (
        <div className="modal-overlay" onClick={() => setDeletingDepartment(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5>Confirm Delete</h5>
              <button className="modal-close" onClick={() => setDeletingDepartment(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <p className="delete-warning">
                Are you sure you want to delete <strong>{deletingDepartment.name}</strong> department?
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-danger" onClick={handleConfirmDelete}>
                Confirm
              </button>
              <button className="btn btn-secondary" onClick={() => setDeletingDepartment(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentPage;
