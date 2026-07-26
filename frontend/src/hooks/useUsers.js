import { useEffect, useState } from "react";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // FUNCIÓN PARA CARGAR USUARIOS
  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // METODO PARA AGREGAR UN USUARIO
  const addUser = async (user) => {
    try {
      setLoading(true);
      setError(null);
      await createUser(user);
      await loadUsers();
      return true;
    } catch (err) {
      setError(err.message || "Error al agregar el usuario");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // METODO PARA EDITAR UN USUARIO
  const editUser = async (id, user) => {
    try {
      setLoading(true);
      await updateUser(id, user);
      await loadUsers();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // METODO PARA ELIMINAR UN USUARIO
  const removeUser = async (id) => {
    try {
      setLoading(true);
      await deleteUser(id);
      await loadUsers();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading,
    error,
    setError,
    addUser,
    editUser,
    removeUser,
    loadUsers,
  };
};
