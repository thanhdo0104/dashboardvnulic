import React from 'react';
import { useQuery } from 'react-query';
import { dashboardService } from '../services/dashboardService';
import './Totals.css';
import { Link } from 'react-router-dom';

const Totals = () => {
  const { data, isLoading, error } = useQuery(
    ['totals'],
    () => dashboardService.getTotals(),
    { retry: 1 }
  );

  const mockTotals = {
    totalVisits: 1234567,
    totalUsers: 25000,
    totalRevenue: 2930000,
    totalMRRMonths: 36,
  };

  const totals = data || mockTotals;

  return (
    <div className="totals-page">
      <header className="totals-header">
        <h1>Tổng số liệu</h1>
        <Link to="/" className="back-link">← Quay lại Dashboard</Link>
      </header>

      {isLoading && (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Đang tải tổng số liệu...</p>
        </div>
      )}

      {error && (
        <div className="error-message">Không thể tải số liệu, đang dùng dữ liệu mẫu.</div>
      )}

      <div className="totals-grid">
        <div className="total-card">
          <div className="total-label">Tổng lượt truy cập</div>
          <div className="total-value">{totals.totalVisits.toLocaleString()}</div>
        </div>
        <div className="total-card">
          <div className="total-label">Tổng người dùng</div>
          <div className="total-value">{totals.totalUsers.toLocaleString()}</div>
        </div>
        <div className="total-card">
          <div className="total-label">Tổng doanh thu</div>
          <div className="total-value">${totals.totalRevenue.toLocaleString()}</div>
        </div>
        <div className="total-card">
          <div className="total-label">Số tháng có MRR</div>
          <div className="total-value">{totals.totalMRRMonths}</div>
        </div>
      </div>
    </div>
  );
};

export default Totals;

