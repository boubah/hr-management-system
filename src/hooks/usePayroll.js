import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { payrollService } from '../services/payroll.service';

export const usePayrolls = (params) => {
  return useQuery({
    queryKey: ['payrolls', params],
    queryFn: () => payrollService.getPayrolls(params)
  });
};

export const usePayroll = (id) => {
  return useQuery({
    queryKey: ['payroll', id],
    queryFn: () => payrollService.getPayrollById(id),
    enabled: !!id
  });
};

export const useCreatePayroll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payrollData) => payrollService.createPayroll(payrollData),
    onSuccess: () => {
      queryClient.invalidateQueries(['payrolls']);
    }
  });
};

export const useUpdatePayroll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => payrollService.updatePayroll(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['payrolls']);
      queryClient.invalidateQueries(['payroll', variables.id]);
    }
  });
};

export const useValidatePayroll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => payrollService.validatePayroll(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries(['payrolls']);
      queryClient.invalidateQueries(['payroll', id]);
    }
  });
};

export const usePayrollSettings = () => {
  return useQuery({
    queryKey: ['payrollSettings'],
    queryFn: () => payrollService.getPayrollSettings()
  });
};

export const useUpdatePayrollSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (settings) => payrollService.updatePayrollSettings(settings),
    onSuccess: () => {
      queryClient.invalidateQueries(['payrollSettings']);
    }
  });
};
