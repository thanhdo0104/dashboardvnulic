import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import MetricCard from './MetricCard';
import DateSelector from './DateSelector';
import ViewMenu from './ViewMenu';
import ChartsSection from './ChartsSection';
import { dashboardService } from '../services/dashboardService';
import { getCurrentConfig } from '../config';
import './Dashboard.css';

const Dashboard = () => {
  const config = getCurrentConfig();
  const [selectedDate, setSelectedDate] = useState({
    month: 'March',
    year: '2024'
  });
  const [viewMode, setViewMode] = useState(null); // 'month' | 'year' | null (only show picker after selection)

  // Fetch dashboard data
  const { data: dashboardData, isLoading, error } = useQuery(
    ['dashboard', selectedDate],
    () => dashboardService.getDashboardData(selectedDate),
    {
      refetchInterval: config.realtime.enabled ? config.realtime.interval : false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: config.api.retryAttempts,
      refetchOnWindowFocus: false,
      enabled: !config.useMockData, // Disable API calls if using mock data
    }
  );

  // Mock data for development
  const mockData = {
    metrics: [
      {
        id: 1,
        title: 'Monthly Recurring Revenue (MRR)',
        value: '$293,000',
        icon: 'fas fa-dollar-sign',
        color: 'purple-dark',
        trend: '+12.5%'
      },
      {
        id: 2,
        title: 'Active Accounts',
        value: '1,253',
        icon: 'fas fa-user-plus',
        color: 'purple',
        trend: '+8.2%'
      },
      {
        id: 3,
        title: 'New Accounts',
        value: '65',
        icon: 'fas fa-user-plus',
        color: 'blue-dark',
        trend: '+15.3%'
      },
      {
        id: 4,
        title: 'Customer Acquisition Cost (CAC)',
        value: '$19.50',
        icon: 'fas fa-magnet',
        color: 'pink-dark',
        trend: '-2.1%'
      },
      {
        id: 5,
        title: 'Customer Lifetime Value (CLTV)',
        value: '$2,689',
        icon: 'fas fa-user-tie',
        color: 'blue-light',
        trend: '+5.7%'
      },
      {
        id: 6,
        title: 'Total Revenue',
        value: '$15,420',
        icon: 'fas fa-chart-line',
        color: 'blue-dark',
        trend: '+18.9%'
      },
      {
        id: 7,
        title: 'Churn Rate',
        value: '3.26%',
        icon: 'fas fa-user-minus',
        color: 'green',
        trend: '-0.8%'
      },
      {
        id: 8,
        title: 'Net Promoter Score (NPS)',
        value: '94%',
        icon: 'fas fa-smile',
        color: 'orange',
        trend: '+3.2%'
      },
      {
        id: 9,
        title: 'Growth Rate',
        value: '34%',
        icon: 'fas fa-percentage',
        color: 'purple',
        trend: '+7.1%'
      }
    ],
    charts: {
      cacCltv: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        cacData: [18.50, 19.20, 19.80, 20.10, 19.90, 20.30, 19.70, 20.00, 19.60, 19.80, 20.20, 19.50],
        cltvData: [2100, 2150, 2200, 2250, 2300, 2350, 2400, 2450, 2500, 2550, 2600, 2689]
      },
      mrrGrowth: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [4000, 5000, 10000, 4000, 8000, 3000, 6000, 5000, 4000, 7000, 12000, 3000]
      },
      mrrPercentage: {
        currentValue: '$293,000',
        currentLabel: 'March 2024',
        previousValue: '$218,000',
        previousLabel: 'March 2023',
        percentage: 34
      }
    }
  };

  const data = dashboardData || mockData;

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  // Show loading only if we don't have mock data
  if (isLoading && !mockData) {
    return (
      <div className="dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // Show error only if we have an error and no mock data
  if (error && !mockData) {
    return (
      <div className="dashboard">
        <div className="error-message">
          Error loading dashboard data: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <h1>VNU LIC DASHBOARD 🔥</h1>
        </div>
      </header>

      {/* View Menu */}
      <ViewMenu viewMode={viewMode} onChange={setViewMode} />

      {/* Date Selector - only show after user selects a mode */}
      {viewMode && (
        <DateSelector 
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          mode={viewMode}
        />
      )}

      {/* Metrics Grid */}
      <div className="metrics-grid">
        {data.metrics.map((metric, index) => (
          <MetricCard
            key={metric.id}
            metric={metric}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Charts Section */}
      <ChartsSection chartsData={data.charts} viewMode={viewMode} />
    </div>
  );
};

export default Dashboard;
