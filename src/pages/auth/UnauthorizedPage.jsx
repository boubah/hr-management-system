import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-500" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Accès Non Autorisé
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Vous n'avez pas les permissions nécessaires pour accéder à cette page.
        </p>
        <div className="mt-6">
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
}
