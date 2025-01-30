import { create } from 'zustand';

const usePayrollStore = create((set, get) => ({
  payrolls: [
    {
      id: 1,
      employeeId: 1,
      employeeName: 'Sophie Martin',
      month: '2024-02',
      baseSalary: 45000,
      bonuses: [
        { type: 'Performance', amount: 2000 },
        { type: 'Ancienneté', amount: 1000 }
      ],
      deductions: [
        { type: 'Sécurité Sociale', amount: 3500 },
        { type: 'Retraite', amount: 2000 }
      ],
      netSalary: 42500,
      status: 'En attente',
      paymentDate: null
    }
  ],

  addPayroll: (payroll) => set((state) => ({
    payrolls: [...state.payrolls, { ...payroll, id: Date.now() }]
  })),

  updatePayroll: (id, updates) => set((state) => ({
    payrolls: state.payrolls.map((payroll) => 
      payroll.id === id ? { ...payroll, ...updates } : payroll
    )
  })),

  deletePayroll: (id) => set((state) => ({
    payrolls: state.payrolls.filter((payroll) => payroll.id !== id)
  })),

  validatePayroll: (id) => set((state) => ({
    payrolls: state.payrolls.map((payroll) => 
      payroll.id === id 
        ? { ...payroll, status: 'Validé', paymentDate: new Date().toISOString() }
        : payroll
    )
  }))
}));

export default usePayrollStore;
