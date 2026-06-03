import React from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { MONTH_NAMES, DAY_NAMES } from '../constants';
import type { MonthViewProps } from '../types';

const MonthView: React.FC<MonthViewProps> = ({
  currentDate, calendarDays, isToday, isCurrentMonth, getTasksCountForDate,
  onDateClick, onPrevMonth, onNextMonth, onTodayClick,
}) => (
  <>
    <div className="month-view-header">
      <div className="month-nav-controls">
        <button className="month-nav-btn" onClick={onPrevMonth}><ChevronLeft size={20} /></button>
        <span className="month-year-title">{MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
        <button className="month-nav-btn" onClick={onNextMonth}><ChevronRight size={20} /></button>
        <button className="today-btn" onClick={onTodayClick}>Today</button>
      </div>
      <div className="month-quick-jump">
        <button className="month-dropdown-btn"><ChevronDown size={16} /></button>
      </div>
    </div>
    <div className="month-view-grid">
      <div className="month-weekday-header">
        {DAY_NAMES.map(day => <div key={day} className="month-weekday-cell">{day}</div>)}
      </div>
      <div className="month-days-grid">
        {calendarDays.map((date, index) => {
          const tasksForDate = getTasksCountForDate(date);
          return (
            <div key={index} className={`month-day-cell ${isToday(date) ? 'today-cell' : ''} ${!isCurrentMonth(date) ? 'other-month' : ''}`}
              onClick={() => onDateClick(date)}>
              <span className={`month-date-num ${isToday(date) ? 'today-num' : ''}`}>{date.getDate()}</span>
              {tasksForDate.length > 0 && (
                <div className="month-events-container">
                  {tasksForDate.slice(0, 2).map((task, i) => (
                    <div key={i} className={`month-event-pill ${task.priority}`}>
                      {task.title.substring(0, 15)}{task.title.length > 15 ? '...' : ''}
                    </div>
                  ))}
                  {tasksForDate.length > 2 && (
                    <div className="month-event-more">+{tasksForDate.length - 2} more</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </>
);

export default MonthView;
