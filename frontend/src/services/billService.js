const API_URL = import.meta.env.VITE_API_URL

// Obtener todas las facturas (con filtros opcionales)
export const getBills = async (filters = {}) => {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value)
    }
  })

  const query = params.toString()
  const response = await fetch(`${API_URL}/bills${query ? `?${query}` : ''}`)

  if (!response.ok) throw new Error("Error obteniendo facturas")
  return response.json()
}


// Obtener detalle de una factura (productos, cliente, mesa)
export const getBillDetails = async (billId) => {
  const response = await fetch(`${API_URL}/bills/${billId}/details`)
  if (!response.ok) throw new Error("Error obteniendo detalle de factura")
  return response.json()
}


// Crear factura
export const createBill = async (payload) => {
  const response = await fetch(`${API_URL}/bills`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Error creando factura")
  }

  return data
}