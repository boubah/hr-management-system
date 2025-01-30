import { useQuery } from '@tanstack/react-query';
import useDashboardStore from '../store/dashboardStore';

const fetchDashboardData = async (filters) => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    employees: {
      total: 156,
      new: 23,
      departed: 5,
      retention: 95
    },
    leaves: {
      pending: 12,
      approved: 45,
      rejected: 5,
      ongoing: 8
    },
    recruitment: {
      applications: 245,
      openPositions: 15,
      conversionRate: 12,
      avgTime: 35
    },
    performance: {
      avgScore: 8.2,
      completionRate: 85,
      objectivesAchieved: 78,
      nextReview: 15
    }
  };
};

export function useDashboardData() {
  const { filters } = useDashboardStore();

  return useQuery({
    queryKey: ['dashboard', filters],
    queryFn: () => fetchDashboardData(filters),
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 10000, // Consider data stale after 10 seconds
  });
}
