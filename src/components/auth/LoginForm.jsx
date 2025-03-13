import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, isLoginLoading, loginError } = useAuth();

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {loginError && (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-sm text-red-700">
            {loginError.message || 'Une erreur est survenue lors de la connexion'}
          </p>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email', { 
            required: 'L\'email est requis',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Adresse email invalide'
            }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          {...register('password', { required: 'Le mot de passe est requis' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            {...register('remember')}
            className="h-4 w-4 rounded border-gray-300 text-uims-red focus:ring-uims-red"
          />
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
            Se souvenir de moi
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-uims-red hover:text-uims-red/80">
            Mot de passe oublié ?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoginLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-uims-red hover:bg-uims-red/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-uims-red disabled:opacity-50"
        >
          {isLoginLoading ? 'Connexion...' : 'Se connecter'}
        </button>
      </div>
    </form>
  );
}
