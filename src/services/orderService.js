const API_URL = import.meta.env.VITE_API_URL;


// Obtener orden
export const getOrders = async () => {

  const response = await fetch(`${API_URL}/orders`);

  if (!response.ok) {
    throw new Error("Error obteniendo ordenes");
  }

  return response.json();
};


// Obtener orden por Id
export const getOrderById = async (id) => {

  const response = await fetch(`${API_URL}/orders/${id}`);


  if (!response.ok) {
    throw new Error("Error obteniendo orden");
  }


  return response.json();

};


// Crear orden
export const createOrder = async (payload) => {

  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });


  if (!response.ok) {
    throw new Error("Error creando orden");
  }


  return response.json();
};


// Actualizar orden
export const updateOrder = async (id, payload) => {

  const response = await fetch(`${API_URL}/orders/${id}`, {
    method:"PATCH",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Error actualizando orden");
  }

  return response.json();
};


// Obtener todas las órdenes de una mesa específica
export const getOrdersByTable = async (tableId) => {
  const response = await fetch(`${API_URL}/orders/table/${tableId}`);
  if (!response.ok) {
    throw new Error("Error obteniendo las órdenes de la mesa");
  }
  return response.json();
};