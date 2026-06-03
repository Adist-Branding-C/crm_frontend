import { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SortDirection } from '../../../shared/constants/enums/sortDirection';
import { TaskStatus } from '../../../shared/constants/enums/taskStatus';
import { TASK_SUB_MENU_ITEMS, SAMPLE_TASKS } from '../constants';
import type { TaskItem, TaskFilters } from '../types';

export const useTasksData = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getCurrentTab = () => {
    const path = location.pathname;
    if (path.includes('/call')) return 'call-tasks';
    if (path.includes('/campaign')) return 'campaign-tasks';
    if (path.includes('/deal')) return 'deal-tasks';
    return 'task';
  };

  const [activeTab, setActiveTab] = useState(getCurrentTab());
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: SortDirection }>({ key: null, direction: SortDirection.ASC });
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskItem | null>(null);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [tasks, setTasks] = useState<TaskItem[]>(SAMPLE_TASKS);

  const [filters, setFilters] = useState<TaskFilters>({
    deal: '',
    status: '',
    assignedBy: '',
    assignedTo: '',
    category: '',
    dateRange: { start: '', end: '' },
  });

  const filteredData = useMemo(() => {
    let data = [...tasks];
    if (searchQuery) {
      data = data.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.deal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filters.deal) data = data.filter(item => item.deal === filters.deal);
    if (filters.status) data = data.filter(item => item.status === filters.status);
    if (filters.assignedTo) data = data.filter(item => item.assignedTo === filters.assignedTo);
    if (filters.category) data = data.filter(item => item.category === filters.category);
    if (sortConfig.key) {
      data.sort((a, b) => {
        const aVal = a[sortConfig.key as keyof TaskItem];
        const bVal = b[sortConfig.key as keyof TaskItem];
        if (aVal < bVal) return sortConfig.direction === SortDirection.ASC ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === SortDirection.ASC ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [searchQuery, filters, sortConfig, tasks]);

  const stats = useMemo(() => ({
    total: filteredData.length,
    completed: filteredData.filter(t => t.status === TaskStatus.COMPLETED).length,
    pending: filteredData.filter(t => t.status === TaskStatus.PENDING).length,
    overdue: filteredData.filter(t => t.status === TaskStatus.OVERDUE).length,
  }), [filteredData]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleTabClick = (item: { id: string; link: string }) => {
    setActiveTab(item.id);
    navigate(item.link);
    setCurrentPage(1);
  };

  const handleSort = (key: string) => setSortConfig(prev => ({
    key,
    direction: prev.key === key && prev.direction === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC,
  }));

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedRows(paginatedData.map(item => item.id));
    else setSelectedRows([]);
  };

  const handleSelectRow = (id: number) => setSelectedRows(prev =>
    prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
  );

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      deal: '', status: '', assignedBy: '', assignedTo: '', category: '',
      dateRange: { start: '', end: '' },
    });
    setShowFilters(false);
  };

  const handleDeleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    setActionMenuOpen(null);
  };

  const handleMarkCompleted = (id: number) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, status: TaskStatus.COMPLETED } : task
    ));
    setActionMenuOpen(null);
  };

  const handleExportCSV = () => {
    const headers = ['Sl No', 'Title', 'Category', 'Deal', 'Amount', 'Description', 'Scheduled Date', 'Assigned By', 'Assigned To', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(task =>
        [task.slNo, `"${task.title}"`, task.category, `"${task.deal}"`, task.amount, `"${task.description}"`, task.scheduledDate, task.assignedBy, task.assignedTo, task.status].join(',')
      ),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'tasks.csv';
    link.click();
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
    setEditingTask(null);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setEditingTask(null);
  };

  const getPageTitle = () => {
    const currentItem = TASK_SUB_MENU_ITEMS.find(item => item.id === activeTab);
    return currentItem ? currentItem.title : 'Tasks';
  };

  return {
    activeTab,
    searchQuery,
    setSearchQuery,
    showFilters,
    setShowFilters,
    selectedRows,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    sortConfig,
    actionMenuOpen,
    setActionMenuOpen,
    isDrawerOpen,
    editingTask,
    showSortDropdown,
    setShowSortDropdown,
    tasks,
    filters,
    setFilters,
    filteredData,
    stats,
    totalPages,
    startIndex,
    paginatedData,
    handleTabClick,
    handleSort,
    handleSelectAll,
    handleSelectRow,
    handleRowsPerPageChange,
    clearFilters,
    handleDeleteTask,
    handleMarkCompleted,
    handleExportCSV,
    handleDrawerOpen,
    handleDrawerClose,
    getPageTitle,
  };
};
