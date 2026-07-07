import { createContext, useState } from 'react';
// import { users } from '../data/users';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  // Convertimos login en una función async
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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



  /*const login = (email, password) => {
    const foundUser = users.find((u) => u.email === email && u.password === password)

    if (!foundUser) {
      return { success: false, message: "Credenciales inválidas" }
    }

    setUser(foundUser)
    return {
      success: true,
      user: foundUser
    }
  }*/

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}