import { create } from 'zustand';

const usePerformanceStore = create((set) => ({
  evaluations: [
    {
      id: 1,
      employeeId: 1,
      date: '2024-01-15',
      type: 'Annuelle',
      rating: 4.5,
      evaluator: 'Jean Martin',
      status: 'Complété',
      competencies: {
        technical: 4.5,
        communication: 4.0,
        leadership: 4.2,
        teamwork: 4.8,
        innovation: 4.3
      },
      comments: 'Excellente performance globale. Continue à montrer un fort leadership technique.',
      objectives: [
        {
          id: 1,
          title: 'Migration Cloud',
          status: 'Completed',
          progress: 100,
          dueDate: '2024-03-31'
        },
        {
          id: 2,
          title: 'Formation équipe junior',
          status: 'In Progress',
          progress: 60,
          dueDate: '2024-06-30'
        }
      ]
    }
  ],

  objectives: [
    {
      id: 1,
      employeeId: 1,
      title: 'Migration Cloud',
      description: 'Migration de l\'infrastructure vers AWS',
      startDate: '2024-01-01',
      dueDate: '2024-03-31',
      status: 'In Progress',
      progress: 75,
      priority: 'High',
      category: 'Technical',
      metrics: [
        { name: 'Applications migrées', target: 10, current: 7 },
        { name: 'Temps d\'arrêt', target: 0, current: 0 }
      ]
    }
  ],

  addEvaluation: (evaluation) => set((state) => ({
    evaluations: [...state.evaluations, { ...evaluation, id: Date.now() }]
  })),

  updateEvaluation: (id, updates) => set((state) => ({
    evaluations: state.evaluations.map((evaluation) => 
      evaluation.id === id ? { ...evaluation, ...updates } : evaluation
    )
  })),

  addObjective: (objective) => set((state) => ({
    objectives: [...state.objectives, { ...objective, id: Date.now() }]
  })),

  updateObjective: (id, updates) => set((state) => ({
    objectives: state.objectives.map((objective) => 
      objective.id === id ? { ...objective, ...updates } : objective
    )
  })),

  deleteEvaluation: (id) => set((state) => ({
    evaluations: state.evaluations.filter((evaluation) => evaluation.id !== id)
  })),

  deleteObjective: (id) => set((state) => ({
    objectives: state.objectives.filter((objective) => objective.id !== id)
  }))
}));

export default usePerformanceStore;
