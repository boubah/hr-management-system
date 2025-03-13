import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase credentials are missing');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour TypeScript (optionnel)
export type Database = {
  public: {
    Tables: {
      employees: {
        Row: {
          id: string
          created_at: string
          first_name: string
          last_name: string
          email: string
          phone: string
          department: string
          position: string
          hire_date: string
          status: string
          manager_id: string | null
          profile_url: string | null
        }
        Insert: {
          first_name: string
          last_name: string
          email: string
          phone?: string
          department: string
          position: string
          hire_date: string
          status?: string
          manager_id?: string
          profile_url?: string
        }
        Update: {
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          department?: string
          position?: string
          hire_date?: string
          status?: string
          manager_id?: string
          profile_url?: string
        }
      }
      payrolls: {
        Row: {
          id: string
          created_at: string
          employee_id: string
          period: string
          base_salary: number
          gross_salary: number
          net_salary: number
          cnss: number
          its: number
          total_deductions: number
          status: string
          payment_date: string | null
          validated_by: string | null
        }
        Insert: {
          employee_id: string
          period: string
          base_salary: number
          gross_salary: number
          net_salary: number
          cnss: number
          its: number
          total_deductions: number
          status?: string
          payment_date?: string
          validated_by?: string
        }
        Update: {
          status?: string
          payment_date?: string
          validated_by?: string
        }
      }
      payroll_items: {
        Row: {
          id: string
          payroll_id: string
          type: string
          description: string
          amount: number
          category: 'BONUS' | 'DEDUCTION'
        }
        Insert: {
          payroll_id: string
          type: string
          description: string
          amount: number
          category: 'BONUS' | 'DEDUCTION'
        }
        Update: {
          type?: string
          description?: string
          amount?: number
          category?: 'BONUS' | 'DEDUCTION'
        }
      }
    }
  }
}
