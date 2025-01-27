import React, { useState } from 'react';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import LeaveDetails from './LeaveDetails/index.jsx';

const requests = [
  {
    id: 1,
    type: 'Congés Payés',
    startDate: '2024-02-15',
    endDate: '2024-02-20',
    status: 'En Attente',
    duration: '5 jours',
    employee: 'Jean Dupont',
    comment: 'Vacances en famille',
    department: 'Technologie',
    manager: 'Marie Martin',
    submittedDate: '2024-02-01',
    documents: [],
    history: [
      {
        date: '2024-02-01',
        action: 'Demande créée',
        by: 'Jean Dupont'
      }
    ]
  },
  {
    id: 2,
    type: 'Maladie',
    startDate: '2024-02-10',
    endDate: '2024-02-12',
    status: 'Approuvé',
    duration: '2 jours',
    employee: 'Marie Martin',
    comment: 'Certificat médical fourni',
    department: 'RH',
    manager: 'Thomas Bernard',
    submittedDate: '2024-02-08',
    documents: [
      { name: 'Certificat médical.pdf', size: '156 KB' }
    ],
    history: [
      {
        date: '2024-02-08',
        action: 'Demande créée',
        by: 'Marie Martin'
      },
      {
        date: '2024-02-09',
        action: 'Demande approuvée',
        by: 'Thomas Bernard',
        comment: 'Certificat médical reçu'
      }
    ]
  }
];

// ... reste du code inchangé ...
