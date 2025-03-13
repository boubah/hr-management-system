import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: authService.getCurrentUser,
    retry: false
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      navigate('/');
    }
  });

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.clear();
      navigate('/login');
    }
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoginLoading: loginMutation.isLoading,
    loginError: loginMutation.error
  };
};
