import { useEffect, useState } from "react";

import {
  getTables,
  createTable,
  updateTable,
  deleteTable,
} from "../services/tableService";



export const useTables = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);


  const loadTables = async () => {
    try {
      setLoading(true);

      const data = await getTables();

      setTables(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };



  useEffect(() => {
    loadTables();
  }, []);



  const addTable = async (table) => {
    await createTable(table);
    await loadTables();
  };


  
  const editTable = async (id, table) => {
    await updateTable(id, table);
    await loadTables();
  };


  const removeTable = async (id) => {
    await deleteTable(id);
    await loadTables();
  };


  return {
    tables,
    loading,
    addTable,
    editTable,
    removeTable,
  };

};