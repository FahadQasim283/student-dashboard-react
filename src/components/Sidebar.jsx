// Sidebar.jsx - Navigation sidebar for CampusHub
import { useState } from 'react';

const navigationItems = [
  { label: 'Dashboard', icon: '📊' },
  { label: 'Students', icon: '🎓' },
  { label: 'Courses', icon: '📚' },
  { label: 'Attendance', icon: '📋' },
  { label: 'Settings', icon: '⚙️' },
];

function Sidebar({ isCollapsed, onToggle }) {
  // This state gives each sidebar item a simple active selection without routing.
  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* University Branding */}
      <div className="sidebar-brand">
        <span className="brand-icon">🏛️</span>
        <div className="brand-text">
          <span className="brand-title">CampusHub</span>
          <span className="brand-subtitle">University Portal</span>
        </div>
      </div>

      <button
        type="button"
        className="sidebar-toggle"
        onClick={onToggle}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? '»' : '«'}
      </button>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {navigationItems.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                className={`nav-item ${activeItem === item.label ? 'active' : ''}`}
                onClick={() => setActiveItem(item.label)}
                aria-current={activeItem === item.label ? 'page' : undefined}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div className="system-status">
          <span className="status-dot"></span>
          <span className="status-text">System Online</