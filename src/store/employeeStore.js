import { create } from 'zustand';

const useEmployeeStore = create((set) => ({
  employees: [
    {
      id: 1,
      firstName: 'Sophie',
      lastName: 'Martin',
      email: 'sophie.martin@example.com',
      department: 'Technologie',
      role: 'Développeur Senior',
      status: 'Actif',
      startDate: '2022-03-15',
    },
    {
      id: 2,
      firstName: 'Thomas',
      lastName: 'Bernard',
      email: 'thomas.bernard@example.com',
      department: 'Ressources Humaines',
      role: 'Responsable RH',
      status: 'Actif',
      startDate: '2021-06-01',
    }
  ],
  selectedEmployeeId: null,
  filters: {
    search: '',
    department: 'all',
    status: 'all'
  },

  setSelectedEmployee: (id) => set({ selectedEmployeeId: id }),
  setFilters: (newFilters) => set((state) => ({ filters: { ...state.filters, ...newFilters } })),
  
  addEmployee: (employee) => set((state) => ({
    employees: [...state.employees, { ...employee, id: state.employees.length + 1 }]
  })),
  
  updateEmployee: (id, updates) => set((state) => ({
    employees: state.employees.map(emp => 
      emp.id === id ? { ...emp, ...updates } : emp
    )
  })),
  
  deleteEmployee: (id) => set((state) => ({
    employees: state.employees.filter(emp => emp.id !== id)
  }))
}));

export default useEmployeeStore;
