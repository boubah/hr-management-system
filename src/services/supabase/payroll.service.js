import { supabase } from '../../config/supabase.config';

export const payrollService = {
  getPayrolls: async (filters = {}) => {
    let query = supabase
      .from('payrolls')
      .select(`
        *,
        employee:employee_id(id, first_name, last_name),
        items:payroll_items(*)
      `);

    if (filters.period) {
      query = query.eq('period', filters.period);
    }
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    if (filters.employee_id) {
      query = query.eq('employee_id', filters.employee_id);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  getPayrollById: async (id) => {
    const { data, error } = await supabase
      .from('payrolls')
      .select(`
        *,
        employee:employee_id(id, first_name, last_name),
        items:payroll_items(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  createPayroll: async (payrollData) => {
    const { items, ...payroll } = payrollData;
    
    // Démarrer une transaction
    const { data: newPayroll, error: payrollError } = await supabase
      .from('payrolls')
      .insert([payroll])
      .select()
      .single();

    if (payrollError) throw payrollError;

    if (items && items.length > 0) {
      const payrollItems = items.map(item => ({
        ...item,
        payroll_id: newPayroll.id
      }));

      const { error: itemsError } = await supabase
        .from('payroll_items')
        .insert(payrollItems);

      if (itemsError) throw itemsError;
    }

    return newPayroll;
  },

  validatePayroll: async (id, validatedBy) => {
    const { data, error } = await supabase
      .from('payrolls')
      .update({
        status: 'VALIDATED',
        payment_date: new Date().toISOString(),
        validated_by: validatedBy
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  generatePayslip: async (id) => {
    // Ici, vous pouvez appeler une fonction Edge ou une API externe
    // pour générer le PDF du bulletin de paie
    const { data, error } = await supabase
      .functions.invoke('generate-payslip', {
        body: { payroll_id: id }
      });

    if (error) throw error;
    return data;
  }
};
