const API_URL = import.meta.env.VITE_API_URL;



export const getTables = async () => {
  const response = await fetch(`${API_URL}/tables`);

  if (!response.ok) {
    throw new Error("Error obteniendo mesas");
  }

  return response.json();
};



export const createTable = async (table) => {
  const response = await fetch(`${API_URL}/tables`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(table),
  });

  if (!response.ok) {
    throw new Error("Error creando mesa");
  }

  return response.json();
};



export const updateTable = async (id, table) => {
  const response = await fetch(`${API_URL}/tables/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(table),
  });

  if (!response.ok) {
    throw new Error("Error actualizando mesa");
  }

  return response.json();
};



export const deleteTable = async (id) => {
  const response = await fetch(`${API_URL}/tables/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error eliminando mesa");
  }
};