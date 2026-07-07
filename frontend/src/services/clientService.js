const API_URL = import.meta.env.VITE_API_URL;


// Servicio para obtener todos los clientes
export const getClients = async () => {
  const response = await fetch(
    `${API_URL}/clients`
  );

  if (!response.ok) {
    throw new Error("Error obteniendo clientes en API");
  }

  return response.json();

};


// Servicio para crear un cliente
export const createClient = async (product) => {
  const response = await fetch(`${API_URL}/clients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Error creando cliente");
  }

  return response.json();
};


// Servicio para actualizar un cliente
export const updateClient = async (id, product) => {
  const response = await fetch(`${API_URL}/clients/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Error actualizando cliente");
  }

  return response.json();
};


// Servicio para eliminar un cliente
export const deleteClient = async (id) => {
  console.log(id)
  const response = await fetch(`${API_URL}/clients/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error eliminando cliente");
  }
}