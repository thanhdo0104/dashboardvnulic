import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { dashboardService } from '../services/dashboardService';

export const useDashboard = (dateFilter) => {
  const queryClient = useQueryClient();

  // Fetch dashboard data
  const {
    data: dashboardData,
    isLoading,
    error,
    refetch
  } = useQuery(
    ['dashboard', dateFilter],
    () => dashboardService.getDashboardData(dateFilter),
    {
      refetchInterval: 30000, // Refetch every 30 seconds
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
      retryDelay: 1000,
    }
  );

  // Fetch individual chart data
  const { data: cacCltvData } = useQuery(
    ['cacCltv', dateFilter],
    () => dashboardService.getCACCLTVData(dateFilter),
    {
      enabled: !!dateFilter,
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );

  const { data: mrrGrowthData } = useQuery(
    ['mrrGrowth', dateFilter],
    () => dashboardService.getMRRGrowthData(dateFilter),
    {
      enabled: !!dateFilter,
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );

  const { data: mrrPercentageData } = useQuery(
    ['mrrPercentage', dateFilter],
    () => dashboardService.getMRRPercentageData(dateFilter),
    {
      enabled: !!dateFilter,
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );

  // Real-time updates
  const [realTimeData, setRealTimeData] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const updates = await dashboardService.getRealTimeUpdates();
        setRealTimeData(updates);
      } catch (error) {
        console.error('Error fetching real-time updates:', error);
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Update metric mutation
  const updateMetricMutation = useMutation(
    ({ metricId, value }) => dashboardService.updateMetric(metricId, value),
    {
      onSuccess: () => {
        // Invalidate and refetch dashboard data
        queryClient.invalidateQueries(['dashboard', dateFilter]);
        queryClient.invalidateQueries(['metrics', dateFilter]);
      },
      onError: (error) => {
        console.error('Error updating metric:', error);
      },
    }
  );

  // Export data mutation
  const exportDataMutation = useMutation(
    ({ format, dateFilter }) => dashboardService.exportDashboardData(format, dateFilter),
    {
      onSuccess: (data, variables) => {
        // Create download link
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `dashboard-export-${variables.dateFilter.year}-${variables.dateFilter.month}.${variables.format}`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      onError: (error) => {
        console.error('Error exporting data:', error);
      },
    }
  );

  // Refresh all data
  const refreshData = () => {
    queryClient.invalidateQueries(['dashboard', dateFilter]);
    queryClient.invalidateQueries(['cacCltv', dateFilter]);
    queryClient.invalidateQueries(['mrrGrowth', dateFilter]);
    queryClient.invalidateQueries(['mrrPercentage', dateFilter]);
  };

  // Update metric
  const updateMetric = (metricId, value) => {
    updateMetricMutation.mutate({ metricId, value });
  };

  // Export data
  const exportData = (format = 'csv') => {
    exportDataMutation.mutate({ format, dateFilter });
  };

  return {
    // Data
    dashboardData,
    cacCltvData,
    mrrGrowthData,
    mrrPercentageData,
    realTimeData,
    
    // Loading states
    isLoading,
    isUpdating: updateMetricMutation.isLoading,
    isExporting: exportDataMutation.isLoading,
    
    // Error states
    error,
    updateError: updateMetricMutation.error,
    exportError: exportDataMutation.error,
    
    // Actions
    refetch,
    refreshData,
    updateMetric,
    exportData,
  };
};

export default useDashboard;
