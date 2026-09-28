export const ORDER_STATES = [
  'PENDIENTE',
  'EN PREPARACION',
  'LISTO',
  'ENTREGADO'
]

// Estado especial: no forma parte del flujo normal de flechas
export const PENDING_CONFIRMATION = 'POR CONFIRMAR'

export const getBeforeState = (currentState) => {
  const index = ORDER_STATES.indexOf(currentState)
  if (index <= 0) return null // -1 (no existe) o 0 (primero)
  return ORDER_STATES[index - 1]
}

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
    'POR CONFIRMAR':   'transparent', 
    'PENDIENTE':       '#f59e0b',
    'EN PREPARACION':  '#FF2C2C',
    'LISTO':           '#10b981',
    'ENTREGADO':       '#8b5cf6',
    'FACTURADO':       '#6b7280'
  }
  return colors[state] || '#6b7280'
}