const API_URL = import.meta.env.VITE_API_URL

export const forgotPassword = async (email) => {
  const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email })
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Error solicitando recuperación")
  }

  return data
}



export const resetPassword = async ({ token, password }) => {
  const response = await fetch(`${API_URL}/api/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ token, password })
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Error restableciendo contraseña")
  }

  return data
}