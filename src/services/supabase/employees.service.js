import { supabase } from '../../config/supabase.config';

export const employeesService = {
  getEmployees: async (filters = {}) => {
    let query = supabase
      .from('employees')
      .select(`
        *,
        manager:manager_id(id, first_name, last_name)
      `);

    // Appliquer les filtres
    if (filters.department) {
      query = query.eq('department', filters.department);
    }
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    if (filters.search) {
      query = query.or(`
        first_name.ilike.%${filters.search}%,
        last_name.ilike.%${filters.search}%,
        email.ilike.%${filters.search}%
      `);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  getEmployeeById: async (id) => {
    const { data, error } = await supabase
      .from('employees')
      .select(`
        *,
        manager:manager_id(id, first_name, last_name)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  createEmployee: async (employeeData) => {
    const { data, error } = await supabase
      .from('employees')
      .insert([employeeData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  updateEmployee: async (id, updates) => {
    const { data, error } = await supabase
      .from('employees')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  deleteEmployee: async (id) => {
    const { error } = await supabase
      .from('employees')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  uploadProfilePicture: async (file, employeeId) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${employeeId}.${fileExt}`;
    const filePath = `profiles/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('employees')
      .upload(filePath, file, {
        upsert: true
      });

    if (uploadError) throw uploadError;

    const { data: { publicUrl }, error: urlError } = await supabase.storage
      .from('employees')
      .getPublicUrl(filePath);

    if (urlError) throw urlError;

    await employeesService.updateEmployee(employeeId, {
      profile_url: publicUrl
    });

    return publicUrl;
  }
};
