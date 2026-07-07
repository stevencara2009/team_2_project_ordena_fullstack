const API_URL = import.meta.env.VITE_API_URL

// Obtener todas las facturas
export const getBills = async () => {
  const response = await fetch(`${API_URL}/bills`)
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
  if (!response.ok) throw new Error("Error creando factura")
  return response.json()
}