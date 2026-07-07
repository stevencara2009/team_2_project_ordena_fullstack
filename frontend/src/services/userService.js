const API_URL = import.meta.env.VITE_API_URL;


// Servicio para obtener todos los usuarios
export const getUsers = async () => {
  const response = await fetch(
    `${API_URL}/users`
  );

  if (!response.ok) {
    throw new Error("Error obteniendo usuarios en API");
  }

  return response.json();

};


// Servicio para crear un usuario
export const createUser = async (product) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Error creando usuario");
  }

  return response.json();
};


// Servicio para actualizar un usuario
export const updateUser = async (id, product) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Error actualizando usuario");
  }

  return response.json();
};


// Servicio para eliminar un usuario
export const deleteUser = async (id) => {
  console.log(id)
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error eliminando usuario");
  }
}



// Servicio para subir imagen a Cloudinary vía backend y retorna la URL pública
export const uploadUserImage = async (file) => {
  const formData = new FormData()
  formData.append('image', file)

  const response = await fetch(`${API_URL}/users/upload-image`, {
    method: 'POST',
    // Sin Content-Type, fetch lo gestiona solo con el boundary correcto
    body: formData
  })

  if (!response.ok) {
    throw new Error('Error subiendo la imagen')
  }

  return response.json() // retorna ejemplo: { imageUrl: "https://res.cloudinary.com/..." }
}