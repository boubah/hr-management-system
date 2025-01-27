export const initialColumns = {
  nouveaux: {
    id: 'nouveaux',
    title: 'Nouveaux Candidats',
    color: 'bg-blue-100',
    candidates: []
  },
  preselection: {
    id: 'preselection',
    title: 'Présélection',
    color: 'bg-purple-100',
    candidates: []
  },
  entretien: {
    id: 'entretien',
    title: 'Entretien',
    color: 'bg-yellow-100',
    candidates: []
  },
  test: {
    id: 'test',
    title: 'Test Technique',
    color: 'bg-orange-100',
    candidates: []
  },
  offre: {
    id: 'offre',
    title: 'Offre',
    color: 'bg-green-100',
    candidates: []
  },
  embauche: {
    id: 'embauche',
    title: 'Embauché',
    color: 'bg-emerald-100',
    candidates: []
  },
  rejete: {
    id: 'rejete',
    title: 'Rejeté',
    color: 'bg-red-100',
    candidates: []
  }
};

export const sampleCandidates = [
  {
    id: '1',
    name: 'Sophie Martin',
    position: 'Développeur Full Stack',
    photo: 'https://randomuser.me/api/portraits/women/1.jpg',
    status: 'nouveaux'
  },
  {
    id: '2',
    name: 'Thomas Bernard',
    position: 'DevOps Engineer',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    status: 'entretien'
  }
];
