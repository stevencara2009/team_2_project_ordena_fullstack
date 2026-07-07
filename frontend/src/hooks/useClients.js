import { useState } from "react";

import {
  createClient
} from "../services/clientService";


export const useClients = () => {

  const [loading, setLoading] = useState(false);


  // METODO PARA AGREGAR UN USUARIO
  const addClient = async (client) => {
    try {
      setLoading(true);
      await createClient(client);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return {
    loading,
    addClient
  };
};