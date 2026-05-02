import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';

const ActionDropdownPortal = ({ isOpen, buttonRect, onClose, children }) => {
  const [position, setPosition] = useState(null);
  const dropdownRef = useRef(null);
  const DROPDOWN_HEIGHT = 180;
  const DROPDOWN_WIDTH = 220;

  const dropdownStyle = {
    position: 'fixed',
    top: position?.top,
    left: position?.left,
    zIndex: 9999,
    minWidth: DROPDOWN_WIDTH,
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04)',
    padding: '0.5rem 0',
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    width: '100%',
    padding: '0.6875rem 1rem',
    border: 'none',
    background: 'transparent',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#374151',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.15s ease',
  };

  const calculatePosition = useCallback(() => {
    if (!buttonRect) return;

    const rect = buttonRect;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    const spaceRight = viewportWidth - rect.right;
    const spaceLeft = rect.left;

    let vertical = 'bottom';
    let horizontal = 'right';

    if (spaceBelow < DROPDOWN_HEIGHT && spaceAbove > spaceBelow) {
      vertical = 'top';
    }

    if (spaceRight < DROPDOWN_WIDTH && spaceLeft > spaceRight) {
      horizontal = 'left';
    }

    let top, left;
    if (vertical === 'bottom') {
      top = rect.bottom + 4;
    } else {
      top = rect.top - DROPDOWN_HEIGHT - 4;
    }

    if (horizontal === 'right') {
      left = rect.right - DROPDOWN_WIDTH;
    } else {
      left = rect.left;
    }

    setPosition({ top, left });
  }, [buttonRect]);

  useEffect(() => {
    if (isOpen && buttonRect) {
      calculatePosition();
    }
  }, [isOpen, calculatePosition, buttonRect]);

  useEffect(() => {
    if (!isOpen || !buttonRect) return;

    const handleScroll = () => calculatePosition();
    const handleResize = () => calculatePosition();
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, calculatePosition, onClose, buttonRect]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen || !position) return null;

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const existingStyle = child.props.style || {};
        const className = child.props.className || '';
        
        let hoverBg = '#f8f9fa';
        let textColor = '#374151';
        
        if (className.includes('delete')) {
          textColor = '#dc2626';
          hoverBg = '#fef2f2';
        }
        
        return React.cloneElement(child, {
          style: { ...buttonStyle, ...existingStyle, color: textColor },
          onMouseEnter: (e) => {
            e.target.style.background = hoverBg;
            existingStyle?.onMouseEnter?.(e);
          },
          onMouseLeave: (e) => {
            e.target.style.background = 'transparent';
            existingStyle?.onMouseLeave?.(e);
          }
        });
      }
      return child;
    });
  };

  return ReactDOM.createPortal(
    <div ref={dropdownRef} style={dropdownStyle}>
      {renderChildren()}
    </div>,
    document.body
  );
};

export default ActionDropdownPortal;