import { createContext, useState, useEffect } from 'react';
// import { users } from '../data/users';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

 // Al montar la app (o al refrescar), preguntamos al backend
  // si la cookie sigue siendo válida
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch(`${API_URL}/api/auth/me`, {
          credentials: 'include' // manda la cookie httpOnly
        });
        const data = await response.json();

        if (response.ok && data.success) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error verificando sesión:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [API_URL]);
  
  
  // Convertimos login en una función async
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        return { success: false, message: data.message || 'Error al iniciar sesión' };
      }

      setUser(data.user);
      return { success: true, user: data.user };

    } catch (error) {
      console.error('Error de red:', error);
      return { success: false, message: 'No se pudo conectar con el servidor' };
    } finally {
      setLoading(false);
    }
  };


  const logout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    } finally {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}