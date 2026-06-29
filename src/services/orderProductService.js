const API_URL = import.meta.env.VITE_API_URL;


// Obtener productos de una orden
export const getOrderProducts = async (orderId) => {
  const response = await fetch(`${API_URL}/order-products/${orderId}`)
  if (!response.ok) {
    throw new Error("Error obteniendo productos de la orden");
  }
  return response.json();
};


// Agregar producto a una orden
export const addProduct = async (payload) => {

  const response = await fetch(`${API_URL}/order-products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error("Error creando orden");
  }

  return response.json();
};


// Actualizar cantidad de un producto en la orden
export const updateProduct = async (
  orderId,
  productId,
  payload
) => {
  const response = await fetch(`${API_URL}/order-products/${orderId}/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Error actualizando producto de la orden");
  }

  return response.json();
};


// Eliminar producto de una orden
export const deleteProduct = async (
  orderId,
  productId
) => {
  const response = await fetch(`${API_URL}/order-products/${orderId}/${productId}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Error eliminando producto de la orden");
  }

  return response.json();
};

// Eliminar todos los productos de una orden
export const deleteAllProducts = async (orderId) => {
    const response = await fetch(`${API_URL}/order-products/${orderId}/all`, {
        method: "DELETE"
    })
    if (!response.ok) throw new Error("Error eliminando productos de la orden")
    return response.json()
}