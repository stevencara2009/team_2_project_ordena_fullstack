const API_URL = import.meta.env.VITE_API_URL;


// Servicio para obtener todos los productos
export const getProducts = async () => {
  const response = await fetch(
    `${API_URL}/products`
  );

  if (!response.ok) {
    throw new Error("Error obteniendo productos en API");
  }

  return response.json();

};


// Servicio para crear un producto
export const createProduct = async (product) => {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Error creando un producto");
  }

  return response.json();
};


// Servicio para actualizar un producto
export const updateProduct = async (id, product) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Error actualizando un producto");
  }

  return response.json();
};


// Servicio para eliminar un producto
export const deleteProduct = async (id) => {
  console.log(id)
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error eliminando un producto");
  }
}


// Servicio para subir imagen a Cloudinary vía backend y retorna la URL pública
export const uploadProductImage = async (file) => {
  const formData = new FormData()
  formData.append('image', file)

  const response = await fetch(`${API_URL}/products/upload-image`, {
    method: 'POST',
    // Sin Content-Type, fetch lo gestiona solo con el boundary correcto
    body: formData
  })

  if (!response.ok) {
    throw new Error('Error subiendo la imagen')
  }

  return response.json() // retorna ejemplo: { imageUrl: "https://res.cloudinary.com/..." }
}