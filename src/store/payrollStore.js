import { create } from 'zustand';

const usePayrollStore = create((set) => ({
  payrolls: [
    {
      id: 1,
      employeeId: 1,
      employeeName: 'Sophie Martin',
      month: '2024-02',
      baseSalary: 2500000, // Salaire de base en GNF
      grossSalary: 3000000, // Salaire brut en GNF
      bonuses: [
        { type: 'Performance', amount: 300000 },
        { type: 'Ancienneté', amount: 200000 }
      ],
      deductions: [
        { type: 'CNSS', amount: 150000 }, // 5% du salaire brut plafonné
        { type: 'ITS', amount: 300000 }   // ITS selon les tranches
      ],
      cnss: 150000,
      its: 300000,
      totalDeductions: 450000,
      netSalary: 2550000,
      status: 'En attente',
      paymentDate: null
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: 'Jean Dupont',
      month: '2024-02',
      baseSalary: 3000000,
      grossSalary: 3500000,
      bonuses: [
        { type: 'Performance', amount: 300000 },
        { type: 'Transport', amount: 200000 }
      ],
      deductions: [
        { type: 'CNSS', amount: 175000 },
        { type: 'ITS', amount: 350000 }
      ],
      cnss: 175000,
      its: 350000,
      totalDeductions: 525000,
      netSalary: 2975000,
      status: 'Validé',
      paymentDate: '2024-02-25'
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

  validatePayroll: (id) => set((state) => ({
    payrolls: state.payrolls.map((payroll) => 
      payroll.id === id 
        ? { ...payroll, status: 'Validé', paymentDate: new Date().toISOString() }
        : payroll
    )
  }))
}));

export default usePayrollStore;
