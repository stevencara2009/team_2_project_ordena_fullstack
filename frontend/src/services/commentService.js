const API_URL = import.meta.env.VITE_API_URL;

export const getComments = async () => {
  const response = await fetch(`${API_URL}/comments`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error obteniendo comentarios");
  }

  return response.json();
};

export const createComment = async (comment) => {
  const response = await fetch(`${API_URL}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(comment),
  });

  const data = await response.json();

  if (!response.ok) {
    // 💡 Lanza la respuesta del backend para capturarla en la UI
    throw new Error(data.message || "Error creando comentario");
  }

  return data;
};
