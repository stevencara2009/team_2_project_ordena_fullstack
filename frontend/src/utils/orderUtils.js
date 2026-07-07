export const ORDER_STATES = [
  'PENDIENTE',
  'EN PREPARACION',
  'LISTO',
  'ENTREGADO'
]


// Dado el estado actual, devuelve el siguiente
export const getNextState = (currentState) => {
  const index = ORDER_STATES.indexOf(currentState)
  if (index === -1 || index === ORDER_STATES.length - 1) return null
  return ORDER_STATES[index + 1]
}

// Facturar
export const bill = (currentState) => {
  if(currentState === "ENTREGADO"){
    currentState === "FACTURADO"
  }
  return
}

// Color por estado para el badge
export const getStateColor = (state) => {
  const colors = {
    'PENDIENTE':       '#f59e0b',
    'EN PREPARACION':  '#FF2C2C',
    'LISTO':           '#10b981',
    'ENTREGADO':       '#8b5cf6',
    'FACTURADO':       '#6b7280'
  }
  return colors[state] || '#6b7280'
}