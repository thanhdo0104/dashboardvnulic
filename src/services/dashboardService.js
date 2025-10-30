import axios from 'axios';

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const dashboardService = {
  // Get dashboard data
  getDashboardData: async (dateFilter) => {
    try {
      const response = await api.get('/dashboard', {
        params: {
          month: dateFilter.month,
          year: dateFilter.year,
        },
      });
      return response.data;
    } catch (error) {
      console.warn('API not available, using mock data:', error.message);
      // Return null to trigger fallback to mock data
      return null;
    }
  },

  // Get metrics data
  getMetrics: async (dateFilter) => {
    try {
      const response = await api.get('/metrics', {
        params: {
          month: dateFilter.month,
          year: dateFilter.year,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching metrics:', error);
      throw error;
    }
  },

  // Get chart data
  getChartData: async (chartType, dateFilter) => {
    try {
      const response = await api.get(`/charts/${chartType}`, {
        params: {
          month: dateFilter.month,
          year: dateFilter.year,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${chartType} chart data:`, error);
      throw error;
    }
  },

  // Get CAC & CLTV data
  getCACCLTVData: async (dateFilter) => {
    try {
      const response = await api.get('/charts/cac-cltv', {
        params: {
          month: dateFilter.month,
          year: dateFilter.year,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching CAC & CLTV data:', error);
      throw error;
    }
  },

  // Get MRR growth data
  getMRRGrowthData: async (dateFilter) => {
    try {
      const response = await api.get('/charts/mrr-growth', {
        params: {
          month: dateFilter.month,
          year: dateFilter.year,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching MRR growth data:', error);
      throw error;
    }
  },

  // Get MRR percentage data
  getMRRPercentageData: async (dateFilter) => {
    try {
      const response = await api.get('/charts/mrr-percentage', {
        params: {
          month: dateFilter.month,
          year: dateFilter.year,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching MRR percentage data:', error);
      throw error;
    }
  },

  // Update metric value (for real-time updates)
  updateMetric: async (metricId, value) => {
    try {
      const response = await api.put(`/metrics/${metricId}`, { value });
      return response.data;
    } catch (error) {
      console.error('Error updating metric:', error);
      throw error;
    }
  },

  // Get real-time updates
  getRealTimeUpdates: async () => {
    try {
      const response = await api.get('/dashboard/realtime');
      return response.data;
    } catch (error) {
      console.error('Error fetching real-time updates:', error);
      throw error;
    }
  },

  // Export dashboard data
  exportDashboardData: async (format = 'csv', dateFilter) => {
    try {
      const response = await api.get('/dashboard/export', {
        params: {
          format,
          month: dateFilter.month,
          year: dateFilter.year,
        },
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting dashboard data:', error);
      throw error;
    }
  },

  // Get all-time totals
  getTotals: async () => {
    try {
      const response = await api.get('/dashboard/totals');
      return response.data;
    } catch (error) {
      console.warn('API totals not available, using mock totals:', error.message);
      return null; // trigger mock in UI
    }
  },
};

export default dashboardService;
