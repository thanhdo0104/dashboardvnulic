// Configuration for the application
export const config = {
  // API Configuration
  api: {
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
    timeout: 10000,
    retryAttempts: 3,
  },
  
  // Development mode settings
  development: {
    useMockData: process.env.REACT_APP_USE_MOCK_DATA !== 'false', // Default to true
    enableLogging: process.env.REACT_APP_ENABLE_LOGGING !== 'false', // Default to true
    enableErrorBoundary: true,
  },
  
  // Production mode settings
  production: {
    useMockData: process.env.REACT_APP_USE_MOCK_DATA === 'true', // Default to false
    enableLogging: process.env.REACT_APP_ENABLE_LOGGING === 'true', // Default to false
    enableErrorBoundary: true,
  },
  
  // Chart configuration
  charts: {
    animationDuration: 1000,
    responsive: true,
    maintainAspectRatio: false,
  },
  
  // Real-time updates
  realtime: {
    enabled: process.env.REACT_APP_USE_MOCK_DATA !== 'true', // Disable if using mock data
    interval: 30000, // 30 seconds
  },
  
  // Date picker configuration
  datePicker: {
    dateFormat: 'MMMM yyyy',
    showMonthYearPicker: true,
    showFullMonthYearPicker: true,
  },
};

// Get current environment
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

// Get current config based on environment
export const getCurrentConfig = () => {
  return {
    ...config,
    ...(isDevelopment ? config.development : config.production),
  };
};

export default config;
