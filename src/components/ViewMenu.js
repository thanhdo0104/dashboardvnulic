import React from 'react';
import { Link } from 'react-router-dom';
import './ViewMenu.css';

const ViewMenu = ({ viewMode, onChange }) => {
  return (
    <nav className="view-menu">
      <button
        className={`view-tab ${viewMode === 'month' ? 'active' : ''}`}
        onClick={() => onChange('month')}
        aria-pressed={viewMode === 'month'}
      >
        Theo tháng
      </button>
      <button
        className={`view-tab ${viewMode === 'year' ? 'active' : ''}`}
        onClick={() => onChange('year')}
        aria-pressed={viewMode === 'year'}
      >
        Theo năm
      </button>
      <div className="view-menu-spacer" />
      <Link to="/totals" className="view-tab totals-link" aria-label="Xem tổng thời gian">
        Tổng thời gian
      </Link>
    </nav>
  );
};

export default ViewMenu;
