import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const ROLES = {
  ADMIN: 'ADMIN', // Responsable RH
  MANAGER: 'MANAGER',
  EMPLOYEE: 'EMPLOYEE'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si un utilisateur est déjà connecté
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      // Simulation d'une requête API
      const mockUsers = {
        'rh@example.com': {
          id: 1,
          name: 'Marie Dupont',
          email: 'rh@example.com',
          role: ROLES.ADMIN,
          department: 'Ressources Humaines'
        },
        'manager@example.com': {
          id: 2,
          name: 'Jean Martin',
          email: 'manager@example.com',
          role: ROLES.MANAGER,
          department: 'Technologie'
        },
        'employee@example.com': {
          id: 3,
          name: 'Sophie Bernard',
          email: 'employee@example.com',
          role: ROLES.EMPLOYEE,
          department: 'Marketing'
        }
      };

      const user = mockUsers[credentials.email];
      if (user && credentials.password === 'password') {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        return { success: true, user };
      }
      throw new Error('Identifiants invalides');
    } catch (error) {
      throw new Error(error.message || 'Erreur de connexion');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const hasRole = (requiredRoles) => {
    if (!user) return false;
    if (Array.isArray(requiredRoles)) {
      return requiredRoles.includes(user.role);
    }
    return user.role === requiredRoles;
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
}
